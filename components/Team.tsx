import TeamMember from "./TeamMember";

export default function Team() {
  return (
    <section id="ekibimiz" className="scroll-mt-24 max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-blue-900 mb-10 text-center">
        Ekibimiz
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        <TeamMember
          name="Ayda IŞIKALP CELBİŞ"
          title="Kurucu Ortak"
          image="/ayda.jpg"
          linkedin="https://www.linkedin.com/in/ayda-celbi%C5%9F-050b9039//"
          email="ayda@fiftyplusteam.com"
          phone="0532 414 28 19"
          about={[
            "Ayda IŞIKALP CELBİŞ, 1971 yılında Bursa’da doğmuştur. Marmara Üniversitesi İktisadi ve İdari Bilimler Fakültesi mezunudur.",
            "23 yıl boyunca tekstil sektöründe çalıştıktan sonra, 2019 yılında gayrimenkul alanında profesyonel kariyerine adım atmıştır.",
            "Lüks konut, ticari mülk alım-satımı ve portföy yönetimi konularında uzmanlaşmış olan CELBİŞ, yüksek iletişim becerisi ve etik değerlere bağlı çalışma tarzı ile güvenilir hizmet sunmaktadır."
          ]}
          
        />
        <TeamMember
          name="Oral BİLGÜTAY"
          title="Kurucu Ortak"
          image="/oral.jpg"
          linkedin="https://www.linkedin.com/in/oral-bilg%C3%BCtay-38998385/"
          email="oral@fiftyplusteam.com"
          phone="0533 533 75 75"
          about={[
            "Oral BİLGÜTAY, 1968 yılında Bursa’da doğmuştur. Uludağ Üniversitesi İktisadi ve İdari Bilimler Fakültesi mezunudur.",
            "Uzun yıllar turizm sektöründe edindiği deneyimin ardından, 2018 yılında gayrimenkul alanına geçiş yapmıştır.",
            "Tarla, arsa, konut ve ticari mülk alım-satımı, kiralama, portföy yönetimi ve kat karşılığı arabuluculuk konularında uzmandır.",
            "Farklı müşteri profilleriyle güçlü iletişim kurabilen ve dürüstlük ilkesine sıkı sıkıya bağlı bir profesyoneldir. 2023 yılından itibaren Ayda IŞIKALP CELBİŞ ile birlikte çalışmaktadır."
          ]}
          
        />
      </div>
    </section>
  );
}
