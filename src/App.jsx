import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Analytics } from "@vercel/analytics/react"
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Shield, Car, GraduationCap, Baby, Dog, Stethoscope, 
  Briefcase, Store, Smile, Sparkles, HeartHandshake, BookOpen, Home,
  ChevronDown, ChevronUp, Globe, X, ZoomIn, CreditCard, MapPin,
  Phone, Clock, Star, Menu, ArrowUp, ShoppingCart, Check, Plus, Minus,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

import TempleGuide from './TempleGuide.jsx';
import { languages, getTranslation, translations } from './locales.js';

// Helper to build a stable cart key per image
const buildCartKey = (section, categoryId, imageUrl) => `${section}:${categoryId}:${imageUrl}`;

// Image size options for thumbnails
const IMAGE_SIZES = ['small', 'medium', 'large'];

const blessingThumbSize = {
  small: 'w-[30%] sm:w-24 md:w-28',      // 3 per row on mobile
  medium: 'w-[48%] sm:w-32 md:w-36',     // 2 per row on mobile
  large: 'w-full sm:w-44 md:w-48',       // 1 per row on mobile
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
    id: 'family',
    icon: Home,
    titleZh: '家內安全',
    titleEn: 'Household Family Safety',
    titleTh: 'ความปลอดภัยในครอบครัว',
    description: t?.categories?.family?.description || 'Protection for the whole family.',
    color: 'from-amber-600 to-orange-500',
    images: [
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/011b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/065.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/032b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/033b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/024b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/081b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/085.jpg',
    ]
  },
  {
    id: 'transport',
    icon: Car,
    titleZh: '交通安全',
    titleEn: 'Drivers and Travellers Safety',
    titleTh: 'ความปลอดภัยในการเดินทาง',
    description: t?.categories?.transport?.description || 'Safe travel and driving.',
    color: 'from-blue-600 to-cyan-500',
    images: [
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/005b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/006b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/003b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/004b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/027b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/028b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/029b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/032b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/047b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/081b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/083b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/084b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/234c.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/235c.jpg',
    ]
  },
  {
    id: 'education',
    icon: GraduationCap,
    titleZh: '學業考試',
    titleEn: 'Learning and Examination',
    titleTh: 'การเรียนและการสอบ',
    description: t?.categories?.education?.description || 'Blessings for academic success.',
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
    id: 'pregnancy',
    icon: Baby,
    titleZh: translations.zh?.categories?.pregnancy?.title || '安產',
    titleEn: translations.en?.categories?.pregnancy?.title || 'Pregnancy',
    titleTh: translations.th?.categories?.pregnancy?.title || 'การตั้งครรภ์',
    description: t?.categories?.pregnancy?.description || 'Safe pregnancy.',
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
    titleZh: translations.zh?.categories?.fertility?.title || '求子',
    titleEn: translations.en?.categories?.fertility?.title || 'Fertility',
    titleTh: translations.th?.categories?.fertility?.title || 'ความอุดมสมบูรณ์',
    description: t?.categories?.fertility?.description || 'Fertility blessing.',
    color: 'from-rose-500 to-pink-400',
    images: [
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/012b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/062.jpg',
    ]
  },
  {
    id: 'pet',
    icon: Dog,
    titleZh: '寵物',
    titleEn: 'Pet',
    titleTh: 'สัตว์เลี้ยง',
    description: t?.categories?.pet?.description || 'Pet protection.',
    color: 'from-orange-500 to-amber-400',
    images: [
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/001b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/239.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/240.jpg',
    ]
  },
  {
    id: 'safety',
    icon: Shield,
    titleZh: '平安',
    titleEn: 'Safety',
    titleTh: 'ความปลอดภัย',
    description: t?.categories?.safety?.description || 'General protection and safety.',
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
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/083b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/084b.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/085.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/087.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/092c.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/094e.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/103c.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/108c.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/109c.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/135.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/136.jpg',
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/137.jpg',
    ]
  },
  {
    id: 'health',
    icon: Stethoscope,
    titleZh: '健康',
    titleEn: 'Good Health',
    titleTh: 'สุขภาพ',
    description: t?.categories?.health?.description || 'Health blessing.',
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
    titleZh: '工作求職',
    titleEn: 'Success in Work and Employment',
    titleTh: 'ความสำเร็จในการทำงาน',
    description: t?.categories?.career?.description || 'Career success.',
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
    titleZh: '生意',
    titleEn: 'Success in Business',
    titleTh: 'ความสำเร็จในธุรกิจ',
    description: t?.categories?.business?.description || 'Business prosperity.',
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
    titleZh: '幸福',
    titleEn: 'Happiness',
    titleTh: 'ความสุข',
    description: t?.categories?.happiness?.description || 'Happiness blessing.',
    color: 'from-yellow-500 to-orange-400',
    images: [
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/054b.jpg',
    ]
  },
  {
    id: 'luck',
    icon: Sparkles,
    titleZh: '福氣',
    titleEn: 'Lucky',
    titleTh: 'โชคดี',
    description: t?.categories?.luck?.description || 'Good fortune.',
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
    titleZh: '愛情',
    titleEn: 'Love and Good Relationship',
    titleTh: 'ความรักและความสัมพันธ์',
    description: t?.categories?.love?.description || 'Love blessing.',
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
    titleEn: translations.en?.items?.photobook?.title || 'Photo Collection',
    titleZh: translations.zh?.items?.photobook?.title || '相冊',
    image: 'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/305b.jpg',
    description: t?.items?.photobook?.description || 'Temple photo collection.',
  },
  {
    id: 'scroll',
    titleEn: translations.en?.items?.scroll?.title || 'Hanging Scroll',
    titleZh: translations.zh?.items?.scroll?.title || '掛軸',
    image: 'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/288.jpg',
    description: t?.items?.scroll?.description || 'Heart Sutra scroll.',
  },
  {
    id: 'moonblocks',
    titleEn: translations.en?.items?.moonblocks?.title || 'Moon Blocks',
    titleZh: translations.zh?.items?.moonblocks?.title || '筊杯',
    image: 'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/082.jpg',
    description: t?.items?.moonblocks?.description || 'Traditional moon blocks.',
  },
];

