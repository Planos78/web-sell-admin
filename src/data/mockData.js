export const categories = [
  { id: 1, name: 'อิเล็กทรอนิกส์', slug: 'electronics', color: '#1890ff', productCount: 5 },
  { id: 2, name: 'แฟชั่น', slug: 'fashion', color: '#eb2f96', productCount: 4 },
  { id: 3, name: 'บ้านและการตกแต่ง', slug: 'home-living', color: '#52c41a', productCount: 4 },
  { id: 4, name: 'กีฬา', slug: 'sports', color: '#fa8c16', productCount: 3 },
  { id: 5, name: 'ความงาม', slug: 'beauty', color: '#722ed1', productCount: 3 },
  { id: 6, name: 'อาหารและเครื่องดื่ม', slug: 'food-drink', color: '#f5222d', productCount: 3 },
];

export const products = [
  { id: 1, name: 'หูฟังไร้สาย Bluetooth 5.3 ตัดเสียงรบกวน', price: 1290, originalPrice: 2590, category: 'electronics', categoryName: 'อิเล็กทรอนิกส์', stock: 156, rating: 4.8, reviewCount: 2456, isFeatured: true, isNew: true, status: 'active' },
  { id: 2, name: 'สมาร์ทวอทช์ GPS ติดตามสุขภาพ กันน้ำ IP68', price: 2490, originalPrice: 4990, category: 'electronics', categoryName: 'อิเล็กทรอนิกส์', stock: 89, rating: 4.6, reviewCount: 1823, isFeatured: true, isNew: false, status: 'active' },
  { id: 3, name: 'ลำโพง Bluetooth กันน้ำ เสียงเบส ดังกระหึ่ม', price: 890, originalPrice: 1590, category: 'electronics', categoryName: 'อิเล็กทรอนิกส์', stock: 234, rating: 4.5, reviewCount: 3102, isFeatured: false, isNew: true, status: 'active' },
  { id: 4, name: 'คีย์บอร์ดเมคานิคอล RGB ไร้สาย 75%', price: 1890, originalPrice: 2890, category: 'electronics', categoryName: 'อิเล็กทรอนิกส์', stock: 67, rating: 4.7, reviewCount: 987, isFeatured: true, isNew: true, status: 'active' },
  { id: 5, name: 'แท็บเล็ต 10.1 นิ้ว Android 13 RAM 8GB', price: 4590, originalPrice: 6990, category: 'electronics', categoryName: 'อิเล็กทรอนิกส์', stock: 42, rating: 4.3, reviewCount: 654, isFeatured: false, isNew: false, status: 'active' },
  { id: 6, name: 'เสื้อยืดคอกลม Premium Cotton Oversize', price: 390, originalPrice: 690, category: 'fashion', categoryName: 'แฟชั่น', stock: 890, rating: 4.4, reviewCount: 5678, isFeatured: true, isNew: false, status: 'active' },
  { id: 7, name: 'กระเป๋าสะพายข้าง หนัง PU กันน้ำ', price: 590, originalPrice: 1190, category: 'fashion', categoryName: 'แฟชั่น', stock: 345, rating: 4.2, reviewCount: 2341, isFeatured: true, isNew: true, status: 'active' },
  { id: 8, name: 'รองเท้าผ้าใบ สไตล์มินิมอล น้ำหนักเบา', price: 790, originalPrice: 1490, category: 'fashion', categoryName: 'แฟชั่น', stock: 567, rating: 4.6, reviewCount: 4521, isFeatured: false, isNew: true, status: 'active' },
  { id: 9, name: 'กางเกงขายาว ชิโน่ สลิมฟิต', price: 490, originalPrice: 890, category: 'fashion', categoryName: 'แฟชั่น', stock: 423, rating: 4.3, reviewCount: 1876, isFeatured: false, isNew: false, status: 'inactive' },
  { id: 10, name: 'โคมไฟตั้งโต๊ะ LED ปรับแสงได้ 3 ระดับ', price: 690, originalPrice: 1290, category: 'home-living', categoryName: 'บ้านและการตกแต่ง', stock: 178, rating: 4.5, reviewCount: 1234, isFeatured: true, isNew: false, status: 'active' },
  { id: 11, name: 'หมอนเมมโมรี่โฟม ดีไซน์ Ergonomic', price: 890, originalPrice: 1590, category: 'home-living', categoryName: 'บ้านและการตกแต่ง', stock: 256, rating: 4.7, reviewCount: 3456, isFeatured: true, isNew: false, status: 'active' },
  { id: 12, name: 'เครื่องฟอกอากาศ HEPA H13 พื้นที่ 40 ตร.ม.', price: 3490, originalPrice: 5990, category: 'home-living', categoryName: 'บ้านและการตกแต่ง', stock: 45, rating: 4.6, reviewCount: 876, isFeatured: false, isNew: true, status: 'active' },
  { id: 13, name: 'ผ้าม่านทึบแสง กันแดด UV 95%', price: 590, originalPrice: 990, category: 'home-living', categoryName: 'บ้านและการตกแต่ง', stock: 312, rating: 4.1, reviewCount: 2109, isFeatured: false, isNew: false, status: 'active' },
  { id: 14, name: 'ลูกฟุตบอล FIFA Approved ไซส์ 5', price: 890, originalPrice: 1490, category: 'sports', categoryName: 'กีฬา', stock: 189, rating: 4.8, reviewCount: 2345, isFeatured: true, isNew: false, status: 'active' },
  { id: 15, name: 'เสื่อโยคะ TPE หนา 6mm กันลื่น', price: 590, originalPrice: 990, category: 'sports', categoryName: 'กีฬา', stock: 234, rating: 4.4, reviewCount: 1567, isFeatured: false, isNew: true, status: 'active' },
  { id: 16, name: 'ดัมเบลปรับน้ำหนักได้ 2-20 กก.', price: 2490, originalPrice: 3990, category: 'sports', categoryName: 'กีฬา', stock: 56, rating: 4.5, reviewCount: 876, isFeatured: true, isNew: false, status: 'active' },
  { id: 17, name: 'เซรั่มวิตามินซี 20% ผิวกระจ่างใส', price: 490, originalPrice: 890, category: 'beauty', categoryName: 'ความงาม', stock: 567, rating: 4.6, reviewCount: 6789, isFeatured: true, isNew: true, status: 'active' },
  { id: 18, name: 'ครีมกันแดด SPF50+ PA++++ กันน้ำ', price: 350, originalPrice: 590, category: 'beauty', categoryName: 'ความงาม', stock: 890, rating: 4.7, reviewCount: 8901, isFeatured: false, isNew: false, status: 'active' },
  { id: 19, name: 'พาเลทแต่งหน้า 12 สี โทนอบอุ่น', price: 290, originalPrice: 490, category: 'beauty', categoryName: 'ความงาม', stock: 456, rating: 4.3, reviewCount: 3456, isFeatured: false, isNew: true, status: 'active' },
  { id: 20, name: 'กาแฟดริป Specialty Grade คั่วกลาง', price: 290, originalPrice: 450, category: 'food-drink', categoryName: 'อาหารและเครื่องดื่ม', stock: 678, rating: 4.9, reviewCount: 4567, isFeatured: true, isNew: false, status: 'active' },
  { id: 21, name: 'ชาเขียวมัทฉะ Organic เกรดพรีเมียม', price: 390, originalPrice: 690, category: 'food-drink', categoryName: 'อาหารและเครื่องดื่ม', stock: 345, rating: 4.7, reviewCount: 2345, isFeatured: false, isNew: true, status: 'active' },
  { id: 22, name: 'น้ำผึ้งป่าแท้ 100% จากเชียงใหม่', price: 250, originalPrice: 390, category: 'food-drink', categoryName: 'อาหารและเครื่องดื่ม', stock: 234, rating: 4.8, reviewCount: 1890, isFeatured: false, isNew: false, status: 'active' },
];

