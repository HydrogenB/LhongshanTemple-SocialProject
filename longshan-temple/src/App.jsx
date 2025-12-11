import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Shield, Car, GraduationCap, Baby, Dog, Stethoscope, 
  Briefcase, Store, Smile, Sparkles, HeartHandshake, BookOpen,
  ChevronDown, ChevronUp, Globe, X, ZoomIn, CreditCard, MapPin,
  Phone, Clock, Star, Menu, ArrowUp, ShoppingCart, Check, Plus, Minus
} from 'lucide-react';

import TempleGuide from './TempleGuide.jsx';
import { languages, getTranslation } from './locales.js';

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

// Approximate founding date of Longshan Temple (adjust if official date is known)
const FOUNDING_DATE = new Date(1738, 0, 1);

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
// Temple blessing categories data
const blessingCategories = [
  {
    id: 'family',
    icon: Shield,
    titleZh: '家內安全',
    titleEn: 'Family Safety',
    titleTh: 'ปลอดภัยทั้งครอบครัว',
    description: 'Sacred charms to protect your entire household from harm and misfortune.',
    color: 'from-amber-600 to-yellow-500',
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
    id: 'traffic',
    icon: Car,
    titleZh: '交通安全',
    titleEn: 'Traffic Safety',
    titleTh: 'ความปลอดภัยการจราจร',
    description: 'Divine protection for safe travels on all your journeys.',
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
    id: 'study',
    icon: GraduationCap,
    titleZh: '學業考試',
    titleEn: 'Academic Success',
    titleTh: 'การศึกษา',
    description: 'Blessings for wisdom, focus, and success in examinations.',
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
    titleZh: '安產',
    titleEn: 'Safe Pregnancy',
    titleTh: 'สตรีมีครรภ์และความปลอดภัยของทารก',
    description: 'Divine protection for expecting mothers and newborns.',
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
    titleZh: '求子',
    titleEn: 'Fertility Blessing',
    titleTh: 'ตั้งครรภ์ได้',
    description: 'Sacred prayers for those hoping to conceive a child.',
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
    titleEn: 'Pet Protection',
    titleTh: 'สัตว์เลี้ยง',
    description: 'Blessings for the health and safety of your beloved pets.',
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
    titleEn: 'General Protection',
    titleTh: 'ช่วยเหลือ',
    description: 'All-purpose protection charms for peace and safety.',
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
    id: 'health',
    icon: Stethoscope,
    titleZh: '健康',
    titleEn: 'Health & Wellness',
    titleTh: 'สุขภาพแข็งแรง',
    description: 'Divine blessings for physical health and recovery.',
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
    titleEn: 'Career Success',
    titleTh: 'การงาน',
    description: 'Blessings for job seekers and career advancement.',
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
    titleEn: 'Business Prosperity',
    titleTh: 'การค้า',
    description: 'Sacred charms for business success and wealth.',
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
    titleTh: 'มีความสุข',
    description: 'Blessings for joy and contentment in life.',
    color: 'from-yellow-500 to-orange-400',
    images: [
      'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/054b.jpg',
    ]
  },
  {
    id: 'luck',
    icon: Sparkles,
    titleZh: '福氣',
    titleEn: 'Good Fortune',
    titleTh: 'โชคดี',
    description: 'Attract good luck and positive energy into your life.',
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
    titleEn: 'Love & Romance',
    titleTh: 'ความรัก',
    description: 'Divine blessings for finding and nurturing true love.',
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

const souvenirItems = [
  {
    id: 'photobook',
    titleEn: 'Photograph Collection',
    titleZh: '龍山寺攝影集',
    image: 'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/305b.jpg',
    description: 'Photograph Collection of Longshan Temple.'
  },
  {
    id: 'scroll',
    titleEn: 'Hanging Scroll of Heart Sutra',
    titleZh: '心經掛軸',
    image: 'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/288.jpg',
    description: 'Hanging Scroll of Heart Sutra.'
  },
  {
    id: 'moonblocks',
    titleEn: 'Moon Blocks',
    titleZh: '筊杯',
    image: 'https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/sg_imgs/082.jpg',
    description: 'Moon Blocks used in temple worship.'
  },

];

// Hero Section Component
const HeroSection = ({ heroText, currentLang }) => {
  const founding = useFoundingDuration();
  return (
    <section className="relative w-full min-h-[450px] max-h-[520px] flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Photo layer */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="https://www.thaifly.com/image/catalog/article/Taiwan/SUN/longshan-temple/longshan-temple%203.jpg"
          alt="Longshan Temple hero"
          className="max-w-[895px] max-h-[450px] w-full h-auto object-contain opacity-80"
          loading="lazy"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90 z-10" />

      {/* Animated temple pattern overlay */}
      <div className="absolute inset-0 opacity-10 z-10">
        <div className="absolute inset-0 bg-repeat" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <motion.div className="mb-6">
          <span className="inline-block px-6 py-2 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 backdrop-blur-sm border border-amber-500/30 rounded-full text-amber-400 text-sm tracking-widest uppercase">
            {heroText?.tagline || "Taiwan's Most Sacred Temple"}
          </span>
        </motion.div>

        <motion.h1 className="font-serif text-glow">
          <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent mb-4">
            艋舺龍山寺
          </span>
          <span className="block text-lg sm:text-2xl md:text-3xl text-white/90 font-light tracking-[0.2em]">
            LONGSHAN TEMPLE
          </span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto mt-6 leading-relaxed"
        >
          Discover sacred blessings and authentic temple souvenirs from Taiwan's most revered temple, 
          standing since 1738.
        </motion.p>
        <div className="mt-2 text-sm text-amber-200">
          ก่อตั้งมาแล้วประมาณ {founding.years} ปี {founding.months} เดือน {founding.days} วัน
        </div>
      </div>
    </section>
  );
};

// Cart summary bar (local cart for selected amulets)
const CartBar = ({ cart, onToggleCart, onChangeQty, onClearCart, imageSize = 'small' }) => {
  const items = Object.values(cart || {});
  const totalPieces = items.reduce((sum, item) => sum + (item.qty || 1), 0);
  const [open, setOpen] = useState(false);

  if (!items.length) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[calc(100%-2rem)] sm:w-auto sm:left-4 sm:translate-x-0">
      <div className="bg-black/90 border border-amber-500/40 rounded-2xl px-4 py-3 shadow-lg shadow-amber-500/30">
        <button
          type="button"
          onClick={() => setOpen(prev => !prev)}
          className="flex items-center justify-between gap-3 w-full"
        >
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-amber-400" />
            <span className="text-sm text-white/90">
              เลือกไว้ <span className="font-semibold text-amber-300">{totalPieces}</span> ชิ้น
              <span className="text-white/50 text-[11px] ml-1">({items.length} รายการ)</span>
            </span>
          </div>
          <ChevronUp
            className={`w-4 h-4 text-white/60 transition-transform ${open ? '' : 'rotate-180'}`}
          />
        </button>

        {open && (
          <div className="mt-3 max-h-64 overflow-y-auto text-xs sm:text-sm text-white/80 space-y-2">
            {items.map(item => {
              const code = item.imageUrl?.split('/').pop();
              const isBlessing = item.section === 'blessing';
              const tagText = isBlessing
                ? `ช่วยเรื่อง: ${item.categoryTitleTh || item.categoryTitleEn || ''}`
                : 'ช่วยเรื่อง: ของที่ระลึกจากวัด';
              return (
                <div
                  key={item.key}
                  className="flex items-start justify-between gap-2 border-t border-white/10 pt-2 first:border-t-0 first:pt-0"
                >
                  <div className="flex items-start gap-2">
                    <div className={`${summaryThumbSize[imageSize]} rounded-xl overflow-hidden bg-white/90 shrink-0`}>
                      <img
                        src={item.imageUrl}
                        alt={item.categoryTitleEn || item.titleEn || 'Selected amulet'}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <div className="text-amber-300">
                        {isBlessing ? item.categoryTitleZh : item.titleZh}
                      </div>
                      <div>
                        {isBlessing ? item.categoryTitleEn : item.titleEn}
                      </div>
                      {isBlessing && item.categoryTitleTh && (
                        <div className="text-white/60">
                          {item.categoryTitleTh}
                        </div>
                      )}
                      {code && (
                        <div className="text-white/40 mt-0.5">
                          Code: {code}
                        </div>
                      )}
                      <div className="mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/40 text-[10px] text-amber-200">
                          {tagText}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onChangeQty?.(item, -1)}
                        disabled={(item.qty || 1) <= 1}
                        className="w-6 h-6 flex items-center justify-center rounded-full border border-white/30 text-white/70 hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-transparent"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-white/90 text-xs">
                        x{item.qty || 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => onChangeQty?.(item, 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full border border-white/30 text-white/70 hover:bg-white/10"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => onToggleCart(item)}
                      className="px-2 py-1 rounded-full border border-white/30 text-[11px] text-white/70 hover:bg-white/10"
                    >
                      ลบรายการ
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-white/50">
              <span>
                ใช้หน้านี้เพื่อจดรหัสและชื่อเครื่องรางใส่กระดาษ แล้วนำไปให้เจ้าหน้าที่ที่วัด
              </span>
              <button
                type="button"
                onClick={onClearCart}
                className="shrink-0 px-3 py-1 rounded-full border border-amber-400 text-amber-300 hover:bg-amber-500/10"
              >
                Clear all
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
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
            <h3 className="text-xl sm:text-2xl font-serif text-amber-400 mb-1">{category.titleZh}</h3>
            <h4 className="text-base sm:text-lg text-white/90 font-medium">{category.titleEn}</h4>
          </div>

          <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
            {category.description}
          </p>

          {/* Thumbnails catalog */}
          <div className="mt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-white/50">All items in this blessing</span>
              <span className="text-[11px] text-white/60">{category.images.length} items</span>
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
const BlessingsSection = ({ cart, onToggleCart, onImageClick, imageSize = 'small', setImageSize }) => {
  return (
    <section id="blessings" className="py-16 px-4 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div className="text-center mb-10 sm:mb-12">
          <span className="inline-block px-4 py-1 bg-amber-500/10 rounded-full text-amber-400 text-sm tracking-wider uppercase mb-4">
            Sacred Collection
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-3">
            Temple <span className="text-amber-400">Blessings</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base">
            Layout inspired by the official Longshan Temple catalog: each row shows one blessing type and all related blessed items clearly.
          </p>
          {/* Image size selector */}
          {setImageSize && (
            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-white/60">
              <span className="mr-1">ขนาดรูป:</span>
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
                  {size === 'small' && 'เล็ก'}
                  {size === 'medium' && 'กลาง'}
                  {size === 'large' && 'ใหญ่'}
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
                  <span className="text-white/80 text-xs sm:text-sm">
                    {category.titleEn}
                  </span>
                  <span className="text-white/60 text-[11px] sm:text-xs">
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
const SouvenirsSection = ({ cart, onToggleCart, onImageClick, imageSize = 'small' }) => {
  return (
    <section id="souvenirs" className="py-16 px-4 sm:py-20 lg:py-24 bg-gradient-to-b from-transparent via-amber-900/10 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-amber-500/10 rounded-full text-amber-400 text-sm tracking-wider uppercase mb-4">
            Exclusive Items
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Temple <span className="text-amber-400">Souvenirs</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Take home a piece of Longshan Temple's rich heritage with these beautifully crafted souvenirs.
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
                    <h3 className="text-lg font-serif text-amber-400">{item.titleZh}</h3>
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
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
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

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#blessings" className="text-white/70 hover:text-amber-400 transition-colors">{t?.nav?.blessings || 'Blessings'}</a>
          <a href="#souvenirs" className="text-white/70 hover:text-amber-400 transition-colors">{t?.nav?.souvenirs || 'Souvenirs'}</a>
          <a href="#temple-guide" className="text-white/70 hover:text-amber-400 transition-colors">{t?.nav?.templeGuide || 'Temple Guide'}</a>
          <a href="#about" className="text-white/70 hover:text-amber-400 transition-colors">{t?.nav?.about || 'About'}</a>
          
          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Globe className="w-4 h-4 text-amber-400" />
              <span className="text-white/70">{languages.find(l => l.code === currentLang)?.flag}</span>
            </button>
            
            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 bg-gray-900 border border-white/10 rounded-xl overflow-hidden shadow-xl"
                >
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2 flex items-center gap-2 hover:bg-white/10 transition-colors ${
                        currentLang === lang.code ? 'bg-amber-500/20 text-amber-400' : 'text-white/70'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-4">
              <a href="#blessings" className="block text-white/70 hover:text-amber-400" onClick={() => setIsOpen(false)}>{t?.nav?.blessings || 'Blessings'}</a>
              <a href="#souvenirs" className="block text-white/70 hover:text-amber-400" onClick={() => setIsOpen(false)}>{t?.nav?.souvenirs || 'Souvenirs'}</a>
              <a href="#temple-guide" className="block text-white/70 hover:text-amber-400" onClick={() => setIsOpen(false)}>{t?.nav?.templeGuide || 'Temple Guide'}</a>
              <a href="#about" className="block text-white/70 hover:text-amber-400" onClick={() => setIsOpen(false)}>{t?.nav?.about || 'About'}</a>
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang.code);
                      setIsOpen(false);
                    }}
                    className={`px-3 py-1 rounded-full text-sm ${
                      currentLang === lang.code 
                        ? 'bg-amber-500 text-black' 
                        : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {lang.flag} {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Footer Component
const Footer = () => {
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
            <p className="text-white/60 text-sm leading-relaxed">
              Founded in 1738, Longshan Temple is one of Taiwan's most important and beautiful temples, 
              dedicated to Guanyin, the Goddess of Mercy.
            </p>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Visit Us</h4>
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
            <h4 className="text-white font-semibold mb-4">Features</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Star className="w-4 h-4 text-amber-400" />
                <span>Authentic Temple Blessings</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span>Credit Card Accepted</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Globe className="w-4 h-4 text-amber-400" />
                <span>Multi-language Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Credit & disclaimer */}
        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/60 space-y-2">
          <p>
            เครื่องมือเลือกเครื่องรางหน้านี้จัดทำขึ้นเพื่อช่วยให้ผู้ศรัทธาเลือกและจดรายการได้สะดวกขึ้น
            ไม่ใช่เว็บไซต์อย่างเป็นทางการของวัด
          </p>
          <p>
            ข้อมูลเนื้อหาและรูปภาพอ้างอิงและดึงมาจากเว็บไซต์ทางการของวัด:
            {" "}
            <a
              href="https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t.php#"
              className="text-amber-300 underline underline-offset-2"
              target="_blank"
              rel="noreferrer"
            >
              https://lungshan.org.tw/...
            </a>
            {" "}
            ซึ่งยังคงเป็นแหล่งข้อมูลทางการและอัปเดตล่าสุดเสมอ
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center text-white/40 text-sm">
          <p>© 2024 Monga Longshan Temple. All sacred items are blessed at the temple.</p>
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

  return (
    <div className="min-h-screen">
      <Navigation currentLang={currentLang} setCurrentLang={setCurrentLang} t={translation} />

      {/* Top-level credit & disclaimer bar */}
      <div className="mt-16 md:mt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black/80 border border-amber-500/40 rounded-xl px-3 py-2 text-[11px] sm:text-xs text-white/70 text-center">
            ข้อมูลเนื้อหาและรูปภาพอ้างอิงและดึงมาจากเว็บไซต์ทางการของวัด:
            {' '}
            <a
              href="https://lungshan.org.tw/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t/S2i0g1h9t1s1e2e1i1n2g0G0i0f0t.php#"
              target="_blank"
              rel="noreferrer"
              className="text-amber-300 underline underline-offset-2"
            >
              https://lungshan.org.tw/...
            </a>
            {' '}
            ซึ่งยังคงเป็นแหล่งข้อมูลทางการและอัปเดตล่าสุดเสมอ
          </div>
        </div>
      </div>
      
      <HeroSection heroText={translation.hero} currentLang={currentLang} />
      
      <BlessingsSection
        cart={cart}
        onToggleCart={handleToggleCart}
        onImageClick={handleImageClick}
        imageSize={imageSize}
        setImageSize={setImageSize}
      />
      
      <SouvenirsSection
        cart={cart}
        onToggleCart={handleToggleCart}
        onImageClick={handleImageClick}
        imageSize={imageSize}
      />
      
      <TempleGuide />
      
      <Footer />
      
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
                <div className="w-full text-center text-white/80 text-sm space-y-1">
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
      />
    </div>
  );
}

export default App;
