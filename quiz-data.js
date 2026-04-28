const quizUnits = {
  5: {
    title: 'Unit 5: Storylines',
    questions: [
      {
        type: 'multiple',
        prompt: 'اختاري الإجابة الصحيحة: I ____ watching a movie.',
        options: ['was', 'were', 'is', 'are'],
        answer: 'was',
        answerLabel: 'was',
        reason: 'لأن الفاعل I مع Past Progressive يحتاج was + verb-ing.'
      },
      {
        type: 'truefalse',
        prompt: 'True or False: A documentary shows real events.',
        options: ['True', 'False'],
        answer: 'True',
        answerLabel: 'True',
        reason: 'Documentary يعرض حقائق أو أحداثاً حقيقية.'
      },
      {
        type: 'arrange',
        prompt: 'رتّبي الكلمات لتكوين جملة صحيحة (Past Progressive):',
        words: ['were', 'the', 'characters', 'whispering'],
        answer: 'the characters were whispering',
        answerLabel: 'The characters were whispering.',
        reason: 'الترتيب الصحيح: فاعل + were + verb-ing.'
      },
      {
        type: 'fill',
        prompt: 'Fill in the blank: What ______ you doing at 6 o’clock yesterday?',
        answer: 'were',
        answerLabel: 'were',
        reason: 'مع الفاعل you نستخدم were في الماضي المستمر.'
      },
      {
        type: 'matching',
        prompt: 'Match the story word with the correct meaning:',
        pairs: [
          { left: 'plot', right: 'events of the story' },
          { left: 'characters', right: 'people in the story' },
          { left: 'ending', right: 'the final part' }
        ],
        answerLabel: 'plot → events of the story, characters → people in the story, ending → the final part',
        reason: 'هذه الكلمات الأساسية تساعدك في فهم القصة بسهولة.'
      },
      {
        type: 'multiple',
        prompt: 'اختاري جملة الاقتراح الصحيحة:',
        options: [
          'Why don’t we read a fairy tale?',
          'Why don’t we reads a fairy tale?',
          'What about we to read a fairy tale?',
          'How about read fairy tale?'
        ],
        answer: 'Why don’t we read a fairy tale?',
        answerLabel: 'Why don’t we read a fairy tale?',
        reason: 'بعد Why don’t we نستخدم الفعل بصيغته الأساسية.'
      }
    ]
  },
  6: {
    title: 'Unit 6: Outdoor Activities',
    questions: [
      {
        type: 'multiple',
        prompt: 'Choose the correct answer: They ____ hiking in the forest.',
        options: ['was', 'were', 'is', 'am'],
        answer: 'were',
        answerLabel: 'were',
        reason: 'They جمع، لذلك نستخدم were مع past progressive.'
      },
      {
        type: 'truefalse',
        prompt: 'True or False: You should wear a helmet when mountain biking.',
        options: ['True', 'False'],
        answer: 'True',
        answerLabel: 'True',
        reason: 'Helmet protects your head and is important for outdoor safety.'
      },
      {
        type: 'matching',
        prompt: 'Match each activity with equipment:',
        pairs: [
          { left: 'camping', right: 'tent' },
          { left: 'fishing', right: 'fishing rod' },
          { left: 'surfing', right: 'surfboard' }
        ],
        answerLabel: 'camping → tent, fishing → fishing rod, surfing → surfboard',
        reason: 'اختيار المعدات المناسبة يجعل النشاط آمناً وممتعاً.'
      },
      {
        type: 'fill',
        prompt: 'Fill in the blank with while/when: I was sleeping ______ it started to rain.',
        answer: 'when',
        answerLabel: 'when',
        reason: 'When تأتي مع الحدث القصير الذي قطع الحدث الطويل.'
      },
      {
        type: 'arrange',
        prompt: 'Arrange the words (When/While sentence):',
        words: ['I', 'was', 'climbing', 'while', 'my', 'friend', 'was', 'hiking'],
        answer: 'i was climbing while my friend was hiking',
        answerLabel: 'I was climbing while my friend was hiking.',
        reason: 'While تربط فعلين طويلين في نفس الوقت.'
      },
      {
        type: 'multiple',
        prompt: 'أي نشاط خارجي يناسب الماء؟',
        options: ['hiking', 'surfing', 'backpacking', 'horseback riding'],
        answer: 'surfing',
        answerLabel: 'surfing',
        reason: 'Surfing activity in water using a surfboard.'
      }
    ]
  },
  7: {
    title: 'Unit 7: Trips',
    questions: [
      {
        type: 'multiple',
        prompt: 'Choose the correct answer: He ____ called the taxi.',
        options: ['have', 'has', 'is', 'are'],
        answer: 'has',
        answerLabel: 'has',
        reason: 'He مفرد، لذلك نستخدم has + past participle.'
      },
      {
        type: 'truefalse',
        prompt: 'True or False: “take off” means a plane leaves the ground.',
        options: ['True', 'False'],
        answer: 'True',
        answerLabel: 'True',
        reason: 'Take off = الإقلاع، أي الطائرة ترتفع من الأرض.'
      },
      {
        type: 'fill',
        prompt: 'Fill in the blank: We have ______ arrived at the station. (just / yet)',
        answer: 'just',
        answerLabel: 'just',
        reason: 'Just تأتي غالباً مع حدث انتهى قبل لحظة قصيرة.'
      },
      {
        type: 'multiple',
        prompt: 'Which place is used for trains?',
        options: ['terminal', 'platform', 'passport', 'suitcase'],
        answer: 'platform',
        answerLabel: 'platform',
        reason: 'Passengers wait on the platform before boarding the train.'
      },
      {
        type: 'arrange',
        prompt: 'Arrange the words into a Present Perfect sentence:',
        words: ['they', 'have', 'already', 'checked', 'in'],
        answer: 'they have already checked in',
        answerLabel: 'They have already checked in.',
        reason: 'Present Perfect: have/has + past participle.'
      },
      {
        type: 'multiple',
        prompt: 'اختاري العملية المناسبة: To find the total, we ___ numbers.',
        options: ['subtract', 'divide', 'add', 'multiply'],
        answer: 'add',
        answerLabel: 'add',
        reason: 'Add means نجمع الأعداد للحصول على المجموع.'
      },
      {
        type: 'matching',
        prompt: 'Match the phrasal verb with meaning:',
        pairs: [
          { left: 'check in', right: 'register before travel' },
          { left: 'land', right: 'come down to the ground' },
          { left: 'find out', right: 'discover information' }
        ],
        answerLabel: 'check in → register before travel, land → come down to the ground, find out → discover information',
        reason: 'فهم العبارات يساعدك على التحدث عن السفر بثقة.'
      }
    ]
  }
};