export const orders = [
  { id: 'ORD-1001', customer: 'สมชาย ใจดี', email: 'somchai@email.com', items: 3, totalPrice: 4670, status: 'กำลังดำเนินการ', paymentMethod: 'บัตรเครดิต', date: '2026-03-20T10:30:00', address: '123 ถ.สุขุมวิท กรุงเทพฯ 10110' },
  { id: 'ORD-1002', customer: 'สมหญิง รักไทย', email: 'somying@email.com', items: 1, totalPrice: 1290, status: 'จัดส่งแล้ว', paymentMethod: 'PromptPay', date: '2026-03-19T14:20:00', address: '456 ถ.เพชรบุรี กรุงเทพฯ 10400' },
  { id: 'ORD-1003', customer: 'วิชัย สุขสันต์', email: 'wichai@email.com', items: 5, totalPrice: 8750, status: 'สำเร็จ', paymentMethod: 'โอนเงิน', date: '2026-03-18T09:15:00', address: '789 ถ.รัชดา กรุงเทพฯ 10310' },
  { id: 'ORD-1004', customer: 'นภา แสงจันทร์', email: 'napa@email.com', items: 2, totalPrice: 3380, status: 'กำลังดำเนินการ', paymentMethod: 'บัตรเครดิต', date: '2026-03-20T16:45:00', address: '321 ถ.พระราม9 กรุงเทพฯ 10320' },
  { id: 'ORD-1005', customer: 'ธนา เศรษฐี', email: 'thana@email.com', items: 4, totalPrice: 12460, status: 'จัดส่งแล้ว', paymentMethod: 'บัตรเครดิต', date: '2026-03-17T11:00:00', address: '654 ถ.สีลม กรุงเทพฯ 10500' },
  { id: 'ORD-1006', customer: 'ปิยะ มั่นคง', email: 'piya@email.com', items: 1, totalPrice: 590, status: 'ยกเลิก', paymentMethod: 'เก็บเงินปลายทาง', date: '2026-03-16T08:30:00', address: '987 ถ.ลาดพร้าว กรุงเทพฯ 10230' },
  { id: 'ORD-1007', customer: 'กานดา ภูมิใจ', email: 'kanda@email.com', items: 3, totalPrice: 5270, status: 'สำเร็จ', paymentMethod: 'PromptPay', date: '2026-03-15T13:20:00', address: '147 ถ.งามวงศ์วาน นนทบุรี 11000' },
  { id: 'ORD-1008', customer: 'อรุณ สว่าง', email: 'arun@email.com', items: 2, totalPrice: 1780, status: 'สำเร็จ', paymentMethod: 'โอนเงิน', date: '2026-03-14T10:10:00', address: '258 ถ.แจ้งวัฒนะ กรุงเทพฯ 10210' },
  { id: 'ORD-1009', customer: 'มานี ทองคำ', email: 'manee@email.com', items: 6, totalPrice: 15890, status: 'จัดส่งแล้ว', paymentMethod: 'บัตรเครดิต', date: '2026-03-13T15:30:00', address: '369 ถ.บางนา สมุทรปราการ 10270' },
  { id: 'ORD-1010', customer: 'ชูใจ ดีงาม', email: 'chujai@email.com', items: 1, totalPrice: 890, status: 'สำเร็จ', paymentMethod: 'PromptPay', date: '2026-03-12T09:45:00', address: '741 ถ.พหลโยธิน กรุงเทพฯ 10400' },
];

