import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Shield, Car, GraduationCap, Baby, Dog, Stethoscope, 
  Briefcase, Store, Smile, Sparkles, HeartHandshake, BookOpen,
  ChevronDown, ChevronUp, Globe, X, ZoomIn, CreditCard, MapPin,
  Phone, Clock, Star, Menu, ArrowUp, ShoppingCart, Check, Plus, Minus
} from 'lucide-react';

import TempleGuide from './TempleGuide.jsx';
import { languages, getTranslation, translations } from './locales.js';

// Helper to build a stable cart key per image
const buildCartKey = (section, categoryId, imageUrl) => `${section}:${categoryId}:${imageUrl}`;

// Image size options for thumbnails
const IMAGE_SIZES = ['small', 'medium', 'large'];

const blessingThumbSize = {
  small: 'w-24 sm:w-28 md:w-32',
  medium: 'w-28 sm:w-32 md:w-36',
  large: 'w-40 sm:w-44 md:w-48',
};

const summaryThumbSize = {
  small: 'w-16 h-16 sm:w-20 sm:h-20',
  medium: 'w-20 h-20 sm:w-24 sm:h-24',
  large: 'w-28 h-28 sm:w-32 sm:h-32',
};

// Approximate founding date of Longshan Temple (18th day of 5th month, Qianlong year 3 = May 18, 1738)
const FOUNDING_DATE = new Date(1738, 4, 18);

const computeFoundingDuration = () => {
  const now = new Date();
  let years = now.getFullYear() - FOUNDING_DATE.getFullYear();
  let months = now.getMonth() - FOUNDING_DATE.getMonth();
  let days = now.getDate() - FOUNDING_DATE.getDate();

  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0); // last day of previous month
    days += prevMonth.getDate();
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }
  return { years, months, days };
};

