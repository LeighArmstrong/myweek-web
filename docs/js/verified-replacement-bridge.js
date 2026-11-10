window.MW = window.MW || {};
(function () {
  // Only approved supplier recipes are shipped in the active catalogue.
  // The 38 archived supplier holds remain documented in the human review ledger.
  // An independently sourced dinner still requires complete editorial evidence
  // and an immutable, locally packaged, rights-verified dish image.
  const original = MW.SOURCED_RECIPES || [];
  const proposed = MW.VERIFIED_REPLACEMENT_RECIPES || [];
  const reviews = MW.VERIFIED_REPLACEMENT_REVIEWS || [];
  const photos = MW.VERIFIED_REPLACEMENT_DISH_CACHE || {};
  const originalPhotos = MW.sourcedFinalCache || {};
  if (
    !Array.isArray(original) ||
    original.length !== 2962 ||
    MW.SOURCED_CATALOGUE_META?.count !== original.length ||
    !Array.isArray(proposed) ||
    !Array.isArray(reviews) ||
    !photos ||
    typeof photos !== 'object' ||
    !originalPhotos ||
    typeof originalPhotos !== 'object'
  ) {
    MW.VERIFIED_REPLACEMENT_REJECTED = {
      reason: 'incomplete_original_source_review_or_image_manifest',
      accepted: 0,
      rejected: Array.isArray(proposed) ? proposed.length : 0,
    };
    return;
  }
  const existing = original.concat(Array.isArray(MW.LUNCHES) ? MW.LUNCHES : []);
  const usedIDs = new Set(existing.map((r) => r.id));
  const usedUIDs = new Set(existing.map((r) => String(r.source) + '|' + String(r.sourceId)));
  const pages = new Set(existing.map((r) => r.sourceUrl));
  const images = new Set(existing.map((r) => r.sourceImageUrl));
  const titles = new Set(
    existing.map((r) =>
      String(r.title || '')
        .trim()
        .toLowerCase(),
    ),
  );
  const imageDigests = new Set(
    Object.values(originalPhotos)
      .map((x) => x && x.sha256)
      .filter(Boolean),
  );
  const byReview = new Map(reviews.filter((x) => x && x.id).map((x) => [x.id, x]));
  const required = [
    'sourceUidVerified',
    'completeCookingMethodVerified',
    'originalTwoPersonIngredientsVerified',
    'allergenAndDietVerified',
    'allUKAndAUMarketsVerified',
    'originalDishAndStepImagesVerified',
    'safetyReviewed',
    'noNearDuplicateVerified',
    'sourceContentReuseAuthorised',
  ];
  const accepted = [];
  const approvedImages = {};
  for (const recipe of proposed) {
    if (!recipe || typeof recipe.id !== 'string') continue;
    const review = byReview.get(recipe.id);
    const cache = photos[recipe.id];
    const exactSupplier =
      (recipe.source === 'Gousto UK' &&
        recipe.id === 'gousto-' + recipe.sourceId &&
        /^https:\/\/www\.gousto\.co\.uk\//.test(String(recipe.sourceUrl)) &&
        /^https:\/\/production-media\.gousto\.co\.uk\//.test(String(recipe.sourceImageUrl))) ||
      (recipe.source === 'HelloFresh UK' &&
        recipe.id === 'hf-' + recipe.sourceId &&
        /^https:\/\/www\.hellofresh\.co\.uk\/recipes\//.test(String(recipe.sourceUrl)) &&
        /^https:\/\/(?:img\.hellofresh\.com|d3hvwccx09j84u\.cloudfront\.net)\//.test(
          String(recipe.sourceImageUrl),
        ));
    // A pinned, public-domain-style cookbook can be an independent source,
    // but the repository licence does not establish ownership of contributed
    // photographs. Keep both text and every image explicitly reviewed.
    const openText = String(recipe.sourceUrl || '').match(
      /^https:\/\/github\.com\/Anduin2017\/HowToCook\/blob\/([a-f0-9]{40})\/dishes\/.+\.md$/,
    );
    const openPhoto = String(recipe.sourceImageUrl || '').match(
      /^https:\/\/raw\.githubusercontent\.com\/Anduin2017\/HowToCook\/([a-f0-9]{40})\/dishes\/.+\.(?:jpe?g|png|webp)$/,
    );
    const independentOpenSource =
      recipe.source === 'HowToCook Open Cookbook' &&
      /^open-htc-[a-z0-9-]{10,90}$/.test(String(recipe.id)) &&
      recipe.id === 'open-htc-' + recipe.sourceId &&
      openText &&
      openPhoto &&
      openText[1] === openPhoto[1];
    const independentOpenRights =
      independentOpenSource &&
      review?.openContentLicence === 'Unlicense' &&
      review?.openImageLicence === 'Unlicense' &&
      review?.originalImageContributorVerified === true &&
      review?.originalImageRightsIndependentlyConfirmed === true &&
      review?.stepImageRightsIndependentlyConfirmed === true &&
      review?.sourceHeadSHA === openText[1] &&
      review?.sourceLicenceURL ===
        'https://github.com/Anduin2017/HowToCook/blob/' + openText[1] + '/LICENSE' &&
      review?.originalImageURL === recipe.sourceImageUrl &&
      review?.originalImageAuthor &&
      typeof review.originalImageAuthor === 'string' &&
      review.originalImageAuthor.trim().length >= 3;
    // MyWeek owns its newly authored recipe text and original illustrations.
    // These are not third-party photographs or unlicensed supplier copies.
    const ownedSource = String(recipe.sourceUrl || '').match(
      /^https:\/\/github\.com\/LeighArmstrong\/myweek-app\/blob\/([a-f0-9]{40})\/docs\/recipes\/(mw-original-2026-[0-9]{3})\.md$/,
    );
    const firstPartyOriginal =
      recipe.source === 'MyWeek Kitchen Originals' &&
      /^mw-original-2026-[0-9]{3}$/.test(String(recipe.id)) &&
      recipe.id === recipe.sourceId &&
      ownedSource &&
      ownedSource[2] === recipe.id &&
      recipe.sourceImageUrl === 'assets/images/sourced-final/' + recipe.id + '.webp' &&
      review?.firstPartyOriginalRecipe === true &&
      review?.firstPartyOriginalMedia === true &&
      review?.originalMediaOwnershipVerified === true &&
      review?.firstPartyMediaType === 'illustration' &&
      review?.firstPartySourceCommit === ownedSource[1] &&
      /^[a-f0-9]{64}$/.test(String(review?.sourceTextSha256 || ''));
    const imageFile = 'assets/images/sourced-final/' + recipe.id + '.webp';
    const imageValid =
      cache &&
      cache.role === 'declared-final' &&
      cache.source === recipe.sourceImageUrl &&
      cache.src === imageFile &&
      /^[a-f0-9]{64}$/.test(String(cache.sha256 || '')) &&
      Number.isFinite(cache.bytes) &&
      cache.bytes >= 3500 &&
      Number(cache.width) >= 350 &&
      Number(cache.height) >= 250 &&
      !imageDigests.has(cache.sha256);
    const sourceIngredients = recipe.sourceIngredients;
    const physicalRows = recipe.ingredientMeta;
    const exactRows =
      Array.isArray(sourceIngredients) &&
      sourceIngredients.length >= 5 &&
      Array.isArray(physicalRows) &&
      physicalRows.length === sourceIngredients.length &&
      physicalRows.every(
        (item, i) =>
          item &&
          (((independentOpenSource || firstPartyOriginal) &&
            typeof item.originalSourceLineSHA256 === 'string' &&
            /^[a-f0-9]{64}$/.test(item.originalSourceLineSHA256) &&
            Number.isInteger(item.originalSourceLineNumber) &&
            item.originalSourceLineNumber > 0) ||
            (!independentOpenSource &&
              !firstPartyOriginal &&
              typeof item.originalSourceSku === 'string' &&
              item.originalSourceSku.length > 10 &&
              item.originalTwoPersonPackLabel)) &&
          String(item.amount) === String(sourceIngredients[i][0]) &&
          String(item.name) === String(sourceIngredients[i][1]),
      );
    const passed =
      review &&
      review.id === recipe.id &&
      review.status === 'verified' &&
      required.every((field) => review[field] === true) &&
      typeof review.contentRightsEvidence === 'string' &&
      review.contentRightsEvidence.trim().length >= 12 &&
      typeof review.photoRightsEvidence === 'string' &&
      review.photoRightsEvidence.trim().length >= 12 &&
      review.imageCacheSha256 === cache?.sha256 &&
      review.sourceUrl === recipe.sourceUrl &&
      review.sourceUid === recipe.sourceId &&
      (exactSupplier || independentOpenRights || firstPartyOriginal) &&
      (firstPartyOriginal || review.supplierPhotoRedistributionAuthorised === true) &&
      imageValid &&
      exactRows &&
      recipe.sourcedCatalogue === true &&
      !usedIDs.has(recipe.id) &&
      !usedUIDs.has(String(recipe.source) + '|' + String(recipe.sourceId)) &&
      !pages.has(recipe.sourceUrl) &&
      !images.has(recipe.sourceImageUrl) &&
      !titles.has(
        String(recipe.title || '')
          .trim()
          .toLowerCase(),
      ) &&
      Array.isArray(recipe.ingredients) &&
      recipe.ingredients.length >= 4 &&
      Array.isArray(recipe.shoppingIngredients) &&
      JSON.stringify(recipe.ingredients) === JSON.stringify(recipe.shoppingIngredients) &&
      Array.isArray(recipe.steps) &&
      recipe.steps.length >= 4 &&
      recipe.steps.every((step) => typeof step === 'string' && step.trim().length >= 20) &&
      Array.isArray(recipe.sourceStepImages) &&
      recipe.sourceStepImages.length === recipe.steps.length &&
      recipe.sourceStepImages.every(
        (step, i) =>
          step &&
          (firstPartyOriginal
            ? step.src === 'assets/images/myweek-original-steps/' + recipe.id + '-step-' + (i + 1) + '.webp'
            : /^https:\/\//.test(String(step.src))),
      ) &&
      Array.isArray(recipe.sourceEquipment) &&
      recipe.sourceEquipment.length > 0;
    if (!passed) continue;
    accepted.push(recipe);
    approvedImages[recipe.id] = cache;
    usedIDs.add(recipe.id);
    usedUIDs.add(String(recipe.source) + '|' + String(recipe.sourceId));
    titles.add(
      String(recipe.title || '')
        .trim()
        .toLowerCase(),
    );
    pages.add(recipe.sourceUrl);
    images.add(recipe.sourceImageUrl);
    imageDigests.add(cache.sha256);
  }
  MW.VERIFIED_REPLACEMENT_REJECTED = {
    accepted: accepted.length,
    rejected: proposed.length - accepted.length,
    rejectedUnreviewedOrUncachedSourceData: true,
  };
  if (accepted.length) {
    MW.sourcedFinalCache = Object.assign({}, originalPhotos, approvedImages);
    MW.RECIPES = original.concat(accepted);
  }
})();
