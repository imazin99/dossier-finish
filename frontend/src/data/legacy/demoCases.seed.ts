import { Fingerprint, KeyRound, Eye, Skull, Compass, PartyPopper, Radio } from "lucide-react";
import type { CaseSummary } from "@/types/case";
// Final approved artwork (user-provided) — single source of truth for every
// case image in the app: cards, poster/header, briefing scene, and the
// global background system. No procedural/placeholder art is used anymore.
import case01 from "@/assets/backgrounds/case-01.webp";
import case02 from "@/assets/backgrounds/case-02.webp";
import case03 from "@/assets/backgrounds/case-03.webp";
import case04 from "@/assets/backgrounds/case-04.webp";
import case05 from "@/assets/backgrounds/case-05.webp";

/**
 * Placeholder demo content — this will come from the backend once the
 * Cases API exists. Rewritten in Egyptian Arabic after playtesting
 * feedback, with richer intro info (victim/location/time shown before
 * player count is even chosen) and progressive clues + a full solution
 * explanation, since the killer is picked randomly per session.
 */
export const LEGACY_DEMO_CASES: CaseSummary[] = [
  {
    id: "case-01",
    number: "014",
    title: { ar: "لغز الفيلا الصامتة", en: "The Silent Villa" },
    description: {
      ar: "صاحب الفيلا اختفى في ليلة عاصفة، وسايب وراه غير رسالة غامضة.",
      en: "The villa's owner vanished on a stormy night, leaving only a cryptic note.",
    },
    difficulty: "medium",
    minutes: 45,
    posterIcon: Fingerprint,
    coverImage: case01,
    locationImage: case01,
    category: { ar: "لغز اختفاء", en: "Disappearance Mystery" },
    story: {
      ar: "من تلات ليالي، في عز عاصفة، صاحب الفيلا اختفى من غير أي أثر. مسابش غير ورقة غامضة على مكتبه وحراس ساكتين مش عايزين يتكلموا. عليكم تستجوبوا اللي فاضل، وتلموا الأدلة المبعثرة، قبل ما القضية تتقفل للأبد.",
      en: "Three nights ago, in a raging storm, the villa's wealthy owner vanished without a trace. Only a cryptic note remains on his desk, and silent guards who won't speak. You must question who's left and trace the scattered clues before the case is closed forever.",
    },
    objectives: [
      { ar: "استجوبوا كل الشهود اللي في الفيلا", en: "Question every witness inside the villa" },
      { ar: "فكوا رموز الرسالة الغامضة", en: "Decode the cryptic note" },
      { ar: "حددوا آخر واحد شاف الضحية", en: "Identify who last saw the victim" },
    ],
    briefing: {
      crimeDescription: {
        ar: "صاحب الفيلا اختفى بين عشية وضحاها من غير أي أثر، وسايب وراه فيلا نورها مفتوح وأبواب مقفولة وأسئلة أكتر من الإجابات.",
        en: "The villa's owner vanished overnight without a trace, leaving behind a lit-up house, locked doors, and more questions than answers.",
      },
      victim: { ar: "خالد المصري، راجل أعمال غني في الستينات", en: "Khaled Al-Masry, a wealthy businessman in his sixties" },
      location: { ar: "الفيلا الخاصة، الحي الراقي على طرف المدينة", en: "The private villa, an upscale district on the city's outskirts" },
      timeOfCrime: { ar: "نص ليل الثلاثاء اللي فات", en: "Midnight, last Tuesday" },
      objective: {
        ar: "اكتشفوا اللي حصل لخالد المصري في الليلة دي، وحددوا مين من اللي حاضرين عارف أكتر مما بيقول.",
        en: "Find out what really happened to Khaled Al-Masry that night — and which of those present knows more than they're saying.",
      },
    },
    discussionMinutes: 7,
    progressiveClues: [
      {
        id: "case-01-clue-01",
        order: 1,
        type: "neutral",
        textByKiller: {
          "case-01-role-02": { ar: "معدّش أي أثر عنف في الفيلا، لكن شنطة سفر صغيرة اختفت من مكانها المعتاد الصبح اللي بعد الاختفاء — مع إن كل هدومه وأوراقه الرسمية لسه في الدولاب زي ما هي.", en: "There's no sign of violence in the villa, but a small travel bag went missing from its usual spot the morning after — even though all his clothes and official papers are still exactly where they were." },
          "case-01-role-05": { ar: "معدّش أي أثر عنف في الفيلا، لكن شنطة سفر صغيرة اختفت من مكانها المعتاد الصبح اللي بعد الاختفاء — مع إن كل هدومه وأوراقه الرسمية لسه في الدولاب زي ما هي.", en: "There's no sign of violence in the villa, but a small travel bag went missing from its usual spot the morning after — even though all his clothes and official papers are still exactly where they were." },
          "case-01-role-07": { ar: "معدّش أي أثر عنف في الفيلا، لكن شنطة سفر صغيرة اختفت من مكانها المعتاد الصبح اللي بعد الاختفاء — مع إن كل هدومه وأوراقه الرسمية لسه في الدولاب زي ما هي.", en: "There's no sign of violence in the villa, but a small travel bag went missing from its usual spot the morning after — even though all his clothes and official papers are still exactly where they were." },
        },
      },
      {
        id: "case-01-clue-02",
        order: 2,
        type: "suspicious",
        textByKiller: {
          "case-01-role-02": { ar: "بقى واضح إن الجدول الزمني مش نضيف زي ما الكل حاول يوصفه. عمر قال إنه مشى قبل نص الليل بشوية بعد خناقة الفلوس، هالة قالت إنها سلمت ورق العقار وخرجت بدري، ومازن قال إنه كان بيتفقد الكاميرات في نفس الفترة تقريبًا — بس محدش فيهم ذكر إنه شاف التاني، رغم إن الفيلا مكنتش مزحومة في التوقيت ده أصلًا.", en: "The timeline turns out less clean than everyone described. Omar says he left just before midnight after the money argument, Hala says she dropped off the property papers and left early, and Mazen says he was checking the cameras around the same window — yet none of them mentioned seeing each other, even though the villa wasn't exactly crowded at that hour." },
          "case-01-role-05": { ar: "بقى واضح إن الجدول الزمني مش نضيف زي ما الكل حاول يوصفه. عمر قال إنه مشى قبل نص الليل بشوية بعد خناقة الفلوس، هالة قالت إنها سلمت ورق العقار وخرجت بدري، ومازن قال إنه كان بيتفقد الكاميرات في نفس الفترة تقريبًا — بس محدش فيهم ذكر إنه شاف التاني، رغم إن الفيلا مكنتش مزحومة في التوقيت ده أصلًا.", en: "The timeline turns out less clean than everyone described. Omar says he left just before midnight after the money argument, Hala says she dropped off the property papers and left early, and Mazen says he was checking the cameras around the same window — yet none of them mentioned seeing each other, even though the villa wasn't exactly crowded at that hour." },
          "case-01-role-07": { ar: "بقى واضح إن الجدول الزمني مش نضيف زي ما الكل حاول يوصفه. عمر قال إنه مشى قبل نص الليل بشوية بعد خناقة الفلوس، هالة قالت إنها سلمت ورق العقار وخرجت بدري، ومازن قال إنه كان بيتفقد الكاميرات في نفس الفترة تقريبًا — بس محدش فيهم ذكر إنه شاف التاني، رغم إن الفيلا مكنتش مزحومة في التوقيت ده أصلًا.", en: "The timeline turns out less clean than everyone described. Omar says he left just before midnight after the money argument, Hala says she dropped off the property papers and left early, and Mazen says he was checking the cameras around the same window — yet none of them mentioned seeing each other, even though the villa wasn't exactly crowded at that hour." },
        },
      },
      {
        id: "case-01-clue-03",
        order: 3,
        type: "eliminating",
        textByKiller: {
          "case-01-role-02": { ar: "اتضح إن الكاميرا اللي وقفت كانت مغطية الباب الجانبي بالظبط - يعني اللي دخل من هناك متأكدش إنه عمر أو مازن أو حتى حد تالت خالص. من ناحية تانية، خروج عمر «قبل نص الليل» مؤكد فعلاً من واحد من الخدم شافه ماشي - بس محدش يقدر يأكد إنه رجع تاني ولا لأ. وهالة، اللي المفروض تكون خرجت بدري، طلع إن تحويل الفلوس الغريب اللي شافته حصل في نفس الليلة دي بالظبط.", en: "It turns out the disabled camera covered exactly the side gate — meaning whoever entered through it can't be confirmed as Omar, Mazen, or even someone else entirely. Meanwhile, Omar's \"left before midnight\" claim is genuinely confirmed by a staff member who saw him go — but no one can confirm whether he came back afterward. And Hala, who was supposedly gone early, turns out to have witnessed that strange transfer on the very same night." },
          "case-01-role-05": { ar: "اتضح إن هالة كانت لسه في الفيلا وقت ما عمر بيمشي — يعني اتقابلوا فعلاً عند الباب، والاتنين قالوا إن الكلام اللي دار بينهم كان مجرد سلام عادي. من ناحية تانية، تحويل الفلوس الغريب اللي هالة قالت إنها «شافته بس» طلع من حساب هي نفسها بس ليها صلاحية توقيع عليه - بس ده لوحده مش دليل كفاية، لأن عندها تفويض رسمي يخليها توقع على تحويلات زي دي عادةً. وفضل السؤال قايم: مازن ليه قفل الكاميرا بالظبط في نفس التوقيت ده؟", en: "It turns out Hala was still at the villa when Omar was leaving — they did meet at the door, and both describe it as an ordinary goodbye. Meanwhile, the strange transfer Hala said she \"merely witnessed\" turns out to be from an account only she has signing authority over — though that alone isn't damning, since she's formally authorized to approve transfers like it. And the question remains: why exactly did Mazen disable the camera during that same window of time?" },
          "case-01-role-07": { ar: "اتضح إن خالد نفسه هو اللي طلب من مازن يقفل جزء من نظام الإنذار «مؤقتًا» قبل الاختفاء بيومين، من غير ما يقول السبب - وده موثق في سجلات مازن الرسمية. بس السؤال لسه قايم: ليه محدش عارف سبب وقف الكاميرا المنفصل ده في نفس الليلة؟ وعمر وهالة الاتنين لسه معاهم تفاصيل ما اتفسرتش: خناقة الفلوس القديمة، وتحويل الحساب الغريب.", en: "It turns out Khaled himself asked Mazen to disable part of the alarm system \"temporarily\" two days before the disappearance, without saying why — and it's documented in Mazen's official logs. But the question remains: why did the separate camera outage that same night go unexplained? And Omar and Hala both still carry their own unresolved details: the old money dispute, and the strange account transfer." },
        },
      },
      {
        id: "case-01-clue-04",
        order: 4,
        type: "finalDeduction",
        textByKiller: {
          "case-01-role-02": { ar: "لما راجعوا سجل الزوار مع أقوال الخدم، طلع إن عمر رجع للفيلا تاني مرة بعد نص الليل - نفس التوقيت اللي فيه الكاميرا الجانبية كانت واقفة. محدش من الخدم شافه يدخل تاني، بس عربيته اتشافت واقفة في الشارع لفترة أطول من مجرد «زيارة سلام». وده بيربط خناقة الفلوس القديمة بتوقيت دخوله الفعلي، مش بس خروجه المؤكد.", en: "Cross-checking the visitor log against staff statements shows Omar returned to the villa a second time after midnight — the same window the side camera was down. No staff member saw him come back in, but his car was seen parked on the street far longer than a simple farewell visit would explain. That ties the old money dispute directly to his actual re-entry, not just his confirmed exit." },
          "case-01-role-05": { ar: "لما قارنوا توقيت التحويل المشبوه بسجلات الدخول، طلع إن التحويل ده اتنفذ من جهاز موجود جوه الفيلا نفسها، مش من مكتب هالة زي ما افترض الكل الأول - وهالة هي الوحيدة اللي كان معاها صلاحية توقيع من جوه البيت في التوقيت ده بالظبط. يعني هي مكانتش «شافت» التحويل بس زي ما قالت، كانت موجودة وقت تنفيذه.", en: "Comparing the transfer's timestamp against entry logs shows it was executed from a device inside the villa itself — not from Hala's office, as everyone first assumed — and she's the only one with signing authority present inside the house at that exact time. Meaning she didn't just \"witness\" the transfer as she claimed; she was there when it happened." },
          "case-01-role-07": { ar: "التسجيل الجزئي اللي طلعوه من الكاميرا المجاورة قبل ما توقف بيوضح ظل حد بيدخل من الباب الجانبي وهو عارف بالظبط فين النقطة العمياء - معرفة زي دي محتاجة وصول لمخطط نظام الأمن نفسه، مش مجرد حظ. ومازن هو الوحيد اللي عنده المخطط ده من الأساس.", en: "The partial footage recovered from the neighboring camera before it cut out shows a shadow entering through the side gate, moving with precise knowledge of exactly where the blind spot is — the kind of knowledge that requires access to the security system's actual layout, not luck. And Mazen is the only one who has that layout at all." },
        },
      },
    ],
    solution: {
      killerExplanationByCandidate: {
        "case-01-role-02": {
          ar: "عمر كان بيخسر في المشروع وعارف إن خالد ناوي يسحب فلوسه بالكامل، فده كان هيخلص عليه تمامًا. وقّع ورق مزور باسمه، ورجع الفيلا تاني مرة بعد نص الليل عشان يتصرف قبل ما خالد يفضحه.",
          en: "Omar was losing money on the project and knew Khaled planned to pull out entirely — which would have ruined him. He forged papers in Khaled's name and returned to the villa after midnight to act before Khaled could expose him.",
        },
        "case-01-role-05": {
          ar: "هالة كانت بتخبي عملية تحويل فلوس مشبوهة نفذتها بنفسها من حساب خالد. لما حست إنه قرب يكتشف الموضوع، مكنش قدامها غير إنها تتصرف بسرعة.",
          en: "Hala had been hiding a suspicious transfer she personally carried out from Khaled's account. When she sensed he was about to discover it, she had to act fast.",
        },
        "case-01-role-07": {
          ar: "مازن هو الوحيد اللي يقدر يوقف الكاميرات ويفتح الباب الجانبي من غير ما حد يحس. استخدم وصوله لنظام الأمن عشان يدخل ويخرج من غير أثر.",
          en: "Mazen was the only one who could disable the cameras and open the side gate unnoticed. He used his access to the security system to come and go without a trace.",
        },
      },
      innocenceExplanationByCandidate: {
        "case-01-role-02": {
          ar: "عمر فعلاً زوّر ورق مالي عشان يغطي خسارته، بس ده كان قبل الحادثة بفترة وملوش علاقة مباشرة باختفاء خالد نفسه.",
          en: "Omar did forge financial papers to cover his losses, but that happened well before the incident and isn't directly tied to Khaled's disappearance.",
        },
        "case-01-role-05": {
          ar: "هالة فعلاً خبت تحويل مشبوه، بس التوقيت مبيطبقش مع ليلة الاختفاء، وكانت في مكان تاني وقتها.",
          en: "Hala did hide a suspicious transfer, but the timing doesn't match the night of the disappearance, and she was elsewhere at the time.",
        },
        "case-01-role-07": {
          ar: "مازن فعلاً وقف كاميرا واحدة بناءً على طلب خالد نفسه، مش عشان يخبي حاجة — وده اتأكد من سجلات الدخول بتاعته.",
          en: "Mazen did disable one camera, but at Khaled's own request, not to hide anything — confirmed by his own access logs.",
        },
      },
    },
  },
  {
    id: "case-02",
    number: "027",
    title: { ar: "مفتاح الغرفة المغلقة", en: "The Locked Room Key" },
    description: {
      ar: "جريمة جوه أوضة مقفولة من جوه، وكل الأدلة بتقول إن ده مستحيل.",
      en: "A crime inside a room locked from within — every clue points to the impossible.",
    },
    difficulty: "hard",
    minutes: 60,
    posterIcon: KeyRound,
    coverImage: case02,
    locationImage: case02,
    category: { ar: "لغز الأوضة المقفولة", en: "Locked-Room Mystery" },
    story: {
      ar: "لقوا الجثة جوه مكتب مقفول من جوه بمفتاح واحد لسه في جيب الضحية. مفيش شباك مكسور، ومفيش طريقة تانية تدخل بيها. الفريق مطلوب منه يثبت إن المستحيل ده له تفسير منطقي واحد بس.",
      en: "The body was found inside a study locked from within, its single key still in the victim's pocket. No broken windows, no other way out. Your team must prove the impossible has exactly one logical explanation.",
    },
    objectives: [
      { ar: "افحصوا آلية القفل ونقط الدخول", en: "Examine the lock mechanism and entry points" },
      { ar: "رتبوا الجدول الزمني للحادثة", en: "Reconstruct the timeline of events" },
      { ar: "اكتشفوا إزاي اتنفذت الجريمة المستحيلة دي", en: "Reveal how the impossible crime was carried out" },
    ],
    briefing: {
      crimeDescription: {
        ar: "الجثة اتلاقت جوه مكتب مقفول من جوه، والمفتاح الوحيد لسه في جيب الضحية. مفيش شباك مكسور، ومفيش طريقة تانية للدخول أو الخروج.",
        en: "The body was found inside a study locked from within, its single key still in the victim's pocket. No broken windows, no other way out.",
      },
      victim: { ar: "شريف عبد الوهاب، راجل أعمال في الخمسينات", en: "Sherif Abdel-Wahab, a businessman in his fifties" },
      location: { ar: "المكتب الخاص، الدور العلوي من بيت العيلة", en: "The private study, upper floor of the family home" },
      timeOfCrime: { ar: "مساء يوم الجمعة، بين الساعة تسعة وعشرة", en: "Friday evening, between 9 and 10 PM" },
      objective: {
        ar: "فسّروا إزاي جريمة حصلت جوه أوضة مقفولة من جوه، وحددوا مين اللي عنده التفسير المنطقي الوحيد لكل ده.",
        en: "Explain how a crime happened inside a room locked from within, and identify who has the one logical answer.",
      },
    },
    discussionMinutes: 8,
    warning: {
      ar: "فيه إشارات لجريمة قتل. يُفضّل يكون عمر اللاعبين +14.",
      en: "Contains references to a homicide. Recommended age 14+.",
    },
    progressiveClues: [
      {
        id: "case-02-clue-01",
        order: 1,
        type: "neutral",
        textByKiller: {
          "case-02-role-01": { ar: "الباب كان مقفول من جوه فعلاً والمفتاح لسه في جيبه، لكن صانع الأقفال بيأكد إن فيه طريقة نظرية واحدة تفتح بيها القفل ده من برّه من غير ما تكسره.", en: "The door really was locked from inside with the key still in his pocket — but the locksmith confirms there's exactly one theoretical way to open that lock from outside without breaking it." },
          "case-02-role-02": { ar: "الباب كان مقفول من جوه فعلاً والمفتاح لسه في جيبه، لكن صانع الأقفال بيأكد إن فيه طريقة نظرية واحدة تفتح بيها القفل ده من برّه من غير ما تكسره.", en: "The door really was locked from inside with the key still in his pocket — but the locksmith confirms there's exactly one theoretical way to open that lock from outside without breaking it." },
          "case-02-role-07": { ar: "الباب كان مقفول من جوه فعلاً والمفتاح لسه في جيبه، لكن صانع الأقفال بيأكد إن فيه طريقة نظرية واحدة تفتح بيها القفل ده من برّه من غير ما تكسره.", en: "The door really was locked from inside with the key still in his pocket — but the locksmith confirms there's exactly one theoretical way to open that lock from outside without breaking it." },
          "case-02-role-08": { ar: "الباب كان مقفول من جوه فعلاً والمفتاح لسه في جيبه، لكن صانع الأقفال بيأكد إن فيه طريقة نظرية واحدة تفتح بيها القفل ده من برّه من غير ما تكسره.", en: "The door really was locked from inside with the key still in his pocket — but the locksmith confirms there's exactly one theoretical way to open that lock from outside without breaking it." },
        },
      },
      {
        id: "case-02-clue-02",
        order: 2,
        type: "suspicious",
        textByKiller: {
          "case-02-role-01": { ar: "بمراجعة تحركات الكل مساء الجمعة، طلع إن نادية قالت إنها كانت في أوضتها من الساعة تسعة، طارق قال إنه كان في المبنى المجاور لسبب تاني خالص، غادة قالت إنها وصلت البيت بعد الحادثة بوقت طويل، وباسم قال إنه كان بيراجع الحسابات في مكتبه لوحده - بس مفيش شاهد واحد يأكد أي واحد من الأربعة كلامه بشكل قاطع، والبيت كان فاضي من الخدم في نفس الساعة دي بالذات.", en: "Reviewing everyone's movements on Friday evening, Nadia says she was in her room from nine, Tarek says he was in the next building for an unrelated reason, Ghada says she arrived home long after the incident, and Bassem says he was reviewing accounts alone in his office — but not one of the four has a witness who can confirm their account outright, and the house happened to be empty of staff during that exact hour." },
          "case-02-role-02": { ar: "بمراجعة تحركات الكل مساء الجمعة، طلع إن نادية قالت إنها كانت في أوضتها من الساعة تسعة، طارق قال إنه كان في المبنى المجاور لسبب تاني خالص، غادة قالت إنها وصلت البيت بعد الحادثة بوقت طويل، وباسم قال إنه كان بيراجع الحسابات في مكتبه لوحده - بس مفيش شاهد واحد يأكد أي واحد من الأربعة كلامه بشكل قاطع، والبيت كان فاضي من الخدم في نفس الساعة دي بالذات.", en: "Reviewing everyone's movements on Friday evening, Nadia says she was in her room from nine, Tarek says he was in the next building for an unrelated reason, Ghada says she arrived home long after the incident, and Bassem says he was reviewing accounts alone in his office — but not one of the four has a witness who can confirm their account outright, and the house happened to be empty of staff during that exact hour." },
          "case-02-role-07": { ar: "بمراجعة تحركات الكل مساء الجمعة، طلع إن نادية قالت إنها كانت في أوضتها من الساعة تسعة، طارق قال إنه كان في المبنى المجاور لسبب تاني خالص، غادة قالت إنها وصلت البيت بعد الحادثة بوقت طويل، وباسم قال إنه كان بيراجع الحسابات في مكتبه لوحده - بس مفيش شاهد واحد يأكد أي واحد من الأربعة كلامه بشكل قاطع، والبيت كان فاضي من الخدم في نفس الساعة دي بالذات.", en: "Reviewing everyone's movements on Friday evening, Nadia says she was in her room from nine, Tarek says he was in the next building for an unrelated reason, Ghada says she arrived home long after the incident, and Bassem says he was reviewing accounts alone in his office — but not one of the four has a witness who can confirm their account outright, and the house happened to be empty of staff during that exact hour." },
          "case-02-role-08": { ar: "بمراجعة تحركات الكل مساء الجمعة، طلع إن نادية قالت إنها كانت في أوضتها من الساعة تسعة، طارق قال إنه كان في المبنى المجاور لسبب تاني خالص، غادة قالت إنها وصلت البيت بعد الحادثة بوقت طويل، وباسم قال إنه كان بيراجع الحسابات في مكتبه لوحده - بس مفيش شاهد واحد يأكد أي واحد من الأربعة كلامه بشكل قاطع، والبيت كان فاضي من الخدم في نفس الساعة دي بالذات.", en: "Reviewing everyone's movements on Friday evening, Nadia says she was in her room from nine, Tarek says he was in the next building for an unrelated reason, Ghada says she arrived home long after the incident, and Bassem says he was reviewing accounts alone in his office — but not one of the four has a witness who can confirm their account outright, and the house happened to be empty of staff during that exact hour." },
        },
      },
      {
        id: "case-02-clue-03",
        order: 3,
        type: "eliminating",
        textByKiller: {
          "case-02-role-01": { ar: "اتأكد إن نادية كانت فعلاً في أوضتها لحد الساعة عشرة تقريبًا - كاميرا الممر بره أوضتها بتأكد كده. بس أوضتها دي بالذات ليها باب داخلي بيوصل لممر المكتب مباشرة، حاجة محدش فكر فيها الأول. في نفس الوقت، طارق لسه مقرب من مسرح الجريمة أكتر مما اعترف، وباسم لسه عنده تحويل مش مبرر.", en: "It's confirmed Nadia genuinely was in her room until around ten — the hallway camera outside her door backs that up. But that room happens to have an internal door leading straight to the study's corridor, something no one had considered before. Meanwhile, Tarek remains closer to the crime scene than he first admitted, and Bassem still has an unexplained transfer." },
          "case-02-role-02": { ar: "اتأكد إن طارق كان فعلاً في المبنى المجاور زي ما قال - بس المبنى ده متصل بمكتب شريف من مدخل خدمة قديم اتقفل رسميًا من سنين، ومحدش راجع لو لسه شغال ولا لأ. في نفس الوقت، نادية لسه معاها معرفة بتفاصيل الأوضة محدش يعرفها، وغادة لسه رجعت البلد في توقيت مريب.", en: "It's confirmed Tarek genuinely was in the neighboring building, as he claimed — but that building connects to Sherif's office through an old service entrance that was officially sealed off years ago, and no one has checked whether it still works. Meanwhile, Nadia still has knowledge of the room's details no one else has, and Ghada's return to the country remains suspiciously timed." },
          "case-02-role-07": { ar: "اتأكد إن غادة قابلت أخوها فعلاً بس الساعة سبعة تقريبًا - قبل وقت الجريمة بساعتين على الأقل، زي ما قالت. بس محدش شافها فعليًا وهي بتسيب البيت بعد كده، وسايقها الخاص مش متأكد من التوقيت بالظبط. في نفس الوقت، نادية وطارق لسه معاهم تفاصيل ما اتفسرتش.", en: "It's confirmed Ghada did meet her brother, around seven — at least two hours before the crime, as she claimed. But no one actually saw her leave the house afterward, and her own driver isn't certain of the exact time. Meanwhile, Nadia and Tarek both still carry their own unexplained details." },
          "case-02-role-08": { ar: "اتأكد إن باسم هو اللي بلّغ عن التحويلات الغريبة بنفسه، وده بيبان إنه بريء ظاهريًا - بس البلاغ ده جه بعد التحويل الكبير بيوم واحد بس، مش قبله، يعني ممكن يكون غطا بعد ما حس إن حد هيكتشف. في نفس الوقت، نادية وطارق لسه معاهم أسئلة من غير إجابة.", en: "It's confirmed Bassem is the one who reported the strange transfers himself, which makes him look innocent on the surface — but that report came just one day after the large transfer, not before it, meaning it could easily be cover once he sensed discovery was close. Meanwhile, Nadia and Tarek both still have unanswered questions of their own." },
        },
      },
      {
        id: "case-02-clue-04",
        order: 4,
        type: "finalDeduction",
        textByKiller: {
          "case-02-role-01": { ar: "الباب الداخلي اللي بيوصل من أوضة نادية لممر المكتب - واللي محدش فكر فيه - هو المدخل الوحيد اللي معدّاش قدام كاميرا الممر الرئيسي. ومعرفة الكود السري + الوصول المباشر ده مع بعض، محدش تاني عنده الاتنين مع بعض غير نادية.", en: "The internal door from Nadia's room to the study's corridor — the one no one had considered — is the only entry point that never passed the main hallway camera. Knowing the secret code combined with that direct access is a pairing only Nadia has." },
          "case-02-role-02": { ar: "لما فحصوا مدخل الخدمة القديم المتصل بمكتب شريف، لقوا آثار استخدام حديثة عليه رغم إنه المفروض يكون مقفول من سنين - وطارق هو الوحيد اللي كان عنده سبب يعرف بوجود المدخل ده أصلًا، لأنه اشتغل في نفس المبنى زمان.", en: "When they inspected the old service entrance connecting to Sherif's office, they found recent signs of use, despite it supposedly being sealed for years — and Tarek is the only one who had any reason to even know that entrance existed, having once worked in that same building." },
          "case-02-role-07": { ar: "سايق غادة أكد لاحقًا إنه سابها قدام البيت مرتين، مش مرة واحدة - يعني رجعت تاني بعد أول زيارة، في توقيت أقرب بكتير لوقت الجريمة مما قالت هي نفسها في الأول.", en: "Ghada's driver later confirmed he'd dropped her off outside the house twice, not once — meaning she came back a second time, much closer to the actual time of the crime than she'd first stated herself." },
          "case-02-role-08": { ar: "التحويل الكبير ليلة الجريمة معدّاش من غير كلمة مرور باسم بمستوى صلاحية معين، وباسم هو الوحيد اللي عنده الصلاحية دي من غير ما يحتاج توقيع شريف الشخصي - يعني هو الوحيد اللي كان يقدر ينفذه لوحده من غير ما حد يحس.", en: "The large transfer on the night of the crime required a password at Bassem's specific access level — and he's the only one with that level who doesn't need Sherif's personal sign-off, meaning he's the only one who could have executed it alone, unnoticed." },
        },
      },
    ],
    solution: {
      killerExplanationByCandidate: {
        "case-02-role-01": {
          ar: "نادية كانت الوحيدة العارفة كود قفل الأوضة السري، وكانت آخر واحدة اتكلمت مع زوجها قبل ما الباب يتقفل. استخدمت معرفتها بالكود عشان تدخل وتخرج من غير ما حد يشك.",
          en: "Nadia was the only one who knew the room's secret code and was the last to speak with her husband before the door closed. She used that knowledge to enter and leave without suspicion.",
        },
        "case-02-role-02": {
          ar: "طارق خسر صفقة كبيرة وحس إن مستقبله المهني كله في خطر. استغل علاقته القديمة بالمكان عشان يوصل للضحية في اللحظة المناسبة.",
          en: "Tarek lost a major deal and felt his entire career was at risk. He used his old familiarity with the place to reach the victim at the right moment.",
        },
        "case-02-role-07": {
          ar: "غادة رجعت بعد سنين من القطيعة عشان تصفي حساب قديم، وقابلت أخوها سرًا ساعات قبل الجريمة في نفس المكتب.",
          en: "Ghada returned after years of estrangement to settle an old score, and secretly met her brother hours before the crime, in that same study.",
        },
        "case-02-role-08": {
          ar: "باسم كان بيغطي على تحويلات مشبوهة من حساب الضحية، ولما حس إن الاكتشاف قرب، نفذ التحويل الأخير وتخلص من أي دليل يوصله بيه.",
          en: "Bassem had been covering up suspicious transfers from the victim's account, and when discovery seemed imminent, he executed the final transfer and eliminated the evidence tying it to him.",
        },
      },
      innocenceExplanationByCandidate: {
        "case-02-role-01": {
          ar: "نادية فعلاً عارفة الكود، بس كانت في أوضة تانية مع ضيوف وقت الجريمة بالظبط، وده أكدته أكتر من شهادة.",
          en: "Nadia does know the code, but she was in another room with guests at the exact time of the crime, confirmed by multiple accounts.",
        },
        "case-02-role-02": {
          ar: "طارق فعلاً كان زعلان من خسارة الصفقة، بس كان في اجتماع تاني في نفس التوقيت وسجل حضوره موثق.",
          en: "Tarek was upset about the lost deal, but he was in another meeting at the exact time, with documented attendance.",
        },
        "case-02-role-07": {
          ar: "غادة فعلاً قابلت أخوها بس قبل الجريمة بساعات طويلة، ومغادرتها كانت موثقة قبل وقت الحادثة بكتير.",
          en: "Ghada did meet her brother, but many hours before the crime, and her departure was documented well before the incident.",
        },
        "case-02-role-08": {
          ar: "باسم فعلاً لاحظ تحويلات غريبة، بس هو اللي بلغ عنها لمحققة التأمين من نفسه قبل ما حد يسأله.",
          en: "Bassem did notice strange transfers, but he's the one who reported them to the insurance investigator himself, before anyone asked.",
        },
      },
    },
  },
  {
    id: "case-03",
    number: "008",
    title: { ar: "العين اللي بتراقب", en: "The Watching Eye" },
    description: {
      ar: "شهود كتير، وحكايات مختلفة، وواحد بس عارف الحقيقة كاملة.",
      en: "Multiple witnesses, conflicting stories, and only one who knows the whole truth.",
    },
    difficulty: "easy",
    minutes: 30,
    posterIcon: Eye,
    coverImage: case03,
    locationImage: case03,
    category: { ar: "لغز الشهود", en: "Witness Mystery" },
    story: {
      ar: "أربع شهود، أربع حكايات مختلفة لنفس اللحظة. واحد فيهم بيكذب، والباقيين خلطوا بين اللي شافوه واللي اتخيلوه. مهمتكم تفرزوا الحقيقة من التفاصيل المتضاربة.",
      en: "Four witnesses, four different accounts of the same event. One is lying, and the rest are mixing what they saw with what they imagined. Your job is to sort truth from the conflicting details.",
    },
    objectives: [
      { ar: "قارنوا شهادات الأربعة", en: "Compare all four witness statements" },
      { ar: "حددوا التناقضات في كل حكاية", en: "Spot the contradictions in each account" },
      { ar: "اكتشفوا مين الشاهد اللي بيكذب", en: "Identify which witness is lying" },
    ],
    briefing: {
      crimeDescription: {
        ar: "حصلت مشادة صوتها عالي في شارع مزحوم وخلصت بحادثة غريبة، وشافها كام مارّ وكل واحد بيحكي التفاصيل بشكل مختلف.",
        en: "A loud altercation on a busy street ended in a strange incident, witnessed by several passersby who all tell conflicting versions of what exactly happened.",
      },
      victim: { ar: "شخص لسه هويته مش معروفة", en: "An individual whose identity is still unknown" },
      location: { ar: "شارع تجاري مزحوم في وسط البلد", en: "A busy commercial street downtown" },
      timeOfCrime: { ar: "مساء يوم عادي، حوالي الساعة سبعة", en: "An ordinary evening, around 7 PM" },
      objective: {
        ar: "لموا حكايات الشهود المتضاربة، واكتشفوا مين فيهم بيقول الحقيقة كاملة.",
        en: "Piece together the witnesses' conflicting accounts, and find out who's telling the whole truth.",
      },
    },
    discussionMinutes: 5,
    progressiveClues: [
      {
        id: "case-03-clue-01",
        order: 1,
        type: "neutral",
        textByKiller: {
          "case-03-role-02": { ar: "كل الشهود متفقين على حاجة واحدة بس: المشادة ابتدت هادية وفجأة اتصاعدت في أقل من دقيقة، وده مش شكل مشاجرة عادية بين غرباء.", en: "All the witnesses agree on exactly one thing: the argument started quietly and suddenly escalated in under a minute — not the usual shape of a fight between strangers." },
          "case-03-role-03": { ar: "كل الشهود متفقين على حاجة واحدة بس: المشادة ابتدت هادية وفجأة اتصاعدت في أقل من دقيقة، وده مش شكل مشاجرة عادية بين غرباء.", en: "All the witnesses agree on exactly one thing: the argument started quietly and suddenly escalated in under a minute — not the usual shape of a fight between strangers." },
          "case-03-role-08": { ar: "كل الشهود متفقين على حاجة واحدة بس: المشادة ابتدت هادية وفجأة اتصاعدت في أقل من دقيقة، وده مش شكل مشاجرة عادية بين غرباء.", en: "All the witnesses agree on exactly one thing: the argument started quietly and suddenly escalated in under a minute — not the usual shape of a fight between strangers." },
        },
      },
      {
        id: "case-03-clue-02",
        order: 2,
        type: "suspicious",
        textByKiller: {
          "case-03-role-02": { ar: "لما قارنوا شهادات الكل، طلع إن وديع غيّر مسار جولته المعتاد في نفس الليلة، وسلمى كانت في الشارع «بالصدفة» في نفس دقيقة المشادة بالظبط، وفارس كان قاعد في بلكونته زي كل ليلة بس معاه موبايله شغال من قبل ما المشادة تبدأ - بس محدش فيهم قال إنه شاف التنين التانيين، مع إن المسافة بين التلاتة كانت أقل من دقيقة مشي.", en: "Comparing everyone's accounts, Wadie changed his usual patrol route that exact night, Salma happened to be on the street at the precise minute of the argument, and Fares was on his balcony as usual — but with his phone already recording before the argument even started. None of the three mentioned seeing the other two, even though they were all less than a minute's walk apart." },
          "case-03-role-03": { ar: "لما قارنوا شهادات الكل، طلع إن وديع غيّر مسار جولته المعتاد في نفس الليلة، وسلمى كانت في الشارع «بالصدفة» في نفس دقيقة المشادة بالظبط، وفارس كان قاعد في بلكونته زي كل ليلة بس معاه موبايله شغال من قبل ما المشادة تبدأ - بس محدش فيهم قال إنه شاف التنين التانيين، مع إن المسافة بين التلاتة كانت أقل من دقيقة مشي.", en: "Comparing everyone's accounts, Wadie changed his usual patrol route that exact night, Salma happened to be on the street at the precise minute of the argument, and Fares was on his balcony as usual — but with his phone already recording before the argument even started. None of the three mentioned seeing the other two, even though they were all less than a minute's walk apart." },
          "case-03-role-08": { ar: "لما قارنوا شهادات الكل، طلع إن وديع غيّر مسار جولته المعتاد في نفس الليلة، وسلمى كانت في الشارع «بالصدفة» في نفس دقيقة المشادة بالظبط، وفارس كان قاعد في بلكونته زي كل ليلة بس معاه موبايله شغال من قبل ما المشادة تبدأ - بس محدش فيهم قال إنه شاف التنين التانيين، مع إن المسافة بين التلاتة كانت أقل من دقيقة مشي.", en: "Comparing everyone's accounts, Wadie changed his usual patrol route that exact night, Salma happened to be on the street at the precise minute of the argument, and Fares was on his balcony as usual — but with his phone already recording before the argument even started. None of the three mentioned seeing the other two, even though they were all less than a minute's walk apart." },
        },
      },
      {
        id: "case-03-clue-03",
        order: 3,
        type: "eliminating",
        textByKiller: {
          "case-03-role-02": { ar: "اتأكد إن وديع غيّر مساره عشان نام شوية في نص الشيفت - غلطة بيخاف يعترف بيها، مش جريمة. بس ده معناه إنه مكانش قادر يشوف حاجة في التوقيت ده أصلًا، وده سؤال جديد: مين قاله إن المشادة حصلت في التوقيت اللي قاله بالظبط؟ سلمى وفارس لسه معاهم تفاصيل غريبة برضه.", en: "It's confirmed Wadie changed his route because he dozed off mid-shift — an embarrassing mistake he's afraid to admit, not a crime. But that means he couldn't have actually seen anything at that time, raising a new question: who told him the argument happened at the exact time he claims? Salma and Fares both still have odd details of their own." },
          "case-03-role-03": { ar: "اتأكد إن سلمى فعلاً لقطت حاجة من الأرض بعد ما المشادة خلصت - بس التوقيت اللي قالته لوقت اللقطة ده أبكر بدقيقتين من التوقيت اللي شافها فيه وديع في نفس الشارع. فرق بسيط، بس كفاية إنه يخلي روايتها مش مية في المية. وديع وفارس لسه معاهم أسئلة من غير رد.", en: "It's confirmed Salma did pick something up after the argument ended — but the time she gives for that moment is two minutes earlier than when Wadie says he saw her on the same street. A small gap, but enough to make her account not quite add up. Wadie and Fares both still have unanswered questions." },
          "case-03-role-08": { ar: "اتأكد إن فارس كان بيصور من بلكونته للفرجة قبل ما يفهم إنها حقيقية - بس الفيديو نفسه فيه لقطة زاوية بتوضح إن الموبايل تحرك لمستوى شارع في لحظة معينة، مش فضل ثابت في يده وهو واقف زي ما قال. وديع وسلمى لسه معاهم حاجات غريبة.", en: "It's confirmed Fares was filming from his balcony just for fun before realizing it was real — but the footage itself contains one angle showing the phone dropped to street level for a moment, not held steady the whole time as he claimed while standing there. Wadie and Salma both still have odd details of their own." },
        },
      },
      {
        id: "case-03-clue-04",
        order: 4,
        type: "finalDeduction",
        textByKiller: {
          "case-03-role-02": { ar: "لو وديع كان نايم فعلاً في التوقيت اللي قاله، يبقى معرفتوش بمواعيد المشادة جات من حد تاني - إلا لو هو أصلًا كان صاحي وقتها وموجود في مكان تاني قريب، مش نايم زي ما اعترف. سجل جهاز تتبعه بيوضح إنه كان واقف في نص الشارع لمدة دقيقة كاملة، مش ماشي في جولته زي المفروض.", en: "If Wadie really was asleep at the time he claims, then his knowledge of the argument's exact timing must have come from somewhere else — unless he was actually awake and nearby the whole time, not asleep as he admitted. His tracker log shows him standing still in the middle of the street for a full minute, not walking his round as he was supposed to." },
          "case-03-role-03": { ar: "اللي «لقطته» سلمى من على الأرض طلع بيخص واحد من طرفي المشادة نفسها - يعني هي مش شاهدة من بره الموضوع زي ما قالت، كانت طرف فيه من البداية. ودي حاجة محدش من الشاهدين التانيين قدر يأكدها أو ينفيها.", en: "What Salma \"found\" on the ground turns out to belong to one of the arguing parties themselves — meaning she wasn't an outside witness as she claimed. She was part of the argument from the start, something neither of the other two witnesses could confirm or deny." },
          "case-03-role-08": { ar: "اللقطة اللي وريناها من فيديو فارس بتثبت إنه نزل فعليًا لمكان الحادثة قبل ما يرجع البلكونة يصور - يعني اتحرك من مكانه في وقت المشادة نفسه، مش بعدها زي ما حاول يقنع الكل.", en: "The clip we pulled from Fares's video proves he actually went down to the scene before returning to his balcony to film — meaning he moved from his spot during the argument itself, not after it, as he tried to convince everyone." },
        },
      },
    ],
    solution: {
      killerExplanationByCandidate: {
        "case-03-role-02": {
          ar: "الحارس غيّر جولته وغاب في التوقيت اللي حصلت فيه المشادة بالظبط، وده مش صدفة زي ما حاول يقنع الكل.",
          en: "The guard changed his round and was absent at the exact moment of the altercation — not a coincidence as he tried to claim.",
        },
        "case-03-role-03": {
          ar: "المارّة كانت طرف في المشادة من الأساس، والحاجة اللي \"لقتها\" كانت في الحقيقة بتاعتها هي.",
          en: "The passerby was actually a party to the argument from the start, and what she \"found\" was really her own.",
        },
        "case-03-role-08": {
          ar: "ساكن العمارة نزل فعليًا لمكان الحادثة قبل ما يرجع يصور من البلكونة، والفيديو نفسه بيثبت كده.",
          en: "The resident actually went down to the scene before returning to film from his balcony — the video itself proves it.",
        },
      },
      innocenceExplanationByCandidate: {
        "case-03-role-02": {
          ar: "الحارس فعلاً نام شوية وغيّر مساره، بس ده كان قبل الحادثة بوقت كافي وموثق في سجل الدخول.",
          en: "The guard did doze off and change his route, but that was well before the incident, and logged in the entry records.",
        },
        "case-03-role-03": {
          ar: "المارّة فعلاً لقطت حاجة من الأرض، بس بعد ما المشادة خلصت خالص ومحدش فاضل في المكان.",
          en: "The passerby did pick something up, but only after the altercation had fully ended and no one else was around.",
        },
        "case-03-role-08": {
          ar: "ساكن العمارة فعلاً صور المشهد، بس من بلكونته طول الوقت من غير ما ينزل خالص.",
          en: "The resident did film the scene, but from his balcony the entire time, without ever going down.",
        },
      },
    },
  },
  {
    id: "case-04",
    number: "041",
    title: { ar: "وصية آل الرملي", en: "The Al-Ramli Testament" },
    description: {
      ar: "وفاة مفاجئة، ووصية مثيرة للجدل، وعيلة مخبية أكتر مما بتظهر.",
      en: "A sudden death, a disputed will, and a family hiding more than it shows.",
    },
    difficulty: "medium",
    minutes: 50,
    posterIcon: Skull,
    coverImage: case04,
    locationImage: case04,
    category: { ar: "لغز عائلي", en: "Family Mystery" },
    story: {
      ar: "رب العيلة مات فجأة في نفس ليلة قراية وصيته المعدّلة. كل فرد في العيلة عنده سبب يستفيد من وفاته، وكل واحد فيهم مخبي حاجة. عليكم تفكّوا شبكة الأسرار قبل ما الثروة تتقسم.",
      en: "The family patriarch died suddenly the same night his amended will was to be read. Every family member has a reason to benefit from his death, and each is hiding something. You must untangle the web of secrets before the fortune is divided.",
    },
    objectives: [
      { ar: "راجعوا بنود الوصية المعدّلة", en: "Review the terms of the amended will" },
      { ar: "اكتشفوا دوافع كل فرد في العيلة", en: "Uncover each family member's motive" },
      { ar: "حددوا مين المستفيد الحقيقي من الوفاة", en: "Determine who truly benefits from the death" },
    ],
    briefing: {
      crimeDescription: {
        ar: "رب العيلة مات فجأة في نفس الليلة اللي كان المفروض تتقرا فيها وصيته المعدّلة، في ظروف بتثير الشك.",
        en: "The family patriarch died suddenly on the very night his amended will was to be read, under circumstances that raise doubts.",
      },
      victim: { ar: "الحاج إبراهيم الرملي، رب عيلة في السبعينات", en: "El-Hagg Ibrahim Al-Ramli, the family patriarch, in his seventies" },
      location: { ar: "بيت عيلة الرملي الكبير", en: "The Al-Ramli family's large estate home" },
      timeOfCrime: { ar: "ليلة اجتماع العيلة لقراية الوصية", en: "The night of the family's will-reading gathering" },
      objective: {
        ar: "اكتشفوا حقيقة وفاة رب العيلة، وحددوا مين من أفراد العيلة مخبي أكتر مما بيظهر.",
        en: "Uncover the truth behind the patriarch's death, and determine which family member is hiding more than they show.",
      },
    },
    discussionMinutes: 10,
    warning: {
      ar: "بيتناول موضوع الوفاة في قصة خيالية. يُفضّل يكون عمر اللاعبين +12.",
      en: "Involves themes of death within a fictional story. Recommended age 12+.",
    },
    progressiveClues: [
      {
        id: "case-04-clue-01",
        order: 1,
        type: "neutral",
        textByKiller: {
          "case-04-role-01": { ar: "التقرير الطبي الأولي بيقول إن الوفاة ممكن تكون طبيعية بالكامل — مفيش أي دليل قاطع لسه إنها جريمة. لكن توقيتها في نفس ليلة قراية الوصية المعدّلة صعب يكون صدفة.", en: "The initial medical report says the death could easily be entirely natural — there's still no hard proof of foul play. But its timing, the very night the amended will was to be read, is hard to call coincidence." },
          "case-04-role-02": { ar: "التقرير الطبي الأولي بيقول إن الوفاة ممكن تكون طبيعية بالكامل — مفيش أي دليل قاطع لسه إنها جريمة. لكن توقيتها في نفس ليلة قراية الوصية المعدّلة صعب يكون صدفة.", en: "The initial medical report says the death could easily be entirely natural — there's still no hard proof of foul play. But its timing, the very night the amended will was to be read, is hard to call coincidence." },
          "case-04-role-03": { ar: "التقرير الطبي الأولي بيقول إن الوفاة ممكن تكون طبيعية بالكامل — مفيش أي دليل قاطع لسه إنها جريمة. لكن توقيتها في نفس ليلة قراية الوصية المعدّلة صعب يكون صدفة.", en: "The initial medical report says the death could easily be entirely natural — there's still no hard proof of foul play. But its timing, the very night the amended will was to be read, is hard to call coincidence." },
          "case-04-role-08": { ar: "التقرير الطبي الأولي بيقول إن الوفاة ممكن تكون طبيعية بالكامل — مفيش أي دليل قاطع لسه إنها جريمة. لكن توقيتها في نفس ليلة قراية الوصية المعدّلة صعب يكون صدفة.", en: "The initial medical report says the death could easily be entirely natural — there's still no hard proof of foul play. But its timing, the very night the amended will was to be read, is hard to call coincidence." },
        },
      },
      {
        id: "case-04-clue-02",
        order: 2,
        type: "suspicious",
        textByKiller: {
          "case-04-role-01": { ar: "لما رتبوا حركة أهل البيت ليلة الاجتماع، طلع إن زياد كان في صالة الاستقبال من الساعة تمانية، دينا زارت مكتب والدها لفترة قصيرة، سلوى كانت في البيت طول الوقت من غير ما تتحرك من مكانها على حد قولها، ورامي رجع المدينة سرًا وموجود في البيت من غير ما يعلن نفسه رسميًا. بس مفيش حد من الأربعة شاف حد تاني قريب من المكتب في الفترة اللي مات فيها الحاج إبراهيم.", en: "Piecing together the household's movements that night, Ziad was in the reception hall from eight, Dina visited her father's study briefly, Salwa was home the whole time without leaving her spot by her own account, and Rami had secretly returned to the city and was in the house without formally announcing himself. But none of the four saw anyone else near the study during the window the patriarch died." },
          "case-04-role-02": { ar: "لما رتبوا حركة أهل البيت ليلة الاجتماع، طلع إن زياد كان في صالة الاستقبال من الساعة تمانية، دينا زارت مكتب والدها لفترة قصيرة، سلوى كانت في البيت طول الوقت من غير ما تتحرك من مكانها على حد قولها، ورامي رجع المدينة سرًا وموجود في البيت من غير ما يعلن نفسه رسميًا. بس مفيش حد من الأربعة شاف حد تاني قريب من المكتب في الفترة اللي مات فيها الحاج إبراهيم.", en: "Piecing together the household's movements that night, Ziad was in the reception hall from eight, Dina visited her father's study briefly, Salwa was home the whole time without leaving her spot by her own account, and Rami had secretly returned to the city and was in the house without formally announcing himself. But none of the four saw anyone else near the study during the window the patriarch died." },
          "case-04-role-03": { ar: "لما رتبوا حركة أهل البيت ليلة الاجتماع، طلع إن زياد كان في صالة الاستقبال من الساعة تمانية، دينا زارت مكتب والدها لفترة قصيرة، سلوى كانت في البيت طول الوقت من غير ما تتحرك من مكانها على حد قولها، ورامي رجع المدينة سرًا وموجود في البيت من غير ما يعلن نفسه رسميًا. بس مفيش حد من الأربعة شاف حد تاني قريب من المكتب في الفترة اللي مات فيها الحاج إبراهيم.", en: "Piecing together the household's movements that night, Ziad was in the reception hall from eight, Dina visited her father's study briefly, Salwa was home the whole time without leaving her spot by her own account, and Rami had secretly returned to the city and was in the house without formally announcing himself. But none of the four saw anyone else near the study during the window the patriarch died." },
          "case-04-role-08": { ar: "لما رتبوا حركة أهل البيت ليلة الاجتماع، طلع إن زياد كان في صالة الاستقبال من الساعة تمانية، دينا زارت مكتب والدها لفترة قصيرة، سلوى كانت في البيت طول الوقت من غير ما تتحرك من مكانها على حد قولها، ورامي رجع المدينة سرًا وموجود في البيت من غير ما يعلن نفسه رسميًا. بس مفيش حد من الأربعة شاف حد تاني قريب من المكتب في الفترة اللي مات فيها الحاج إبراهيم.", en: "Piecing together the household's movements that night, Ziad was in the reception hall from eight, Dina visited her father's study briefly, Salwa was home the whole time without leaving her spot by her own account, and Rami had secretly returned to the city and was in the house without formally announcing himself. But none of the four saw anyone else near the study during the window the patriarch died." },
        },
      },
      {
        id: "case-04-clue-03",
        order: 3,
        type: "eliminating",
        textByKiller: {
          "case-04-role-01": { ar: "اتأكد إن زياد كان في صالة الاستقبال مع الضيوف زي ما قال - بس فيه فجوة عشر دقايق في شهادات الضيوف مفيش حد فيها متأكد شافه بالظبط. محاولته يرشي المحامية لسه من غير تفسير بريء. دينا وسلوى ورامي كل واحد فيهم لسه معاه تفاصيل غريبة.", en: "It's confirmed Ziad was in the reception hall with guests, as he claimed — but there's a ten-minute gap in the guests' accounts where no one is certain they actually saw him. His attempt to bribe the lawyer still has no innocent explanation. Dina, Salwa, and Rami each still carry their own odd details." },
          "case-04-role-02": { ar: "اتأكد إن زيارة دينا لمكتب والدها كانت قصيرة فعلاً زي ما قالت - بس الشغالة أم كلثوم شافتها بتخرج من المكتب مرتين، مش مرة واحدة، من غير ما توضح سبب الرجعة التانية. الورقة الخاصة اللي كتبهالها والدها لسه سرية. زياد وسلوى ورامي لسه معاهم أسئلة من غير رد.", en: "It's confirmed Dina's visit to her father's study was indeed brief, as she claimed — but the housekeeper, Um Kulthum, saw her leave the study twice, not once, without explaining the reason for the second visit. The private note her father wrote her remains undisclosed. Ziad, Salwa, and Rami each still have unanswered questions." },
          "case-04-role-03": { ar: "اتأكد إن سلوى فعلاً كانت في البيت طول الليلة - بس «مكانها» ده كان بيتغير أكتر من مرة حسب مين سألها، من الصالون لغرفة النوم لمكتبة صغيرة قريبة من مكتب زوجها. مفيش حد قدر يأكد مكانها بالظبط لحظة بلحظة. زياد ودينا ورامي لسه معاهم تفاصيل غريبة.", en: "It's confirmed Salwa was indeed home the whole night — but her exact 'spot' shifted depending on who you asked her, from the salon to the bedroom to a small library near her husband's study. No one can confirm her location minute by minute. Ziad, Dina, and Rami each still have odd details of their own." },
          "case-04-role-08": { ar: "اتأكد إن رامي رجع المدينة سرًا فعلاً، ومقابلته مع أخوه كانت قصيرة زي ما قال. بس واحد من الخدم شاف نور مكتب الحاج إبراهيم لسه شغال بعد ما رامي قال إنه مشى بوقت طويل - يعني إما الخدم غلطان في التوقيت، أو رامي كان لسه هناك. زياد ودينا وسلوى لسه معاهم تفاصيل من غير تفسير.", en: "It's confirmed Rami genuinely did return to the city in secret, and his meeting with his brother was brief, as he claimed. But one of the staff saw the patriarch's study light still on well after Rami said he'd left — meaning either the staff member has the timing wrong, or Rami was still there. Ziad, Dina, and Salwa each still have unexplained details of their own." },
        },
      },
      {
        id: "case-04-clue-04",
        order: 4,
        type: "finalDeduction",
        textByKiller: {
          "case-04-role-01": { ar: "فحصوا سجل دخول قاعة الاستقبال، ولقوا إن زياد اتسجل خروجه من الباب الجانبي مرتين في نفس الليلة - مرة الساعة تمانية ونص، ومرة تانية في التوقيت اللي مات فيه أبوه بالظبط. الفجوة العشر دقايق اللي محدش أكدها كانت كفاية بالظبط عشان يوصل للمكتب ويرجع.", en: "Checking the reception hall's entry log, Ziad's exit through the side door was logged twice that night — once at eight-thirty, and once at the exact time his father died. The ten-minute gap no one could confirm was precisely enough time to reach the study and return." },
          "case-04-role-02": { ar: "الرجعة التانية لمكتب أبوها اللي شافتها أم كلثوم بتتطابق بالظبط مع وقت وفاته - ودينا هي الوحيدة اللي كانت قريبة كفاية في التوقيت ده، وعندها كمان أقوى دافع لإخفاء اللي حصل، لأن الورقة الخاصة اللي معاها كانت هتتغير قيمتها القانونية تمامًا لو كشفت قبل قراية الوصية.", en: "The second visit to her father's study that Um Kulthum saw lines up exactly with his time of death — and Dina is the only one who was close enough at that moment, with the strongest reason to keep it quiet, since the private note in her possession would have carried entirely different legal weight if revealed before the will was read." },
          "case-04-role-03": { ar: "لما رسموا خريطة تحركات سلوى المتضاربة، طلع إن المكان الوحيد اللي محدش قدر يستبعده هو المكتبة الصغيرة - اللي بيها باب داخلي يوصل لمكتب زوجها مباشرة. وهي الوحيدة من بين الأربعة اللي عندها سبب تستخدم الباب ده من غير ما تلفت النظر.", en: "Mapping out Salwa's conflicting movements, the one location no one could rule out was the small library — which has an internal door leading straight to her husband's study. And she's the only one of the four with a reason to use that door without drawing attention." },
          "case-04-role-08": { ar: "اتأكد إن نور المكتب فضل شغال بعد ما رامي قال إنه مشى - والخادمة اللي شافت النور نفسها شافت رامي بيدخل تاني من غير ما يعلن نفسه، عشان محدش من العيلة يعرف إنه لسه في البيت. يعني الرجوع السري ده كان تاني مرة، مش أول مرة بس.", en: "It's confirmed the study light stayed on after Rami said he'd left — and the same staff member who saw the light also saw Rami slip back in, without announcing himself, so the rest of the family wouldn't know he was still in the house. Meaning that secret return happened a second time, not just once." },
        },
      },
    ],
    solution: {
      killerExplanationByCandidate: {
        "case-04-role-01": {
          ar: "زياد حس إن الوصية الجديدة هتحرمه من حقه كابن أكبر. حاول يرشي المحامية الأول، ولما فشل، قرر يتصرف بنفسه في نفس الليلة.",
          en: "Ziad felt the new will would strip him of his rights as eldest son. He first tried to bribe the lawyer, and when that failed, decided to act himself that same night.",
        },
        "case-04-role-02": {
          ar: "دينا كانت عارفة بتعديل الوصية قبل الكل وهي المستفيدة الأكبر. الورقة السرية اللي كتبها لها والدها كانت بتكشف حاجة كانت مستعدة تعمل أي حاجة عشان تخبيها.",
          en: "Dina knew about the amendment before anyone and stood to benefit the most. The private note her father wrote her revealed something she was willing to do anything to hide.",
        },
        "case-04-role-03": {
          ar: "سلوى ضمنت لنفسها حقوق مالية كبيرة في الاتفاق السري، وحست إن أي تأخير ممكن يعرّض كل ده للخطر.",
          en: "Salwa had secured major financial rights in the secret agreement, and felt any delay could jeopardize it all.",
        },
        "case-04-role-08": {
          ar: "رامي رجع بعد سنين غياب عشان يصفي خلاف الميراث القديم بنفسه، وقابل أخوه لوحده ليلة وفاته.",
          en: "Rami returned after years away to settle the old inheritance dispute himself, meeting his brother alone the night he died.",
        },
      },
      innocenceExplanationByCandidate: {
        "case-04-role-01": {
          ar: "زياد فعلاً حاول يرشي المحامية، بس كان قاعد مع ضيوف تانيين وقت الوفاة بالظبط، وده مؤكد من أكتر من شاهد.",
          en: "Ziad did try to bribe the lawyer, but he was with other guests at the exact time of death, confirmed by multiple witnesses.",
        },
        "case-04-role-02": {
          ar: "دينا فعلاً زارت والدها بس قبل الوفاة بساعات طويلة، ومغادرتها موثقة قبل الحادثة بوقت كبير.",
          en: "Dina did visit her father, but hours before his death, and her departure is documented well before the incident.",
        },
        "case-04-role-03": {
          ar: "سلوى فعلاً وقّعت الاتفاق المالي، بس الاتفاق ده كان لصالحها من غير أي داعي تتصرف بعنف.",
          en: "Salwa did sign the financial agreement, but it already favored her — she had no need to act violently.",
        },
        "case-04-role-08": {
          ar: "رامي فعلاً قابل أخوه، بس المقابلة خلصت بمصالحة مش بخناقة، وأخوه ودّعه لحد الباب بنفسه.",
          en: "Rami did meet his brother, but the meeting ended in reconciliation, not conflict — his brother saw him out himself.",
        },
      },
    },
  },
  {
    id: "case-05",
    number: "019",
    title: { ar: "خريطة الاتجاه المفقود", en: "The Lost Bearing" },
    description: {
      ar: "رحلة استكشاف خلصت باختفاء غريب في منطقة مش موجودة في أي خريطة.",
      en: "An expedition ends in a mysterious disappearance, in a place no map shows.",
    },
    difficulty: "hard",
    minutes: 55,
    posterIcon: Compass,
    coverImage: case05,
    locationImage: case05,
    category: { ar: "لغز استكشاف", en: "Expedition Mystery" },
    story: {
      ar: "بعثة استكشاف من خمس أفراد راحت ورجع منها واحد بس، وده كمان ناسي جزء من ذاكرته. آخر سجلاته بيتكلم عن مكان مش موجود في أي خريطة معروفة. عليكم تتبعوا آخر مسار ليهم وتفهموا اللي حصل هناك.",
      en: "An expedition of five set out, and only one returned — with partial memory loss. His last logs describe a place that appears on no known map. You must retrace their final route and piece together what happened there.",
    },
    objectives: [
      { ar: "حللوا آخر سجلات البعثة", en: "Analyze the expedition's final logs" },
      { ar: "ارسموا المسار المفقود تاني", en: "Reconstruct the lost route" },
      { ar: "اعرفوا مصير باقي أفراد البعثة", en: "Learn the fate of the rest of the expedition" },
    ],
    briefing: {
      crimeDescription: {
        ar: "بعثة استكشاف من خمس أفراد راحت لمنطقة نائية ورجع منها واحد بس، ناسي جزء من ذاكرته ومعندوش إجابات واضحة.",
        en: "An expedition of five set out into a remote region, and only one member returned — with partial memory loss and no clear answers.",
      },
      victim: { ar: "أربع أفراد من البعثة، لسه مفقودين", en: "Four expedition members, still missing" },
      location: { ar: "منطقة نائية مش مسجلة في أي خريطة معروفة", en: "A remote region unmarked on any known map" },
      timeOfCrime: { ar: "في المرحلة الأخيرة من الرحلة، من عشر أيام", en: "During the expedition's final leg, ten days ago" },
      objective: {
        ar: "ارجعوا وافهموا اللي حصل في المرحلة الأخيرة دي، واكتشفوا مصير الأفراد المفقودين.",
        en: "Reconstruct what happened during that final leg, and discover the fate of the missing members.",
      },
    },
    discussionMinutes: 6,
    progressiveClues: [
      {
        id: "case-05-clue-01",
        order: 1,
        type: "neutral",
        textByKiller: {
          "case-05-role-01": { ar: "آخر إشارة لاسلكي من البعثة اتسجلت قبل انقطاع الاتصال بدقيقة واحدة بس، وكانت مطمّنة تمامًا — من غير أي علامة خطر أو تحذير.", en: "The expedition's last radio signal was logged just one minute before contact was lost, and it sounded completely calm — no sign of danger or warning." },
          "case-05-role-02": { ar: "آخر إشارة لاسلكي من البعثة اتسجلت قبل انقطاع الاتصال بدقيقة واحدة بس، وكانت مطمّنة تمامًا — من غير أي علامة خطر أو تحذير.", en: "The expedition's last radio signal was logged just one minute before contact was lost, and it sounded completely calm — no sign of danger or warning." },
          "case-05-role-06": { ar: "آخر إشارة لاسلكي من البعثة اتسجلت قبل انقطاع الاتصال بدقيقة واحدة بس، وكانت مطمّنة تمامًا — من غير أي علامة خطر أو تحذير.", en: "The expedition's last radio signal was logged just one minute before contact was lost, and it sounded completely calm — no sign of danger or warning." },
        },
      },
      {
        id: "case-05-clue-02",
        order: 2,
        type: "suspicious",
        textByKiller: {
          "case-05-role-01": { ar: "لما قارنوا سجلات الاتصال مع أقوال كل واحد، طلع إن جمال بيقول إنه فاقد جزء من ذاكرته من لحظة معينة بالظبط، علياء بتقول إنها كانت بتتابع من المكتب الرئيسي بعيد عن موقع الحدث، وهيثم بيقول إنه كان قاعد في غرفة التحكم طول الوقت - بس سجل الاتصال نفسه فيه فجوة ثانيتين مش متطابقة مع رواية أي واحد فيهم بالظبط.", en: "Comparing the communication logs against everyone's statements, Gamal says he lost part of his memory from a specific point onward, Alia says she was monitoring from the main office, far from the incident site, and Haytham says he was in the control room the entire time — but the log itself contains a two-second gap that doesn't quite match any one of their accounts." },
          "case-05-role-02": { ar: "لما قارنوا سجلات الاتصال مع أقوال كل واحد، طلع إن جمال بيقول إنه فاقد جزء من ذاكرته من لحظة معينة بالظبط، علياء بتقول إنها كانت بتتابع من المكتب الرئيسي بعيد عن موقع الحدث، وهيثم بيقول إنه كان قاعد في غرفة التحكم طول الوقت - بس سجل الاتصال نفسه فيه فجوة ثانيتين مش متطابقة مع رواية أي واحد فيهم بالظبط.", en: "Comparing the communication logs against everyone's statements, Gamal says he lost part of his memory from a specific point onward, Alia says she was monitoring from the main office, far from the incident site, and Haytham says he was in the control room the entire time — but the log itself contains a two-second gap that doesn't quite match any one of their accounts." },
          "case-05-role-06": { ar: "لما قارنوا سجلات الاتصال مع أقوال كل واحد، طلع إن جمال بيقول إنه فاقد جزء من ذاكرته من لحظة معينة بالظبط، علياء بتقول إنها كانت بتتابع من المكتب الرئيسي بعيد عن موقع الحدث، وهيثم بيقول إنه كان قاعد في غرفة التحكم طول الوقت - بس سجل الاتصال نفسه فيه فجوة ثانيتين مش متطابقة مع رواية أي واحد فيهم بالظبط.", en: "Comparing the communication logs against everyone's statements, Gamal says he lost part of his memory from a specific point onward, Alia says she was monitoring from the main office, far from the incident site, and Haytham says he was in the control room the entire time — but the log itself contains a two-second gap that doesn't quite match any one of their accounts." },
        },
      },
      {
        id: "case-05-clue-03",
        order: 3,
        type: "eliminating",
        textByKiller: {
          "case-05-role-01": { ar: "اتأكد إن جمال فاقد جزء من ذاكرته فعلاً، بتأكيد طبي من د. سليم - مش تمثيل. بس فقدان الذاكرة ده بيبدأ بالظبط من ثانية الفجوة في سجل الاتصال، مش قبلها ولا بعدها. علياء وهيثم لسه معاهم تفاصيل ما اتفسرتش.", en: "It's confirmed Gamal genuinely lost part of his memory — medically verified by Dr. Selim, not an act. But that memory loss begins at the exact second of the gap in the communication log, not before or after it. Alia and Haytham each still have unexplained details of their own." },
          "case-05-role-02": { ar: "اتأكد إن علياء كانت في المكتب الرئيسي زي ما قالت وقت انقطاع الاتصال - بس المكتب ده متصل بخط اتصال ثاني مباشر بالمعسكر، ومحدش أكد إنها ماستخدمتوش في التوقيت ده. موافقتها على تقليل الميزانية رغم التحذيرات لسه من غير تفسير. جمال وهيثم لسه معاهم أسئلة قايمة.", en: "It's confirmed Alia was in the main office as she claimed at the moment contact was lost — but that office has a second direct line to the camp, and no one has confirmed she didn't use it during that window. Her approval of the budget cut despite the warnings still has no explanation. Gamal and Haytham each still have open questions of their own." },
          "case-05-role-06": { ar: "اتأكد إن هيثم كان في غرفة التحكم طول الوقت زي ما قال - بس التسجيل اللي عنده ولسه ما سلموش فيه صوت تاني غير صوت البعثة، محدش عارف مين صاحبه، وهيثم رافض يوضح. جمال وعلياء لسه معاهم تفاصيل غريبة.", en: "It's confirmed Haytham was in the control room the whole time, as he claimed — but the recording he still hasn't handed over contains a second voice besides the expedition's, one no one has identified, and Haytham won't explain it. Gamal and Alia each still have odd details of their own." },
        },
      },
      {
        id: "case-05-clue-04",
        order: 4,
        type: "finalDeduction",
        textByKiller: {
          "case-05-role-01": { ar: "فحصوا معدات جمال اللي رجع بيها، ولقوا خط زمني مسجل عليها بيوضح إنه كان لسه صاحي وواعي بدقيقتين كاملتين بعد اللحظة اللي بيقول إنه فقد ذاكرته فيها - يعني الفجوة اللي بيدعيها أقصر بكتير من الحقيقة.", en: "Examining the equipment Gamal returned with, an auto-logged timestamp shows he was still conscious and alert for two full minutes after the point where he claims his memory loss began — meaning the gap he describes is far shorter than the truth." },
          "case-05-role-02": { ar: "سجلات الخط التاني في مكتب علياء بتوضح مكالمة صادرة في نفس ثانية الفجوة بالظبط، لمدة أقل من دقيقة - مكالمة محدش يعرف اتجهت لمين، لأن سجلات الجهة التانية مش متاحة للفريق.", en: "The logs for that second line in Alia's office show an outgoing call at the exact second of the gap, lasting under a minute — a call no one can trace the destination of, since the records on the other end aren't available to the team." },
          "case-05-role-06": { ar: "لما نضّفوا الصوت التاني في التسجيل، طلع إنه صوت هيثم نفسه بيتكلم بنبرة مختلفة تمامًا عن اللي في التقرير الرسمي - يعني اللي في التسجيل وقصة هيثم الرسمية مش نفس الحكاية.", en: "Cleaning up the second voice in the recording reveals it's Haytham himself, speaking in a completely different tone than what appears in the official report — meaning the recording and Haytham's official account aren't telling the same story." },
        },
      },
    ],
    solution: {
      killerExplanationByCandidate: {
        "case-05-role-01": {
          ar: "جمال كان قائد البعثة، وفي لحظة خطر حقيقي، اضطر ياخد قرار كلّف باقي الفريق. فقدان الذاكرة كان غطا، مش حقيقة كاملة.",
          en: "Gamal led the expedition, and in a moment of real danger, made a decision that cost the rest of the team. The memory loss was a cover, not the full truth.",
        },
        "case-05-role-02": {
          ar: "علياء قللت الميزانية رغم التحذيرات عشان توفر فلوس للجهة الراعية، وده خلى البعثة تدخل منطقة خطر من غير استعداد كافي.",
          en: "Alia cut the budget despite the warnings to save money for the sponsor, sending the expedition into a dangerous area without adequate preparation.",
        },
        "case-05-role-06": {
          ar: "هيثم سمع حاجة في آخر اتصال كانت ممكن تورطه، فقرر يخبي التسجيل ويغيّر الرواية الرسمية لللي حصل.",
          en: "Haytham heard something in the last contact that could implicate him, so he hid the recording and altered the official account of what happened.",
        },
      },
      innocenceExplanationByCandidate: {
        "case-05-role-01": {
          ar: "جمال فعلاً فاقد جزء من ذاكرته، بس ده مؤكد طبيًا من دكتور البعثة نفسه، مش تمثيل.",
          en: "Gamal genuinely lost part of his memory — confirmed medically by the expedition's own doctor, not an act.",
        },
        "case-05-role-02": {
          ar: "علياء فعلاً وافقت على تقليل الميزانية، بس القرار ده اتاخد قبل ما التحذير الداخلي يوصلها أصلًا.",
          en: "Alia did approve the budget cut, but that decision was made before the internal warning ever reached her.",
        },
        "case-05-role-06": {
          ar: "هيثم فعلاً خبى التسجيل، بس عشان كان خايف من اللوم مش لأنه متورط في اللي حصل فعليًا.",
          en: "Haytham did hide the recording, but out of fear of blame, not because he was actually involved in what happened.",
        },
      },
    },
  },
  {
    id: "case-06",
    number: "033",
    title: { ar: "الزفة الأخيرة", en: "The Last Procession" },
    description: {
      ar: "العريس اختفى من فرحه لخمس دقايق بس... ومرجعش تاني.",
      en: "The groom stepped away from his own wedding for five minutes — and never came back.",
    },
    difficulty: "medium",
    minutes: 50,
    // No user-approved photography exists for this case yet — falls back
    // to posterIcon everywhere (CaseCard, Case Details poster, Briefing
    // scene) exactly as that field's fallback path is designed to do.
    // The global SceneBackground system also falls back to the shared
    // background-main image automatically for any case with no
    // coverImage set — see components/layout/SceneBackground.tsx, which
    // reads coverImage directly off the case data (no per-case
    // registration needed). Add coverImage/locationImage here once real
    // art exists (960×1200 portrait / 960×540 landscape, matching
    // case-01..05's dimensions) and both the poster AND the Case Details
    // background will pick it up automatically.
    posterIcon: PartyPopper,
    category: { ar: "لغز عرس", en: "Wedding Mystery" },
    story: {
      ar: "في أفخم قاعة أفراح في المدينة، وسط الزغاريد والموسيقى، اختفى العريس فجأة من زفة فرحه لخمس دقايق بس - وده كان كفاية. لقوه في أوضة الـ VIP الخاصة من غير أي علامة عنف، وتليفونه مفقود. عليكم تستجوبوا المعازيم قبل ما الليلة تتحول من فرح لجريمة منسية.",
      en: "In the city's grandest wedding hall, amid music and celebration, the groom vanished from his own zaffa procession for just five minutes — and that was enough. He was found in the private VIP lounge with no sign of violence, his phone missing. You must question the guests before the night turns from a wedding into a forgotten crime.",
    },
    objectives: [
      { ar: "استجوبوا المعازيم القريبين من العريس", en: "Question the guests closest to the groom" },
      { ar: "تتبعوا مين كان قريب من أوضة الـ VIP وقت الزفة", en: "Trace who was near the VIP lounge during the zaffa" },
      { ar: "اكتشفوا مين استعار كارت الأوضة من منظمة الفرح", en: "Find out who borrowed the lounge's keycard from the wedding planner" },
    ],
    briefing: {
      crimeDescription: {
        ar: "العريس يوسف اختفى من زفة فرحه لخمس دقايق بس، ولقوه بعدها في أوضة الـ VIP الخاصة من غير أي علامة عنف أو كسر في الباب.",
        en: "The groom, Youssef, vanished from his own zaffa for just five minutes, and was found afterward in the private VIP lounge with no sign of violence or forced entry.",
      },
      victim: { ar: "يوسف الدسوقي، عريس في بداية الثلاثينات وصاحب شركة تصدير أثاث ناشئة", en: "Youssef El-Dessouky, a groom in his early thirties who owns a growing furniture-export company" },
      location: { ar: "قاعة أفراح فخمة في وسط المدينة، أوضة الـ VIP الخاصة", en: "A lavish wedding hall in the city center, the private VIP lounge" },
      timeOfCrime: { ar: "ليلة الفرح، حوالي الساعة أحد عشر مساءً وقت الزفة", en: "Wedding night, around 11 PM during the zaffa procession" },
      objective: {
        ar: "اكتشفوا اللي حصل ليوسف في العشرين دقيقة دي، وحددوا مين من المعازيم عارف أكتر مما بيقول.",
        en: "Find out what happened to Youssef in those twenty minutes — and which guest knows more than they're saying.",
      },
    },
    discussionMinutes: 8,
    progressiveClues: [
      {
        id: "case-06-clue-01",
        order: 1,
        type: "neutral",
        textByKiller: {
          "case-06-role-02": { ar: "يوسف قال لأصحابه إنه هيرجع بعد خمس دقايق وهو ماشي ناحية أوضة الـ VIP وقت الزفة، ولقوه بعد عشرين دقيقة تقريبًا من غير أي علامة عنف. تليفونه مش موجود معاه، والباب كان من غير أي كسر أو تلاعب.", en: "Youssef told his friends he'd be back in five minutes as he walked toward the VIP lounge during the zaffa. He was found roughly twenty minutes later with no sign of violence. His phone is missing, and the door showed no signs of forced entry." },
          "case-06-role-04": { ar: "يوسف قال لأصحابه إنه هيرجع بعد خمس دقايق وهو ماشي ناحية أوضة الـ VIP وقت الزفة، ولقوه بعد عشرين دقيقة تقريبًا من غير أي علامة عنف. تليفونه مش موجود معاه، والباب كان من غير أي كسر أو تلاعب.", en: "Youssef told his friends he'd be back in five minutes as he walked toward the VIP lounge during the zaffa. He was found roughly twenty minutes later with no sign of violence. His phone is missing, and the door showed no signs of forced entry." },
          "case-06-role-05": { ar: "يوسف قال لأصحابه إنه هيرجع بعد خمس دقايق وهو ماشي ناحية أوضة الـ VIP وقت الزفة، ولقوه بعد عشرين دقيقة تقريبًا من غير أي علامة عنف. تليفونه مش موجود معاه، والباب كان من غير أي كسر أو تلاعب.", en: "Youssef told his friends he'd be back in five minutes as he walked toward the VIP lounge during the zaffa. He was found roughly twenty minutes later with no sign of violence. His phone is missing, and the door showed no signs of forced entry." },
        },
      },
      {
        id: "case-06-clue-02",
        order: 2,
        type: "suspicious",
        textByKiller: {
          "case-06-role-02": { ar: "لما قارنوا شهادات المعازيم، طلع إن كريم قال إنه خرج من على البيست لعشر دقايق بس، عادل قال إنه رد على مكالمة عاجلة برة القاعة، ومراد قال إنه فضل قريب من الاستقبال طول الوقت - بس محدش فيهم قال إنه شاف التنين التانيين، رغم إن الممر المؤدي لأوضة الـ VIP كان بيوصّل بين كل الأماكن دي.", en: "Comparing the guests' accounts, Karim says he stepped off the dance floor for just ten minutes, Adel says he took an urgent call outside the hall, and Murad says he stayed near the reception the whole time — but none of them mentioned seeing the other two, even though the corridor leading to the VIP lounge connects all of those spots." },
          "case-06-role-04": { ar: "لما قارنوا شهادات المعازيم، طلع إن كريم قال إنه خرج من على البيست لعشر دقايق بس، عادل قال إنه رد على مكالمة عاجلة برة القاعة، ومراد قال إنه فضل قريب من الاستقبال طول الوقت - بس محدش فيهم قال إنه شاف التنين التانيين، رغم إن الممر المؤدي لأوضة الـ VIP كان بيوصّل بين كل الأماكن دي.", en: "Comparing the guests' accounts, Karim says he stepped off the dance floor for just ten minutes, Adel says he took an urgent call outside the hall, and Murad says he stayed near the reception the whole time — but none of them mentioned seeing the other two, even though the corridor leading to the VIP lounge connects all of those spots." },
          "case-06-role-05": { ar: "لما قارنوا شهادات المعازيم، طلع إن كريم قال إنه خرج من على البيست لعشر دقايق بس، عادل قال إنه رد على مكالمة عاجلة برة القاعة، ومراد قال إنه فضل قريب من الاستقبال طول الوقت - بس محدش فيهم قال إنه شاف التنين التانيين، رغم إن الممر المؤدي لأوضة الـ VIP كان بيوصّل بين كل الأماكن دي.", en: "Comparing the guests' accounts, Karim says he stepped off the dance floor for just ten minutes, Adel says he took an urgent call outside the hall, and Murad says he stayed near the reception the whole time — but none of them mentioned seeing the other two, even though the corridor leading to the VIP lounge connects all of those spots." },
        },
      },
      {
        id: "case-06-clue-03",
        order: 3,
        type: "eliminating",
        textByKiller: {
          "case-06-role-02": { ar: "اتأكد إن كريم خرج فعلاً عشان يحاول يستلف فلوس من حد من المعازيم - وده يفسر توتره، بس مش بالضرورة يفسر غيابه الكامل لعشر دقايق كاملة، وهو وقت أطول من مكالمة استلاف بسيطة. عادل ومراد لسه معاهم تفاصيل ما اتوضحتش.", en: "It's confirmed Karim genuinely stepped away to try borrowing money from a guest — which explains his anxiety, but not necessarily his full ten-minute absence, longer than a simple ask for a loan would need. Adel and Murad each still have details of their own that remain unclear." },
          "case-06-role-04": { ar: "اتأكد إن مكالمة عادل كانت فعلاً مع شركة منافسة - بس مش واضح لسه لو كانت بخصوص الصفقة السرية ولا مشكلة شحنة عادية زي ما حاول يقنع الكل، لأن محدش سمع تفاصيل المكالمة نفسها. كريم ومراد لسه معاهم أسئلة قايمة.", en: "It's confirmed Adel's call genuinely was with a rival company — but it's still unclear whether it concerned the secret deal or was a routine shipment issue, as he tried to convince everyone, since no one actually heard the details of the call itself. Karim and Murad each still have open questions." },
          "case-06-role-05": { ar: "اتأكد إن مراد فضل قريب من الاستقبال معظم الوقت زي ما قال - بس «معظم الوقت» دي مش «كل الوقت»، وفيه فجوة دقيقتين محدش من الشهود قادر يأكدها. كريم وعادل لسه معاهم تفاصيل غريبة.", en: "It's confirmed Murad genuinely stayed near the reception most of the time, as he claimed — but 'most of the time' isn't 'the whole time,' and there's a two-minute gap none of the witnesses can account for. Karim and Adel each still have odd details of their own." },
        },
      },
      {
        id: "case-06-clue-04",
        order: 4,
        type: "finalDeduction",
        textByKiller: {
          "case-06-role-02": { ar: "سجل سلمى بيوضح إن الكارت الرئيسي استُعير منها لمدة عشرين دقيقة، مش عشر - ضعف المدة اللي قالها كريم لغيابه. حجة «هدية العروسين» اللي قالها ما تفسرش ليه احتاج عشرين دقيقة كاملة، ومحدش تاني كان عنده سبب يطلب الكارت في نفس التوقيت.", en: "Salma's log shows the master card was borrowed for twenty minutes, not ten — double the length of time Karim admitted being away. The 'couple's gift' excuse he gave doesn't explain why it took a full twenty minutes, and no one else had a reason to request the card during that same window." },
          "case-06-role-04": { ar: "الملف اللي قال عادل إنه سايبه لخالد كان عن العقد اللي هو نفسه بيتفاوض عليه سرًا مع الشركة المنافسة - يعني الحجة اللي استخدمها عشان ياخد الكارت من سلمى كانت مرتبطة مباشرة بالخيانة نفسها، مش بعيدة عنها.", en: "The file Adel said he left for Youssef was tied to the very contract he was secretly negotiating with the rival company — meaning the excuse he used to get the card from Salma was directly connected to the betrayal itself, not separate from it." },
          "case-06-role-05": { ar: "الحجة اللي قنع بيها مراد سلمى - إنه لازم يوصل هدية بنفسه كخطيب سابق - مفيهاش أي منطق عادي، ومحدش من المعازيم التانيين عمل حاجة زي كده في أي فرح تاني. وهو الوحيد اللي كان عنده سبب شخصي يوصل ليوسف لوحده بعد التهديد اللي حصله بيه.", en: "The excuse Murad used to convince Salma — that he, as the bride's former fiancé, needed to personally deliver a gift — doesn't hold up to ordinary logic, and none of the other guests have ever done something like that at any other wedding. And he's the only one with a personal reason to reach Youssef alone, after being threatened by him." },
        },
      },
    ],
    solution: {
      killerExplanationByCandidate: {
        "case-06-role-02": {
          ar: "كريم كان بياخد فلوس من حساب الميراث المشترك من غير علم يوسف عشان يغطي ديون قمار متراكمة، ويوسف اكتشف الموضوع قبل الفرح بيومين وهدده إنه هيقوله لأمهم ويقطع علاقته بالشركة تمامًا. استغل كريم لحظة الزفة عشان يوصله لوحده ويحاول يقنعه يسكت — بس الموقف خرج عن السيطرة.",
          en: "Karim had been taking money from their joint inheritance account without Youssef's knowledge to cover mounting gambling debts, and Youssef discovered it two days before the wedding, threatening to tell their mother and cut him off from the company entirely. Karim used the moment of the zaffa to reach him alone and try to talk him down — but it spiraled out of control.",
        },
        "case-06-role-04": {
          ar: "عادل كان بيفاوض سرًا على بيع عقود التصدير المشتركة لشركة منافسة، وده كان هيخلي يوسف يفلس تمامًا بعد القرض الكبير اللي كان أخده لتوسيع الشركة. لما حس إن يوسف قرب يكتشف الاتفاق، مكانش قدامه غير إنه يتصرف بسرعة قبل ما يرجع من شهر العسل ويكتشف كل حاجة.",
          en: "Adel had been secretly negotiating to sell their shared export contracts to a rival company, which would have bankrupted Youssef entirely after the large loan he'd taken to expand it. When he sensed Youssef was close to discovering the deal, he had to act fast — before he came back from the honeymoon and found out everything.",
        },
        "case-06-role-05": {
          ar: "مراد كان لسه بيحاول يرجع نور ليه من ورا يوسف، ويوسف اكتشف رسايله وهدده إنه هيفضح فضيحة قديمة عنه قدام كل المدعوين لو ما مشيش من الفرح فورًا. الإهانة والتهديد في نفس ليلة زفافه خلوا مراد يستنى له في الممر الخاص عشان يواجهه لوحده.",
          en: "Murad had been secretly trying to win Nour back behind Youssef's back, and Youssef discovered his messages, threatening to expose an old scandal of his in front of all the guests if he didn't leave immediately. The humiliation and the threat, on his own wedding night, drove Murad to wait for him in the private corridor to confront him alone.",
        },
      },
      innocenceExplanationByCandidate: {
        "case-06-role-02": {
          ar: "كريم فعلاً كان بياخد فلوس من حساب الميراث المشترك عشان ديون القمار، وده هيبقى مشكلة كبيرة له مع عيلته — بس التوقيت ده تحديدًا مبيطابقش لحظة اختفاء يوسف، وكان في مكان تاني وقتها.",
          en: "Karim genuinely had been taking money from the joint account to cover gambling debts — a serious problem with his family regardless — but the timing doesn't match the exact moment Youssef vanished, and he was elsewhere at the time.",
        },
        "case-06-role-04": {
          ar: "عادل فعلاً كان بيفاوض سرًا على بيع العقود المشتركة، وده خيانة حقيقية لشريكه — بس المفاوضات دي كانت لسه في مرحلة مبدئية، ومحتاجة وقت أطول بكتير من ليلة الفرح عشان تتنفذ.",
          en: "Adel genuinely had been secretly negotiating to sell the shared contracts — a real betrayal of his partner — but those negotiations were still in an early stage, needing far more time than a single wedding night to carry out.",
        },
        "case-06-role-05": {
          ar: "مراد فعلاً كان بيحاول يرجع نور وهدد يوسف بفضيحة، وده يخليه مشتبه فيه منطقي — بس اتأكد إنه فضل قريب من الاستقبال طول الوقت دا، وشهود كتير أكدوا وجوده هناك.",
          en: "Murad genuinely had been trying to win Nour back and had threatened Youssef over a scandal, which makes him a logical suspect — but he's confirmed to have stayed near the reception the whole time, with several guests confirming he was there.",
        },
      },
    },
  },
  {
    id: "case-07",
    number: "052",
    title: { ar: "البث الأخير", en: "The Final Broadcast" },
    description: {
      ar: "مذيع مثير للجدل بيموت قبل حلقة فضايح بعشرين دقيقة بس.",
      en: "A controversial TV host dies just twenty minutes before an explosive live episode.",
    },
    difficulty: "hard",
    minutes: 55,
    // Same note as case-06 above: no user-approved photography exists yet
    // for this case — posterIcon fallback + SceneBackground's own
    // automatic fallback to background-main cover it until real art is
    // supplied and registered.
    posterIcon: Radio,
    category: { ar: "لغز إعلامي", en: "Media Mystery" },
    story: {
      ar: "قبل البث المباشر بعشرين دقيقة بس، دخل المذيع سامي عبد النور غرفة التسجيل العازلة للصوت لوحده زي كل مرة - ومرجعش. الحلقة كانت هتفضح صفقة كبيرة، وفيه أكتر من واحد كان هيخسر كل حاجة لو اتذاعت. عليكم تكتشفوا مين دخل عليه في العشرين دقيقة دي قبل ما الاستوديو يتحول من مكان بث لمسرح جريمة.",
      en: "Just twenty minutes before airtime, TV host Sami Abdel-Nour walked into the soundproof recording booth alone, as he always did — and never walked back out. The episode was about to expose a major deal, and more than one person stood to lose everything if it aired. You must find out who went in to see him in those twenty minutes, before the studio turned from a broadcast set into a crime scene.",
    },
    objectives: [
      { ar: "استجوبوا فريق البرنامج وضيف الحلقة", en: "Question the show's team and tonight's guest" },
      { ar: "افحصوا سجلات دخول الأستوديو والكاميرات", en: "Examine the studio's entry logs and cameras" },
      { ar: "اكتشفوا مين فتح باب الأستوديو الداخلي في توقيت الاختفاء", en: "Find out who unlocked the studio's inner door at the time he vanished" },
    ],
    briefing: {
      crimeDescription: {
        ar: "المذيع سامي دخل غرفة التسجيل العازلة للصوت لوحده قبل البث بعشرين دقيقة، ولقوه بعدها من غير أي علامة عنف - ونظام الإنتركوم اللي بيسيبه شغال دايمًا كان مقفول.",
        en: "Host Sami went into the soundproof recording booth alone twenty minutes before the broadcast, and was found afterward with no sign of violence — the intercom system he always kept on was switched off.",
      },
      victim: { ar: "سامي عبد النور، مذيع مثير للجدل في الأربعينات بقناة النبأ", en: "Sami Abdel-Nour, a controversial TV host in his forties at Al-Nabaa Channel" },
      location: { ar: "استوديو قناة النبأ، غرفة التسجيل العازلة للصوت", en: "Al-Nabaa Channel's studio, the soundproof recording booth" },
      timeOfCrime: { ar: "مساء البث المباشر، عشرين دقيقة قبل بداية الحلقة", en: "The evening of the live broadcast, twenty minutes before the episode began" },
      objective: {
        ar: "اكتشفوا مين دخل على سامي في العشرين دقيقة دي، ومين كان هيخسر أكتر لو الحلقة اتذاعت.",
        en: "Find out who went in to see Sami in those twenty minutes, and who stood to lose the most if the episode aired.",
      },
    },
    discussionMinutes: 9,
    progressiveClues: [
      {
        id: "case-07-clue-01",
        order: 1,
        type: "neutral",
        textByKiller: {
          "case-07-role-02": { ar: "سامي دخل غرفة التسجيل العازلة للصوت لوحده قبل البث المباشر بعشرين دقيقة، زي عادته يراجع كلمته الافتتاحية. لقوه بعد كده من غير أي علامة عنف، ونظام الإنتركوم اللي بيسيبه شغال دايمًا كان مقفول - حاجة غريبة عليه، لأنه حريص جدًا على الأمان.", en: "Sami went into the soundproof recording booth alone twenty minutes before the live broadcast, as he always did to review his opening lines. He was found afterward with no sign of violence, and the intercom system he always kept on was switched off — unusual for him, since he was very security-conscious." },
          "case-07-role-04": { ar: "سامي دخل غرفة التسجيل العازلة للصوت لوحده قبل البث المباشر بعشرين دقيقة، زي عادته يراجع كلمته الافتتاحية. لقوه بعد كده من غير أي علامة عنف، ونظام الإنتركوم اللي بيسيبه شغال دايمًا كان مقفول - حاجة غريبة عليه، لأنه حريص جدًا على الأمان.", en: "Sami went into the soundproof recording booth alone twenty minutes before the live broadcast, as he always did to review his opening lines. He was found afterward with no sign of violence, and the intercom system he always kept on was switched off — unusual for him, since he was very security-conscious." },
          "case-07-role-05": { ar: "سامي دخل غرفة التسجيل العازلة للصوت لوحده قبل البث المباشر بعشرين دقيقة، زي عادته يراجع كلمته الافتتاحية. لقوه بعد كده من غير أي علامة عنف، ونظام الإنتركوم اللي بيسيبه شغال دايمًا كان مقفول - حاجة غريبة عليه، لأنه حريص جدًا على الأمان.", en: "Sami went into the soundproof recording booth alone twenty minutes before the live broadcast, as he always did to review his opening lines. He was found afterward with no sign of violence, and the intercom system he always kept on was switched off — unusual for him, since he was very security-conscious." },
        },
      },
      {
        id: "case-07-clue-02",
        order: 2,
        type: "suspicious",
        textByKiller: {
          "case-07-role-02": { ar: "لما راجعوا تحركات فريق البرنامج، طلع إن هيثم طلع بره لمكالمة مطولة، باسل واجه سامي في الكواليس لفترة قصيرة، وشريف كان موجود في المبنى رغم إنه مش من عادته يحضر - بس محدش من التلاتة قال إنه شاف التنين التانيين قريب من غرفة التسجيل، رغم إن المسافة بين كل الأماكن دي أقل من دقيقة مشي.", en: "Reviewing the show team's movements, Haitham stepped out for a lengthy call, Basel confronted Sami backstage briefly, and Sherif was in the building despite rarely attending tapings — but none of the three mentioned seeing the other two near the recording booth, even though every one of those spots was less than a minute's walk apart." },
          "case-07-role-04": { ar: "لما راجعوا تحركات فريق البرنامج، طلع إن هيثم طلع بره لمكالمة مطولة، باسل واجه سامي في الكواليس لفترة قصيرة، وشريف كان موجود في المبنى رغم إنه مش من عادته يحضر - بس محدش من التلاتة قال إنه شاف التنين التانيين قريب من غرفة التسجيل، رغم إن المسافة بين كل الأماكن دي أقل من دقيقة مشي.", en: "Reviewing the show team's movements, Haitham stepped out for a lengthy call, Basel confronted Sami backstage briefly, and Sherif was in the building despite rarely attending tapings — but none of the three mentioned seeing the other two near the recording booth, even though every one of those spots was less than a minute's walk apart." },
          "case-07-role-05": { ar: "لما راجعوا تحركات فريق البرنامج، طلع إن هيثم طلع بره لمكالمة مطولة، باسل واجه سامي في الكواليس لفترة قصيرة، وشريف كان موجود في المبنى رغم إنه مش من عادته يحضر - بس محدش من التلاتة قال إنه شاف التنين التانيين قريب من غرفة التسجيل، رغم إن المسافة بين كل الأماكن دي أقل من دقيقة مشي.", en: "Reviewing the show team's movements, Haitham stepped out for a lengthy call, Basel confronted Sami backstage briefly, and Sherif was in the building despite rarely attending tapings — but none of the three mentioned seeing the other two near the recording booth, even though every one of those spots was less than a minute's walk apart." },
        },
      },
      {
        id: "case-07-clue-03",
        order: 3,
        type: "eliminating",
        textByKiller: {
          "case-07-role-02": { ar: "اتأكد إن مكالمة هيثم المطولة كانت فعلاً مع حد بره القناة - بس محتوى المكالمة نفسه مش موثق، ومحدش يقدر يأكد كانت مع مين بالظبط ولا عن إيه. باسل وشريف لسه معاهم تفاصيل ما اتفسرتش.", en: "It's confirmed Haitham's lengthy call genuinely was with someone outside the channel — but the content of the call itself isn't documented, and no one can confirm exactly who it was with or about. Basel and Sherif each still have unexplained details of their own." },
          "case-07-role-04": { ar: "اتأكد إن باسل واجه سامي بالفعل بخصوص موضوع الحلقة - بس مدة المواجهة اللي قالها (كام دقيقة بس) أقصر من الوقت اللي شافه فيه فريق الإضاءة واقف قدام باب الأستوديو. هيثم وشريف لسه معاهم أسئلة قايمة.", en: "It's confirmed Basel genuinely confronted Sami over the episode's topic — but the length of the confrontation he claims (just a few minutes) is shorter than the time the lighting crew saw him standing outside the studio door. Haitham and Sherif each still have open questions." },
          "case-07-role-05": { ar: "اتأكد إن قلق شريف من الحلقة كان حقيقي زي ما بان على الكل - بس مفيش تفسير واضح لسه ليه قرر يحضر تسجيل الليلة دي تحديدًا، بعد سنين من غيابه عن أي تسجيل تاني. هيثم وباسل لسه معاهم تفاصيل غريبة.", en: "It's confirmed Sherif's anxiety about the episode was genuine, visible to everyone — but there's still no clear explanation for why he chose to attend this specific taping, after years of never attending any other. Haitham and Basel each still have odd details of their own." },
        },
      },
      {
        id: "case-07-clue-04",
        order: 4,
        type: "finalDeduction",
        textByKiller: {
          "case-07-role-02": { ar: "سجل غرفة التحكم بيوضح إن سويتش الفتح الاضطراري اتستخدم بكارت هيثم الشخصي في نفس دقيقة انقطاع الإنتركوم بالظبط - وهيثم مكانش مفروض يكون في غرفة التحكم في التوقيت ده أصلًا حسب جدوله.", en: "The control room log shows the emergency-unlock switch was used with Haitham's personal card in the exact minute the intercom cut out — and according to his own schedule, Haitham wasn't supposed to be in the control room at that time at all." },
          "case-07-role-04": { ar: "سجل بوابات الدخول بيوضح إن كارت باسل المؤقت استُخدم لدخول الممر الداخلي في نفس دقيقة انقطاع الإنتركوم بالظبط - صلاحية محدش راجعها قبل الحلقة، وباسل هو الوحيد من الضيوف اللي كان عنده كارت بيه الصلاحية دي أصلًا.", en: "The entry-badge log shows Basel's temporary card was used to access the inner corridor in the exact minute the intercom cut out — a permission no one had reviewed before the show, and Basel is the only guest whose card even had that access to begin with." },
          "case-07-role-05": { ar: "سجل غرفة التحكم بيوضح إن الكارت الرئيسي بتاع المحطة فتح الباب الداخلي في نفس دقيقة انقطاع الإنتركوم بالظبط - والكارت ده معاه شريف بس، رغم إنه مكانش مفروض يكون في المبنى أصلًا الليلة دي.", en: "The control room log shows the station's master card unlocked the inner door in the exact minute the intercom cut out — and only Sherif holds that card, even though he wasn't supposed to be in the building at all that night." },
        },
      },
    ],
    solution: {
      killerExplanationByCandidate: {
        "case-07-role-02": {
          ar: "هيثم كان بياخد فلوس من مصادر خارجية عشان يسرّب مواضيع الحلقات الجاية، وسامي اكتشف الموضوع وقرر يفصله ويبلغ عنه لمجلس إدارة القناة بعد الحلقة دي مباشرة. استخدم وصوله كمنتج منفذ عشان يدخل غرفة التسجيل ويحاول يقنعه يسكت عن الموضوع - بس النقاش اتصاعد بسرعة.",
          en: "Haitham had been taking money from outside sources to leak upcoming episode topics, and Sami discovered it, deciding to fire him and report him to the channel's board right after this episode. He used his access as executive producer to enter the recording booth and try to talk him out of it — but the confrontation escalated quickly.",
        },
        "case-07-role-04": {
          ar: "باسل كان عارف إن الحلقة هتفضح صفقة أرض قديمة ورّطته فيها، وكانت هتدمر سمعته وشراكته السرية مع شريف مالك القناة. لما رفض سامي يلغي الموضوع رغم كل محاولاته، دخل عليه في الدقايق الأخيرة قبل البث عشان يمنعه بأي طريقة.",
          en: "Basel knew the episode would expose an old land deal he was implicated in, one that would destroy his reputation and his secret partnership with Sherif, the station owner. When Sami refused to drop the topic despite all his attempts, he went in to see him in the final minutes before the broadcast to stop him by any means.",
        },
        "case-07-role-05": {
          ar: "شريف كان شريك سري في صفقة استثمار مع باسل، والحلقة كانت هتكشف الصفقة دي وتدمر اسم القناة معاه في نفس الوقت. حاول يقنع سامي يأجل الموضوع أكتر من مرة ورفض، فقرر يتدخل بنفسه في آخر لحظة قبل ما يفوت الأوان.",
          en: "Sherif was a secret partner in an investment deal with Basel, and the episode would have exposed that deal and destroyed the channel's reputation along with it. He tried more than once to convince Sami to postpone the topic and was refused, so he decided to intervene himself at the last moment before it was too late.",
        },
      },
      innocenceExplanationByCandidate: {
        "case-07-role-02": {
          ar: "هيثم فعلاً كان بياخد فلوس من مصادر خارجية عشان تسريب المواضيع، وده كان هيخسّره شغله بلا شك - بس مكالمته المطولة كانت مع أمه في المستشفى، وشهود أكدوا الموضوع، فمكانش قدامه وقت أصلًا يوصل لغرفة التسجيل.",
          en: "Haitham genuinely had been taking money for leaking topics — enough to cost him his job regardless — but his lengthy call was with his mother in the hospital, confirmed by witnesses, leaving him no time to have reached the recording booth.",
        },
        "case-07-role-04": {
          ar: "باسل فعلاً واجه سامي وحاول يقنعه يلغي موضوع الحلقة، وده يخليه مشتبه فيه منطقي - بس اتأكد إنه رجع لمكانه وقعد فيه لحد بداية الحلقة، وشهود كتير أكدوا وجوده هناك.",
          en: "Basel genuinely confronted Sami and tried to talk him out of the episode, making him a logical suspect — but he's confirmed to have returned to his seat and stayed there until the show began, with several witnesses confirming his presence.",
        },
        "case-07-role-05": {
          ar: "شريف فعلاً كان عنده صفقة سرية مع باسل هتتهدد لو الحلقة اتذاعت، وده دافع حقيقي - بس اتأكد إنه كان مع فريق التسويق يحل مشكلة تانية طول الوقت، بعيد تمامًا عن غرفة التسجيل.",
          en: "Sherif genuinely had a secret deal with Basel that the episode would threaten — a real motive — but he's confirmed to have been with the marketing team resolving a separate issue the entire time, nowhere near the recording booth.",
        },
      },
    },
  },
];