export const users = [
  { id: '1', firstName: 'สมชาย', lastName: 'ใจดี', email: 'somchai@email.com', phone: '081-234-5678', orders: 5, totalSpent: 15670, createdAt: '2026-01-15', status: 'active' },
  { id: '2', firstName: 'สมหญิง', lastName: 'รักไทย', email: 'somying@email.com', phone: '082-345-6789', orders: 3, totalSpent: 8450, createdAt: '2026-01-20', status: 'active' },
  { id: '3', firstName: 'วิชัย', lastName: 'สุขสันต์', email: 'wichai@email.com', phone: '083-456-7890', orders: 8, totalSpent: 32100, createdAt: '2026-02-01', status: 'active' },
  { id: '4', firstName: 'นภา', lastName: 'แสงจันทร์', email: 'napa@email.com', phone: '084-567-8901', orders: 2, totalSpent: 5680, createdAt: '2026-02-10', status: 'active' },
  { id: '5', firstName: 'ธนา', lastName: 'เศรษฐี', email: 'thana@email.com', phone: '085-678-9012', orders: 12, totalSpent: 89500, createdAt: '2026-02-15', status: 'active' },
  { id: '6', firstName: 'ปิยะ', lastName: 'มั่นคง', email: 'piya@email.com', phone: '086-789-0123', orders: 1, totalSpent: 590, createdAt: '2026-03-01', status: 'inactive' },
  { id: '7', firstName: 'กานดา', lastName: 'ภูมิใจ', email: 'kanda@email.com', phone: '087-890-1234', orders: 4, totalSpent: 12340, createdAt: '2026-03-05', status: 'active' },
  { id: '8', firstName: 'อรุณ', lastName: 'สว่าง', email: 'arun@email.com', phone: '088-901-2345', orders: 2, totalSpent: 3560, createdAt: '2026-03-10', status: 'active' },
];

