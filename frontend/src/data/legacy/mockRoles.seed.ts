import type { CharacterRole } from "@/types/role";

/**
 * Per-case mock role data. Simplified card structure (name, job,
 * relationship to victim, why-at-scene, 2-4 known clues, optional
 * secret) — rewritten in Egyptian Arabic after playtesting feedback.
 * Clues with `refersToRoleId` only make sense when that character is
 * actually in the game — see filterKnownClues (lib/session.ts), which
 * strips them out for smaller player counts. Secrets are authored for
 * only a few roles per case; which ones actually keep their secret in
 * a given session is decided at role-distribution time (see
 * applySecretProportionality), never all of them.
 */
export const LEGACY_MOCK_ROLES_BY_CASE: Record<string, CharacterRole[]> = {
  "case-01": [
    {
      id: "case-01-role-01",
      characterName: { ar: "ليلى حمدي", en: "Layla Hamdy" },
      occupation: { ar: "مدبرة المنزل", en: "Housekeeper" },
      relationshipToVictim: {
        ar: "شغالة عنده من تمن سنين وحاسة إنه زي أهلها",
        en: "She's worked for him for eight years and feels like family.",
      },
      whyAtScene: {
        ar: "كانت في الفيلا زي كل ليلة، هي اللي بتقفل الأبواب قبل النوم",
        en: "She was at the villa like every night — she's the one who locks up before bed.",
      },
      whatYouKnow: [
        { text: { ar: "سمعت خناقة عالية جوه أوضته قبل ما يختفي بساعة تقريبًا", en: "She heard a loud argument in his room about an hour before he vanished." } },
        { text: { ar: "لقت شنطة سفر صغيرة مش في مكانها المعتاد الصبح اللي بعده", en: "A small travel bag was missing from its usual spot the next morning." } },
        { text: { ar: "حسّت إن عمر بقى متوتر جدًا في آخر يومين قبل الحادثة", en: "She felt Omar had been unusually tense in the last two days." }, refersToRoleId: "case-01-role-02" },
      ],
    },
    {
      id: "case-01-role-02",
      characterName: { ar: "عمر راشد", en: "Omar Rashed" },
      occupation: { ar: "شريكه في الشغل", en: "Business Partner" },
      relationshipToVictim: {
        ar: "صاحبه القديم وشريكه في مشروع كبير، بس آخر فترة بينهم خناقات فلوس",
        en: "An old friend and partner in a big project — lately with sharp money disputes.",
      },
      whyAtScene: {
        ar: "جه يزوره في نفس الليلة عشان يتكلموا في موضوع الشركة",
        en: "He came to visit that same night to talk about the company.",
      },
      whatYouKnow: [
        { text: { ar: "عارف إن خالد كان ناوي يسحب فلوسه من المشروع خالص", en: "He knows Khaled was planning to pull all his money out of the project." } },
        { text: { ar: "شاف ليلى بتتلصت وراه وهو بيتكلم في التليفون", en: "He noticed Layla lurking nearby while he was on the phone." }, refersToRoleId: "case-01-role-01" },
        { text: { ar: "راح الفيلا تاني مرة بعد نص الليل من غير ما حد يشوفه", en: "He went back to the villa again after midnight, without anyone seeing him." } },
      ],
      secret: {
        ar: "وقّع ورق باسم خالد من غير علمه عشان يغطي خسارته في المشروع",
        en: "He signed papers in Khaled's name without his knowledge, to cover his losses in the project.",
      },
    },
    {
      id: "case-01-role-03",
      characterName: { ar: "د. منى الشريف", en: "Dr. Mona Al-Sharif" },
      occupation: { ar: "طبيبته الخاصة", en: "Personal Doctor" },
      relationshipToVictim: {
        ar: "بتتابعه صحيًا من سنين وهو واثق فيها أوي",
        en: "She's monitored his health for years, and he trusts her completely.",
      },
      whyAtScene: {
        ar: "جت تشوفه بعد ما اتصل بيها قلقان من حاجة",
        en: "She came to see him after he called her, worried about something.",
      },
      whatYouKnow: [
        { text: { ar: "طلب منها دوا غريب مش من اللي بتوصفله عادةً", en: "He asked her for an unusual medication, not one she usually prescribes." } },
        { text: { ar: "حسّت إنه خايف من حاجة معينة في آخر أسبوعين", en: "She felt he was afraid of something specific in his final two weeks." } },
      ],
      secret: {
        ar: "عارفة تشخيص مرضي ليه ما قالهوش لحد في عيلته",
        en: "She knows a medical diagnosis of his that he never told his family.",
      },
    },
    {
      id: "case-01-role-04",
      characterName: { ar: "كريم فوزي", en: "Karim Fawzy" },
      occupation: { ar: "السواق", en: "Chauffeur" },
      relationshipToVictim: {
        ar: "بيوصله فين ما رايح من سنين وسامع كل مكالماته",
        en: "He's driven him everywhere for years and overhears every call.",
      },
      whyAtScene: {
        ar: "كان مستني بره يوصله لو احتاج أي حاجة",
        en: "He was waiting outside in case he was needed.",
      },
      whatYouKnow: [
        { text: { ar: "وصله لاجتماع سري قبل ما يختفي بأسبوع، محدش من عيلته عارف بيه", en: "He drove him to a secret meeting a week before he vanished, one his family didn't know about." } },
        { text: { ar: "سمعه بيتكلم بعصبية في التليفون مع هالة قبل ما يوصله آخر مرة", en: "He heard him arguing on the phone with Hala the last time he drove him." }, refersToRoleId: "case-01-role-05" },
      ],
    },
    {
      id: "case-01-role-05",
      characterName: { ar: "هالة نجيب", en: "Hala Naguib" },
      occupation: { ar: "مديرة أملاكه", en: "Estate Manager" },
      relationshipToVictim: {
        ar: "بتدير عقاراته من زمان وبينهم ثقة كبيرة في الفلوس",
        en: "She's managed his properties for years, with deep financial trust between them.",
      },
      whyAtScene: {
        ar: "جت تسلمه ورق بيع عقار مهم في نفس الليلة",
        en: "She came to hand him papers for an important property sale that same night.",
      },
      whatYouKnow: [
        { text: { ar: "شافت تحويل فلوس غريب لحساب مجهول قبل ما يختفي", en: "She saw a strange transfer to an unknown account right before he vanished." } },
        { text: { ar: "حاسة إن عمر مش مرتاح خالص من قرارات خالد الأخيرة", en: "She senses Omar was very unhappy with Khaled's recent decisions." }, refersToRoleId: "case-01-role-02" },
      ],
      secret: {
        ar: "خبّت عملية تحويل فلوس مشبوهة نفذتها هي بنفسها باسمه",
        en: "She's hidden a suspicious transfer she personally carried out in his name.",
      },
    },
    {
      id: "case-01-role-06",
      characterName: { ar: "يوسف عادل", en: "Youssef Adel" },
      occupation: { ar: "الجار", en: "Neighbor" },
      relationshipToVictim: {
        ar: "جيران وأصحاب من زمان، بيثقوا في بعض",
        en: "Longtime neighbors and friends who trust each other.",
      },
      whyAtScene: {
        ar: "كان قاعد في شرفته زي كل ليلة يتفرج على الشارع",
        en: "He was on his balcony like every night, watching the street.",
      },
      whatYouKnow: [
        { text: { ar: "شاف عربية غريبة واقفة قدام الفيلا في نص الليل", en: "He saw an unfamiliar car parked outside the villa at midnight." } },
        { text: { ar: "سمع صوت باب بيتقفل بقوة قبل ما النور يقفل في الفيلا", en: "He heard a door slam right before the villa's lights went out." } },
      ],
    },
    {
      id: "case-01-role-07",
      characterName: { ar: "مازن الجندي", en: "Mazen Al-Gendy" },
      occupation: { ar: "مسؤول الأمن", en: "Security Consultant" },
      relationshipToVictim: {
        ar: "بيتابع كاميرات وأمن الفيلا من سنتين",
        en: "He's handled the villa's cameras and security for two years.",
      },
      whyAtScene: {
        ar: "جه يتفقد جهاز الإنذار بعد ما حس إن فيه مشكلة",
        en: "He came to check the alarm system after sensing something was wrong.",
      },
      whatYouKnow: [
        { text: { ar: "كاميرا واحدة وقفت تسجل لدقايق في نفس ليلة الاختفاء", en: "One camera stopped recording for a few minutes that same night." } },
        { text: { ar: "خالد طلب منه يقفل جزء من نظام الإنذار مؤقتًا من غير ما يقول ليه", en: "Khaled asked him to disable part of the alarm temporarily, without saying why." } },
      ],
      secret: {
        ar: "عارف مين بالظبط دخل من الباب الجانبي، بس لسه ما قالش لحد",
        en: "He knows exactly who entered through the side gate, but hasn't told anyone yet.",
      },
    },
    {
      id: "case-01-role-08",
      characterName: { ar: "رشا كامل", en: "Rasha Kamel" },
      occupation: { ar: "سكرتيرته الشخصية", en: "Personal Assistant" },
      relationshipToVictim: {
        ar: "بتنظم مواعيده كل يوم وعارفة تفاصيل حياته",
        en: "She organizes his schedule and knows every detail of his day.",
      },
      whyAtScene: {
        ar: "كانت آخر واحدة اتكلمت معاه في التليفون",
        en: "She was the last person to speak with him by phone.",
      },
      whatYouKnow: [
        { text: { ar: "لغى ميعاد مهم فجأة قبل ما يختفي بيوم", en: "He canceled an important appointment suddenly, a day before he vanished." } },
        { text: { ar: "طلب منها تحجز تذكرة سفر محدش من عيلته عارف بيها", en: "He asked her to book a travel ticket his family didn't know about." } },
      ],
      secret: {
        ar: "بعتلها رسالة غامضة قبل ما يختفي بساعة ومسحتها من الخوف",
        en: "He sent her a cryptic message an hour before he vanished, and she deleted it out of fear.",
      },
    },
  ],
  "case-02": [
    {
      id: "case-02-role-01",
      characterName: { ar: "نادية كامل", en: "Nadia Kamel" },
      occupation: { ar: "زوجته", en: "Widow" },
      relationshipToVictim: {
        ar: "متجوزة منه من عشرين سنة، بس آخر فترة العلاقة اتوترت",
        en: "Married to him for twenty years, though things had grown tense lately.",
      },
      whyAtScene: {
        ar: "كانت آخر واحدة اتكلمت معاه قبل ما باب الأوضة يتقفل",
        en: "She was the last to speak with him before the room's door closed.",
      },
      whatYouKnow: [
        { text: { ar: "عارفة إنه كان ناوي يغيّر شركاه في الشغل قريب", en: "She knows he was planning to change business partners soon." } },
        { text: { ar: "حسّت إنه متوتر جدًا آخر كام يوم قبل الحادثة", en: "She felt he was very tense in his final days." } },
      ],
      secret: {
        ar: "كانت عارفة كود قفل الأوضة السري اللي محدش يعرفه",
        en: "She knew the room's secret lock code that no one else knew.",
      },
    },
    {
      id: "case-02-role-02",
      characterName: { ar: "طارق سليم", en: "Tarek Selim" },
      occupation: { ar: "منافسه في الشغل", en: "Business Rival" },
      relationshipToVictim: {
        ar: "بينهم منافسة قديمة بقت عداوة شخصية",
        en: "An old rivalry that turned into personal hostility.",
      },
      whyAtScene: {
        ar: "كان في المبنى المجاور وقت الجريمة، بيقول علشان سبب تاني",
        en: "He was in the building next door at the time, for what he says was an unrelated reason.",
      },
      whatYouKnow: [
        { text: { ar: "خسر صفقة كبيرة لصالح الضحية قبل الجريمة بأسابيع", en: "He lost a big deal to the victim just weeks before the crime." } },
        { text: { ar: "عارف تفاصيل الصفقة أكتر من أي حد في القضية", en: "He knows the deal's details better than anyone else in the case." } },
      ],
      secret: {
        ar: "حاول يرشي حد من موظفي الضحية يجيبله معلومات سرية",
        en: "He tried to bribe one of the victim's staff for confidential information.",
      },
    },
    {
      id: "case-02-role-03",
      characterName: { ar: "فادي متولي", en: "Fadi Metwally" },
      occupation: { ar: "صانع الأقفال", en: "Locksmith" },
      relationshipToVictim: {
        ar: "ركّب نظام قفل الأوضة من سنين",
        en: "He installed the room's lock system years ago.",
      },
      whyAtScene: {
        ar: "عمل صيانة أخيرة للقفل قبل الجريمة بأسبوعين",
        en: "He did the lock's last maintenance visit two weeks before the crime.",
      },
      whatYouKnow: [
        { text: { ar: "فيه طريقة واحدة بس نظريًا تفتح بيها القفل من برة من غير ما تكسره", en: "There's exactly one theoretical way to open the lock from outside without breaking it." } },
        { text: { ar: "سابلها نسخة احتياطية من مفتاح الأوضة عند نادية بس", en: "He left a spare key with Nadia only." }, refersToRoleId: "case-02-role-01" },
      ],
    },
    {
      id: "case-02-role-04",
      characterName: { ar: "رنا عصام", en: "Rana Essam" },
      occupation: { ar: "محققة استشارية", en: "Consulting Detective" },
      relationshipToVictim: {
        ar: "العيلة استعانت بيها قبل ما البوليس الرسمي يوصل",
        en: "The family brought her in before the official police arrived.",
      },
      whyAtScene: {
        ar: "جت تحلل مسرح الجريمة على طول",
        en: "She came to analyze the crime scene right away.",
      },
      whatYouKnow: [
        { text: { ar: "لاحظت تناقض بسيط في كلام كل الشهود", en: "She noticed a small inconsistency in everyone's account." } },
        { text: { ar: "عارفة إن جرايم الأوضة المقفولة غالبًا ليها تفسير بسيط بيتجاهله الكل", en: "She knows locked-room crimes usually have a simple explanation everyone overlooks." } },
      ],
    },
    {
      id: "case-02-role-05",
      characterName: { ar: "سامي غنيم", en: "Sami Ghoneim" },
      occupation: { ar: "الخادم الشخصي", en: "Personal Butler" },
      relationshipToVictim: {
        ar: "شغال عنده من عشر سنين",
        en: "He's worked for him for ten years.",
      },
      whyAtScene: {
        ar: "كان آخر واحد وصله مشروب قبل ما الباب يتقفل",
        en: "He was the last to bring him a drink before the door closed.",
      },
      whatYouKnow: [
        { text: { ar: "لاحظ إن ورق المكتب اتغير شوية عن الصبح", en: "He noticed the desk's papers were slightly rearranged from the morning." } },
        { text: { ar: "سمعه بيتكلم عن تغيير وصيته قبل الجريمة بساعات", en: "He overheard him discussing changing his will, hours before the crime." } },
      ],
    },
    {
      id: "case-02-role-06",
      characterName: { ar: "هند مراد", en: "Hind Murad" },
      occupation: { ar: "محققة التأمين", en: "Insurance Investigator" },
      relationshipToVictim: {
        ar: "مبعوتة من شركة التأمين تراجع بوليصة كبيرة عليه",
        en: "Sent by the insurance company to review a large policy on him.",
      },
      whyAtScene: {
        ar: "جت تتأكد من صحة مطالبة التأمين",
        en: "She came to verify the insurance claim.",
      },
      whatYouKnow: [
        { text: { ar: "قيمة تأمينه زادت جامد قبل وفاته بأسابيع قليلة", en: "His insurance value jumped significantly just weeks before his death." } },
        { text: { ar: "فيه حد حاول يغيّر بيانات المستفيد من البوليصة", en: "Someone tried to change the policy's beneficiary details." } },
      ],
    },
    {
      id: "case-02-role-07",
      characterName: { ar: "غادة سليم", en: "Ghada Selim" },
      occupation: { ar: "أخته المغتربة", en: "Estranged Sister" },
      relationshipToVictim: {
        ar: "أخته اللي كانت مقاطعاه من زمان بسبب خلاف ميراث قديم",
        en: "His sister, estranged for years over an old inheritance dispute.",
      },
      whyAtScene: {
        ar: "رجعت البلد فجأة قبل الجريمة بكام يوم",
        en: "She suddenly returned to the country just days before the crime.",
      },
      whatYouKnow: [
        { text: { ar: "رجعت بسبب رسالة بعتهالها هو شخصيًا", en: "She returned because of a message he personally sent her." } },
        { text: { ar: "عارفة تفاصيل خلاف الميراث القديم أكتر من أي حد", en: "She knows the old inheritance dispute's details better than anyone." } },
      ],
      secret: {
        ar: "قابلت أخوها سرًا في نفس يوم الجريمة",
        en: "She secretly met her brother on the very day of the crime.",
      },
    },
    {
      id: "case-02-role-08",
      characterName: { ar: "باسم توفيق", en: "Bassem Tawfik" },
      occupation: { ar: "محاسبه", en: "Accountant" },
      relationshipToVictim: {
        ar: "بيدير حساباته المالية من سنين",
        en: "He's managed his finances for years.",
      },
      whyAtScene: {
        ar: "لاحظ تحويلات غريبة في الفترة الأخيرة وجه يسأله فيها",
        en: "He noticed strange transfers recently and came to ask about them.",
      },
      whatYouKnow: [
        { text: { ar: "فيه تحويلات مالية غامضة من حسابه آخر أسابيع", en: "There are mysterious transfers from his account in recent weeks." } },
        { text: { ar: "طلب منه يخبي تفاصيل معينة عن باقي العيلة", en: "He asked him to hide certain details from the rest of the family." } },
      ],
      secret: {
        ar: "لاحظ تحويل كبير من غير توثيق حصل في ليلة الجريمة بالظبط",
        en: "He noticed a large, undocumented transfer that happened on the exact night of the crime.",
      },
    },
  ],
  "case-03": [
    {
      id: "case-03-role-01",
      characterName: { ar: "منير الحوت", en: "Mounir Al-Hout" },
      occupation: { ar: "صاحب المحل", en: "Shop Owner" },
      relationshipToVictim: {
        ar: "مالوش علاقة مباشرة، بس محله قصاد مكان الحادثة",
        en: "No direct connection — his shop just faces where it happened.",
      },
      whyAtScene: {
        ar: "كان بيراقب الشارع من شباك محله",
        en: "He was watching the street from his shop window.",
      },
      whatYouKnow: [
        { text: { ar: "شاف اتنين بيتخانقوا في الشارع قبل الحادثة بدقايق", en: "He saw two people arguing in the street minutes before the incident." } },
      ],
    },
    {
      id: "case-03-role-02",
      characterName: { ar: "وديع أنور", en: "Wadie Anwar" },
      occupation: { ar: "الحارس الليلي", en: "Night Guard" },
      relationshipToVictim: {
        ar: "بيحرس المبنى المجاور لمكان الحادثة",
        en: "He guards the building next to where it happened.",
      },
      whyAtScene: {
        ar: "بيعمل جولة كل ساعة في المنطقة",
        en: "He does a round every hour in the area.",
      },
      whatYouKnow: [
        { text: { ar: "غيّر مسار جولته في نفس الليلة دي بالذات", en: "He changed his usual route that specific night." } },
        { text: { ar: "شاف منير واقف على باب محله في وقت غريب", en: "He saw Mounir standing at his shop door at an odd hour." }, refersToRoleId: "case-03-role-01" },
      ],
      secret: {
        ar: "نام شوية وقت الشيفت وخايف يعترف بيها",
        en: "He dozed off briefly during his shift and is afraid to admit it.",
      },
    },
    {
      id: "case-03-role-03",
      characterName: { ar: "سلمى توفيق", en: "Salma Tawfik" },
      occupation: { ar: "مارّة", en: "Passerby" },
      relationshipToVictim: {
        ar: "كانت راجعة البيت وعدّت بالصدفة",
        en: "She was walking home and happened to pass by.",
      },
      whyAtScene: {
        ar: "كانت في نفس الشارع في نفس التوقيت بالصدفة",
        en: "She happened to be on the same street at the same time.",
      },
      whatYouKnow: [
        { text: { ar: "شافت حاجة وقعت من إيد واحد من الطرفين اللي بيتخانقوا", en: "She saw something drop from one of the arguing parties' hands." } },
      ],
      secret: {
        ar: "لقطت الحاجة اللي وقعت واحتفظت بيها من غير ما تقول لحد",
        en: "She picked up what fell and has kept it without telling anyone.",
      },
    },
    {
      id: "case-03-role-04",
      characterName: { ar: "حاتم رضوان", en: "Hatem Radwan" },
      occupation: { ar: "سواق توصيل", en: "Delivery Driver" },
      relationshipToVictim: {
        ar: "كان بيوصل طلب في نفس التوقيت بالصدفة",
        en: "He happened to be making a delivery at the same time.",
      },
      whyAtScene: {
        ar: "عربيته كانت واقفة في نفس الشارع لدقايق",
        en: "His van was parked on the same street for a few minutes.",
      },
      whatYouKnow: [
        { text: { ar: "شاف حد بيمشي بسرعة غريبة بعد الحادثة على طول", en: "He saw someone walking away unusually fast right after the incident." } },
      ],
    },
    {
      id: "case-03-role-05",
      characterName: { ar: "إيمان صبري", en: "Eman Sabry" },
      occupation: { ar: "نادلة الكافيه", en: "Café Waitress" },
      relationshipToVictim: {
        ar: "شغالة في الكافيه المطل على مكان الحادثة",
        en: "She works at the café overlooking where it happened.",
      },
      whyAtScene: {
        ar: "كانت بتخدم زبونين قاعدين جنب الشباك",
        en: "She was serving two customers seated by the window.",
      },
      whatYouKnow: [
        { text: { ar: "سمعت واحد من الزباين بيقول اسم غريب بقلق قبل الحادثة", en: "She overheard one customer anxiously mention an unfamiliar name." } },
      ],
    },
    {
      id: "case-03-role-06",
      characterName: { ar: "عادل نصر", en: "Adel Nasr" },
      occupation: { ar: "ضابط بوليس في إجازة", en: "Off-Duty Police Officer" },
      relationshipToVictim: {
        ar: "كان ماشي في المنطقة في يوم إجازته",
        en: "He was walking through the area on his day off.",
      },
      whyAtScene: {
        ar: "بعينه المدربة لاحظ تفاصيل محدش لاحظها",
        en: "With his trained eye, he noticed details no one else did.",
      },
      whatYouKnow: [
        { text: { ar: "حد كان بيتصرف بعصبية غريبة قبل الحادثة", en: "Someone was behaving with unusual tension before the incident." } },
      ],
    },
    {
      id: "case-03-role-07",
      characterName: { ar: "كوثر حلمي", en: "Kawthar Helmy" },
      occupation: { ar: "بياعة الشارع", en: "Street Vendor" },
      relationshipToVictim: {
        ar: "بتبيع في نفس الشارع كل يوم",
        en: "She sells in the same street every day.",
      },
      whyAtScene: {
        ar: "كانت واقفة في مكانها المعتاد",
        en: "She was standing in her usual spot.",
      },
      whatYouKnow: [
        { text: { ar: "شافت وش مش معروف في الشارع في وقت الحادثة بالظبط", en: "She saw an unfamiliar face on the street at the exact time it happened." } },
      ],
    },
    {
      id: "case-03-role-08",
      characterName: { ar: "فارس دسوقي", en: "Fares Desouky" },
      occupation: { ar: "ساكن في العمارة المقابلة", en: "Resident of the Building Opposite" },
      relationshipToVictim: {
        ar: "بيسكن في شقة مطلة على مكان الحادثة",
        en: "He lives in an apartment overlooking where it happened.",
      },
      whyAtScene: {
        ar: "كان قاعد في البلكونة في نفس التوقيت",
        en: "He was sitting on his balcony at the same time.",
      },
      whatYouKnow: [
        { text: { ar: "من مكانه العالي شاف تفصيلة محدش لاحظها تحت", en: "From his high vantage point, he saw a detail no one below noticed." } },
      ],
      secret: {
        ar: "كان بيصور المشهد بموبايله للفرجة قبل ما يفهم إنها حادثة حقيقية",
        en: "He was filming the scene on his phone for fun before realizing it was real.",
      },
    },
  ],
  "case-04": [
    {
      id: "case-04-role-01",
      characterName: { ar: "زياد الرملي", en: "Ziad Al-Ramli" },
      occupation: { ar: "الابن الأكبر", en: "Eldest Son" },
      relationshipToVictim: {
        ar: "ابنه، وفاكر نفسه الوريث الشرعي للشركة",
        en: "His son, and believes he's the rightful heir to the company.",
      },
      whyAtScene: {
        ar: "كان في البيت عشان اجتماع قراية الوصية",
        en: "He was home for the will-reading gathering.",
      },
      whatYouKnow: [
        { text: { ar: "عارف إن الوصية الجديدة بتقلل نصيبه جامد", en: "He knows the new will significantly cuts his share." } },
        { text: { ar: "قابل المحامية سرًا بعد ما عرف بالتعديل", en: "He secretly met the lawyer after learning of the amendment." }, refersToRoleId: "case-04-role-04" },
      ],
      secret: {
        ar: "حاول يقنع المحامية تغيّر الوصية لصالحه مقابل فلوس",
        en: "He tried to bribe the lawyer into changing the will in his favor.",
      },
    },
    {
      id: "case-04-role-02",
      characterName: { ar: "دينا الرملي", en: "Dina Al-Ramli" },
      occupation: { ar: "البنت الصغيرة", en: "Younger Daughter" },
      relationshipToVictim: {
        ar: "كانت الأقرب لأبوها آخر سنين",
        en: "She was closest to her father in recent years.",
      },
      whyAtScene: {
        ar: "زارته في مكتبه في نفس ليلة الوفاة",
        en: "She visited him in his study the same night he died.",
      },
      whatYouKnow: [
        { text: { ar: "كانت عارفة بنية أبوها يعدل الوصية قبل أي حد تاني", en: "She knew of her father's intent to amend the will before anyone else." } },
        { text: { ar: "هي أكتر مستفيدة من التعديل الجديد", en: "She's the biggest beneficiary of the new amendment." } },
      ],
      secret: {
        ar: "كتب لها ورقة خاصة ما شاركتهاش مع باقي العيلة",
        en: "He wrote her a private note she hasn't shared with the rest of the family.",
      },
    },
    {
      id: "case-04-role-03",
      characterName: { ar: "سلوى فهمي", en: "Salwa Fahmy" },
      occupation: { ar: "زوجة الأب", en: "Stepmother" },
      relationshipToVictim: {
        ar: "اتجوزت رب البيت من خمس سنين بس",
        en: "She married the patriarch only five years ago.",
      },
      whyAtScene: {
        ar: "كانت موجودة في البيت وقت الحادثة",
        en: "She was home at the time of the incident.",
      },
      whatYouKnow: [
        { text: { ar: "عارفة إنه كان بينوي يوثق جوازهم رسمي أكتر", en: "She knows he was planning to formalize their marriage further." } },
        { text: { ar: "حسّت توتر غريب بينه وبين زياد ابنه الأكبر", en: "She sensed unusual tension between him and Ziad, his eldest son." }, refersToRoleId: "case-04-role-01" },
      ],
      secret: {
        ar: "وقّعت اتفاق مالي سري معاه قبل وفاته بكام يوم",
        en: "She signed a secret financial agreement with him just days before he died.",
      },
    },
    {
      id: "case-04-role-04",
      characterName: { ar: "منى العزب", en: "Mona Al-Azab" },
      occupation: { ar: "محامية العيلة", en: "Family Lawyer" },
      relationshipToVictim: {
        ar: "صاغت الوصية المعدلة بنفسها بتعليمات منه",
        en: "She personally drafted the amended will on his instructions.",
      },
      whyAtScene: {
        ar: "كانت في الاجتماع عشان تقرا الوصية",
        en: "She was at the gathering to read the will.",
      },
      whatYouKnow: [
        { text: { ar: "عارفة المستفيد الأكبر من التعديل أكتر من أي حد", en: "She knows who benefits most from the amendment better than anyone." } },
        { text: { ar: "فيه نسخة قديمة من الوصية مختلفة خالص عن دي", en: "There's an old version of the will that's completely different." } },
      ],
    },
    {
      id: "case-04-role-05",
      characterName: { ar: "أم كلثوم بدير", en: "Um Kulthum Bedeir" },
      occupation: { ar: "الشغالة القديمة", en: "Longtime Housekeeper" },
      relationshipToVictim: {
        ar: "شغالة عند العيلة من أكتر من عشرين سنة",
        en: "She's worked for the family for over twenty years.",
      },
      whyAtScene: {
        ar: "كانت في البيت زي كل يوم",
        en: "She was home like every day.",
      },
      whatYouKnow: [
        { text: { ar: "سمعت خناقة بينه وبين واحد من أولاده يوم قبل الوفاة", en: "She heard him argue with one of his children the day before he died." } },
        { text: { ar: "عارفة مكان الوصية الأصلية القديمة", en: "She knows where the original, unamended will is." } },
      ],
      secret: {
        ar: "خبّت جواب شخصي كتبهولها قبل ما يموت",
        en: "She's hidden a personal letter he wrote her shortly before he died.",
      },
    },
    {
      id: "case-04-role-06",
      characterName: { ar: "حسام النجار", en: "Hossam Al-Naggar" },
      occupation: { ar: "شريك قديم في الشغل", en: "Old Business Partner" },
      relationshipToVictim: {
        ar: "شريكه في تأسيس الشركة الأولى",
        en: "His partner in founding the original company.",
      },
      whyAtScene: {
        ar: "قابله سرًا قبل وفاته بيومين",
        en: "He met him secretly two days before he died.",
      },
      whatYouKnow: [
        { text: { ar: "عنده ورق قديم يثبت مساهمته في تأسيس الشركة", en: "He holds old papers proving his stake in founding the company." } },
        { text: { ar: "هدده بشكل غير مباشر لو ما ياخدش حقه في الشركة", en: "He indirectly threatened him if he wasn't given his due share." } },
      ],
    },
    {
      id: "case-04-role-07",
      characterName: { ar: "د. أيمن صادق", en: "Dr. Ayman Sadek" },
      occupation: { ar: "طبيب العيلة", en: "Family Doctor" },
      relationshipToVictim: {
        ar: "بيتابعه صحيًا من سنين",
        en: "He's monitored his health for years.",
      },
      whyAtScene: {
        ar: "كان بيزوره بانتظام في أسابيعه الأخيرة",
        en: "He was visiting him regularly in his final weeks.",
      },
      whatYouKnow: [
        { text: { ar: "صحته كانت بتتدهور أسرع مما أعلن للعيلة", en: "His health was declining faster than he let the family know." } },
        { text: { ar: "وصف له دوا حساس ممكن يتفاعل بشكل خطير", en: "He prescribed him a sensitive medication that could react dangerously." } },
      ],
      secret: {
        ar: "لاحظ حاجة غريبة في فحوصاته الأخيرة ما قالهاش للعيلة لسه",
        en: "He noticed something unusual in his last tests he hasn't told the family yet.",
      },
    },
    {
      id: "case-04-role-08",
      characterName: { ar: "رامي الرملي", en: "Rami Al-Ramli" },
      occupation: { ar: "الأخ المغترب", en: "Estranged Brother" },
      relationshipToVictim: {
        ar: "أخوه اللي مقاطعاه من زمان بسبب خلاف ميراث قديم",
        en: "His brother, estranged for years over an old inheritance dispute.",
      },
      whyAtScene: {
        ar: "رجع المدينة سرًا قبل الوفاة بكام يوم",
        en: "He secretly returned to the city just days before the death.",
      },
      whatYouKnow: [
        { text: { ar: "عارف تفاصيل خلاف الميراث القديم أكتر من أي حد", en: "He knows the old inheritance dispute's details better than anyone alive." } },
        { text: { ar: "رجع سرًا قبل وفاة أخوه بأيام قليلة", en: "He returned secretly just days before his brother's death." } },
      ],
      secret: {
        ar: "قابل أخوه سرًا ليلة وفاته لموضوع ما قالوش لحد",
        en: "He secretly met his brother the night he died, about something he hasn't told anyone.",
      },
    },
  ],
  "case-05": [
    {
      id: "case-05-role-01",
      characterName: { ar: "جمال بركات", en: "Gamal Barakat" },
      occupation: { ar: "الناجي الوحيد", en: "The Sole Survivor" },
      relationshipToVictim: {
        ar: "كان قائد المجموعة اللي راحت تستكشف",
        en: "He led the group that went to explore.",
      },
      whyAtScene: {
        ar: "رجع لوحده وناسي جزء كبير من اللي حصل",
        en: "He returned alone, missing a large part of his memory of what happened.",
      },
      whatYouKnow: [
        { text: { ar: "فاكر مكان غريب مش موجود في أي خريطة", en: "He remembers a strange place that appears on no map." } },
        { text: { ar: "فاكر إحساس بخطر قبل ما الاتصال ينقطع خالص", en: "He remembers a sense of danger right before contact was lost." } },
      ],
      secret: {
        ar: "فاكر جزء مما حصل بس خايف يصدق نفسه فساكت",
        en: "He remembers part of what happened but doubts himself, so he stays quiet.",
      },
    },
    {
      id: "case-05-role-02",
      characterName: { ar: "علياء ريان", en: "Alia Rayan" },
      occupation: { ar: "ممثلة الجهة الراعية", en: "Sponsor's Representative" },
      relationshipToVictim: {
        ar: "بتمثل الجهة اللي مولت الرحلة بالكامل",
        en: "She represents the organization that fully funded the trip.",
      },
      whyAtScene: {
        ar: "مسؤولة تقدم تفسير رسمي للي حصل",
        en: "She's responsible for giving an official explanation of what happened.",
      },
      whatYouKnow: [
        { text: { ar: "ميزانية الرحلة اتقللت فجأة قبل ما تبدأ", en: "The trip's budget was suddenly cut before it began." } },
        { text: { ar: "فيه تقرير داخلي حذر من مخاطر في المنطقة دي", en: "An internal report warned of risks in that region." } },
      ],
      secret: {
        ar: "وافقت على تقليل الميزانية رغم التحذيرات",
        en: "She approved the budget cut despite the warnings.",
      },
    },
    {
      id: "case-05-role-03",
      characterName: { ar: "بدر الحمادي", en: "Badr Al-Hammadi" },
      occupation: { ar: "المرشد المحلي", en: "Local Guide" },
      relationshipToVictim: {
        ar: "أعرف واحد بالمنطقة اللي راحوا يستكشفوها",
        en: "He knew the area they explored better than anyone.",
      },
      whyAtScene: {
        ar: "مكانش المفروض يكمل معاهم في آخر مرحلة",
        en: "He wasn't originally meant to join their final leg.",
      },
      whatYouKnow: [
        { text: { ar: "المنطقة اللي اختفوا فيها ليها حكايات غريبة", en: "The area where they vanished has strange local stories." } },
        { text: { ar: "حذر من تغيير المسار في اللحظة الأخيرة", en: "He warned against the last-minute change of route." } },
      ],
    },
    {
      id: "case-05-role-04",
      characterName: { ar: "نور الدين حلمي", en: "Nour Al-Din Helmy" },
      occupation: { ar: "الصحفية", en: "Journalist" },
      relationshipToVictim: {
        ar: "بتغطي قصة اختفاء البعثة من يوم ما حصلت",
        en: "She's covered the expedition's disappearance since day one.",
      },
      whyAtScene: {
        ar: "مكنتش موجودة وقت الرحلة، بتحقق بعدين",
        en: "She wasn't there during the trip — she's investigating afterward.",
      },
      whatYouKnow: [
        { text: { ar: "عندها وثيقة داخلية عن تقليل الميزانية", en: "She has an internal document about the budget cut." }, refersToRoleId: "case-05-role-02" },
        { text: { ar: "شاكة إن تفاصيل اتشالت من التقرير الرسمي", en: "She suspects details were removed from the official report." } },
      ],
    },
    {
      id: "case-05-role-05",
      characterName: { ar: "د. سليم عوض", en: "Dr. Selim Awad" },
      occupation: { ar: "طبيب البعثة", en: "Expedition Doctor" },
      relationshipToVictim: {
        ar: "كان مسؤول عن صحة أفراد الرحلة",
        en: "He was responsible for the team's health.",
      },
      whyAtScene: {
        ar: "قعد في المعسكر الأساسي بدل ما يكمل معاهم",
        en: "He stayed at base camp instead of continuing with them.",
      },
      whatYouKnow: [
        { text: { ar: "حذر واحد من أفراد البعثة من إكمال الرحلة لأسباب صحية", en: "He warned one member against continuing, for health reasons." } },
        { text: { ar: "لاحظ أعراض غريبة على حد قبل ما الاتصال ينقطع", en: "He noticed strange symptoms in someone before contact was lost." } },
      ],
    },
    {
      id: "case-05-role-06",
      characterName: { ar: "هيثم قناوي", en: "Haytham Qenawy" },
      occupation: { ar: "عامل اللاسلكي", en: "Radio Operator" },
      relationshipToVictim: {
        ar: "كان مسؤول عن آخر اتصال لاسلكي بالبعثة",
        en: "He was responsible for the expedition's last radio contact.",
      },
      whyAtScene: {
        ar: "كان في غرفة التحكم وقت الاتصال الأخير",
        en: "He was in the control room during the final contact.",
      },
      whatYouKnow: [
        { text: { ar: "آخر كلمات من البعثة كانت غامضة جدًا", en: "The expedition's last words were very vague." } },
        { text: { ar: "حصل تشويش غريب قبل ما الاتصال ينقطع خالص", en: "Strange interference happened right before contact cut out entirely." } },
      ],
      secret: {
        ar: "عنده تسجيل كامل لآخر مكالمة ما سلموش لحد لسه",
        en: "He has a complete recording of the last call that he hasn't handed over yet.",
      },
    },
    {
      id: "case-05-role-07",
      characterName: { ar: "ياسمين البدري", en: "Yasmin Al-Badry" },
      occupation: { ar: "أخت حد من المفقودين", en: "Sister of a Missing Member" },
      relationshipToVictim: {
        ar: "أختها كانت من أفراد البعثة المفقودين",
        en: "Her sister was among the missing expedition members.",
      },
      whyAtScene: {
        ar: "جت من بعيد تطالب بإجابات واضحة",
        en: "She traveled far to demand clear answers.",
      },
      whatYouKnow: [
        { text: { ar: "أختها بعتلها رسالة قلقانة قبل المرحلة الأخيرة", en: "Her sister sent her a worried message before the final leg." } },
        { text: { ar: "كانت شاكة في قرارات قائد البعثة", en: "Her sister doubted the expedition leader's decisions." }, refersToRoleId: "case-05-role-01" },
      ],
      secret: {
        ar: "مخبية آخر رسالة من أختها خوفًا إنها تتستخدم ضدها",
        en: "She's hiding her sister's last message, afraid it could be used against her.",
      },
    },
    {
      id: "case-05-role-08",
      characterName: { ar: "كريم البنا", en: "Karim El-Banna" },
      occupation: { ar: "خبير تسوية تأمين", en: "Insurance Adjuster" },
      relationshipToVictim: {
        ar: "مبعوت يقيّم مطالبة تأمين كبيرة عن معدات البعثة",
        en: "Sent to assess a large insurance claim over the expedition's equipment.",
      },
      whyAtScene: {
        ar: "جه يراجع تفاصيل المطالبة",
        en: "He came to review the claim's details.",
      },
      whatYouKnow: [
        { text: { ar: "قيمة معدات البعثة المؤمّن عليها أعلى من الطبيعي", en: "The insured value of the expedition's equipment is higher than normal." } },
        { text: { ar: "فيه فرق بين المعدات المسجلة والمعدات الفعلية", en: "There's a gap between the logged equipment and what was actually there." } },
      ],
    },
  ],
  "case-06": [
    {
      id: "case-06-role-01",
      characterName: { ar: "نور سامي", en: "Nour Sami" },
      occupation: { ar: "العروسة", en: "The Bride" },
      relationshipToVictim: {
        ar: "زوجته اللي اتجوزها من ساعتين بس",
        en: "His wife, married just hours ago.",
      },
      whyAtScene: {
        ar: "كانت بتستقبل التهاني مع أهلها لما لاحظت اختفاءه",
        en: "She was receiving congratulations with her family when she noticed he'd vanished.",
      },
      whatYouKnow: [
        { text: { ar: "حسّت إن يوسف كان قلقان من حاجة طول الحفلة، رغم إنه فرحان بره", en: "She felt Youssef was anxious about something all night, despite looking happy outwardly." } },
        { text: { ar: "شافته بيتكلم بعصبية مع عادل قبل الزفة بساعة", en: "She saw him arguing tensely with Adel an hour before the zaffa." }, refersToRoleId: "case-06-role-04" },
        { text: { ar: "لقت تليفونه اختفى من على الطربيزة بعد ما اتلاقى", en: "She noticed his phone missing from the table after he was found." } },
      ],
    },
    {
      id: "case-06-role-02",
      characterName: { ar: "كريم الدسوقي", en: "Karim El-Dessouky" },
      occupation: { ar: "أخوه الصغير وإشبينه", en: "Younger Brother & Best Man" },
      relationshipToVictim: {
        ar: "أخوه الصغير، عايش معظم حياته في ضل نجاحه",
        en: "His younger brother, who has lived most of his life in his shadow.",
      },
      whyAtScene: {
        ar: "إشبين أخوه في فرحه، ومن المفروض يكون جنبه طول الليل",
        en: "Best man at his brother's wedding, supposed to be by his side all night.",
      },
      whatYouKnow: [
        { text: { ar: "عارف إن يوسف اكتشف حاجة عن حساب الميراث المشترك قبل الفرح بيومين", en: "He knows Youssef discovered something about their joint inheritance account two days before the wedding." } },
        { text: { ar: "شاف مراد بيتلصت ناحية الممر الخاص وقت الزفة", en: "He saw Murad lurking toward the private corridor during the zaffa." }, refersToRoleId: "case-06-role-05" },
        { text: { ar: "خرج من على البيست لمدة عشر دقايق في نفس توقيت اختفاء يوسف تقريبًا", en: "He stepped off the dance floor for ten minutes around the same time Youssef vanished." } },
      ],
      secret: {
        ar: "كان بياخد فلوس من حساب الميراث المشترك من غير علم يوسف عشان يغطي ديون قمار",
        en: "He'd been taking money from their joint inheritance account without Youssef's knowledge to cover gambling debts.",
      },
    },
    {
      id: "case-06-role-03",
      characterName: { ar: "سلمى فتحي", en: "Salma Fathy" },
      occupation: { ar: "منظمة الفرح", en: "Wedding Planner" },
      relationshipToVictim: {
        ar: "بتنظملهم الفرح من شهرين، وعندها كل تفاصيل الليلة",
        en: "She's been planning their wedding for two months and knows every detail of the night.",
      },
      whyAtScene: {
        ar: "بتتابع كل حاجة من مكتبها جنب المدخل",
        en: "Monitoring everything from her desk near the entrance.",
      },
      whatYouKnow: [
        { text: { ar: "الكارت الرئيسي بتاع أوضة الـ VIP كان معاها طول الليل في مكتبها", en: "The VIP lounge's master keycard was with her at her desk all night." } },
        { text: { ar: "حد استعار الكارت منها لمدة عشرين دقيقة بحجة معينة، ورجّعهولها بعدين", en: "Someone borrowed the card from her for twenty minutes under some pretext, and returned it afterward." } },
        { text: { ar: "لاحظت إن رامي الأمن كان بعيد عن مكانه المعتاد وقت الزفة", en: "She noticed Rami, the security guard, was away from his usual post during the zaffa." }, refersToRoleId: "case-06-role-08" },
      ],
    },
    {
      id: "case-06-role-04",
      characterName: { ar: "عادل حماد", en: "Adel Hammad" },
      occupation: { ar: "شريكه في الشغل", en: "Business Partner" },
      relationshipToVictim: {
        ar: "شريكه في شركة تصدير الأثاث من خمس سنين",
        en: "His partner in a furniture export company for five years.",
      },
      whyAtScene: {
        ar: "جه يهنيه في فرحه زي أي صاحب مقرب",
        en: "Came to congratulate him like any close friend.",
      },
      whatYouKnow: [
        { text: { ar: "عارف إن يوسف كان مديون بقرض كبير عشان يوسع الشركة قبل الفرح", en: "He knows Youssef took a large loan to expand the company before the wedding." } },
        { text: { ar: "استلم مكالمة عاجلة من شركة منافسة قبل ما يوسف يختفي بساعة", en: "He received an urgent call from a rival company an hour before Youssef vanished." } },
        { text: { ar: "شاف كريم خارج من على البيست متوتر في نفس التوقيت تقريبًا", en: "He saw Karim leaving the dance floor anxious around the same time." }, refersToRoleId: "case-06-role-02" },
      ],
      secret: {
        ar: "كان بيفاوض سرًا يبيع عقود التصدير المشتركة لشركة منافسة من غير ما يوسف يعرف",
        en: "He'd been secretly negotiating to sell their shared export contracts to a rival company without Youssef's knowledge.",
      },
    },
    {
      id: "case-06-role-05",
      characterName: { ar: "مراد عزت", en: "Murad Ezzat" },
      occupation: { ar: "خطيب العروسة السابق", en: "The Bride's Ex-Fiancé" },
      relationshipToVictim: {
        ar: "كان خطيب نور قبل يوسف بسنتين، جه كضيف عادي",
        en: "Was Nour's fiancé two years before Youssef; came as an ordinary guest.",
      },
      whyAtScene: {
        ar: "مدعو من عيلة نور، وحاب يهنيها شخصيًا",
        en: "Invited by Nour's family, wanted to congratulate her personally.",
      },
      whatYouKnow: [
        { text: { ar: "بعت لنور رسايل كتير قبل الفرح يحاول يرجعلها", en: "He sent Nour many messages before the wedding trying to win her back." } },
        { text: { ar: "يوسف اكتشف الرسايل دي وواجهه بيها في الفرح نفسه", en: "Youssef discovered these messages and confronted him at the wedding itself." } },
        { text: { ar: "اتشاف قريب من الممر الخاص المؤدي لأوضة الـ VIP وقت الزفة", en: "He was seen near the private corridor leading to the VIP lounge during the zaffa." } },
      ],
      secret: {
        ar: "يوسف هدده إنه هيفضح فضيحة قديمة عنه قدام كل المدعوين لو ما مشيش من الفرح فورًا",
        en: "Youssef threatened to expose an old scandal of his in front of all the guests if he didn't leave the wedding immediately.",
      },
    },
    {
      id: "case-06-role-06",
      characterName: { ar: "سميحة الدسوقي", en: "Samiha El-Dessouky" },
      occupation: { ar: "والدة العريس", en: "The Groom's Mother" },
      relationshipToVictim: {
        ar: "أمه، وهي اللي رتبت الفرح بمشاركة سلمى",
        en: "His mother, helped arrange the wedding alongside Salma.",
      },
      whyAtScene: {
        ar: "كانت بتستقبل المهنئين قريب من المدخل الرئيسي",
        en: "Greeting well-wishers near the main entrance.",
      },
      whatYouKnow: [
        { text: { ar: "حسّت إن في خناقة قديمة بين يوسف وكريم من كذا يوم", en: "She sensed an old rift between Youssef and Karim from a few days back." }, refersToRoleId: "case-06-role-02" },
        { text: { ar: "شافت مراد بيحاول يقرب من نور أكتر من مرة بالليل", en: "She saw Murad trying to get close to Nour more than once that night." }, refersToRoleId: "case-06-role-05" },
      ],
    },
    {
      id: "case-06-role-07",
      characterName: { ar: "هاني وجدي", en: "Hani Wagdy" },
      occupation: { ar: "مطرب الفرقة", en: "Band Singer" },
      relationshipToVictim: {
        ar: "متعاقد يغني في الفرح، شاف كل حاجة من على المسرح",
        en: "Contracted to sing at the wedding, saw everything from the stage.",
      },
      whyAtScene: {
        ar: "كان بيغني الزفة نفسها وقت ما يوسف اختفى",
        en: "Was singing the zaffa itself when Youssef vanished.",
      },
      whatYouKnow: [
        { text: { ar: "شاف يوسف بيمشي ناحية الممر الخاص لوحده وهو مبتسم عادي", en: "He saw Youssef walking toward the private corridor alone, smiling normally." } },
        { text: { ar: "لاحظ حد تاني ماشي وراه بعد كام دقيقة بس مش متأكد مين بالظبط", en: "He noticed someone else walk that way a few minutes later but isn't sure who exactly." } },
      ],
    },
    {
      id: "case-06-role-08",
      characterName: { ar: "رامي فوزي", en: "Rami Fawzy" },
      occupation: { ar: "حارس أمن القاعة", en: "Hall Security Guard" },
      relationshipToVictim: {
        ar: "مسؤول عن أمن القاعة كلها الليلة دي",
        en: "Responsible for the whole hall's security that night.",
      },
      whyAtScene: {
        ar: "بيراقب المدخل الرئيسي والممرات من نقطة ثابتة",
        en: "Monitoring the main entrance and corridors from a fixed post.",
      },
      whatYouKnow: [
        { text: { ar: "الكاميرا الوحيدة اللي بتغطي الممر الخاص كانت متعطلة الليلة دي من الأول", en: "The only camera covering the private corridor was already broken that night from the start." } },
        { text: { ar: "سايب مكانه المعتاد لمدة قصيرة عشان مشكلة تانية في المدخل", en: "He left his usual post briefly due to a different issue at the entrance." } },
      ],
      secret: {
        ar: "اتصل بيه حد من الضيوف يشغّله بعيد عن الممر الخاص لمدة كام دقيقة بس رفض يقول مين",
        en: "Someone among the guests called him away from the private corridor for a few minutes, but he's refused to say who.",
      },
    },
  ],
  "case-07": [
    {
      id: "case-07-role-01",
      characterName: { ar: "ياسمين توفيق", en: "Yasmine Tawfik" },
      occupation: { ar: "المذيعة المشاركة", en: "Co-Host" },
      relationshipToVictim: {
        ar: "بتقدم البرنامج معاه من سنتين، وعلاقتهم مهنية متوترة شوية آخر فترة",
        en: "Co-hosted the show with him for two years; their professional relationship had grown tense lately.",
      },
      whyAtScene: {
        ar: "كانت بتجهز نفسها للبث في الأستوديو المجاور",
        en: "Getting ready for the broadcast in the adjacent studio.",
      },
      whatYouKnow: [
        { text: { ar: "سامي كان متحمس جدًا للحلقة دي أكتر من أي حلقة تانية قبل كده", en: "Sami was unusually excited about this episode, more than any before." } },
        { text: { ar: "لاحظت إن هيثم كان قلقان بشكل غريب طول اليوم", en: "She noticed Haitham was strangely anxious all day." }, refersToRoleId: "case-07-role-02" },
        { text: { ar: "سمعت صوت خناقة خفيفة من جوه الأستوديو قبل ما يختفي بدقايق", en: "She heard a faint argument from inside the studio minutes before he vanished." } },
      ],
    },
    {
      id: "case-07-role-02",
      characterName: { ar: "هيثم صبري", en: "Haitham Sabry" },
      occupation: { ar: "المنتج المنفذ", en: "Executive Producer" },
      relationshipToVictim: {
        ar: "بيشتغل معاه من بداية البرنامج، ومسؤول عن كل تفاصيل الحلقات",
        en: "Worked with him since the show began, responsible for every episode's details.",
      },
      whyAtScene: {
        ar: "بيراجع آخر تفاصيل فنية قبل البث المباشر",
        en: "Reviewing final technical details before the live broadcast.",
      },
      whatYouKnow: [
        { text: { ar: "عارف إن سامي كان ناوي يفصله بعد الحلقة دي مباشرة", en: "He knows Sami planned to fire him right after this episode." } },
        { text: { ar: "شاف باسل بيتلكم مع سامي بعصبية في الكواليس قبل الحلقة بساعة", en: "He saw Basel arguing tensely with Sami backstage an hour before the show." }, refersToRoleId: "case-07-role-04" },
        { text: { ar: "طلع بره الاستوديو لمكالمة مطولة قبل الاختفاء بنص ساعة", en: "He stepped outside for a lengthy call half an hour before the disappearance." } },
      ],
      secret: {
        ar: "كان بياخد فلوس من مصادر خارجية عشان يسرّب مواضيع الحلقات الجاية قبل ما تتذاع",
        en: "He'd been taking money from outside sources to leak upcoming episode topics before they aired.",
      },
    },
    {
      id: "case-07-role-03",
      characterName: { ar: "وائل ريان", en: "Wael Rayan" },
      occupation: { ar: "مهندس الصوت", en: "Sound Engineer" },
      relationshipToVictim: {
        ar: "بيشتغل معاه من سنين طويلة، وعارف كل تفاصيل الاستوديو التقنية",
        en: "Worked with him for many years, knows every technical detail of the studio.",
      },
      whyAtScene: {
        ar: "قاعد في غرفة التحكم يراقب الأجهزة قبل البث",
        en: "Sitting in the control room monitoring equipment before airtime.",
      },
      whatYouKnow: [
        { text: { ar: "استخدم سويتش الفتح الاضطراري مرة واحدة بس الليلة دي لسبب فني عادي، مسجل بوقته بالظبط", en: "He used the emergency-unlock switch once tonight for a routine technical reason, logged with its exact time." } },
        { text: { ar: "لاحظ إن نظام الإنتركوم بتاع الأستوديو كان مقفول بشكل غريب قبل الحلقة", en: "He noticed the studio's intercom system was strangely switched off before the show." } },
      ],
    },
    {
      id: "case-07-role-04",
      characterName: { ar: "باسل النجار", en: "Basel El-Naggar" },
      occupation: { ar: "ضيف الحلقة ورجل أعمال", en: "Tonight's Guest & Businessman" },
      relationshipToVictim: {
        ar: "مدعو كضيف الحلقة، وسامي كان ناوي يفتح معاه ملف قديم",
        en: "Invited as tonight's guest; Sami planned to open an old file with him.",
      },
      whyAtScene: {
        ar: "جه يستعد للحلقة قبل البث بساعتين",
        en: "Arrived to prepare for the episode two hours before airtime.",
      },
      whatYouKnow: [
        { text: { ar: "عارف إن سامي عنده مستندات عن صفقة أرض قديمة هيعرضها على الهوا", en: "He knows Sami has documents about an old land deal he plans to reveal on air." } },
        { text: { ar: "واجه سامي في الكواليس وحاول يقنعه يلغي الموضوع", en: "He confronted Sami backstage and tried to convince him to drop the topic." } },
        { text: { ar: "شاف داليا بتتكلم مع سامي بتوتر واضح قبل الحلقة بساعتين", en: "He saw Dalia speaking with Sami with visible tension two hours before." }, refersToRoleId: "case-07-role-08" },
      ],
      secret: {
        ar: "كان شريك سري في صفقة مع شريف مالك القناة، هتتكشف لو الحلقة اتذاعت",
        en: "He was a secret partner in a deal with Sherif, the station owner, that would be exposed if the episode aired.",
      },
    },
    {
      id: "case-07-role-05",
      characterName: { ar: "شريف دياب", en: "Sherif Dayab" },
      occupation: { ar: "مالك القناة", en: "Station Owner" },
      relationshipToVictim: {
        ar: "صاحب القناة اللي بيقدم فيها البرنامج من البداية",
        en: "Owner of the channel where he's hosted the show from the start.",
      },
      whyAtScene: {
        ar: "مش من عادته يحضر التسجيلات، بس جه الليلة دي خصوصي",
        en: "Doesn't usually attend tapings, but came specially tonight.",
      },
      whatYouKnow: [
        { text: { ar: "كان قلقان من محتوى الحلقة دي أكتر من أي حلقة قبل كده", en: "He was more anxious about this episode's content than any before." } },
        { text: { ar: "طلب من سامي أكتر من مرة يأجل الموضوع، ورفض", en: "He asked Sami more than once to postpone the topic, and he refused." } },
        { text: { ar: "مش من المفروض يكون موجود في المبنى الليلة دي أصلًا حسب جدول تحركاته", en: "According to his usual schedule, he wasn't supposed to be in the building at all tonight." } },
      ],
      secret: {
        ar: "عنده صفقة استثمار سرية مع باسل هتتهدد لو الحلقة اتذاعت",
        en: "He has a secret investment deal with Basel that would be threatened if the episode aired.",
      },
    },
    {
      id: "case-07-role-06",
      characterName: { ar: "عماد فتحي", en: "Emad Fathy" },
      occupation: { ar: "حارس أمن الاستوديو", en: "Studio Security Guard" },
      relationshipToVictim: {
        ar: "مسؤول عن أمن المبنى كله وقت التسجيل",
        en: "Responsible for the whole building's security during tapings.",
      },
      whyAtScene: {
        ar: "بيراقب المدخل الرئيسي وكاميرات الممرات",
        en: "Monitoring the main entrance and corridor cameras.",
      },
      whatYouKnow: [
        { text: { ar: "كل الكاميرات كانت شغالة عادي الليلة دي، إلا كاميرا واحدة قدام باب الأستوديو الداخلي كانت متعطلة من الصبح", en: "All cameras were working normally that night, except one facing the studio's inner door, which had been broken since morning." } },
        { text: { ar: "شاف حد بيدخل من مدخل الضيوف الجانبي في وقت غريب قبل الحلقة", en: "He saw someone enter through the side guest entrance at an odd time before the show." } },
      ],
    },
    {
      id: "case-07-role-07",
      characterName: { ar: "مريم عادل", en: "Mariam Adel" },
      occupation: { ar: "متدربة صحفية", en: "Research Intern" },
      relationshipToVictim: {
        ar: "بتساعده في تجهيز أبحاث الحلقات من ستة شهور",
        en: "Helped him prepare research for episodes for six months.",
      },
      whyAtScene: {
        ar: "جهزت آخر الملفات والمستندات للحلقة معاه بنفسها",
        en: "Personally prepared the final files and documents for the episode with him.",
      },
      whatYouKnow: [
        { text: { ar: "هي اللي جمعت كل مستندات صفقة الأرض اللي هيعرضها سامي على الهوا", en: "She's the one who gathered all the land-deal documents Sami planned to reveal on air." } },
        { text: { ar: "سامعة إن سامي كان مصمم يذيع الحلقة الليلة دي مهما حصل", en: "She heard Sami was determined to air the episode tonight no matter what." } },
      ],
      secret: {
        ar: "لقت نسخة من المستندات ناقصة أوراق مهمة قبل الحلقة بساعات ومقالتش لحد",
        en: "She found a copy of the documents missing important pages hours before the episode, and told no one.",
      },
    },
    {
      id: "case-07-role-08",
      characterName: { ar: "داليا سامي", en: "Dalia Sami" },
      occupation: { ar: "مونتيرة ومطلقته", en: "Editor & His Ex-Wife" },
      relationshipToVictim: {
        ar: "مطلقته من سنتين، ولسه شغالة مونتيرة في نفس القناة",
        en: "His ex-wife of two years, still working as an editor at the same channel.",
      },
      whyAtScene: {
        ar: "بتجهز مونتاج الحلقة قبل البث المباشر",
        en: "Preparing the episode's edit before the live broadcast.",
      },
      whatYouKnow: [
        { text: { ar: "بينهم خلاف مالي قديم من ساعة الطلاق لسه مخلصش", en: "They have an old unresolved financial dispute from the divorce." } },
        { text: { ar: "عندها شركة إنتاج جديدة باسل بيموّلها جزئيًا", en: "She has a new production company that Basel partially funds." }, refersToRoleId: "case-07-role-04" },
        { text: { ar: "اتكلمت مع سامي بتوتر واضح قبل الحلقة بساعتين", en: "She spoke with Sami with visible tension two hours before the episode." } },
      ],
      secret: {
        ar: "طلبت منه فلوس إضافية قبل الحلقة بيوم واحد وهدد إنه مش هيديها حاجة تانية",
        en: "She'd asked him for extra money a day before the episode, and he threatened not to give her anything else.",
      },
    },
  ],
};

/**
 * Killer candidates per case — a subset of that case's own role ids.
 * Unchanged in scope from before: at game start, one id is randomly
 * chosen from the relevant list to be the killer for that session.
 */
export const LEGACY_KILLER_CANDIDATES_BY_CASE: Record<string, string[]> = {
  "case-01": ["case-01-role-02", "case-01-role-05", "case-01-role-07"],
  "case-02": ["case-02-role-01", "case-02-role-02", "case-02-role-07", "case-02-role-08"],
  "case-03": ["case-03-role-02", "case-03-role-03", "case-03-role-08"],
  "case-04": ["case-04-role-01", "case-04-role-02", "case-04-role-03", "case-04-role-08"],
  "case-05": ["case-05-role-01", "case-05-role-02", "case-05-role-06"],
  "case-06": ["case-06-role-02", "case-06-role-04", "case-06-role-05"],
  "case-07": ["case-07-role-02", "case-07-role-04", "case-07-role-05"],
};