// Floating Navigation Component
const FloatingNav = ({ t, currentLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const categories = React.useMemo(() => getBlessingCategories(t), [t]);
  
  const getTitle = (category) => {
    switch (currentLang) {
      case 'zh': return category.titleZh;
      case 'th': return category.titleTh;
      case 'ja': return category.titleZh;
      case 'ko': return category.titleZh;
      default: return category.titleEn;
    }
  };

  const sections = [
    { id: 'hero', label: t?.floatingNav?.hero || 'Home' },
    { id: 'global1738', label: t?.floatingNav?.history || '1738' },
    { id: 'blessings', label: t?.floatingNav?.blessings || 'Amulets' },
    ...categories.map(cat => ({ id: `category-${cat.id}`, label: getTitle(cat), isCategory: true })),
    { id: 'souvenirs', label: t?.floatingNav?.souvenirs || 'Souvenirs' },
    { id: 'temple-guide', label: t?.floatingNav?.templeGuide || 'Guide' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  const scrollUp = () => {
    window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
  };

  const scrollDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
  };

  return (
    <div className="fixed right-3 bottom-24 sm:right-4 sm:bottom-28 z-40 flex flex-col items-center gap-2">
      {/* Scroll Up */}
      <button
        onClick={scrollUp}
        className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500/90 to-amber-600/90 backdrop-blur-sm rounded-xl shadow-lg shadow-amber-500/30 flex items-center justify-center hover:from-amber-400/90 hover:to-amber-500/90 hover:shadow-amber-500/50 transition-all border border-amber-400/30"
        aria-label="Scroll up"
      >
        <ChevronUp className="w-6 h-6 text-white" />
      </button>

      {/* Section Selector */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500/90 to-amber-600/90 backdrop-blur-sm rounded-xl shadow-lg shadow-amber-500/30 flex flex-col items-center justify-center hover:from-amber-400/90 hover:to-amber-500/90 hover:shadow-amber-500/50 transition-all border border-amber-400/30 px-1"
        >
          <span className="text-[9px] sm:text-[10px] text-white/90 font-medium leading-tight text-center">
            {t?.floatingNav?.choose || 'Choose'}
          </span>
          <span className="text-[9px] sm:text-[10px] text-white/90 font-medium leading-tight text-center">
            {t?.floatingNav?.one || 'One'}
          </span>
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-full right-0 mb-2 w-48 sm:w-56 bg-gradient-to-b from-amber-50/95 to-amber-100/95 backdrop-blur-sm rounded-xl shadow-xl shadow-amber-500/20 border border-amber-200/50 overflow-hidden max-h-[60vh] overflow-y-auto"
            >
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-amber-200/50 transition-colors border-b border-amber-300/30 last:border-b-0 ${
                    section.isCategory ? 'pl-5 text-amber-700/80' : 'font-medium text-amber-900'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll Down */}
      <button
        onClick={scrollDown}
        className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500/90 to-amber-600/90 backdrop-blur-sm rounded-xl shadow-lg shadow-amber-500/30 flex items-center justify-center hover:from-amber-400/90 hover:to-amber-500/90 hover:shadow-amber-500/50 transition-all border border-amber-400/30"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

// Hero Section Component - Mobile Optimized, Modern Design
const HeroSection = ({ heroText, currentLang, t }) => {
  const founding = useFoundingDuration();
  const chars = ['艋', '舺', '龍', '山', '寺'];
  const segments = heroText?.readingSegments || [];
  
  // Count-up animation state
  const [displayYears, setDisplayYears] = useState(0);
  const [displayMonths, setDisplayMonths] = useState(0);
  const [displayDays, setDisplayDays] = useState(0);

  useEffect(() => {
    // รีเซ็ตทุกครั้งที่ค่า founding เปลี่ยน
    setDisplayYears(0);
    setDisplayMonths(0);
    setDisplayDays(0);

    const duration = 1500; // ทั้งแอนิเมชัน 1.5 วินาที
    const start = performance.now();

    const easeOut = (x) => 1 - Math.pow(1 - x, 3); // ease-out cubic

    let frameId;

    const tick = (now) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / duration); // 0 → 1

      // ปีใช้แค่ 50% แรกของเวลา → เสร็จก่อน
      const yearPhase = Math.min(1, p / 0.5);
      // เดือนใช้ 75% ของเวลา → เสร็จทีหลังปี
      const monthPhase = Math.min(1, p / 0.75);
      // วันใช้ครบ 100% → เสร็จช้าที่สุด
      const dayPhase = p;

      setDisplayYears(Math.round(founding.years * easeOut(yearPhase)));
      setDisplayMonths(Math.round(founding.months * easeOut(monthPhase)));
      setDisplayDays(Math.round(founding.days * easeOut(dayPhase)));

      if (p < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [founding.years, founding.months, founding.days]);

  return (
    <section id="hero" className="relative w-full flex items-center justify-center overflow-hidden py-12 sm:py-16 md:py-20 px-4">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://www.thaifly.com/image/catalog/article/Taiwan/SUN/longshan-temple/longshan-temple%203.jpg"
          alt="Longshan Temple"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8 sm:space-y-10">
        {/* Temple Name - Large & Impactful */}
        <div className="space-y-4">
          <div className="flex justify-center gap-2 sm:gap-3 md:gap-4">
            {chars.map((ch, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]">
                  {ch}
                </span>
                {segments[idx] && (
                  <span className="text-sm sm:text-base md:text-lg text-amber-200/80 mt-1 font-medium">
                    {segments[idx]}
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-white/60 tracking-wide uppercase">
            Longshan Temple · {t?.hero?.badge || 'EST. 1738'}
          </p>
        </div>

        {/* Duration Section with Clear Heading */}
        <div className="space-y-5">
          {/* Heading for counter */}
          <h2 className="text-lg sm:text-xl text-amber-200/90 font-medium">
            {t?.hero?.ageHeading || 'Age of Longshan Temple'}
          </h2>
          
          {/* Duration Counter - Modern Glassmorphism */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            {/* Years */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 sm:px-8 py-4 sm:py-5 min-w-[100px] sm:min-w-[120px]">
                <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-amber-300">
                  {displayYears}
                </span>
                <span className="block mt-2 text-base sm:text-lg text-amber-200/80 font-semibold">
                  {t?.hero?.yearsSuffix || 'years'}
                </span>
              </div>
            </motion.div>

            {/* Months */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 sm:px-8 py-4 sm:py-5 min-w-[100px] sm:min-w-[120px]">
                <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-amber-300">
                  {String(displayMonths).padStart(2, '0')}
                </span>
                <span className="block mt-2 text-base sm:text-lg text-amber-200/80 font-semibold">
                  {t?.hero?.monthsLabel || 'months'}
                </span>
              </div>
            </motion.div>

            {/* Days */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 sm:px-8 py-4 sm:py-5 min-w-[100px] sm:min-w-[120px]">
                <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-amber-300">
                  {String(displayDays).padStart(2, '0')}
                </span>
                <span className="block mt-2 text-base sm:text-lg text-amber-200/80 font-semibold">
                  {t?.hero?.daysLabel || 'days'}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Founding Date - Two lines with bold highlight */}
        <div className="text-center space-y-1">
          <p className="text-base sm:text-lg text-white/80">
            {t?.hero?.foundingLine1 || 'Founded on'}{' '}
            <span className="font-bold text-amber-300">{t?.hero?.foundingDateBold || 'May 18, 1738'}</span>
          </p>
          <p className="text-sm sm:text-base text-white/50">
            {t?.hero?.foundingLine2 || 'Qianlong Year 3, Qing Dynasty'}
          </p>
        </div>
      </div>
    </section>
  );
};

// Global 1738 Section - Carousel showing adjacent cards
const Global1738Section = ({ currentLang, t }) => {
  const contexts = t?.global1738?.contexts || [];
  const total = contexts.length;
  
  // Map language to default country
  const langToCountry = {
    th: 'siam',
    ja: 'japan', 
    ko: 'korea',
    zh: 'taiwan',
    en: 'taiwan',
  };
  
  // Find initial index based on language
  const getInitialIndex = useCallback(() => {
    const targetId = langToCountry[currentLang] || 'taiwan';
    const idx = contexts.findIndex(ctx => ctx.id === targetId);
    return idx >= 0 ? idx : 0;
  }, [currentLang, contexts]);

  // Embla Carousel setup - show partial adjacent slides
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    startIndex: getInitialIndex(),
    containScroll: false,
  });
  
  const [selectedIndex, setSelectedIndex] = useState(getInitialIndex());
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const cardElsRef = useRef([]);
  const [cardMinHeight, setCardMinHeight] = useState(0);

  const computeCardMinHeight = useCallback(() => {
    const heights = cardElsRef.current
      .map((el) => (el ? el.getBoundingClientRect().height : 0))
      .filter((h) => h > 0);
    const max = heights.length ? Math.max(...heights) : 0;
    setCardMinHeight(max ? Math.ceil(max) : 0);
  }, []);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Scroll to initial index when language changes
  useEffect(() => {
    if (emblaApi) {
      const targetIndex = getInitialIndex();
      emblaApi.scrollTo(targetIndex, true);
    }
  }, [currentLang, emblaApi, getInitialIndex]);

  useEffect(() => {
    if (!emblaApi || typeof window === 'undefined') return;
    const measure = () => computeCardMinHeight();
    const raf = requestAnimationFrame(measure);
    emblaApi.on('reInit', measure);
    emblaApi.on('resize', measure);
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(raf);
      emblaApi.off('reInit', measure);
      emblaApi.off('resize', measure);
      window.removeEventListener('resize', measure);
    };
  }, [emblaApi, computeCardMinHeight, currentLang, total]);

  if (!total) return null;

  return (
    <section id="global1738" className="py-16 sm:py-20 px-4 bg-gradient-to-b from-black via-amber-950/10 to-black overflow-hidden scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 rounded-full border border-amber-500/30 mb-5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-sm sm:text-base text-amber-300 font-medium tracking-wider">
              {t?.global1738?.adLabel || 'AD'} 1738 · {t?.global1738?.beLabel || 'BE'} 2281
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-thai-display mb-3">
            {t?.global1738?.heading || 'Year 1738 – What Was Happening?'}
          </h2>
        </div>

        {/* Embla Carousel */}
        <div className="relative -mx-4 sm:-mx-6">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {contexts.map((ctx, idx) => (
                <div key={ctx.id} className="flex-[0_0_85%] sm:flex-[0_0_70%] min-w-0 pl-3 sm:pl-4 flex">
                  <div className="w-full">
                    <div
                      ref={(el) => {
                        cardElsRef.current[idx] = el;
                      }}
                      style={cardMinHeight ? { minHeight: cardMinHeight } : undefined}
                      className="h-full bg-gradient-to-br from-gray-900/90 to-black border border-amber-500/30 rounded-2xl p-5 sm:p-8 shadow-xl shadow-amber-500/5"
                    >
                      {/* Card Header */}
                      <div className="flex items-start gap-4 mb-5">
                        <span className="text-5xl sm:text-6xl">{ctx.flag}</span>
                        <div className="flex-1">
                          <h3 className="text-xl sm:text-2xl text-amber-300 font-semibold mb-2 leading-tight">
                            {ctx.title}
                          </h3>
                          <div className="flex gap-2 text-sm text-white/50">
                            <span>{t?.global1738?.adLabel} {ctx.adYear || 1738}</span>
                            <span>·</span>
                            <span>{t?.global1738?.beLabel} {ctx.beYear || 2281}</span>
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mb-5" />

                      {/* Card Content */}
                      <div className="space-y-4">
                        {ctx.paragraphs?.map((para, pIdx) => (
                          <p key={pIdx} className="text-base sm:text-lg text-white/80 leading-relaxed">
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden sm:flex items-center justify-between absolute inset-x-0 top-1/2 -translate-y-1/2 px-2 pointer-events-none">
            <button
              type="button"
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/90 to-amber-600/90 backdrop-blur-sm shadow-lg shadow-amber-500/30 flex items-center justify-center pointer-events-auto hover:from-amber-400/90 hover:to-amber-500/90 transition-all border border-amber-400/30"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/90 to-amber-600/90 backdrop-blur-sm shadow-lg shadow-amber-500/30 flex items-center justify-center pointer-events-auto hover:from-amber-400/90 hover:to-amber-500/90 transition-all border border-amber-400/30"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {contexts.map((ctx, idx) => (
            <button
              key={ctx.id}
              type="button"
              onClick={() => scrollTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === selectedIndex 
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 w-6 shadow-lg shadow-amber-500/50' 
                  : 'bg-white/30 hover:bg-white/50 w-2'
              }`}
            />
          ))}
        </div>
        <p className="text-center text-xs text-white/40 mt-2">
          {t?.global1738?.swipeHint || 'Swipe or tap to change'}
        </p>
      </div>
    </section>
  );
};

// Cart summary bar (local cart for selected amulets)
const CartBar = ({ cart, onToggleCart, onRemoveFromCart, onChangeQty, onClearCart, imageSize = 'small', t, currentLang }) => {
  const items = Object.values(cart || {});
  const totalPieces = items.reduce((sum, item) => sum + (item.qty || 1), 0);
  const [open, setOpen] = useState(false);

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

  if (!items.length) return null;

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
          className="fixed inset-0 z-50 bg-black"
          onClick={() => setOpen(false)}
        >
          <div
            className="h-full w-full bg-black p-4 overflow-y-auto text-sm sm:text-base text-white/80 space-y-3"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2 sticky top-0 bg-black py-2 z-10">
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
                className={`${groupIndex === 0 ? '' : 'mt-3 pt-3 border-t border-white/10'}`}
              >
                {/* Category Header */}
                <div className="mb-2 px-1">
                  <span className="text-amber-300 font-medium text-sm">
                    {currentLang === 'th' ? (group.titleTh || group.titleEn || group.titleZh) :
                     currentLang === 'zh' ? (group.titleZh || group.titleEn) :
                     currentLang === 'ja' ? (group.titleZh || group.titleEn) :
                     currentLang === 'ko' ? (group.titleZh || group.titleEn) :
                     (group.titleEn || group.titleZh)}
                  </span>
                </div>

                {/* Items - Compact horizontal rows */}
                <div className="space-y-2">
                  {group.items.map(item => (
                    <div
                      key={item.key}
                      className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-2"
                    >
                      {/* Image - Left */}
                      <div className="w-[160px] h-[160px] rounded-lg overflow-hidden bg-white/90 shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.categoryTitleEn || item.titleEn || t.cart.selectedAlt}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>

                      {/* Quantity controls - Right */}
                      <div className="flex-1 flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if ((item.qty || 1) <= 1) {
                              onRemoveFromCart(item);
                            } else {
                              onChangeQty?.(item, -1);
                            }
                          }}
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="min-w-[40px] text-center text-white font-semibold text-base">
                          x{item.qty || 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => onChangeQty?.(item, 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
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
const BlessingsSection = ({ cart, onToggleCart, onRemoveFromCart, onChangeQty, onImageClick, imageSize = 'small', setImageSize, t, currentLang }) => {
  const categories = React.useMemo(() => getBlessingCategories(t), [t]);
  const [floatingAnims, setFloatingAnims] = useState([]); // Array of { id, key, type: '+1' | '-1' }
  
  // Helper to get title based on current language
  const getTitle = (category) => {
    switch (currentLang) {
      case 'zh': return category.titleZh;
      case 'th': return category.titleTh;
      case 'ja': return category.titleZh; // Japanese uses Chinese characters
      case 'ko': return category.titleZh; // Korean uses Chinese characters  
      default: return category.titleEn;
    }
  };

  const handleAdd = (e, item, key) => {
    e.stopPropagation();
    onToggleCart?.(item);
    const animId = Date.now() + Math.random();
    setFloatingAnims(prev => [...prev, { id: animId, key, type: '+1' }]);
    setTimeout(() => {
      setFloatingAnims(prev => prev.filter(a => a.id !== animId));
    }, 600);
  };

  const handleRemove = (e, item, key) => {
    e.stopPropagation();
    const cartItem = cart?.[key];
    if (cartItem) {
      if ((cartItem.qty || 1) <= 1) {
        onRemoveFromCart?.(item);
      } else {
        onChangeQty?.(cartItem, -1);
      }
      const animId = Date.now() + Math.random();
      setFloatingAnims(prev => [...prev, { id: animId, key, type: '-1' }]);
      setTimeout(() => {
        setFloatingAnims(prev => prev.filter(a => a.id !== animId));
      }, 600);
    }
  };
  
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
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              id={`category-${category.id}`}
              className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden scroll-mt-16"
            >
              {/* Sticky category header */}
              <div className="sticky top-0 z-10 bg-gradient-to-r from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-sm border-b border-white/10 px-3 py-3 sm:px-4 sm:py-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-amber-300 font-serif text-lg sm:text-xl font-semibold">
                    {getTitle(category)}
                  </span>
                  <span className="text-white/50 text-xs sm:text-sm">
                    {category.description}
                  </span>
                </div>
              </div>
              
              {/* Images grid */}
              <div className="px-3 py-3 sm:px-4 sm:py-4">

                {/* Right column: all images for this blessing */}
                <div className="flex-1 overflow-x-auto">
                  <div className="flex flex-wrap gap-2">
                    {category.images.map((img, idx) => {
                      const key = buildCartKey('blessing', category.id, img);
                      const cartItem = cart?.[key];
                      const qty = cartItem?.qty || 0;
                      const item = {
                        section: 'blessing',
                        categoryId: category.id,
                        imageUrl: img,
                        categoryTitleZh: category.titleZh,
                        categoryTitleEn: category.titleEn,
                        categoryTitleTh: category.titleTh,
                      };
                      return (
                        <div
                          key={idx}
                          className={`relative aspect-square ${blessingThumbSize[imageSize]} rounded-xl overflow-hidden border ${qty > 0 ? 'border-amber-500/50' : 'border-white/15'} bg-white flex items-center justify-center cursor-pointer`}
                          onClick={() => onImageClick?.(item)}
                        >
                          <img
                            src={img}
                            alt={`${category.titleEn} ${idx + 1}`}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                          
                          {/* Control buttons - top right */}
                          <div className="absolute top-1 right-1 flex items-center gap-1">
                            {/* Minus button - only show if qty > 0 */}
                            {qty > 0 && (
                              <button
                                type="button"
                                onClick={(e) => handleRemove(e, item, key)}
                                className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center text-lg font-bold hover:bg-black/80 transition-colors"
                              >
                                −
                              </button>
                            )}
                            
                            {/* Plus/Qty button */}
                            <button
                              type="button"
                              onClick={(e) => handleAdd(e, item, key)}
                              className={`min-w-[28px] h-7 px-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center text-sm font-bold hover:bg-black/80 transition-colors ${qty > 0 ? 'text-amber-300' : ''}`}
                            >
                              {qty > 0 ? qty : '+'}
                            </button>
                            
                            {/* Floating +1/-1 animations - MMORPG style (multiple) */}
                            <AnimatePresence>
                              {floatingAnims.filter(a => a.key === key).map((anim, i) => (
                                <motion.span
                                  key={anim.id}
                                  initial={{ opacity: 1, y: 0, scale: 1, x: (i % 3 - 1) * 10 }}
                                  animate={{ opacity: 0, y: -30, scale: 1.3 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.5 }}
                                  className={`absolute -top-2 right-0 text-lg font-bold drop-shadow-lg pointer-events-none ${anim.type === '+1' ? 'text-emerald-400' : 'text-red-400'}`}
                                  style={{ textShadow: '0 0 10px currentColor, 0 0 20px currentColor' }}
                                >
                                  {anim.type}
                                </motion.span>
                              ))}
                            </AnimatePresence>
                          </div>
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
const SouvenirsSection = ({ cart, onToggleCart, onRemoveFromCart, onChangeQty, onImageClick, imageSize = 'small', t }) => {
  const items = React.useMemo(() => getSouvenirItems(t), [t]);
  const [floatingAnims, setFloatingAnims] = useState([]);

  const handleAdd = (e, item, key) => {
    e.stopPropagation();
    onToggleCart?.(item);
    const animId = Date.now() + Math.random();
    setFloatingAnims(prev => [...prev, { id: animId, key, type: '+1' }]);
    setTimeout(() => {
      setFloatingAnims(prev => prev.filter(a => a.id !== animId));
    }, 600);
  };

  const handleRemove = (e, item, key) => {
    e.stopPropagation();
    const cartItem = cart?.[key];
    if (cartItem) {
      if ((cartItem.qty || 1) <= 1) {
        onRemoveFromCart?.(item);
      } else {
        onChangeQty?.(cartItem, -1);
      }
      const animId = Date.now() + Math.random();
      setFloatingAnims(prev => [...prev, { id: animId, key, type: '-1' }]);
      setTimeout(() => {
        setFloatingAnims(prev => prev.filter(a => a.id !== animId));
      }, 600);
    }
  };
  
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
          {items.map((item, index) => {
            const key = buildCartKey('souvenir', item.id, item.image);
            const cartItem = cart?.[key];
            const qty = cartItem?.qty || 0;
            const souvenirItem = {
              section: 'souvenir',
              souvenirId: item.id,
              imageUrl: item.image,
              titleZh: item.titleZh,
              titleEn: item.titleEn,
            };
            return (
              <motion.div
                key={item.id}
                className="group"
              >
                <div className={`relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-3xl overflow-hidden border ${qty > 0 ? 'border-amber-500/50' : 'border-white/10'} hover:border-amber-500/50 transition-all duration-500`}>
                  <div
                    className="relative aspect-square overflow-hidden cursor-pointer"
                    onClick={() => onImageClick?.(souvenirItem)}
                  >
                    <img
                      src={item.image}
                      alt={item.titleEn}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Control buttons - top right */}
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      {/* Minus button - only show if qty > 0 */}
                      {qty > 0 && (
                        <button
                          type="button"
                          onClick={(e) => handleRemove(e, souvenirItem, key)}
                          className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center text-lg font-bold hover:bg-black/80 transition-colors"
                        >
                          −
                        </button>
                      )}
                      
                      {/* Plus/Qty button */}
                      <button
                        type="button"
                        onClick={(e) => handleAdd(e, souvenirItem, key)}
                        className={`min-w-[32px] h-8 px-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center text-sm font-bold hover:bg-black/80 transition-colors ${qty > 0 ? 'text-amber-300' : ''}`}
                      >
                        {qty > 0 ? qty : '+'}
                      </button>
                      
                      {/* Floating +1/-1 animations - MMORPG style (multiple) */}
                      <AnimatePresence>
                        {floatingAnims.filter(a => a.key === key).map((anim, i) => (
                          <motion.span
                            key={anim.id}
                            initial={{ opacity: 1, y: 0, scale: 1, x: (i % 3 - 1) * 10 }}
                            animate={{ opacity: 0, y: -30, scale: 1.3 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className={`absolute -top-2 right-0 text-lg font-bold drop-shadow-lg pointer-events-none ${anim.type === '+1' ? 'text-emerald-400' : 'text-red-400'}`}
                            style={{ textShadow: '0 0 10px currentColor, 0 0 20px currentColor' }}
                          >
                            {anim.type}
                          </motion.span>
                        ))}
                      </AnimatePresence>
                    </div>
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

// Navigation Component (re-designed, non-sticky, no CN logo)
const Navigation = ({ currentLang, setCurrentLang, t }) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  return (
    <header className="w-full bg-black">
      {/* แถวบน: ชื่อเว็บ + เปลี่ยนภาษา */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-amber-300 text-sm sm:text-base font-thai-display">
            {t?.header?.title || 'Longshan Temple Amulets'}
          </span>
          <span className="text-[11px] sm:text-xs text-white/60">
            {t?.header?.subtitle || 'Amulet selection helper & prayer guide'}
          </span>
        </div>

        {/* Language selector */}
        <div className="relative">
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 transition-colors"
          >
            <Globe className="w-4 h-4 text-amber-300" />
            <span className="text-xs sm:text-sm text-white/90">
              {languages.find(l => l.code === currentLang)?.flag}
            </span>
          </button>

          <AnimatePresence>
            {langMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute right-0 mt-2 min-w-[160px] bg-gray-900 border border-white/10 rounded-xl overflow-hidden shadow-xl z-50"
              >
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 flex items-center gap-2 text-left text-sm transition-colors ${
                      currentLang === lang.code
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-xs sm:text-sm font-medium">{lang.name}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* แถวล่าง: เครดิตแหล่งข้อมูล */}
      <div className="px-3 sm:px-4 pb-3 font-thai-legal">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black/85 border border-amber-500/40 rounded-lg px-3 py-2 text-[11px] sm:text-xs text-white/70 text-center">
            {t?.footer?.dataSource || 'Content and images referenced from:'}{' '}
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
    </header>
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
                <h3 className="text-amber-400 font-serif text-xl">{t?.footer?.templeName || '艋舺龍山寺'}</h3>
                <p className="text-white/50 text-sm">{t?.footer?.templeNameEn || 'Monga Longshan Temple'}</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed font-thai-body">
              {t?.footer?.templeDescription || 'Founded in 1738, Longshan Temple is one of Taiwan\'s most important and beautiful temples, dedicated to Guanyin, the Goddess of Mercy.'}
            </p>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-thai-display">{t?.footer?.visitUs || 'Visit Us'}</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="w-5 h-5 text-amber-400 mt-0.5" />
                <span>{t?.footer?.address || 'No. 211, Guangzhou Street, Wanhua District, Taipei City 108, Taiwan'}</span>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <Phone className="w-5 h-5 text-amber-400" />
                <span>+886 2 2302 5162</span>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <Clock className="w-5 h-5 text-amber-400" />
                <span>{t?.footer?.openingHours || '6:00 AM - 10:00 PM Daily'}</span>
              </div>
            </div>
          </div>

          {/* Open Source & Site Owner */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-thai-display">{t?.footer?.openSource || 'Open Source Project'}</h4>
            <div className="space-y-3">
              <p className="text-white/60 text-sm">
                {t?.footer?.openSourceDesc || 'This is an open source project. Feel free to use and contribute.'}
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/HydrogenB/LhongshanTemple-SocialProject"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-amber-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  <span className="text-sm">GitHub</span>
                </a>
              </div>
              <div className="pt-2">
                <p className="text-white/50 text-xs mb-1">{t?.footer?.siteOwner || 'Site Owner'}</p>
                <a
                  href="https://www.linkedin.com/in/jirads/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium"
                >
                  Jirad Srirattana-arporn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Credit & disclaimer */}
        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/60 space-y-2 font-thai-legal">
          <p>
            {t?.footer?.disclaimer || 'This website is created to help devotees conveniently select and note amulets. It is not the official temple website.'}
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
      </div>
    </footer>
  );
};

// Supported language codes
const SUPPORTED_LANGS = ['en', 'zh', 'th', 'ja', 'ko'];

// Detect initial language from query param, localStorage, browser locale, or timezone
const detectInitialLang = () => {
  // 1. Check query param ?lang=XX
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const queryLang = params.get('lang')?.toLowerCase();
    if (queryLang) {
      // Map common aliases
      const langMap = { 'tw': 'zh', 'cn': 'zh', 'jp': 'ja', 'kr': 'ko', 'us': 'en' };
      const mapped = langMap[queryLang] || queryLang;
      if (SUPPORTED_LANGS.includes(mapped)) return mapped;
    }
  }

  // 2. Check localStorage for previously selected language
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('longshan-lang');
    if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
  }

  // 3. Use browser language
  if (typeof navigator !== 'undefined') {
    const browserLang = (navigator.language || '').toLowerCase();
    if (browserLang.startsWith('th')) return 'th';
    if (browserLang.startsWith('ja')) return 'ja';
    if (browserLang.startsWith('ko')) return 'ko';
    if (browserLang.startsWith('zh')) return 'zh';
  }

  // 4. Special rule by timezone (e.g., Taiwan timezone → English for tourists)
  if (typeof Intl !== 'undefined') {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Taipei')) return 'en';
  }

  // 5. Default to Thai (primary target audience)
  return 'th';
};

// Main App Component
function App() {
  const [currentLang, setCurrentLang] = useState(() => detectInitialLang());
  const [cart, setCart] = useState({});
  const [previewItem, setPreviewItem] = useState(null);
  // Default: large on PC, medium on mobile
  const [imageSize, setImageSize] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return 'medium';
    }
    return 'large';
  });

  // Persist language choice to localStorage
  useEffect(() => {
    localStorage.setItem('longshan-lang', currentLang);
  }, [currentLang]);

  const translation = getTranslation(currentLang);

  const handleToggleCart = (item) => {
    const baseId = item.categoryId || item.souvenirId || item.categoryTitleEn || item.titleEn || 'item';
    const key = buildCartKey(item.section, baseId, item.imageUrl);
    setCart(prev => {
      const next = { ...prev };
      if (next[key]) {
        // Item exists - increase quantity instead of removing
        next[key] = { ...next[key], qty: (next[key].qty || 1) + 1 };
      } else {
        // New item - add with qty 1
        next[key] = { ...item, key, qty: 1 };
      }
      return next;
    });
  };

  const handleRemoveFromCart = (item) => {
    const baseId = item.categoryId || item.souvenirId || item.categoryTitleEn || item.titleEn || 'item';
    const key = item.key || buildCartKey(item.section, baseId, item.imageUrl);
    setCart(prev => {
      const next = { ...prev };
      delete next[key];
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

      
      <HeroSection heroText={translation.hero} currentLang={currentLang} t={translation} />
      
      <Global1738Section currentLang={currentLang} t={translation} />
      
      <BlessingsSection
        cart={cart}
        onToggleCart={handleToggleCart}
        onRemoveFromCart={handleRemoveFromCart}
        onChangeQty={handleChangeQty}
        onImageClick={handleImageClick}
        imageSize={imageSize}
        setImageSize={setImageSize}
        t={translation}
        currentLang={currentLang}
      />
      
      <SouvenirsSection
        cart={cart}
        onToggleCart={handleToggleCart}
        onRemoveFromCart={handleRemoveFromCart}
        onChangeQty={handleChangeQty}
        onImageClick={handleImageClick}
        imageSize={imageSize}
        t={translation}
      />
      
      <div id="temple-guide" className="scroll-mt-16">
        <TempleGuide t={translation} />
      </div>
      
      <Footer t={translation} />
      
      <FloatingNav t={translation} currentLang={currentLang} />

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
        onRemoveFromCart={handleRemoveFromCart}
        onChangeQty={handleChangeQty}
        onClearCart={handleClearCart}
        imageSize={imageSize}
        t={translation}
        currentLang={currentLang}
      />
    </div>
  );
}

export default App;