// ========== FB Ads Mock Data ==========

export const fbAdsCampaigns = [
  { id: 'C-001', name: 'โปรโมทสินค้าใหม่ มีนาคม', objective: 'CONVERSIONS', status: 'active', budget: 15000, spent: 8450, reach: 125000, impressions: 287000, clicks: 4820, conversions: 186, ctr: 1.68, cpc: 1.75, cpm: 29.44, roas: 3.42, startDate: '2026-03-01', endDate: '2026-03-31' },
  { id: 'C-002', name: 'แคมเปญ Brand Awareness Q1', objective: 'BRAND_AWARENESS', status: 'active', budget: 25000, spent: 18200, reach: 456000, impressions: 890000, clicks: 12300, conversions: 0, ctr: 1.38, cpc: 1.48, cpm: 20.45, roas: 0, startDate: '2026-01-01', endDate: '2026-03-31' },
  { id: 'C-003', name: 'รีทาร์เก็ตลูกค้าเก่า', objective: 'CONVERSIONS', status: 'active', budget: 8000, spent: 5670, reach: 34000, impressions: 98000, clicks: 2890, conversions: 245, ctr: 2.95, cpc: 1.96, cpm: 57.86, roas: 5.18, startDate: '2026-03-10', endDate: '2026-03-31' },
  { id: 'C-004', name: 'Flash Sale สิ้นเดือน', objective: 'CONVERSIONS', status: 'paused', budget: 10000, spent: 3200, reach: 67000, impressions: 145000, clicks: 3450, conversions: 98, ctr: 2.38, cpc: 0.93, cpm: 22.07, roas: 4.15, startDate: '2026-03-25', endDate: '2026-03-28' },
  { id: 'C-005', name: 'เพิ่มยอดไลค์เพจ', objective: 'PAGE_LIKES', status: 'completed', budget: 5000, spent: 5000, reach: 189000, impressions: 320000, clicks: 8900, conversions: 0, ctr: 2.78, cpc: 0.56, cpm: 15.63, roas: 0, startDate: '2026-02-01', endDate: '2026-02-28' },
  { id: 'C-006', name: 'วิดีโอรีวิวสินค้า', objective: 'VIDEO_VIEWS', status: 'active', budget: 12000, spent: 7800, reach: 234000, impressions: 567000, clicks: 6780, conversions: 0, ctr: 1.20, cpc: 1.15, cpm: 13.76, roas: 0, startDate: '2026-03-05', endDate: '2026-03-31' },
  { id: 'C-007', name: 'โปรโมทหน้าร้านออนไลน์', objective: 'TRAFFIC', status: 'draft', budget: 20000, spent: 0, reach: 0, impressions: 0, clicks: 0, conversions: 0, ctr: 0, cpc: 0, cpm: 0, roas: 0, startDate: '2026-04-01', endDate: '2026-04-30' },
];

