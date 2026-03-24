import type { TranslationKeys } from "../types";

const he: TranslationKeys = {
  nav: {
    home: "דף הבית",
    products: "מוצרים",
    contact: "צור קשר",
  },

  footer: {
    tagline: "ציוד גיימינג פרימיום לשחקנים תחרותיים.",
    shop: "חנות",
    support: "תמיכה",
    contactUs: "צור קשר",
    faq: "שאלות נפוצות",
    shipping: "משלוחים",
    returns: "החזרות",
    copyright: "PlayCore. כל הזכויות שמורות.",
  },

  home: {
    heroBadge: "חדש במלאי",
    heroTitle1: "שדרגו את",
    heroTitle2: "עמדת הגיימינג",
    heroSubtitle:
      "מקלדות, עכברים, אוזניות ובקרים פרימיום שנבנו עבור שחקנים תחרותיים שדורשים את הטוב ביותר.",
    shopNow: "קנו עכשיו",
    browseKeyboards: "עיינו במקלדות",
    featuredProducts: "מוצרים מומלצים",
    viewAll: "הצג הכל",
    whyShopWithUs: "למה לקנות אצלנו",
    freeShipping: "משלוח חינם",
    freeShippingDesc:
      "משלוח חינם בכל הזמנה מעל $50, ישירות עד הדלת.",
    easyReturns: "החזרות קלות",
    easyReturnsDesc:
      "לא מרוצים? החזירו פריטים תוך 30 יום, בלי בעיה.",
    support247: "תמיכה 24/7",
    support247Desc:
      "מומחי הגיימינג שלנו זמינים מסביב לשעון כדי לעזור לכם.",
    viewAllFAQs: "לכל השאלות הנפוצות",
    bottomHeroTitle: "יש שאלות?",
    bottomHeroSubtitle:
      "אנחנו כאן לעזור לכם למצוא את הציוד המושלם לעמדה שלכם.",
    bottomHeroBtn: "צור קשר",
  },

  products: {
    allProducts: "כל המוצרים",
    productCount: (count: number) =>
      `${count} מוצר${count !== 1 ? "ים" : ""}`,
    searchPlaceholder: "חיפוש מוצרים...",
    search: "חיפוש",
    all: "הכל",
    noProductsFound: "לא נמצאו מוצרים",
  },

  productDetail: {
    backToProducts: "חזרה למוצרים",
    addToCart: "הוסף לסל",
    addedToCart: (name: string) => `${name} נוסף לסל`,
  },

  cart: {
    title: "סל קניות",
    emptyTitle: "הסל שלך ריק",
    emptySubtitle: "נראה שעדיין לא הוספת פריטים.",
    browseProducts: "עיינו במוצרים",
    clearCart: "נקה סל",
    orderSummary: "סיכום הזמנה",
    items: "פריטים",
    shipping: "משלוח",
    free: "חינם",
    total: "סה״כ",
    proceedToCheckout: "המשך לתשלום",
    continueShopping: "המשך לקנות",
    each: "ליחידה",
    removedFromCart: (name: string) => `${name} הוסר מהסל`,
  },

  contact: {
    title: "צור קשר",
    subtitle: "יש שאלה או צריכים עזרה? נשמח לשמוע מכם.",
    sendMessage: "שלחו הודעה",
    name: "שם",
    namePlaceholder: "השם שלך",
    email: "אימייל",
    emailPlaceholder: "you@example.com",
    message: "הודעה",
    messagePlaceholder: "איך נוכל לעזור?",
    sendBtn: "שלח הודעה",
    emailTitle: "אימייל",
    phoneTitle: "טלפון",
    hoursTitle: "שעות פעילות",
    hours1: "ראשון - חמישי: 9:00 - 18:00",
    hours2: "שישי: 9:00 - 14:00",
    fillAllFields: "אנא מלאו את כל השדות",
    messageSent: "ההודעה נשלחה! נחזור אליכם בהקדם.",
  },

  faq: {
    title: "שאלות נפוצות",
    subtitle: "מצאו תשובות לשאלות נפוצות על הזמנות, משלוחים ועוד.",
    stillHaveQuestions: "עדיין יש שאלות?",
    contactUs: "צרו קשר",
    items: [
      {
        q: "כמה זמן לוקח המשלוח?",
        a: "משלוח רגיל לוקח 3-5 ימי עסקים בארה״ב. משלוח מהיר (1-2 ימי עסקים) זמין בתשלום. הזמנות בינלאומיות מגיעות בדרך כלל תוך 7-14 ימי עסקים בהתאם ליעד.",
      },
      {
        q: "האם יש משלוח חינם?",
        a: "כן! אנו מציעים משלוח חינם בכל הזמנה מעל $50. הזמנות מתחת ל-$50 כוללות דמי משלוח קבועים של $4.99.",
      },
      {
        q: "מהי מדיניות ההחזרות?",
        a: "אנו מקבלים החזרות תוך 30 יום מההגעה. הפריטים חייבים להיות באריזה המקורית ובמצב שלא נעשה בהם שימוש. פשוט פנו לצוות התמיכה שלנו כדי להתחיל החזרה ונספק תווית משלוח.",
      },
      {
        q: "אילו אמצעי תשלום אתם מקבלים?",
        a: "אנו מקבלים את כל כרטיסי האשראי הגדולים (ויזה, מאסטרקארד, אמריקן אקספרס), PayPal ו-Apple Pay. כל העסקאות מעובדות ומוצפנות באופן מאובטח.",
      },
      {
        q: "האם המוצרים מגיעים עם אחריות?",
        a: "כל המוצרים הנמכרים ב-PlayCore מגיעים עם אחריות היצרן. רוב ציוד הגיימינג ההיקפי כולל אחריות של 1-2 שנים. בדקו את תיאור המוצר לפרטי אחריות ספציפיים.",
      },
      {
        q: "האם אפשר לעקוב אחרי ההזמנה?",
        a: "בוודאי! לאחר שההזמנה נשלחת, תקבלו אימייל אישור עם מספר מעקב. ניתן להשתמש במספר זה כדי לעקוב אחרי החבילה באתר חברת השליחויות.",
      },
      {
        q: "האם אתם שולחים לחו״ל?",
        a: "כן, אנו שולחים לרוב המדינות בעולם. תעריפי המשלוח וזמני ההגעה הבינלאומיים משתנים לפי מיקום. כל מכסים או מיסי יבוא הם באחריות הקונה.",
      },
      {
        q: "איך אפשר ליצור קשר עם שירות הלקוחות?",
        a: "ניתן לפנות לצוות התמיכה שלנו באימייל support@playcore.gg או בטלפון +1 (555) 123-4567. הצוות שלנו זמין ראשון-חמישי 9:00-18:00 ובשישי 9:00-14:00.",
      },
    ],
  },

  admin: {
    dashboard: "לוח בקרה",
    products: "מוצרים",
    orders: "הזמנות",
    content: "תוכן",
    backToStore: "חזרה לחנות",
    logout: "התנתק",
    statProducts: "מוצרים",
    statOrders: "הזמנות",
    statRevenue: "הכנסות",
    recentOrders: "הזמנות אחרונות",
    noOrdersYet: "אין הזמנות עדיין.",
    orderIdCol: "מזהה הזמנה",
    customerCol: "לקוח",
    itemsCol: "פריטים",
    totalCol: "סה״כ",
    statusCol: "סטטוס",
    dateCol: "תאריך",
  },

  adminProducts: {
    title: "מוצרים",
    addProduct: "+ הוסף מוצר",
    loadingProducts: "טוען מוצרים...",
    noProductsYet: "אין מוצרים עדיין.",
    createFirst: "צרו את המוצר הראשון",
    imageCol: "תמונה",
    nameCol: "שם",
    categoryCol: "קטגוריה",
    priceCol: "מחיר",
    featuredCol: "מומלץ",
    actionsCol: "פעולות",
    removeFromFeatured: "הסר ממומלצים",
    addToFeatured: "הוסף למומלצים",
    removedFromFeatured: "הוסר ממומלצים",
    addedToFeatured: "נוסף למומלצים",
    editProduct: "ערוך מוצר",
    addProductTitle: "הוסף מוצר",
    deleteProduct: "מחק מוצר",
    deleteConfirm: "האם אתם בטוחים שברצונכם למחוק את",
    deleteWarn: "פעולה זו לא ניתנת לביטול.",
    failedToToggle: "נכשל בשינוי סטטוס מומלץ",
  },

  adminOrders: {
    title: "הזמנות",
    orderCount: (count: number) =>
      `${count} הזמנ${count !== 1 ? "ות" : "ה"}`,
    loadingOrders: "טוען הזמנות...",
    noOrdersYet: "אין הזמנות עדיין.",
    orderIdCol: "מזהה הזמנה",
    customerCol: "לקוח",
    emailCol: "אימייל",
    itemsCol: "פריטים",
    totalCol: "סה״כ",
    statusCol: "סטטוס",
    dateCol: "תאריך",
    orderPrefix: "הזמנה #",
    customerLabel: "לקוח",
    emailLabel: "אימייל",
    statusLabel: "סטטוס",
    dateLabel: "תאריך",
    paypalIdLabel: "PayPal ID",
    itemsLabel: "פריטים",
  },

  adminContent: {
    title: "ניהול תוכן",
    heroLabel: "תמונת גיבור",
    heroDesc:
      "תמונה זו מופיעה כרקע של אזור הגיבור בדף הבית.",
    heroPreview: "תצוגה מקדימה של רקע הגיבור",
    heroPlaceholder:
      "העלו תמונה לשימוש כרקע אזור הגיבור בדף הבית",
    bottomHeroLabel: "תמונת גיבור תחתונה",
    bottomHeroDesc:
      "תמונה זו מופיעה כרקע של אזור ה-CTA התחתון בדף הבית.",
    bottomHeroPreview: "תצוגה מקדימה של גיבור תחתון",
    bottomHeroPlaceholder:
      "העלו תמונה לאזור הגיבור התחתון",
    noImageSet: "לא הוגדרה תמונה",
    changeImage: "שנה תמונה",
    uploadImage: "העלה תמונה",
    removeImage: "הסר תמונה",
    saved: "נשמר",
    removed: "הוסר",
    selectImageFile: "אנא בחרו קובץ תמונה",
    imageUnder5MB: "התמונה חייבת להיות פחות מ-5MB",
    noImageSelected: "לא נבחרה תמונה",
  },

  adminLogin: {
    admin: "ניהול",
    subtitle: "הכניסו את סיסמת המנהל כדי להמשיך",
    password: "סיסמה",
    passwordPlaceholder: "הכניסו סיסמת מנהל",
    signIn: "כניסה",
    loginFailed: "ההתחברות נכשלה",
    networkError: "שגיאת רשת. אנא נסו שוב.",
  },

  productForm: {
    productName: "שם המוצר",
    productNamePlaceholder: "לדוגמה: מקלדת גיימינג מכנית",
    description: "תיאור",
    descriptionPlaceholder: "תיאור המוצר...",
    price: "מחיר ($)",
    pricePlaceholder: "0.00",
    category: "קטגוריה",
    image: "תמונה",
    imageHint: "מקסימום 5MB. השאירו ריק לשמירת התמונה הקיימת.",
    imageTooLarge: "התמונה חייבת להיות פחות מ-5MB",
    fillRequired: "אנא מלאו את כל השדות הנדרשים",
    invalidPrice: "אנא הכניסו מחיר תקין",
    updateProduct: "עדכן מוצר",
    createProduct: "צור מוצר",
    failedToSave: "שמירת המוצר נכשלה",
    somethingWrong: "משהו השתבש",
  },

  common: {
    loading: "טוען...",
    save: "שמור",
    cancel: "ביטול",
    delete: "מחק",
    edit: "ערוך",
    error: "אירעה שגיאה",
    categories: {
      keyboards: "מקלדות",
      mice: "עכברים",
      headsets: "אוזניות",
      controllers: "בקרים",
      computers: "מחשבים",
      chairs: "כיסאות",
      accessories: "אביזרים",
    },
  },
};

export default he;