const useFoundingDuration = () => {
  const [duration, setDuration] = useState(computeFoundingDuration());

  useEffect(() => {
    const id = setInterval(() => {
      setDuration(computeFoundingDuration());
    }, 60 * 60 * 1000); // update roughly every hour
    return () => clearInterval(id);
  }, []);

  return duration;
};
const GLOBAL_1738_CONTEXTS = [
  {
    id: 'china',
    icon: Globe,
    flag: '\uD83C\uDDE8\uD83C\uDDF3',
    title: 'จีนแผ่นดินใหญ่ – ราชวงศ์ชิง (ต้นรัชกาลเฉียนหลง)',
    adYear: 1738,
    beYear: 2281,
    paragraphs: [
      'จีนกำลังเข้าสู่ "High Qing" ยุคเฟื่องฟูด้านเศรษฐกิจและศิลปวัฒนธรรม จักรพรรดิเฉียนหลงเริ่มจัดระบบการค้ากับตะวันตกผ่านพ่อค้า Cohong ที่กวางโจว เมืองท่าใหญ่ของจักรวรรดิจีน.',
      'ตอนที่วัดหลงซานถูกสร้าง ปักกิ่งคือศูนย์กลางจักรวรรดิ และจีนกำลังก้าวสู่ยุคทองของราชวงศ์ชิง.',
    ],
  },
  {
    id: 'japan',
    icon: Globe,
    flag: '\uD83C\uDDEF\uD83C\uDDF5',
    title: 'ญี่ปุ่น – ยุคเอโดะ (สมัย Genbun)',
    adYear: 1738,
    beYear: 2281,
    paragraphs: [
      'ญี่ปุ่นปกครองโดยโชกุนตระกูลโทะกุงาวะ เป็นยุคสงบยาวนาน เมืองเอโดะและเกียวโตเฟื่องฟูเรื่องศิลปะและวัฒนธรรม แต่ประเทศยังปิดตนเองภายใต้นโยบาย sakoku.',
      'ญี่ปุ่นในปี 1738 จึงเป็นยุคที่รุ่งเรืองอย่างเงียบ ๆ ต่างจากไต้หวันที่กำลังเปิดรับผู้อพยพจากฝูเจี้ยนมาสร้างวัดหลงซาน.',
    ],
  },
  {
    id: 'taiwan',
    icon: MapPin,
    flag: '\uD83C\uDDF9\uD83C\uDDFC',
    title: 'ไต้หวัน – ชุมชนชายแดนของจักรวรรดิชิง',
    adYear: 1738,
    beYear: 2281,
    paragraphs: [
      'ไต้หวันอยู่ภายใต้การปกครองของราชวงศ์ชิงในฐานะมณฑลขึ้นกับฝูเจี้ยน มีการอพยพของชาวฮั่นจากฝูเจี้ยนและกวางตุ้งอย่างต่อเนื่อง ปี 1738 กลุ่มผู้อพยพจากฝูเจี้ยนร่วมกันสร้าง "วัดหลงซานแห่งมังเจีย" ในพื้นที่ที่ปัจจุบันคือว่านหัว ไทเป.',
      'ขณะกรุงปักกิ่งคือศูนย์กลางจักรวรรดิ ไทเปยังเป็นชุมชนชายแดน และวัดหลงซานคือหัวใจทางจิตวิญญาณของคนกลุ่มนี้.',
    ],
  },
  {
    id: 'korea',
    icon: Globe,
    flag: '\uD83C\uDDF0\uD83C\uDDF7',
    title: 'เกาหลี – ราชวงศ์โชซอน (กษัตริย์ยองโจ)',
    adYear: 1738,
    beYear: 2281,
    paragraphs: [
      'เกาหลียังอยู่ในอาณาจักรโชซอนภายใต้กษัตริย์ยองโจ หนึ่งในกษัตริย์สายปฏิรูปที่สำคัญที่สุดของโชซอน มีความพยายามปรับระบบภาษี ลดความเหลื่อมล้ำ และใช้นโยบาย Tangpyeong เพื่อลดความขัดแย้งของขุนนาง.',
      'ในปีที่ไต้หวันสร้างวัดหลงซาน เกาหลียังคงยึดโครงสร้างรัฐขงจื๊อแบบเคร่งครัดเพื่อรักษาระเบียบสังคม.',
    ],
  },
  {
    id: 'siam',
    icon: MapPin,
    flag: '\uD83C\uDDF9\uD83C\uDDED',
    title: 'สยาม – กรุงศรีอยุธยา (รัชกาลบรมโกศ)',
    adYear: 1738,
    beYear: 2281,
    paragraphs: [
      'สยามอยู่ในช่วงปลายสมัยกรุงศรีอยุธยา ภายใต้พระเจ้าอยู่หัวบรมโกศ ซึ่งมักถูกมองว่าเป็นยุคเฟื่องฟูครั้งสุดท้ายก่อนเสียกรุงในปี 1767 ทั้งด้านศิลปกรรม พระราชพิธี และความมั่งคั่งของราชธานีริมเจ้าพระยา.',
      'ในขณะที่ไต้หวันสร้างวัดหลงซาน อยุธยากำลังส่องแสงครั้งสุดท้าย ก่อนเปลี่ยนผ่านสู่ยุครัตนโกสินทร์.',
    ],
  },
  {
    id: 'america',
    icon: Globe,
    flag: '\uD83C\uDDFA\uD83C\uDDF8',
    title: 'อเมริกา – อาณานิคมอังกฤษ (ก่อนก่อตั้งสหรัฐฯ)',
    adYear: 1738,
    beYear: 2281,
    paragraphs: [
      'ทวีปอเมริกาเหนือยังเป็นอาณานิคมของอังกฤษ ช่วงปี 1730s–1740s กำลังเกิดคลื่นศาสนาคริสต์ครั้งใหญ่ "First Great Awakening" ที่เปลี่ยนภูมิทัศน์ทางศาสนาและการเมืองในอังกฤษและอาณานิคม.',
      'ปี 1738 บาทหลวง George Whitefield เดินทางมาถึงจอร์เจียและเริ่มเทศน์ในอาณานิคม อีกเกือบสี่ทศวรรษกว่าชื่อ "United States" จะปรากฏในปี 1776.',
    ],
  },
];
// Helper to get localized blessing categories
const getBlessingCategories = (t) => [
  {
    id: 'education',
    icon: GraduationCap,
    titleZh: translations.zh.categories.education.title,
    titleEn: translations.en.categories.education.title,
    titleTh: translations.th.categories.education.title,
    description: t.categories.education.description,
    color: 'from-indigo-600 to-purple-500',
    images: [
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/009b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/010b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/069.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/070.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/071.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/133.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/076.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/078.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/089c.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/097e.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/232d.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/236a.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/237a.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/259a.jpg',
    ]
  },
  {
    id: 'safety',
    icon: Shield,
    titleZh: translations.zh.categories.safety.title,
    titleEn: translations.en.categories.safety.title,
    titleTh: translations.th.categories.safety.title,
    description: t.categories.safety.description,
    color: 'from-emerald-600 to-teal-500',
    images: [
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/050b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/057b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/033b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/035b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/063.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/065.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/064b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/066.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/067a.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/068b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/131.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/075.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/024b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/092c.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/094e.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/135.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/136.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/137.jpg',
    ]
  },
  {
    id: 'transport',
    icon: Car,
    titleZh: translations.zh.categories.transport.title,
    titleEn: translations.en.categories.transport.title,
    titleTh: translations.th.categories.transport.title,
    description: t.categories.transport.description,
    color: 'from-blue-600 to-cyan-500',
    images: [
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/005b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/006b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/003b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/004b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/027b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/028b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/029b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/047b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/234c.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/235c.jpg',
    ]
  },
  {
    id: 'pregnancy',
    icon: Baby,
    titleZh: translations.zh.categories.pregnancy.title,
    titleEn: translations.en.categories.pregnancy.title,
    titleTh: translations.th.categories.pregnancy.title,
    description: t.categories.pregnancy.description,
    color: 'from-pink-500 to-rose-400',
    images: [
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/012b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/015b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/062.jpg',
    ]
  },
  {
    id: 'fertility',
    icon: HeartHandshake,
    titleZh: translations.zh.categories.fertility.title,
    titleEn: translations.en.categories.fertility.title,
    titleTh: translations.th.categories.fertility.title,
    description: t.categories.fertility.description,
    color: 'from-rose-500 to-pink-400',
    images: [
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/012b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/062.jpg',
    ]
  },
  {
    id: 'pet',
    icon: Dog,
    titleZh: translations.zh.categories.pet.title,
    titleEn: translations.en.categories.pet.title,
    titleTh: translations.th.categories.pet.title,
    description: t.categories.pet.description,
    color: 'from-orange-500 to-amber-400',
    images: [
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/001b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/239.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/240.jpg',
    ]
  },
  {
    id: 'health',
    icon: Stethoscope,
    titleZh: translations.zh.categories.health.title,
    titleEn: translations.en.categories.health.title,
    titleTh: translations.th.categories.health.title,
    description: t.categories.health.description,
    color: 'from-green-600 to-emerald-500',
    images: [
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/063.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/064b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/022b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/023b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/048b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/090c.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/095e.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/106c.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/107c.jpg',
    ]
  },
  {
    id: 'career',
    icon: Briefcase,
    titleZh: translations.zh.categories.career.title,
    titleEn: translations.en.categories.career.title,
    titleTh: translations.th.categories.career.title,
    description: t.categories.career.description,
    color: 'from-slate-600 to-gray-500',
    images: [
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/052b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/061.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/059c.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/088d.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/096e.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/104c.jpg',
    ]
  },
  {
    id: 'business',
    icon: Store,
    titleZh: translations.zh.categories.business.title,
    titleEn: translations.en.categories.business.title,
    titleTh: translations.th.categories.business.title,
    description: t.categories.business.description,
    color: 'from-yellow-600 to-amber-500',
    images: [
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/052b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/037.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/040a.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/041a.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/132.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/093c.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/099e.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/104c.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/230d.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/260a.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/261a.jpg',
    ]
  },
  {
    id: 'happiness',
    icon: Smile,
    titleZh: translations.zh.categories.happiness.title,
    titleEn: translations.en.categories.happiness.title,
    titleTh: translations.th.categories.happiness.title,
    description: t.categories.happiness.description,
    color: 'from-yellow-500 to-orange-400',
    images: [
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/054b.jpg',
    ]
  },
  {
    id: 'luck',
    icon: Sparkles,
    titleZh: translations.zh.categories.luck.title,
    titleEn: translations.en.categories.luck.title,
    titleTh: translations.th.categories.luck.title,
    description: t.categories.luck.description,
    color: 'from-amber-500 to-yellow-400',
    images: [
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/027b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/028b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/029b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/077.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/079.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/080.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/047b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/233d.jpg',
    ]
  },
  {
    id: 'love',
    icon: Heart,
    titleZh: translations.zh.categories.love.title,
    titleEn: translations.en.categories.love.title,
    titleTh: translations.th.categories.love.title,
    description: t.categories.love.description,
    color: 'from-red-500 to-pink-500',
    images: [
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/019.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/072.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/073.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/074.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/134.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/091c.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/098e.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/105c.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/227d.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/231d.jpg',
    ]
  },
];

