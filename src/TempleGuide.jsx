import React from 'react';
import { MapPin, Train, Info, Heart, Shield, BookOpenCheck, Compass, Navigation } from 'lucide-react';

const TempleGuide = () => {
  return (
    <section id="temple-guide" className="py-16 px-4 bg-black/40 border-t border-white/10 font-thai-body">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Title & intro */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-4">
            โปรไฟล์วัดหลงซาน
          </h2>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            หน้านี้คือคู่มือย่อสำหรับผู้ที่อยากไปไหว้จริงที่วัดหลงซาน พร้อมเลือกเครื่องรางให้ตรงโจทย์
            โดยข้อมูลอ้างอิงจากเว็บไซต์ทางการของวัด แหล่งท่องเที่ยว และบทความไต้หวัน/สากล
          </p>
        </div>

        {/* Overview + info box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 space-y-4 text-sm sm:text-base text-white/80">
            <h3 className="text-xl font-semibold text-amber-300 mb-1">
              วัดหลงซานคือที่ไหน เหมาะกับใคร
            </h3>
            <p>
              วัดหลงซาน (艋舺龍山寺 / Mengjia Longshan Temple) เป็นหนึ่งในวัดเก่าแก่ที่สุดของไทเป
              สร้างขึ้นตั้งแต่ปี 1738 โดยชาวอพยพจากมณฑลฝูเจี้ยนเพื่อบูชาเจ้าแม่กวนอิม
              และปัจจุบันเป็นศูนย์รวมเทพทั้งสายพุทธ เต๋า และความเชื่อพื้นบ้านไว้ในวัดเดียว
            </p>
            <p>
              วัดเคยได้รับความเสียหายจากไฟไหม้ แผ่นดินไหว และการทิ้งระเบิดช่วงสงครามโลกครั้งที่ 2
              แต่ชาวไทเปช่วยกันบูรณะจนกลายเป็นโบราณสถานระดับชาติของไต้หวันในปัจจุบัน
            </p>
            <p>
              จุดเด่นสำคัญสำหรับผู้มาเยือน โดยเฉพาะคนไทย คือ
              
              ศาลเยวี่ยเหล่า (เทพคู่ครอง)
              และเครื่องรางหลากหลายแบบที่เลือกได้ตามเป้าหมายชีวิต
              เช่น ความรัก สุขภาพ การงาน ความปลอดภัยในการเดินทาง และอื่น ๆ
            </p>
          </div>

          {/* Info box */}
          <aside className="md:col-span-1 bg-black/70 border border-white/15 rounded-2xl p-4 space-y-3 text-xs sm:text-sm text-white/80">
            <div className="flex items-center gap-2 mb-1">
              <Info className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-amber-300">ข้อมูลพื้นฐาน</span>
            </div>
            <div>
              <div className="text-white font-semibold">วัดหลงซาน (艋舺龍山寺)</div>
              <div className="text-white/70 text-xs">Mengjia Longshan Temple</div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-amber-400" />
              <div>
                No. 211, Guangzhou St., Wanhua District,
                <br />
                Taipei City, Taiwan
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Train className="w-4 h-4 mt-0.5 text-amber-400" />
              <div>
                MRT Longshan Temple Station (BL10)
                <br />
                ทางออก 5 เดินไม่กี่นาทีถึงหน้าวัด
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Compass className="w-4 h-4 mt-0.5 text-amber-400" />
              <div>
                เวลาเปิดโดยทั่วไป ~06:00–21:30/22:00
                <br />
                แนะนำเช็ก Google Maps / เว็บวัดอีกครั้งก่อนเดินทาง
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Navigation className="w-4 h-4 mt-0.5 text-amber-400" />
              <div>
                ค่าเข้า: <span className="text-emerald-300 font-semibold">ฟรี</span>
              </div>
            </div>
            <a
              href="https://goo.gl/maps/aLPqpvcs6y2HvkpB9"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-full mt-1 px-3 py-2 rounded-lg bg-amber-500 text-black text-xs font-semibold hover:bg-amber-400 transition-colors"
            >
              เปิดใน Google Maps
            </a>
          </aside>
        </div>

        {/* Main zones & what to ask */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-amber-300 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            โซนหลักในวัด & เรื่องที่เหมาะขอ
          </h3>
          <p className="text-white/70 text-sm sm:text-base">
            โครงสร้างภายในวัดหลงซานมีหลายศาล/ฮอลล์สำคัญ
            ด้านล่างนี้คือสรุปโซนที่เกี่ยวข้องกับหมวดเครื่องรางบนเว็บของคุณ
            เพื่อให้ผู้ใช้เข้าใจว่า "ควรไปไหว้ตรงไหน ถ้าจะเลือกเครื่องรางแบบนี้".
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-white/80">
            <div className="bg-black/70 border border-white/10 rounded-2xl p-4 space-y-1">
              <div className="font-semibold text-amber-300">ประตูมังกร & ลานหน้า</div>
              <div className="text-white/70">Step 0: มารยาทก่อนเข้าวัด</div>
              <p>
                เข้าทางประตูมังกรด้านขวา ออกทางประตูเสือด้านซ้ายเมื่อเผชิญหน้าวิหารหลัก
                และไม่เหยียบธรณีประตู เป็นการเริ่มต้นทำความเคารพก่อนเข้าวัด
              </p>
            </div>

            <div className="bg-black/70 border border-white/10 rounded-2xl p-4 space-y-1">
              <div className="font-semibold text-amber-300">ศาลาหน้า (三川殿)</div>
              <div className="text-white/70">ตั้งหลักขอพรภาพรวมชีวิต</div>
              <p>
                มีเจ้าแม่กวนอิมและพระโพธิสัตว์ 3 องค์ เป็นจุดเริ่มต้นขอพรเรื่องภาพรวมชีวิต ครอบครัว
                การเดินทาง ให้ผู้ใช้ทุกคนเริ่มไหว้ที่นี่ก่อน แล้วจึงค่อยเลือกหมวดเครื่องรางเฉพาะทาง.
              </p>
            </div>

            <div className="bg-black/70 border border-white/10 rounded-2xl p-4 space-y-1">
              <div className="font-semibold text-amber-300">ศาลาหลวง (正殿)</div>
              <div className="text-white/70">เจ้าแม่กวนอิม – คุ้มครองใหญ่ ๆ</div>
              <p>
                เน้นขอเรื่องคุ้มครองทั้งชีวิต ปัดเป่าปัญหา อุบัติเหตุ
                ในเว็บเครื่องรางสามารถผูกกับหมวด "ความปลอดภัย/平安" และเครื่องรางกันภัยภาพรวม.
              </p>
            </div>

            <div className="bg-black/70 border border-white/10 rounded-2xl p-4 space-y-1">
              <div className="font-semibold text-amber-300">เงยหน้าขอฟ้า (Jade Emperor)</div>
              <div className="text-white/70">ดวงโดยรวม การงาน การเงิน</div>
              <p>
                หลังไหว้ศาลาหลวงให้หันออกมาลานหน้าแล้วเงยหน้าขอพรต่อเทพหยก (天公)
                ผูกกับหมวด "ขอเฮง/โชคดีรวม ๆ" และเครื่องรางด้านโชคลาภ.
              </p>
            </div>

            <div className="bg-black/70 border border-white/10 rounded-2xl p-4 space-y-1">
              <div className="font-semibold text-amber-300">ฮอลล์หมอฮั่วถัว (華佗廳)</div>
              <div className="text-white/70">สุขภาพ การรักษา การผ่าตัด</div>
              <p>
                เหมาะขอพรเรื่องสุขภาพ การผ่าตัด การฟื้นตัวจากโรค
                แม็ปกับหมวดเครื่องราง "สุขภาพ" และเครื่องรางประเภทถุงความปลอดภัย.
              </p>
            </div>

            <div className="bg-black/70 border border-white/10 rounded-2xl p-4 space-y-1">
              <div className="font-semibold text-amber-300">ศาลาเวิ่นฉาง (文昌帝君殿)</div>
              <div className="text-white/70">การเรียน สอบ งานใช้สมอง</div>
              <p>
                เหมาะสำหรับผู้ที่ต้องการเสริมเรื่องการเรียน การสอบ การเขียน หรือการทำงานสายออฟฟิศ
                ผูกกับหมวดเครื่องราง "การศึกษา/การสอบ".
              </p>
            </div>

            <div className="bg-black/70 border border-white/10 rounded-2xl p-4 space-y-1">
              <div className="font-semibold text-amber-300">ศาลาเจ้าแม่มาจู่ (天上聖母殿)</div>
              <div className="text-white/70">การเดินทาง/ความปลอดภัยบนถนน</div>
              <p>
                เหมาะขอเรื่องการเดินทางไกล การเดินทางทางทะเล และความปลอดภัยเวลาเดินทาง
                ผูกกับหมวดเครื่องราง "การเดินทาง/การขับรถ".
              </p>
            </div>

            <div className="bg-black/70 border border-white/10 rounded-2xl p-4 space-y-1">
              <div className="font-semibold text-amber-300">ศาลากวนตี้ (關聖帝君殿)</div>
              <div className="text-white/70">การงาน ธุรกิจ ความยุติธรรม</div>
              <p>
                กวนอูเป็นเทพแห่งความซื่อสัตย์ ความกล้าหาญ และความยุติธรรม
                เหมาะกับหมวด "ธุรกิจ/ความน่าเชื่อถือ/คดีความ" และเครื่องรางด้านการงาน.
              </p>
            </div>

            <div className="bg-black/70 border border-white/10 rounded-2xl p-4 space-y-1">
              <div className="font-semibold text-amber-300">ฮอลล์เยวี่ยเหล่า (月老廳)</div>
              <div className="text-white/70">ความรัก คู่ชีวิต ความสัมพันธ์</div>
              <p>
                จุดหมายหลักของคนไทยจำนวนมาก เน้นขอคู่ชีวิต ความรัก และความสัมพันธ์
                เชื่อมโดยตรงกับหมวดเครื่องราง "ความรัก/คนโสด/คู่แต่งงาน" บนเว็บของคุณ.
              </p>
            </div>
          </div>
        </div>

        {/* Short flow / love prayer */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-amber-300 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            ขั้นตอนไหว้ & ขอพรความรัก (เวอร์ชันย่อ)
          </h3>
          <p className="text-white/70 text-sm sm:text-base">
            ขั้นตอนด้านล่างเป็นสรุปแนวปฏิบัติที่พบในเว็บไซต์วัด บทความภาษาไต้หวัน และสื่อท่องเที่ยว
            คุณสามารถใช้เป็น flow ในหัวเพื่อเตรียมตัวไปไหว้จริงควบคู่กับเว็บช่วยเลือกเครื่องรางนี้.
          </p>
          <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-white/80">
            <li>
              <span className="font-semibold">ก่อนเริ่มไหว้:</span> เข้า "ประตูมังกร" ด้านขวา ออกทาง "ประตูเสือ" ด้านซ้าย
              ไม่เหยียบธรณีประตู ถ้าจะไหว้จริงจังสามารถซื้อธูป/ของไหว้จากร้านในวัดได้
            </li>
            <li>
              <span className="font-semibold">วิธีแนะนำตัว (ใช้ได้กับทุกเทพ):</span> กล่าวในใจ
              ชื่อ–นามสกุล, วันเดือนปีเกิด, ที่อยู่ และสิ่งที่ต้องการขออย่างชัดเจนไม่เว่อร์เกินจริง
            </li>
            <li>
              <span className="font-semibold">ลำดับการไหว้หลัก:</span> ศาลาหน้า → ศาลาหลวง → เงยหน้าขอฟ้า →
              เดินไปยังฮอลล์ด้านหลังตามหมวดที่ต้องการ (สุขภาพ การงาน ความรัก ฯลฯ)
            </li>
            <li>
              <span className="font-semibold">วิธีขอพรความรักกับเยวี่ยเหล่า (สำหรับคนโสด/คู่รัก):</span>
              ถวายของหวานเล็ก ๆ แนะนำตัวตามรูปแบบเดิม
              แล้วอธิบายลักษณะความรัก/คู่ชีวิตที่ต้องการ จากนั้นใช้ไม้เสี่ยงทาย (筊杯)
              ถามทีละคำถาม ถ้าได้คำตอบเห็นชอบครบ จึงหยิบ "เส้นแดงของเยวี่ยเหล่า" ที่หน้าแท่น
            </li>
            <li>
              <span className="font-semibold">ปิดจบ:</span> นำเส้นแดงหรือเครื่องรางที่ซื้อหมุนเหนือกระถางใหญ่
              ตามเข็มนาฬิกา 3 รอบ แล้วจึงนำกลับไปใช้จริง
            </li>
          </ol>
        </div>

        {/* Closing checklist */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-amber-300 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            เช็กลิสต์ปิดจบการเลือกเครื่องราง
          </h3>
          <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-white/80">
            <li>
              ไหว้ให้ครบตามลำดับหลัก
              (ศาลาหน้า → ศาลาหลวง → เงยหน้าขอฟ้า → ไปยังฮอลล์ด้านหลังที่ตรงกับคำขอของเรา)
            </li>
            <li>
              ถ้ามีพิธีเฉพาะจุด (เช่น ขอความรัก เส้นแดง เสี่ยงเซียมซี)
              ให้ทำตามป้ายหรือคำแนะนำของวัดให้ครบก่อน แล้วค่อยไปเลือกเครื่องราง
            </li>
            <li>
              ไปที่เคาน์เตอร์ เลือกเครื่องรางจากหมวดที่ตรงกับสิ่งที่ขอ
              ใช้หมวดบนเว็บนี้ช่วยเช็กชื่อหมวด/ประเภทให้ตรงกับโจทย์ของเราอีกครั้ง
            </li>
            <li>
              ชำระเงิน จากนั้นนำเครื่องรางไปวนเหนือกระถางธูปใหญ่ 3 รอบ พร้อมตั้งใจอธิษฐาน
              แล้วค่อยนำกลับไปพกติดตัว หรือมอบให้คนสำคัญที่เราตั้งใจซื้อให้
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TempleGuide;
