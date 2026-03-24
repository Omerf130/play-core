export interface TranslationKeys {
  nav: {
    home: string;
    products: string;
    contact: string;
  };

  footer: {
    tagline: string;
    shop: string;
    support: string;
    contactUs: string;
    faq: string;
    shipping: string;
    returns: string;
    copyright: string;
  };

  home: {
    heroBadge: string;
    heroTitle1: string;
    heroTitle2: string;
    heroSubtitle: string;
    shopNow: string;
    browseKeyboards: string;
    featuredProducts: string;
    viewAll: string;
    whyShopWithUs: string;
    freeShipping: string;
    freeShippingDesc: string;
    easyReturns: string;
    easyReturnsDesc: string;
    support247: string;
    support247Desc: string;
    viewAllFAQs: string;
    bottomHeroTitle: string;
    bottomHeroSubtitle: string;
    bottomHeroBtn: string;
  };

  products: {
    allProducts: string;
    productCount: (count: number) => string;
    searchPlaceholder: string;
    search: string;
    all: string;
    noProductsFound: string;
  };

  productDetail: {
    backToProducts: string;
    addToCart: string;
    addedToCart: (name: string) => string;
  };

  cart: {
    title: string;
    emptyTitle: string;
    emptySubtitle: string;
    browseProducts: string;
    clearCart: string;
    orderSummary: string;
    items: string;
    shipping: string;
    free: string;
    total: string;
    proceedToCheckout: string;
    continueShopping: string;
    each: string;
    removedFromCart: (name: string) => string;
  };

  contact: {
    title: string;
    subtitle: string;
    sendMessage: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    sendBtn: string;
    emailTitle: string;
    phoneTitle: string;
    hoursTitle: string;
    hours1: string;
    hours2: string;
    fillAllFields: string;
    messageSent: string;
  };

  faq: {
    title: string;
    subtitle: string;
    stillHaveQuestions: string;
    contactUs: string;
    items: { q: string; a: string }[];
  };

  admin: {
    dashboard: string;
    products: string;
    orders: string;
    content: string;
    backToStore: string;
    logout: string;
    statProducts: string;
    statOrders: string;
    statRevenue: string;
    recentOrders: string;
    noOrdersYet: string;
    orderIdCol: string;
    customerCol: string;
    itemsCol: string;
    totalCol: string;
    statusCol: string;
    dateCol: string;
  };

  adminProducts: {
    title: string;
    addProduct: string;
    loadingProducts: string;
    noProductsYet: string;
    createFirst: string;
    imageCol: string;
    nameCol: string;
    categoryCol: string;
    priceCol: string;
    featuredCol: string;
    actionsCol: string;
    removeFromFeatured: string;
    addToFeatured: string;
    removedFromFeatured: string;
    addedToFeatured: string;
    editProduct: string;
    addProductTitle: string;
    deleteProduct: string;
    deleteConfirm: string;
    deleteWarn: string;
    failedToToggle: string;
  };

  adminOrders: {
    title: string;
    orderCount: (count: number) => string;
    loadingOrders: string;
    noOrdersYet: string;
    orderIdCol: string;
    customerCol: string;
    emailCol: string;
    itemsCol: string;
    totalCol: string;
    statusCol: string;
    dateCol: string;
    orderPrefix: string;
    customerLabel: string;
    emailLabel: string;
    statusLabel: string;
    dateLabel: string;
    paypalIdLabel: string;
    itemsLabel: string;
  };

  adminContent: {
    title: string;
    heroLabel: string;
    heroDesc: string;
    heroPreview: string;
    heroPlaceholder: string;
    bottomHeroLabel: string;
    bottomHeroDesc: string;
    bottomHeroPreview: string;
    bottomHeroPlaceholder: string;
    noImageSet: string;
    changeImage: string;
    uploadImage: string;
    removeImage: string;
    saved: string;
    removed: string;
    selectImageFile: string;
    imageUnder5MB: string;
    noImageSelected: string;
  };

  adminLogin: {
    admin: string;
    subtitle: string;
    password: string;
    passwordPlaceholder: string;
    signIn: string;
    loginFailed: string;
    networkError: string;
  };

  productForm: {
    productName: string;
    productNamePlaceholder: string;
    description: string;
    descriptionPlaceholder: string;
    price: string;
    pricePlaceholder: string;
    category: string;
    image: string;
    imageHint: string;
    imageTooLarge: string;
    fillRequired: string;
    invalidPrice: string;
    updateProduct: string;
    createProduct: string;
    failedToSave: string;
    somethingWrong: string;
  };

  common: {
    loading: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    error: string;
    categories: Record<string, string>;
  };
}