// Helper to get localized souvenir items
const getSouvenirItems = (t) => [
  {
    id: 'photobook',
    titleEn: translations.en.items.photobook.title,
    titleZh: translations.zh.items.photobook.title,
    image: 'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/305b.jpg',
    description: t.items.photobook.description,
  },
  {
    id: 'scroll',
    titleEn: translations.en.items.scroll.title,
    titleZh: translations.zh.items.scroll.title,
    image: 'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/288.jpg',
    description: t.items.scroll.description,
  },
  {
    id: 'moonblocks',
    titleEn: translations.en.items.moonblocks.title,
    titleZh: translations.zh.items.moonblocks.title,
    image: 'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/082.jpg',
    description: t.items.moonblocks.description,
  },
];

// Hero Section Component
const HeroSection = ({ heroText, currentLang, t }) => {
  const founding = useFoundingDuration();
  const chars = ['艋', '舺', '龍', '山', '寺'];
  const segments = heroText?.readingSegments || [];
  
  return (
    <section className="relative w-full min-h-[520px] sm:min-h-[580px] flex items-center justify-center overflow-hidden pt-16 pb-8">
      {/* Photo layer */}
      <div className="absolute inset-0">
        <img
          src="https://www.thaifly.com/image/catalog/article/Taiwan/SUN/longshan-temple/longshan-temple%203.jpg"
          alt="Longshan Temple hero"
          className="w-full h-full object-cover opacity-40"
          loading="lazy"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/95 z-10" />

      {/* Animated gold particles effect */}
      <div className="absolute inset-0 z-10 opacity-20">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.3) 0%, transparent 50%),
                              radial-gradient(circle at 80% 50%, rgba(212, 175, 55, 0.2) 0%, transparent 50%),
                              radial-gradient(circle at 50% 20%, rgba(255, 215, 0, 0.15) 0%, transparent 40%)`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 max-w-4xl mx-auto w-full">
        {/* Temple Name - Chinese Characters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="flex justify-center gap-1 sm:gap-2 mb-2">
            {chars.map((ch, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center"
              >
                <span className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-lg"
                  style={{ textShadow: '0 0 40px rgba(212, 175, 55, 0.5)' }}>
                  {ch}
                </span>
                {segments[idx] && (
                  <span className="mt-1 text-[10px] sm:text-xs text-amber-200/80 font-light tracking-wider">
                    {segments[idx]}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
          <p className="text-base sm:text-lg md:text-xl text-white/80 font-light tracking-[0.3em] uppercase">
            Longshan Temple
          </p>
        </motion.div>

        {/* Founding Duration Counter - Elegant Box Design */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs sm:text-sm text-amber-300 tracking-widest uppercase font-medium">
              {t?.hero?.badge}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          </div>

          {/* Duration Display */}
          <div className="flex justify-center items-stretch gap-2 sm:gap-3">
            {/* Years */}
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-b from-amber-900/40 to-black/60 backdrop-blur-sm border border-amber-500/30 rounded-xl px-3 sm:px-5 py-3 sm:py-4 min-w-[70px] sm:min-w-[90px]">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-b from-amber-200 to-amber-400 bg-clip-text text-transparent font-thai-display">
                  {founding.years}
                </span>
              </div>
              <span className="mt-2 text-xs sm:text-sm text-amber-200/70 font-light">
                {t?.hero?.yearsSuffix}
              </span>
            </div>

            {/* Separator */}
            <div className="flex items-center text-amber-500/50 text-2xl font-light self-start mt-4 sm:mt-5">:</div>

            {/* Months */}
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-b from-amber-900/40 to-black/60 backdrop-blur-sm border border-amber-500/30 rounded-xl px-3 sm:px-5 py-3 sm:py-4 min-w-[70px] sm:min-w-[90px]">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-b from-amber-200 to-amber-400 bg-clip-text text-transparent font-thai-display">
                  {String(founding.months).padStart(2, '0')}
                </span>
              </div>
              <span className="mt-2 text-xs sm:text-sm text-amber-200/70 font-light">
                {t?.hero?.monthsLabel}
              </span>
            </div>

            {/* Separator */}
            <div className="flex items-center text-amber-500/50 text-2xl font-light self-start mt-4 sm:mt-5">:</div>

            {/* Days */}
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-b from-amber-900/40 to-black/60 backdrop-blur-sm border border-amber-500/30 rounded-xl px-3 sm:px-5 py-3 sm:py-4 min-w-[70px] sm:min-w-[90px]">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-b from-amber-200 to-amber-400 bg-clip-text text-transparent font-thai-display">
                  {String(founding.days).padStart(2, '0')}
                </span>
              </div>
              <span className="mt-2 text-xs sm:text-sm text-amber-200/70 font-light">
                {t?.hero?.daysLabel}
              </span>
            </div>
          </div>

          {/* Founding info text */}
          <p className="mt-5 text-xs sm:text-sm text-white/50 font-light">
            {t?.hero?.yearsPrefix} · 初建 乾隆三年五月十八日
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Global context around 1738
const Global1738Section = ({ currentLang, t }) => {
  const primaryByLang = React.useMemo(
    () => ({
      th: 'siam',     // Thai language -> Siam (Ayutthaya)
      ja: 'japan',    // Japanese -> Japan
      ko: 'korea',    // Korean -> Korea
      zh: 'taiwan',   // Chinese -> Taiwan (Longshan's home)
      en: 'taiwan',   // English -> Taiwan as neutral/global default
    }),
    []
  );

  const contexts = t.global1738.contexts || [];
  const iconById = React.useMemo(() => {
    const map = {};
    GLOBAL_1738_CONTEXTS.forEach(ctx => {
      map[ctx.id] = ctx.icon;
    });
    return map;
  }, []);
  const indexById = React.useMemo(() => {
    const map = {};
    contexts.forEach((ctx, index) => {
      map[ctx.id] = index;
    });
    return map;
  }, [contexts]);

  const getInitialIndex = React.useCallback(
    (langCode) => {
      const pid = primaryByLang[langCode] || 'taiwan';
      return indexById[pid] ?? 0;
    },
    [indexById, primaryByLang]
  );

  const [activeIndex, setActiveIndex] = useState(() => getInitialIndex(currentLang));
  const total = contexts.length;

  useEffect(() => {
    if (!total) return;
    const targetIndex = getInitialIndex(currentLang);
    setActiveIndex(targetIndex);
  }, [currentLang, total, getInitialIndex]);

  const goNext = React.useCallback(() => {
    if (!total) return;
    setActiveIndex(prev => (prev + 1 + total) % total);
  }, [total]);

  const goPrev = React.useCallback(() => {
    if (!total) return;
    setActiveIndex(prev => (prev - 1 + total) % total);
  }, [total]);

  const handleWheel = (event) => {
    if (!total) return;
    const { deltaX, deltaY } = event;

    // Use whichever axis has the stronger intent so both
    // horizontal (trackpad) and vertical (mouse wheel) can rotate
    const horizontal = Math.abs(deltaX) >= Math.abs(deltaY);

    if (!horizontal && Math.abs(deltaY) < 5) {
      return;
    }

    // Prevent page scroll only when consumed for carousel navigation
    event.preventDefault();

    const directionValue = horizontal ? deltaX : deltaY;

    if (directionValue > 0) {
      goNext(); // scroll right / down
    } else if (directionValue < 0) {
      goPrev(); // scroll left / up
    }
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-black/80 to-black/95 border-t border-amber-500/10 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
            <span className="text-xs text-amber-400 tracking-wider">ค.ศ. 1738 · พ.ศ. 2281</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-thai-display text-white mb-2">
            {t.global1738.heading}
          </h2>
        </motion.div>

        {/* Single Card Display */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 border border-amber-500/30 flex items-center justify-center text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/50 transition-all"
          >
            <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 -rotate-90" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 border border-amber-500/30 flex items-center justify-center text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/50 transition-all"
          >
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 -rotate-90" />
          </button>

          {/* Card Container */}
          <div className="overflow-hidden px-8 sm:px-12" onWheel={handleWheel}>
            <AnimatePresence mode="wait">
              {contexts[activeIndex] && (
                <motion.div
                  key={contexts[activeIndex].id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-amber-950/30 via-black/50 to-black/70 border border-amber-500/20 rounded-2xl p-5 sm:p-6 shadow-2xl"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-3xl">{contexts[activeIndex].flag}</span>
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-amber-300 font-thai-display">
                          {contexts[activeIndex].title}
                        </h3>
                      </div>
                    </div>
                    <div className="text-right text-xs text-amber-200/60">
                      <div>{t.global1738.adLabel} {contexts[activeIndex].adYear || 1738}</div>
                      <div>{t.global1738.beLabel} {contexts[activeIndex].beYear || 2281}</div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-3">
                    {contexts[activeIndex].paragraphs?.map((para, idx) => (
                      <p key={idx} className="text-sm sm:text-base text-white/75 leading-relaxed font-thai-body">
                        {para}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {contexts.map((ctx, idx) => (
              <button
                key={ctx.id}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex 
                    ? 'bg-amber-400 w-6' 
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Cart summary bar (local cart for selected amulets)
const CartBar = ({ cart, onToggleCart, onChangeQty, onClearCart, imageSize = 'small', t }) => {
  const items = Object.values(cart || {});
  const totalPieces = items.reduce((sum, item) => sum + (item.qty || 1), 0);
  const [open, setOpen] = useState(false);

  if (!items.length) return null;

  const groupedItems = React.useMemo(() => {
    const groups = {};

    items.forEach(item => {
      const isBlessing = item.section === 'blessing';
      const baseKey = isBlessing
        ? item.categoryId || item.categoryTitleEn || item.categoryTitleZh || 'unknown'
        : item.souvenirId || item.titleEn || item.titleZh || 'souvenir';
      const groupKey = `${item.section}:${baseKey}`;

      if (!groups[groupKey]) {
        groups[groupKey] = {
          key: groupKey,
          section: item.section,
          categoryId: item.categoryId,
          titleZh: isBlessing ? item.categoryTitleZh : item.titleZh,
          titleEn: isBlessing ? item.categoryTitleEn : item.titleEn,
          titleTh: isBlessing ? item.categoryTitleTh : undefined,
          items: [],
        };
      }

      groups[groupKey].items.push(item);
    });

    return Object.values(groups);
  }, [items]);

  return (
    <>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[calc(100%-2rem)] sm:w-auto sm:left-4 sm:translate-x-0">
        <div className="bg-black/90 border border-amber-500/40 rounded-2xl px-4 py-3 shadow-lg shadow-amber-500/30">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex items-center justify-between gap-3 w-full"
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-amber-400" />
              <span className="text-sm text-white/90">
                {t.cart.selected} <span className="font-semibold text-amber-300">{totalPieces}</span> {t.cart.pieces}
                <span className="text-white/50 text-[11px] ml-1">({items.length} {t.cart.items})</span>
              </span>
            </div>
            <span className="text-[11px] text-white/60">
              {t.cart.tapToOpen}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[80vh] mx-3 sm:mx-4 bg-black/95 border border-amber-500/40 rounded-2xl p-4 sm:p-6 overflow-y-auto text-sm sm:text-base text-white/80 space-y-3"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-amber-400" />
                <div className="text-sm sm:text-base">
                  {t.cart.title}
                  <span className="ml-2 text-white/60 text-xs">
                    {t.cart.total} <span className="text-amber-300 font-semibold">{totalPieces}</span> {t.cart.pieces} ({items.length} {t.cart.items})
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-white/30 text-white/70 hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {groupedItems.map((group, groupIndex) => (
              <div
                key={group.key}
                className={`pt-3 ${groupIndex === 0 ? '' : 'mt-3 border-t border-white/10'}`}
              >
                <div className="mb-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div className="flex flex-col text-left">
                    {group.titleZh && (
                      <span className="text-amber-300 font-thai-display text-base sm:text-lg">
                        {group.titleZh}
                      </span>
                    )}
                    <span className="text-white/80 text-xs sm:text-sm">
                      {group.titleTh || group.titleEn}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {group.items.map(item => {
                    const isBlessing = item.section === 'blessing';
                    const tagText = isBlessing
                      ? `${t.cart.helpsWithBlessing} ${item.categoryTitleTh || item.categoryTitleEn || ''}`
                      : t.cart.helpsWithSouvenir;

                    return (
                      <div
                        key={item.key}
                        className="flex flex-col sm:flex-row items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-3"
                      >
                        <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden bg-white/90 shrink-0">
                          <img
                            src={item.imageUrl}
                            alt={item.categoryTitleEn || item.titleEn || t.cart.selectedAlt}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 flex flex-col items-center sm:items-end gap-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/40 text-[11px] sm:text-xs text-amber-200">
                            {tagText}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => onChangeQty?.(item, -1)}
                              disabled={(item.qty || 1) <= 1}
                              className="w-8 h-8 flex items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-transparent"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-3 text-white font-semibold text-base sm:text-lg">
                              x{item.qty || 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => onChangeQty?.(item, 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/10"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => onToggleCart(item)}
                            className="px-2.5 py-1 rounded-full border border-white/30 text-[11px] sm:text-xs text-white/70 hover:bg-white/10"
                          >
                            {t.cart.removeItem}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="mt-3 flex items-center justify-end gap-3 text-[11px] sm:text-xs text-white/60">
              <button
                type="button"
                onClick={onClearCart}
                className="shrink-0 px-3 py-1 rounded-full border border-amber-400 text-amber-300 hover:bg-amber-500/10"
              >
                {t.cart.clearAll}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Category Card Component
const CategoryCard = ({ category, index }) => {
  const Icon = category.icon;
  
  return (
    <motion.div className="group">
      <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={category.images[0]}
            alt={category.titleEn}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Icon badge */}
          <div className={`absolute top-3 right-3 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-serif text-amber-400 mb-1 font-thai-display">{category.titleZh}</h3>
            <h4 className="text-base sm:text-lg text-white/90 font-medium">{category.titleEn}</h4>
          </div>

          <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
            {category.description}
          </p>

          {/* Thumbnails catalog */}
          <div className="mt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/50">All items in this blessing</span>
              <span className="text-sm text-white/60">{category.images.length} items</span>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {category.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-black/40"
                >
                  <img
                    src={img}
                    alt={`${category.titleEn} ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Image Modal Component
const ImageModal = ({ category, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-6xl max-h-[90vh] bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
          {/* Main image */}
          <div className="flex-1 p-6 flex items-center justify-center bg-black/30">
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              src={category.images[selectedImage]}
              alt={`${category.titleEn} - ${selectedImage + 1}`}
              className="max-w-full max-h-[60vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 p-6 border-t lg:border-t-0 lg:border-l border-white/10 overflow-y-auto">
            {/* Category info */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-amber-400">{category.titleZh}</h3>
                <p className="text-white/70">{category.titleEn}</p>
              </div>
            </div>

            <p className="text-white/60 text-sm mb-6">{category.description}</p>

            {/* Thumbnail grid */}
            <div className="grid grid-cols-3 gap-2">
              {category.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx 
                      ? 'border-amber-500 ring-2 ring-amber-500/30' 
                      : 'border-transparent hover:border-white/30'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {selectedImage === idx && (
                    <div className="absolute inset-0 bg-amber-500/20" />
                  )}
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
              <span className="text-white/50 text-sm">
                {selectedImage + 1} of {category.images.length}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : category.images.length - 1)}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <ChevronUp className="w-5 h-5 text-white rotate-[-90deg]" />
                </button>
                <button
                  onClick={() => setSelectedImage(prev => prev < category.images.length - 1 ? prev + 1 : 0)}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <ChevronDown className="w-5 h-5 text-white rotate-[-90deg]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Blessings Section - table-like layout (label + images)
const BlessingsSection = ({ cart, onToggleCart, onImageClick, imageSize = 'small', setImageSize, t }) => {
  return (
    <section id="blessings" className="py-16 px-3 sm:px-4 sm:py-20 lg:py-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div className="text-center mb-10 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-4 font-thai-display">
            {t?.blessings?.heading || 'Longshan Temple Amulets'}
          </h2>
          {/* Image size selector */}
          {setImageSize && (
            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-white/60">
              <span className="mr-1 text-sm">{t?.blessings?.imageSize || 'Image size:'}</span>
              {IMAGE_SIZES.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setImageSize(size)}
                  className={`px-2.5 py-1 rounded-full border text-[11px] transition-colors ${
                    imageSize === size
                      ? 'bg-amber-500 text-black border-amber-300'
                      : 'bg-white/5 text-white/60 border-white/20 hover:bg-white/10'
                  }`}
                >
                  {size === 'small' && (t?.blessings?.sizeSmall || 'Small')}
                  {size === 'medium' && (t?.blessings?.sizeMedium || 'Medium')}
                  {size === 'large' && (t?.blessings?.sizeLarge || 'Large')}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Table-like rows: left = label, right = images */}
        <div className="space-y-4 sm:space-y-5">
          {blessingCategories.map((category, index) => (
            <motion.div
              key={category.id}
              className="rounded-2xl border border-white/10 bg-black/40 px-3 py-3 sm:px-4 sm:py-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                {/* Left column: category titles */}
                <div className="sm:w-40 flex flex-col gap-1 text-left">
                  <div className="inline-flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-xs font-semibold text-black">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-amber-300 font-serif text-lg">
                      {category.titleZh}
                    </span>
                  </div>
                  <span className="text-white/80 text-sm sm:text-base">
                    {category.titleEn}
                  </span>
                  <span className="text-white/60 text-sm sm:text-sm">
                    {category.titleTh}
                  </span>
                </div>

                {/* Right column: all images for this blessing */}
                <div className="flex-1 overflow-x-auto">
                  <div className="flex flex-wrap gap-2">
                    {category.images.map((img, idx) => {
                      const key = buildCartKey('blessing', category.id, img);
                      const selected = !!cart?.[key];
                      return (
                        <div
                          key={idx}
                          className={`relative aspect-square ${blessingThumbSize[imageSize]} rounded-xl overflow-hidden border border-white/15 bg-white flex items-center justify-center cursor-pointer`}
                          onClick={() =>
                            onImageClick?.({
                              section: 'blessing',
                              categoryId: category.id,
                              imageUrl: img,
                              categoryTitleZh: category.titleZh,
                              categoryTitleEn: category.titleEn,
                              categoryTitleTh: category.titleTh,
                            })
                          }
                        >
                          <img
                            src={img}
                            alt={`${category.titleEn} ${idx + 1}`}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                          <button
                            type="button"
                            onClick={e => {
                              e.stopPropagation();
                              onToggleCart?.({
                                section: 'blessing',
                                categoryId: category.id,
                                imageUrl: img,
                                categoryTitleZh: category.titleZh,
                                categoryTitleEn: category.titleEn,
                                categoryTitleTh: category.titleTh,
                              });
                            }}
                            className={`absolute top-1 right-1 w-7 h-7 rounded-full border flex items-center justify-center text-xs transition-colors ${
                              selected
                                ? 'bg-emerald-500 border-emerald-300 text-black'
                                : 'bg-black/60 border-white/60 text-white'
                            }`}
                          >
                            {selected ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <ShoppingCart className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Souvenirs Section
const SouvenirsSection = ({ cart, onToggleCart, onImageClick, imageSize = 'small', t }) => {
  return (
    <section id="souvenirs" className="py-16 px-3 sm:px-4 sm:py-20 lg:py-24 bg-gradient-to-b from-transparent via-amber-900/10 to-transparent overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-amber-500/10 rounded-full text-amber-400 text-sm tracking-wider uppercase mb-4">
            {t?.souvenirs?.badge || 'Exclusive Items'}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 font-thai-display">
            {t?.souvenirs?.heading || 'Temple Souvenirs'}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            {t?.souvenirs?.description || "Take home a piece of Longshan Temple's rich heritage with these beautifully crafted souvenirs."}
          </p>
        </motion.div>

        {/* Souvenirs grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {souvenirItems.map((item, index) => {
            const key = buildCartKey('souvenir', item.id, item.image);
            const selected = !!cart?.[key];
            return (
              <motion.div
                key={item.id}
                className="group"
              >
                <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/50 transition-all duration-500">
                  <div
                    className="relative aspect-square overflow-hidden cursor-pointer"
                    onClick={() =>
                      onImageClick?.({
                        section: 'souvenir',
                        souvenirId: item.id,
                        imageUrl: item.image,
                        titleZh: item.titleZh,
                        titleEn: item.titleEn,
                      })
                    }
                  >
                    <img
                      src={item.image}
                      alt={item.titleEn}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        onToggleCart?.({
                          section: 'souvenir',
                          souvenirId: item.id,
                          imageUrl: item.image,
                          titleZh: item.titleZh,
                          titleEn: item.titleEn,
                        });
                      }}
                      className={`absolute top-2 right-2 w-7 h-7 rounded-full border flex items-center justify-center text-xs transition-colors ${
                        selected
                          ? 'bg-emerald-500 border-emerald-300 text-black'
                          : 'bg-black/60 border-white/60 text-white'
                      }`}
                    >
                      {selected ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <ShoppingCart className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-serif text-amber-400 font-thai-display">{item.titleZh}</h3>
                    <h4 className="text-white/90 text-sm mb-2">{item.titleEn}</h4>
                    <p className="text-white/50 text-xs">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Navigation Component
const Navigation = ({ currentLang, setCurrentLang, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center">
            <span className="text-black font-serif font-bold text-lg">龍</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-amber-400 font-serif text-lg">龍山寺</span>
            <span className="text-white/70 text-xs block">Longshan Temple</span>
          </div>
        </a>

        {/* Language selector (Mobile & Desktop) */}
        <div className="relative ml-auto">
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Globe className="w-5 h-5 text-amber-400" />
            <span className="text-white/90 font-medium">{languages.find(l => l.code === currentLang)?.flag}</span>
          </button>
          
          <AnimatePresence>
            {langMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full right-0 mt-2 min-w-[160px] bg-gray-900 border border-white/10 rounded-xl overflow-hidden shadow-xl z-50"
              >
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors text-left ${
                      currentLang === lang.code ? 'bg-amber-500/20 text-amber-400' : 'text-white/80'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-sm font-medium">{lang.name}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

// Footer Component
const Footer = ({ t }) => {
  return (
    <footer id="about" className="py-16 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Temple info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <span className="text-black font-serif font-bold text-xl">龍</span>
              </div>
              <div>
                <h3 className="text-amber-400 font-serif text-xl">艋舺龍山寺</h3>
                <p className="text-white/50 text-sm">Monga Longshan Temple</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed font-thai-body">
              Founded in 1738, Longshan Temple is one of Taiwan's most important and beautiful temples, 
              dedicated to Guanyin, the Goddess of Mercy.
            </p>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-thai-display">{t?.footer?.visitUs || 'Visit Us'}</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="w-5 h-5 text-amber-400 mt-0.5" />
                <span>No. 211, Guangzhou Street, Wanhua District, Taipei City 108, Taiwan</span>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <Phone className="w-5 h-5 text-amber-400" />
                <span>+886 2 2302 5162</span>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <Clock className="w-5 h-5 text-amber-400" />
                <span>6:00 AM - 10:00 PM Daily</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-thai-display">{t?.footer?.features || 'Features'}</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Star className="w-4 h-4 text-amber-400" />
                <span>{t?.footer?.authenticBlessings || 'Authentic Temple Blessings'}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span>{t?.footer?.creditCardAccepted || 'Credit Card Accepted'}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Globe className="w-4 h-4 text-amber-400" />
                <span>{t?.footer?.multiLanguage || 'Multi-language Support'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Credit & disclaimer */}
        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/60 space-y-2 font-thai-legal">
          <p>
            {t?.footer?.disclaimer || 'This amulet selection tool is created to help devotees choose and note items conveniently. It is not the official temple website.'}
          </p>
          <p>
            {t?.footer?.dataSource || 'Content and images are referenced from the official temple website:'}
            {" "}
            <a
              href="https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t.php#"
              className="text-amber-300 underline underline-offset-2"
              target="_blank"
              rel="noreferrer"
            >
              https://lungshan.org.tw/...
            </a>
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center text-white/40 text-sm">
          <p>{t?.footer?.copyright || '© 2024 Monga Longshan Temple. All sacred items are blessed at the temple.'}</p>
        </div>
      </div>
    </footer>
  );
};

// Scroll to top button
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all"
        >
          <ArrowUp className="w-5 h-5 text-black" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Main App Component
function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [cart, setCart] = useState({});
  const [previewItem, setPreviewItem] = useState(null);
  const [imageSize, setImageSize] = useState('small');
  const translation = getTranslation(currentLang);

  const handleToggleCart = (item) => {
    const baseId = item.categoryId || item.souvenirId || item.categoryTitleEn || item.titleEn || 'item';
    const key = buildCartKey(item.section, baseId, item.imageUrl);
    setCart(prev => {
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
      } else {
        const existingQty = next[key]?.qty || 1;
        next[key] = { ...item, key, qty: existingQty };
      }
      return next;
    });
  };

  const handleChangeQty = (item, delta) => {
    setCart(prev => {
      if (!item) return prev;
      const baseId = item.categoryId || item.souvenirId || item.categoryTitleEn || item.titleEn || 'item';
      const key = item.key || buildCartKey(item.section, baseId, item.imageUrl);
      const existing = prev[key];
      if (!existing) return prev;
      const nextQty = Math.max(1, (existing.qty || 1) + delta);
      return {
        ...prev,
        [key]: { ...existing, qty: nextQty },
      };
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  const handleImageClick = (item) => {
    setPreviewItem(item);
  };

  const getCartItemFor = (item) => {
    if (!item) return null;
    const baseId = item.categoryId || item.souvenirId || item.categoryTitleEn || item.titleEn || 'item';
    const key = buildCartKey(item.section, baseId, item.imageUrl);
    return cart[key] || null;
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Navigation currentLang={currentLang} setCurrentLang={setCurrentLang} t={translation} />

      {/* Top-level credit & disclaimer bar */}
      <div className="mt-16 md:mt-20 px-4 font-thai-legal">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black/80 border border-amber-500/40 rounded-xl px-3 py-2 text-[11px] sm:text-xs text-white/70 text-center">
            {translation?.footer?.dataSource || 'Content and images are referenced from the official temple website:'}
            {' '}
            <a
              href="https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t.php#"
              target="_blank"
              rel="noreferrer"
              className="text-amber-300 underline underline-offset-2"
            >
              https://lungshan.org.tw/...
            </a>
          </div>
        </div>
      </div>
      
      <HeroSection heroText={translation.hero} currentLang={currentLang} t={translation} />
      
      <Global1738Section currentLang={currentLang} t={translation} />
      
      <BlessingsSection
        cart={cart}
        onToggleCart={handleToggleCart}
        onImageClick={handleImageClick}
        imageSize={imageSize}
        setImageSize={setImageSize}
        t={translation}
      />
      
      <SouvenirsSection
        cart={cart}
        onToggleCart={handleToggleCart}
        onImageClick={handleImageClick}
        imageSize={imageSize}
        t={translation}
      />
      
      <TempleGuide />
      
      <Footer t={translation} />
      
      <ScrollToTop />

      {/* Image preview modal */}
      <AnimatePresence>
        {previewItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={() => setPreviewItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-3xl w-full px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="absolute -top-10 right-0 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center border border-white/30"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <div className="bg-black/60 border border-white/15 rounded-2xl p-4 flex flex-col items-center gap-4">
                <img
                  src={previewItem.imageUrl}
                  alt={previewItem.categoryTitleEn || previewItem.titleEn || 'Selected item'}
                  className="max-h-[70vh] w-full object-contain rounded-xl bg-white"
                />
                <div className="w-full text-center text-white/80 text-sm space-y-2">
                  <div className="space-y-1">
                    <div className="font-serif text-base text-amber-300">
                      {previewItem.categoryTitleZh || previewItem.titleZh}
                    </div>
                    <div>
                      {previewItem.categoryTitleEn || previewItem.titleEn}
                    </div>
                    {previewItem.categoryTitleTh && (
                      <div className="text-white/60 text-xs">
                        {previewItem.categoryTitleTh}
                      </div>
                    )}
                  </div>

                  <div className="mt-2 flex flex-col items-center gap-2 text-xs sm:text-sm">
                    {getCartItemFor(previewItem) ? (
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleChangeQty(previewItem, -1)}
                          disabled={(getCartItemFor(previewItem)?.qty || 1) <= 1}
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-white/30 text-white/80 hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-transparent"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-white/90 text-sm">
                          x{getCartItemFor(previewItem)?.qty || 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleChangeQty(previewItem, 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-white/30 text-white/80 hover:bg-white/10"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleCart(previewItem)}
                          className="ml-3 px-3 py-1 rounded-full border border-white/30 text-[11px] text-white/80 hover:bg-white/10"
                        >
                          {translation?.cart?.removeItem || 'Remove'}
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleToggleCart(previewItem)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20 text-xs sm:text-sm"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {translation?.cart?.addToCart || 'Add to cart'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart summary bar */}
      <CartBar
        cart={cart}
        onToggleCart={handleToggleCart}
        onChangeQty={handleChangeQty}
        onClearCart={handleClearCart}
        imageSize={imageSize}
        t={translation}
      />
    </div>
  );
}

export default App;