export const fbAdsAdSets = [
  { id: 'AS-001', campaignId: 'C-001', campaignName: 'โปรโมทสินค้าใหม่ มีนาคม', name: 'กลุ่มเป้าหมาย ผู้หญิง 25-34', status: 'active', budget: 8000, spent: 4500, audience: 'ผู้หญิง 25-34 ปี กรุงเทพ', reach: 78000, impressions: 165000, clicks: 2890, placements: 'Feed, Stories, Reels' },
  { id: 'AS-002', campaignId: 'C-001', campaignName: 'โปรโมทสินค้าใหม่ มีนาคม', name: 'กลุ่มเป้าหมาย ผู้ชาย 25-44', status: 'active', budget: 7000, spent: 3950, audience: 'ผู้ชาย 25-44 ปี ทั่วประเทศ', reach: 47000, impressions: 122000, clicks: 1930, placements: 'Feed, Marketplace' },
  { id: 'AS-003', campaignId: 'C-003', campaignName: 'รีทาร์เก็ตลูกค้าเก่า', name: 'Custom Audience - ซื้อภายใน 30 วัน', status: 'active', budget: 5000, spent: 3500, audience: 'ลูกค้าที่ซื้อใน 30 วันที่แล้ว', reach: 18000, impressions: 52000, clicks: 1780, placements: 'Feed, Stories' },
  { id: 'AS-004', campaignId: 'C-003', campaignName: 'รีทาร์เก็ตลูกค้าเก่า', name: 'Lookalike - คล้ายลูกค้าดี', status: 'active', budget: 3000, spent: 2170, audience: 'Lookalike 1% จากลูกค้า VIP', reach: 16000, impressions: 46000, clicks: 1110, placements: 'Feed, Reels' },
  { id: 'AS-005', campaignId: 'C-004', campaignName: 'Flash Sale สิ้นเดือน', name: 'Broad Audience 18-65', status: 'paused', budget: 10000, spent: 3200, audience: 'ทุกเพศ 18-65 ปี กรุงเทพและปริมณฑล', reach: 67000, impressions: 145000, clicks: 3450, placements: 'Feed, Stories, Reels, Marketplace' },
  { id: 'AS-006', campaignId: 'C-006', campaignName: 'วิดีโอรีวิวสินค้า', name: 'คนชอบดูวิดีโอ สนใจช้อปปิ้ง', status: 'active', budget: 12000, spent: 7800, audience: 'สนใจ Shopping, ดูวิดีโอบ่อย 18-45 ปี', reach: 234000, impressions: 567000, clicks: 6780, placements: 'Reels, In-stream Video' },
];

