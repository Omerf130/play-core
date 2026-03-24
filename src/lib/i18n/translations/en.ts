import type { TranslationKeys } from "../types";

const en: TranslationKeys = {
  nav: {
    home: "Home",
    products: "Products",
    contact: "Contact",
  },

  footer: {
    tagline: "Premium gaming gear for competitive players.",
    shop: "Shop",
    support: "Support",
    contactUs: "Contact Us",
    faq: "FAQ",
    shipping: "Shipping",
    returns: "Returns",
    copyright: "PlayCore. All rights reserved.",
  },

  home: {
    heroBadge: "New Arrivals",
    heroTitle1: "Level Up Your",
    heroTitle2: "Gaming Setup",
    heroSubtitle:
      "Premium keyboards, mice, headsets and controllers built for competitive players who demand the best.",
    shopNow: "Shop Now",
    browseKeyboards: "Browse Keyboards",
    featuredProducts: "Featured Products",
    viewAll: "View All",
    whyShopWithUs: "Why Shop With Us",
    freeShipping: "Free Shipping",
    freeShippingDesc:
      "Enjoy free delivery on all orders over $50, straight to your door.",
    easyReturns: "Easy Returns",
    easyReturnsDesc:
      "Not satisfied? Return eligible items within 30 days, hassle-free.",
    support247: "24/7 Support",
    support247Desc:
      "Our gaming experts are available around the clock to help you out.",
    viewAllFAQs: "View All FAQs",
    bottomHeroTitle: "Got Questions?",
    bottomHeroSubtitle:
      "We're here to help you find the perfect gear for your setup.",
    bottomHeroBtn: "Contact Us",
  },

  products: {
    allProducts: "All Products",
    productCount: (count: number) =>
      `${count} product${count !== 1 ? "s" : ""}`,
    searchPlaceholder: "Search products...",
    search: "Search",
    all: "All",
    noProductsFound: "No products found",
  },

  productDetail: {
    backToProducts: "Back to Products",
    addToCart: "Add to Cart",
    addedToCart: (name: string) => `${name} added to cart`,
  },

  cart: {
    title: "Shopping Cart",
    emptyTitle: "Your cart is empty",
    emptySubtitle: "Looks like you haven't added any items yet.",
    browseProducts: "Browse Products",
    clearCart: "Clear Cart",
    orderSummary: "Order Summary",
    items: "Items",
    shipping: "Shipping",
    free: "Free",
    total: "Total",
    proceedToCheckout: "Proceed to Checkout",
    continueShopping: "Continue Shopping",
    each: "each",
    removedFromCart: (name: string) => `${name} removed from cart`,
  },

  contact: {
    title: "Contact Us",
    subtitle: "Have a question or need help? We'd love to hear from you.",
    sendMessage: "Send a Message",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "you@example.com",
    message: "Message",
    messagePlaceholder: "How can we help?",
    sendBtn: "Send Message",
    emailTitle: "Email",
    phoneTitle: "Phone",
    hoursTitle: "Business Hours",
    hours1: "Mon - Fri: 9AM - 6PM EST",
    hours2: "Sat - Sun: 10AM - 4PM EST",
    fillAllFields: "Please fill in all fields",
    messageSent: "Message sent! We'll get back to you soon.",
  },

  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Find answers to common questions about orders, shipping, and more.",
    stillHaveQuestions: "Still have questions?",
    contactUs: "Contact Us",
    items: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping takes 3-5 business days within the US. Expedited shipping (1-2 business days) is available at checkout. International orders typically arrive within 7-14 business days depending on the destination.",
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes! We offer free standard shipping on all orders over $50. Orders under $50 have a flat rate shipping fee of $4.99.",
      },
      {
        q: "What is your return policy?",
        a: "We accept returns within 30 days of delivery. Items must be in their original packaging and unused condition. Simply contact our support team to initiate a return and we'll provide a prepaid shipping label.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All transactions are securely processed and encrypted.",
      },
      {
        q: "Do your products come with a warranty?",
        a: "All products sold on PlayCore come with the manufacturer's warranty. Most gaming peripherals include a 1-2 year warranty. Check the product description for specific warranty details.",
      },
      {
        q: "Can I track my order?",
        a: "Absolutely! Once your order ships, you'll receive a confirmation email with a tracking number. You can use this number to track your package on the carrier's website.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Any customs duties or import taxes are the responsibility of the buyer.",
      },
      {
        q: "How do I contact customer support?",
        a: "You can reach our support team via email at support@playcore.gg or by phone at +1 (555) 123-4567. Our team is available Monday-Friday 9AM-6PM EST and weekends 10AM-4PM EST.",
      },
    ],
  },

  admin: {
    dashboard: "Dashboard",
    products: "Products",
    orders: "Orders",
    content: "Content",
    backToStore: "Back to Store",
    logout: "Logout",
    statProducts: "Products",
    statOrders: "Orders",
    statRevenue: "Revenue",
    recentOrders: "Recent Orders",
    noOrdersYet: "No orders yet.",
    orderIdCol: "Order ID",
    customerCol: "Customer",
    itemsCol: "Items",
    totalCol: "Total",
    statusCol: "Status",
    dateCol: "Date",
  },

  adminProducts: {
    title: "Products",
    addProduct: "+ Add Product",
    loadingProducts: "Loading products...",
    noProductsYet: "No products yet.",
    createFirst: "Create your first product",
    imageCol: "Image",
    nameCol: "Name",
    categoryCol: "Category",
    priceCol: "Price",
    featuredCol: "Featured",
    actionsCol: "Actions",
    removeFromFeatured: "Remove from featured",
    addToFeatured: "Add to featured",
    removedFromFeatured: "Removed from featured",
    addedToFeatured: "Added to featured",
    editProduct: "Edit Product",
    addProductTitle: "Add Product",
    deleteProduct: "Delete Product",
    deleteConfirm: "Are you sure you want to delete",
    deleteWarn: "This action cannot be undone.",
    failedToToggle: "Failed to toggle promoted",
  },

  adminOrders: {
    title: "Orders",
    orderCount: (count: number) =>
      `${count} order${count !== 1 ? "s" : ""}`,
    loadingOrders: "Loading orders...",
    noOrdersYet: "No orders yet.",
    orderIdCol: "Order ID",
    customerCol: "Customer",
    emailCol: "Email",
    itemsCol: "Items",
    totalCol: "Total",
    statusCol: "Status",
    dateCol: "Date",
    orderPrefix: "Order #",
    customerLabel: "Customer",
    emailLabel: "Email",
    statusLabel: "Status",
    dateLabel: "Date",
    paypalIdLabel: "PayPal ID",
    itemsLabel: "Items",
  },

  adminContent: {
    title: "Content Management",
    heroLabel: "Hero Image",
    heroDesc:
      "This image appears as the background of the homepage hero section.",
    heroPreview: "Hero Background Preview",
    heroPlaceholder:
      "Upload an image to use as the homepage hero background",
    bottomHeroLabel: "Bottom Hero Image",
    bottomHeroDesc:
      "This image appears as the background of the bottom CTA section on the homepage.",
    bottomHeroPreview: "Bottom Hero Preview",
    bottomHeroPlaceholder:
      "Upload an image for the bottom hero section",
    noImageSet: "No image set",
    changeImage: "Change Image",
    uploadImage: "Upload Image",
    removeImage: "Remove Image",
    saved: "saved",
    removed: "removed",
    selectImageFile: "Please select an image file",
    imageUnder5MB: "Image must be under 5MB",
    noImageSelected: "No image selected",
  },

  adminLogin: {
    admin: "Admin",
    subtitle: "Enter your admin password to continue",
    password: "Password",
    passwordPlaceholder: "Enter admin password",
    signIn: "Sign In",
    loginFailed: "Login failed",
    networkError: "Network error. Please try again.",
  },

  productForm: {
    productName: "Product Name",
    productNamePlaceholder: "e.g. Mechanical Gaming Keyboard",
    description: "Description",
    descriptionPlaceholder: "Product description...",
    price: "Price ($)",
    pricePlaceholder: "0.00",
    category: "Category",
    image: "Image",
    imageHint: "Max 5MB. Leave empty to keep existing image.",
    imageTooLarge: "Image must be under 5MB",
    fillRequired: "Please fill in all required fields",
    invalidPrice: "Please enter a valid price",
    updateProduct: "Update Product",
    createProduct: "Create Product",
    failedToSave: "Failed to save product",
    somethingWrong: "Something went wrong",
  },

  common: {
    loading: "Loading...",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    error: "An error occurred",
    categories: {
      keyboards: "Keyboards",
      mice: "Mice",
      headsets: "Headsets",
      controllers: "Controllers",
      computers: "Computers",
      chairs: "Chairs",
      accessories: "Accessories",
    },
  },
};

export default en;