export const fbAdsAds = [
  { id: 'AD-001', adSetId: 'AS-001', campaignName: 'โปรโมทสินค้าใหม่ มีนาคม', adSetName: 'กลุ่มเป้าหมาย ผู้หญิง 25-34', name: 'หูฟังไร้สาย - ลด 50%', type: 'image', status: 'active', headline: 'หูฟังไร้สาย Bluetooth 5.3 ลดเหลือ ฿1,290', description: 'ตัดเสียงรบกวน เบสหนัก แบตอึด 30 ชม.', cta: 'ซื้อเลย', reach: 45000, impressions: 98000, clicks: 1720, ctr: 1.76, spent: 2800 },
  { id: 'AD-002', adSetId: 'AS-001', campaignName: 'โปรโมทสินค้าใหม่ มีนาคม', adSetName: 'กลุ่มเป้าหมาย ผู้หญิง 25-34', name: 'เซรั่มวิตามินซี - ผิวกระจ่างใส', type: 'carousel', status: 'active', headline: 'เซรั่มวิตามินซี 20% ลดเหลือ ฿490', description: 'ผิวกระจ่างใส ลดรอยสิว เห็นผลใน 7 วัน', cta: 'ซื้อเลย', reach: 33000, impressions: 67000, clicks: 1170, ctr: 1.75, spent: 1700 },
  { id: 'AD-003', adSetId: 'AS-002', campaignName: 'โปรโมทสินค้าใหม่ มีนาคม', adSetName: 'กลุ่มเป้าหมาย ผู้ชาย 25-44', name: 'คีย์บอร์ดเมคานิคอล RGB', type: 'image', status: 'active', headline: 'คีย์บอร์ดเมคานิคอล ไร้สาย ลด 35%', description: 'RGB สวยงาม สวิตช์ Hot-swappable', cta: 'ดูเพิ่มเติม', reach: 28000, impressions: 72000, clicks: 1200, ctr: 1.67, spent: 2300 },
  { id: 'AD-004', adSetId: 'AS-003', campaignName: 'รีทาร์เก็ตลูกค้าเก่า', adSetName: 'Custom Audience - ซื้อภายใน 30 วัน', name: 'กลับมาช้อปอีกครั้ง ลด 20%', type: 'image', status: 'active', headline: 'คุณลืมอะไรไว้ไหม? รับส่วนลดพิเศษ 20%', description: 'ใช้โค้ด COMEBACK20 ลดทันที ทุกรายการ', cta: 'ซื้อเลย', reach: 12000, impressions: 35000, clicks: 1280, ctr: 3.66, spent: 2400 },
  { id: 'AD-005', adSetId: 'AS-004', campaignName: 'รีทาร์เก็ตลูกค้าเก่า', adSetName: 'Lookalike - คล้ายลูกค้าดี', name: 'สินค้าขายดี ราคาพิเศษ', type: 'carousel', status: 'active', headline: 'สินค้าขายดีประจำเดือน มีนาคม', description: 'รวมสินค้าที่คนซื้อเยอะที่สุด ลดสูงสุด 50%', cta: 'ซื้อเลย', reach: 10000, impressions: 28000, clicks: 670, ctr: 2.39, spent: 1300 },
  { id: 'AD-006', adSetId: 'AS-005', campaignName: 'Flash Sale สิ้นเดือน', adSetName: 'Broad Audience 18-65', name: 'Flash Sale 24 ชม. ลดทั้งร้าน', type: 'video', status: 'paused', headline: '⚡ Flash Sale ลดสูงสุด 70% เหลือ 24 ชม.!', description: 'อย่าพลาด! สินค้าหมดเมื่อไหร่ หยุดเมื่อนั้น', cta: 'ซื้อเลย', reach: 67000, impressions: 145000, clicks: 3450, ctr: 2.38, spent: 3200 },
  { id: 'AD-007', adSetId: 'AS-006', campaignName: 'วิดีโอรีวิวสินค้า', adSetName: 'คนชอบดูวิดีโอ สนใจช้อปปิ้ง', name: 'รีวิวสมาร์ทวอทช์ GPS', type: 'video', status: 'active', headline: 'รีวิวจริง สมาร์ทวอทช์ GPS ฟีเจอร์เพียบ', description: 'ติดตามสุขภาพ วัดชีพจร GPS ในตัว กันน้ำ IP68', cta: 'ดูเพิ่มเติม', reach: 134000, impressions: 320000, clicks: 3800, ctr: 1.19, spent: 4200 },
  { id: 'AD-008', adSetId: 'AS-006', campaignName: 'วิดีโอรีวิวสินค้า', adSetName: 'คนชอบดูวิดีโอ สนใจช้อปปิ้ง', name: 'รีวิวลำโพง Bluetooth กันน้ำ', type: 'video', status: 'active', headline: 'ลำโพงกันน้ำ เสียงดีราคาเบา ฿890', description: 'ลำโพง Bluetooth กันน้ำ เบสหนัก พกพาง่าย', cta: 'ดูเพิ่มเติม', reach: 100000, impressions: 247000, clicks: 2980, ctr: 1.21, spent: 3600 },
];

export const fbAdsDailyStats = [
  { date: '15 มี.ค.', spent: 2100, reach: 34000, clicks: 890, conversions: 32 },
  { date: '16 มี.ค.', spent: 1800, reach: 28000, clicks: 720, conversions: 25 },
  { date: '17 มี.ค.', spent: 2400, reach: 41000, clicks: 1050, conversions: 41 },
  { date: '18 มี.ค.', spent: 2800, reach: 48000, clicks: 1230, conversions: 48 },
  { date: '19 มี.ค.', spent: 2200, reach: 36000, clicks: 920, conversions: 35 },
  { date: '20 มี.ค.', spent: 3100, reach: 52000, clicks: 1380, conversions: 55 },
  { date: '21 มี.ค.', spent: 2600, reach: 43000, clicks: 1100, conversions: 42 },
];

export const formatPrice = (price) => `฿${price.toLocaleString()}`;

export const dailySales = [
  { date: '15 มี.ค.', revenue: 12500, orders: 8 },
  { date: '16 มี.ค.', revenue: 8900, orders: 5 },
  { date: '17 มี.ค.', revenue: 15600, orders: 12 },
  { date: '18 มี.ค.', revenue: 22300, orders: 15 },
  { date: '19 มี.ค.', revenue: 18700, orders: 11 },
  { date: '20 มี.ค.', revenue: 25400, orders: 18 },
  { date: '21 มี.ค.', revenue: 19800, orders: 14 },
];
