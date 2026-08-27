import { Lesson, Stage } from '../types';
import { LanguageCode } from './translations';

type LessonPatch = Partial<Pick<Lesson, 'stageTitle' | 'title' | 'description'>> & {
  learnContent?: Partial<Lesson['learnContent']>;
  understandContent?: Partial<Lesson['understandContent']>;
  actionTask?: Partial<Lesson['actionTask']>;
};

type StagePatch = Partial<Pick<Stage, 'title' | 'subtitle' | 'description'>> & {
  lessons?: Record<string, LessonPatch>;
};

const translations: Partial<Record<LanguageCode, Record<number, StagePatch>>> = {
  en: {
    1: {
      title: '1. Your Start',
      subtitle: '🟢 START',
      description: 'How does online income work? What options are available, and what do you really need?',
      lessons: {
        '1.1': {
          stageTitle: 'Your Start',
          title: 'How does online income work?',
          description: 'Understand the basic principles of digital value, automated value creation, and scalability.',
          learnContent: {
            videoTitle: 'Introduction: The foundation of online income',
            summaryText: 'Online income is not created by luck or magic. It comes from solving existing problems. You position yourself between a person with a need and the right solution.',
            bulletPoints: [
              'Supply and demand: someone needs a solution; you recommend the right product.',
              'Automation: your system can work around the clock, even while you sleep.',
              'Location independence: your laptop is your headquarters.',
            ],
            fullArticleGuide: `### The fundamental law of online income

Earning money online is not a mysterious trick and does not require inherited talent. It follows one universal principle: **creating value by solving problems**.

When someone faces an urgent everyday problem—such as wanting additional income, better fitness, improved sleep, or professional success—they actively look for a shortcut. When you provide or recommend that shortcut, you can be paid for the value you create.

#### The three pillars of digital scalability

1. **Low marginal costs**: A digital product or recommendation landing page requires time to create once, but can then serve 10, 100, or 10,000 people at the same time.
2. **Automated processes**: Modern email automation and digital sales systems can communicate and deliver content 24 hours a day, independently of your personal working hours.
3. **Location independence**: Your entire business can operate from a laptop or smartphone. You do not need commercial premises, storage, or employees.

#### Your role as an affiliate

You do not need to reinvent the wheel or create your own product. As an affiliate partner, you connect supply with demand. You recommend proven, high-quality products from established providers and receive a commission for every successful sale—often between 30% and 70%.`,
            practicalExamples: [
              'Additional-income example: An employee wants to earn an extra €500 per month. You recommend a proven step-by-step programme and receive a 50% commission.',
              'Automation example: A prospect enters their email address on your landing page at 11 p.m. The automation immediately sends the guide and recommends the partner offer. The sale can happen while you sleep.',
            ],
            videoChapters: [
              { time: '0:00', title: 'Welcome to the GOM-MAR Academy' },
              { time: '2:15', title: 'The value-creation principle' },
              { time: '4:30', title: 'Why affiliate marketing works for beginners' },
              { time: '6:50', title: 'Summary and first task' },
            ],
          },
          understandContent: {
            coreTakeaway: 'You do not need to invent your own product—you can recommend existing solutions that already work through affiliate marketing.',
            keyPrinciples: ['Focus on solving problems instead of applying sales pressure', 'A simple system beats complicated chaos', 'Consistency during the first 30 days determines your progress'],
          },
          actionTask: {
            instruction: 'Make a commitment: What goal do you want to reach in the next 90 days?',
            placeholder: 'Choose your primary goal…',
          },
        },
        '1.2': {
          stageTitle: 'Your Start',
          title: 'What options are available?',
          description: 'An overview of affiliate marketing, digital information products, and automated recommendation systems.',
          learnContent: {
            videoTitle: 'Business model comparison: Which route suits you?',
            summaryText: 'There are many ways to earn money online. Affiliate marketing is the lowest-risk option for beginners: no customer support, product development, or logistics.',
            bulletPoints: ['Affiliate marketing: 30% to 70% commission per sale.', 'Your own digital products: high margins, but substantial preparation.', 'Services and coaching: faster revenue, but tied to your time.'],
            fullArticleGuide: `### The most common online business models compared

Beginners are often overwhelmed by the number of opportunities online. However, not every model is suitable when you are starting without specialist knowledge or substantial capital.

#### 1. Affiliate marketing—the GOM-MAR recommendation
* **How it works**: You recommend products from other providers through your personal affiliate link.
* **Advantages**: No product creation, customer support, or order processing; you can start immediately and digital products often pay commissions of 30–70%.
* **Disadvantage**: You are not primarily building your own product brand—which is often an advantage at the beginning.

#### 2. Your own digital products—e-books and video courses
* **How it works**: You create and sell your own courses or guides.
* **Advantages**: Full control over prices, offers, and funnels, with very high margins.
* **Disadvantages**: Significant time is needed for creation, updates, and customer support.

#### 3. E-commerce and dropshipping
* **How it works**: You sell physical products through an online shop.
* **Advantage**: Physical products have broad demand.
* **Disadvantages**: Returns, delivery delays, customs, and margins that may be only 10–20% create additional risk.

#### The right starting point

The GOM-MAR Academy focuses on **affiliate marketing supported by automated email follow-up**. It combines low risk with a fast route to your first genuine online revenue.`,
            practicalExamples: ['Affiliate versus online shop: With dropshipping, you must replace defective products and answer complaints. With affiliate marketing, the product provider handles these tasks.'],
            videoChapters: [{ time: '0:00', title: 'Overview of digital business models' }, { time: '3:20', title: 'Affiliate marketing in detail' }, { time: '6:45', title: 'Comparison: time investment and return' }],
          },
          understandContent: { coreTakeaway: 'Affiliate marketing is the fastest and safest route to your first additional online income.', keyPrinciples: ['Lower risk through proven provider sales processes', 'Start immediately without building a complex company infrastructure on day one', 'Scale through automated lead generation'] },
          actionTask: { instruction: 'Choose the model we will focus on in the GOM-MAR Academy.', checklistItems: ['I am starting with affiliate marketing', 'I will use automated email sales', 'I will build a simple step-by-step system'] },
        },
        '1.3': {
          stageTitle: 'Your Start',
          title: 'What do you really need?',
          description: 'The absolute minimum setup for a successful start without unnecessary baggage.',
          learnContent: {
            videoTitle: 'The three-part starter system',
            summaryText: 'Do not let dozens of marketing tools confuse you. You need exactly three things to start: a landing page, an email autoresponder, and a partner offer.',
            bulletPoints: ['1. Domain and landing page—your digital business card', '2. Autoresponder—your automated email sales system', '3. Partner offer—a proven product that pays commission'],
            fullArticleGuide: `### The lean GOM-MAR three-part system

Many beginners get lost in endless software comparisons, graphics programmes, and technical details. They spend weeks adjusting settings without ever contacting a single prospect.

We reduce your system to the **absolute minimum** required to produce measurable results.

#### Part 1: A simple landing page

One page where visitors enter their email address to receive a useful free guide or lead magnet. No unnecessary extras and no ten-page website.

#### Part 2: An automated email autoresponder

As soon as someone subscribes, your email automation takes over. It delivers the guide and sends prepared, trust-building messages with your recommendation links over the following days.

#### Part 3: A proven affiliate offer

A tested product from a marketplace such as Digistore24 or Copecart that solves a real problem for your audience and pays a commission of 30–70% per sale.

Everything beyond these three components—logos, business cards, and complicated funnels—is a distraction at the beginning.`,
            practicalExamples: ['The minimum system in action: A visitor enters an email address on your landing page → the email system automatically sends the welcome email and recommendation link → the prospect buys → you receive a commission notification.'],
          },
          understandContent: { coreTakeaway: 'Less is more. The simpler your first system is, the faster you can earn your first euro.', keyPrinciples: ['Three core components are enough to build meaningful additional income', 'GOM-MAR provides the email automation and tools', 'Perfection is the enemy of progress'] },
          actionTask: { instruction: 'Confirm your minimum checklist for launching the system.', checklistItems: ['Understood: I only need three components', 'Ready to use GOM-MAR email automation', 'I will focus on immediate implementation'] },
        },
        '1.4': {
          stageTitle: 'Your Start',
          title: 'What do you NOT need?',
          description: 'Avoid the five most expensive beginner mistakes and time wasters.',
          learnContent: {
            videoTitle: 'Avoid typical time wasters and beginner traps',
            summaryText: 'Most beginners fail because they spend weeks designing logos, dealing with unnecessary bureaucracy, or searching for the “perfect” software.',
            bulletPoints: ['❌ No expensive business infrastructure is needed on day one', '❌ Do not waste weeks perfecting a logo or colour palette', '❌ Do not produce 100 videos before starting', '❌ Avoid expensive €200-per-month tool subscriptions'],
            fullArticleGuide: `### The five most expensive time wasters for online beginners

Why do some people generate their first revenue within 14 days while others remain stuck after six months? The difference is often determined by what they **deliberately leave out**.

#### 1. Perfectionism with logos and graphics

Nobody buys a product because your logo is green or blue. Clear text and a clean, professional design are enough at the beginning.

#### 2. Complex software subscriptions

Do not purchase expensive all-in-one platforms for hundreds of euros per month. Use the integrated GOM-MAR Academy tools to keep your fixed costs close to zero.

#### 3. Creating 50 social-media accounts

Focus on exactly **one** primary traffic source—such as Facebook groups or Instagram Reels—instead of spreading your attention across ten platforms.

#### 4. Endless research without implementation—the tutorial trap

Knowledge without action produces no revenue. Learn only the next step, implement it immediately, and then continue to the next lesson.`,
            practicalExamples: ['Success example: Markus has no logo or business cards and uses a simple profile image. He generates 15 leads per week and makes his first sales. Another beginner spends three weeks designing a logo and earns nothing.'],
          },
          understandContent: { coreTakeaway: 'Avoid overthinking. Your main task is to bring interested people to your landing page.', keyPrinciples: ['Visibility beats perfectionism', 'Generate leads first and refine later', 'Use proven inspiration instead of reinventing the wheel'] },
          actionTask: {
            instruction: 'Remove distractions: Which trap will you consciously avoid from today?',
            placeholder: 'For example, spending hours experimenting with logos or colours…',
          },
        },
      },
    },
    2: {
      title: '2. Your Direction',
      subtitle: '🔵 FOUNDATION',
      description: 'Find your niche, define your audience, identify its main problem, and choose the right offer.',
      lessons: {
        '2.1': {
          stageTitle: '2. Your Direction', title: 'Find your niche',
          description: 'Find a profitable niche in one of the three strongest markets: health, wealth, or relationships.',
          learnContent: {
            videoTitle: 'The profitability formula for your niche',
            summaryText: 'A product sells when people already search for solutions and are prepared to spend money. The three evergreen markets always contain active buyers.',
            bulletPoints: ['1. Wealth and additional income—earning online, saving, and investing', '2. Health and fitness—weight loss, strength, vitality, and sleep', '3. Relationships and personal growth—dating, partnership, and confidence'],
            fullArticleGuide: `### The three major markets with lasting demand

A niche is a focused section of a larger market. If you choose a topic that nobody searches for, even excellent marketing will struggle. Start where people already spend money.

#### The three evergreen markets

1. **Wealth, career, and additional income**
   * Topics: online business, passive income, saving, investing, and career development.
   * Why it is profitable: People invest when the outcome can give them more money or freedom.

2. **Health, fitness, and wellbeing**
   * Topics: sustainable weight loss, back-pain relief, better sleep, and strength after 40.
   * Why it is profitable: Health has enormous value, and people actively seek relief from discomfort.

3. **Relationships, dating, and personal growth**
   * Topics: improving relationships, finding a partner, dog training, and building confidence.
   * Why it is profitable: Emotional needs create a strong desire to act.

#### How to select a sub-niche

Choose a precise focus inside a major market. Instead of “making money,” choose “building additional online income for busy employees.”`,
            practicalExamples: ['Focused positioning: Market = health → sub-niche = healthy weight loss for working mothers without spending hours cooking.'],
          },
          understandContent: { coreTakeaway: 'Do not invent a market. Go where demand and spending already exist.', keyPrinciples: ['Competition in a large market proves that money is being spent', 'Position yourself in one clear sub-niche', 'Use AI support to develop and validate ideas'] },
          actionTask: { instruction: 'Use the GOM-MAR Niche Finder or enter your selected niche here:', placeholder: 'For example, additional online income for employees' },
        },
        '2.2': {
          stageTitle: '2. Your Direction', title: 'Define your audience',
          description: 'Create your ideal-customer profile: Who are you helping, and what motivates them?',
          learnContent: {
            videoTitle: 'Audience analysis: Who is your ideal customer?',
            summaryText: 'The more clearly you picture one specific person, the more relevant your copy, landing pages, and emails will sound.',
            bulletPoints: ['Demographics: age, occupation, and life situation', 'Goals: more freedom, financial security, and family time', 'Concerns: inflation, retirement, and dependence on one employer'],
            fullArticleGuide: `### Your ideal-customer avatar

When you try to speak to everyone, you connect with nobody. Emails written “to everyone” feel cold and anonymous. Writing as if you were speaking to one real person creates immediate relevance and trust.

#### Four key questions about your avatar

1. **Who is this person?** Age, occupation, and family situation—for example, Thomas, 42, employed in manufacturing, married with two children.
2. **What frustrates them now?** Too little free time, rising living costs, and the feeling of being trapped in a routine.
3. **What do they want most?** An additional €500–€1,000 per month to reduce financial pressure and give the family more opportunities.
4. **What doubts do they have?** “Do I have enough time?”, “Can I do this without experience?”, and “Is this legitimate?”

Your communication should answer these doubts and make the desired result feel achievable.`,
            practicalExamples: ['Weak copy: “Our system provides advanced syndication methods for digital resellers.” It is difficult to understand.', 'Strong copy: “Build an additional income stream without experience in only 30 minutes a day.” It speaks directly to the avatar.'],
          },
          understandContent: { coreTakeaway: 'When you try to speak to everyone, you connect with nobody.', keyPrinciples: ['Write emails as if you were writing to a good friend', 'Use the exact words your audience uses', 'Address the most urgent everyday problem'] },
          actionTask: { instruction: 'Describe your audience in one or two sentences:', placeholder: 'For example, employees aged 30–50 who want to earn an extra €500–€1,000 without prior experience.' },
        },
        '2.3': {
          stageTitle: '2. Your Direction', title: 'Identify the problem',
          description: 'Find the burning problem for which your audience is actively seeking an immediate solution.',
          learnContent: {
            videoTitle: 'Find and clearly describe pain points',
            summaryText: 'People buy emotionally and justify the decision rationally. The strongest motivations are avoiding pain and achieving a deeply desired result.',
            bulletPoints: ['Pain: “There is too little money left at the end of the month despite working full-time.”', 'Goal: “Earn an extra €500 from home.”', 'Obstacle: “I lack technical knowledge and time.”'],
            fullArticleGuide: `### The burning problem as a buying trigger

Sales happen when an offer closes the gap between the **current situation**—pain and frustration—and the **desired situation**—the person’s goal.

#### The before-and-after transformation

* **Before**: Thomas has almost no money left at the end of the month. Inflation worries him, he feels trapped in his job, and he has little time or technical experience.
* **After**: Thomas has built a simple system. It produces an additional €600 per month, giving him more security and relaxed weekends with his family.

Your role as an affiliate is to present a credible bridge from the current situation to the desired outcome.`,
            practicalExamples: ['Offer formula: “Achieve [desired result] without [greatest concern or obstacle].”'],
          },
          understandContent: { coreTakeaway: 'Your system removes the main obstacle and guides the audience from pain to the desired result.', keyPrinciples: ['Make the problem visible and specific', 'Explain why previous attempts failed', 'Present your route as the simplest credible next step'] },
          actionTask: { instruction: 'What main problem does your system solve for your audience?', placeholder: 'For example, insufficient time and technical knowledge to start online' },
        },
        '2.4': {
          stageTitle: '2. Your Direction', title: 'Choose an offer',
          description: 'Select a high-converting affiliate offer from a marketplace such as Digistore24 or Copecart.',
          learnContent: {
            videoTitle: 'Find and evaluate the right affiliate offer',
            summaryText: 'A strong offer combines a good conversion rate, low refund rate, fair commission, and a professional sales page.',
            bulletPoints: ['Search the Digistore24 or Copecart marketplace', 'Review the sales page and its video', 'Check whether email templates, graphics, and banners are provided'],
            fullArticleGuide: `### Five criteria for a strong affiliate product

Not every marketplace product deserves your time. Evaluate these five points before committing to an offer.

1. **A professional sales page with a strong video sales letter**: Review the page as a potential customer. Is the promise clear and credible?
2. **Commission**: Digital courses should generally pay at least **30–50%**, or provide recurring monthly commissions.
3. **Refund rate**: A refund rate below 10% can indicate strong customer satisfaction.
4. **Promotional material**: Good providers supply email templates, graphics, and banners that partners may use.
5. **Your personal promotion link**: The link contains your affiliate ID and uses tracking so eligible sales are assigned to you.

Recommend only offers that genuinely fit the audience and deliver useful value.`,
            practicalExamples: ['Practical step: Create a free Digistore24 account, review bestsellers in the Internet Marketing & Business category, and save the promotion link for your chosen offer.'],
          },
          understandContent: { coreTakeaway: 'Recommend only products whose quality and usefulness you genuinely trust.', keyPrinciples: ['Trust is your most valuable online-business asset', 'Secure and store your affiliate promotion link', 'Test the sales process from the customer’s perspective'] },
          actionTask: { instruction: 'What is the name of your selected affiliate offer or product?', placeholder: 'For example, product name or Digistore product ID' },
        },
      },
    },
    3: {
      title: '3. Your First System',
      subtitle: '🟣 BUILD',
      description: 'Your domain, landing page, affiliate-offer connection, and technical foundation.',
      lessons: {
        '3.1': {
          stageTitle: '3. Your First System', title: 'Domain & Brand Name',
          description: 'Choose a memorable name for your landing page and system.',
          learnContent: {
            videoTitle: 'The Perfect Domain & Brand Name',
            summaryText: 'Your domain should be short, clear, and trustworthy. Avoid complicated spelling and special characters.',
            bulletPoints: ['Examples: your-side-income.com, success-with-a-system.com', 'Use trusted extensions such as .com, .de, or .net', 'Do not infringe other companies’ trademarks'],
            fullArticleGuide: `### How to choose a trustworthy domain

Your domain is the web address of your opt-in page. It should sound professional and be easy to remember.

#### Rules for a strong domain name

1. **Clear and descriptive**: The name should suggest what the site is about—for example freedom-formula.com or smarter-start.com.
2. **Keep it short**: Use no more than two or three words.
3. **Choose the right extension**: .de inspires the most trust in Germany; use .com for an international offer.
4. **Avoid third-party trademarks**: Never use protected terms such as Facebook, Digistore, or another protected brand in your domain.`,
            practicalExamples: ['Good examples: starter-funnel.com, your-online-path.com, success-compass.com.', 'Bad example: make-money-fast-and-get-rich-1234.info.'],
          },
          understandContent: { coreTakeaway: 'A clean domain name creates immediate trust with new visitors.', keyPrinciples: ['Easy to type', 'Easy to understand when spoken', 'Avoid excessive hyphens'] },
          actionTask: { instruction: 'Enter your preferred name or domain:', placeholder: 'For example, my-online-path.com' },
        },
        '3.2': {
          stageTitle: '3. Your First System', title: 'Landing Page Basics',
          description: 'Build a high-converting opt-in page that generates leads.',
          learnContent: {
            videoTitle: 'Anatomy of a 50%+ Opt-In Landing Page',
            summaryText: 'A lead landing page has one goal: exchange a valuable lead magnet for the visitor’s email address. Remove distractions and keep secondary links out of sight.',
            bulletPoints: ['1. A curiosity-driven headline that states what the visitor receives', '2. Three short core benefits', '3. An opt-in form with email field and button'],
            fullArticleGuide: `### The anatomy of a 50%+ conversion landing page

Why do 50 out of 100 visitors subscribe on one page while only two subscribe on another? The difference is simplicity and clear psychological guidance.

#### Four elements of a high-converting opt-in page

1. **Main headline—your curiosity hook**: Within three seconds it must explain the visitor’s benefit. Example: “Free checklist: Build your first online income stream in 30 minutes a day.”
2. **Three concise benefit points**: State exactly what the free guide contains—for example a step-by-step plan, beginner-friendly explanations, and an instant PDF download.
3. **A simple form**: Ask for a name only if useful and always request the email address. Use an active button such as “Download free now ➔”.
4. **Trust elements**: Add a short reassurance such as “100% free, unsubscribe at any time, no spam.”`,
            practicalExamples: ['Use the GOM-MAR Landing Page Assistant in the Toolbox to improve your wording automatically.'],
          },
          understandContent: { coreTakeaway: 'Remove every distraction. One page equals one goal.', keyPrinciples: ['Use strong contrast for the button', 'Use the headline formula “How to [achieve a goal] without [pain]”', 'Use the GOM-MAR Toolbox for concise headlines'] },
          actionTask: { instruction: 'Use the GOM-MAR Landing Page Assistant or draft your headline:', placeholder: 'For example, How to build your first online side income in 30 minutes a day' },
        },
        '3.3': {
          stageTitle: '3. Your First System', title: 'Connect Your Affiliate Offer',
          description: 'Connect your opt-in form to the thank-you page and your affiliate link.',
          learnContent: {
            videoTitle: 'The Bridge-Page Redirect Strategy',
            summaryText: 'After a visitor submits the form, redirect them to a thank-you page with your affiliate offer. Your system can generate revenue while the email sequence runs in the background.',
            bulletPoints: ['Form submission → redirect to the thank-you page', 'The page confirms the lead magnet and presents a relevant partner offer', 'Commissions can be possible from day one'],
            fullArticleGuide: `### The bridge-page strategy for immediate revenue

The moment after registration is the most valuable point in the funnel. The prospect is attentive, using their phone or computer, and has just demonstrated trust.

#### The two-step redirect process

1. **Form submission**: The visitor enters an email address and clicks submit. In the background, the contact is added to your email automation.
2. **An intelligent thank-you page**: Instead of showing only “Thank you,” redirect the visitor to a page that confirms the free guide will arrive within two minutes and invites them to watch a short recommendation video while they wait. Place your affiliate button below it. Some new leads will watch and purchase immediately.`,
            practicalExamples: ['Example: Of 100 new leads, 40 watch the recommendation video and two to four purchase before the first follow-up email is sent.'],
          },
          understandContent: { coreTakeaway: 'Meet prospects at the moment when their attention is highest.', keyPrinciples: ['Never send visitors straight to an affiliate link before the opt-in', 'Secure the lead first, then make the recommendation', 'The lead now belongs to your own audience'] },
          actionTask: { instruction: 'Confirm that you understand the redirect logic.', checklistItems: ['The visitor enters an email address', 'The lead is added to GOM-MAR email automation', 'The visitor is redirected to the affiliate thank-you page'] },
        },
        '3.4': {
          stageTitle: '3. Your First System', title: 'Tracking & Test Run',
          description: 'Test your complete system thoroughly before sending the first visitors.',
          learnContent: {
            videoTitle: 'System Audit: Does Everything Work?',
            summaryText: 'Testing is essential. Submit your own details as a test lead and confirm that the welcome email arrives.',
            bulletPoints: ['Test the form on mobile and desktop', 'Check the inbox and spam folder', 'Verify that the affiliate link tracks correctly'],
            fullArticleGuide: `### The pre-launch test checklist

Before sending visitors to your page, confirm that the complete system works. One broken link or form can cost valuable leads.

#### Test these four steps yourself

1. **Opt-in test**: Open the landing page on a phone and computer and subscribe using a test email address.
2. **Redirect check**: Confirm that the thank-you or affiliate page opens immediately after submission.
3. **Email-delivery check**: The welcome email should arrive within one to three minutes. Test every included link.
4. **Affiliate-tracking check**: Click your partner link and verify that your affiliate ID appears correctly in the destination URL.`,
            practicalExamples: ['A five-minute test prevents frustration and ensures every future visitor is processed correctly.'],
          },
          understandContent: { coreTakeaway: 'A working system gives you confidence for the traffic phase.', keyPrinciples: ['Build it properly once and use it for years', 'Find errors during testing, not through customers'] },
          actionTask: { instruction: 'Complete a full test run of your opt-in process.', checklistItems: ['Test subscription completed successfully', 'Thank-you page opens as planned', 'GOM-MAR email automation captured the lead'] },
        },
      },
    },
    4: {
      title: '4. Reach People',
      subtitle: '🟠 TRAFFIC',
      description: 'Free traffic strategies for Facebook, Instagram, Pinterest, and YouTube—without an advertising budget.',
      lessons: {
        '4.1': {
          stageTitle: '4. Reach People', title: 'Facebook Niche Groups',
          description: 'Generate 5–15 high-quality leads a day from existing Facebook groups.',
          learnContent: {
            videoTitle: 'Organic Value-Driven Traffic from Facebook Groups',
            summaryText: 'Find groups where your audience already discusses its problems. Answer questions with genuine value and point people towards your free lead magnet.',
            bulletPoints: ['Find 5–10 relevant groups in your niche', 'Provide genuine value instead of promotional spam', 'Use storytelling: “How I solved this problem…”'],
            fullArticleGuide: `### Organic lead generation in Facebook niche groups

Millions of people use Facebook groups every day to discuss specific interests and problems. You do not have to find them individually—they are already gathered in relevant communities.

#### The value formula for group posts

1. **Never post blunt advertising spam**: Messages such as “Make money—click here” are deleted quickly and can lead to account restrictions.
2. **Use story plus value**: Share a personal experience or observation, give three useful tips, and finish with a curiosity-driven invitation. For example: “I created a compact PDF summary. Comment INFO if you would like a copy.”
3. **Follow up through comments**: Send each person who comments a friendly direct message containing the link to your landing page.`,
            practicalExamples: ['Example post: “I struggled to find time for a side income while working full-time. These three routines helped me. Let me know if you would like the checklist.” A useful post like this can generate 20–40 comments.'],
          },
          understandContent: { coreTakeaway: 'Helpful posts start conversations and naturally draw interested people to your profile.', keyPrinciples: ['Help first, sell later', 'Optimise your profile like a landing page', 'Use the GOM-MAR Content Generator for post ideas'] },
          actionTask: { instruction: 'Create your first group post with the GOM-MAR Toolbox:', placeholder: 'For example, Facebook value post drafted' },
        },
        '4.2': {
          stageTitle: '4. Reach People', title: 'Instagram Reels & Stories',
          description: 'Build reach with concise Reels and interactive Stories.',
          learnContent: {
            videoTitle: 'The Three-Second Reel Formula for Reach',
            summaryText: 'Reels can provide substantial free reach. Use three parts: a curiosity hook, three useful tips, and a call to action such as “Comment START for the guide.”',
            bulletPoints: ['Use a visual hook in the first three seconds', 'Use suitable trending audio and clear captions', 'Use automated DMs to send links after comments'],
            fullArticleGuide: `### Short-form reach with Instagram Reels

Instagram rewards short videos that hold attention. You do not have to show your face: faceless channels can use screen recordings, nature footage, desk scenes, or aesthetic video clips.

#### Three building blocks of a successful Reel

1. **Hook—seconds 0–3**: Display a strong line such as “Three things nobody tells you about building a side income online.”
2. **Value—seconds 3–12**: Present short, practical points in the video or caption.
3. **Call to action**: Finish with “Comment START and I will send you the free guide by DM.”`,
            practicalExamples: ['Faceless Reel: Film yourself pouring coffee at a desk, place the hook on screen, and add three tips plus the response instruction in the caption.'],
          },
          understandContent: { coreTakeaway: 'Reels attract new viewers; Stories turn followers into grateful leads.', keyPrinciples: ['Shorter is usually better—7 to 15 seconds', 'Use curiosity instead of jargon', 'Consistency beats occasional bursts of motivation'] },
          actionTask: { instruction: 'Draft one Reel idea for your niche:', placeholder: 'For example, Three things you did not know about online income' },
        },
        '4.3': {
          stageTitle: '4. Reach People', title: 'Pinterest & YouTube Evergreen Traffic',
          description: 'Build search traffic that continues to generate clicks months later.',
          learnContent: {
            videoTitle: 'Passive Traffic from Visual Search Engines',
            summaryText: 'Unlike fast-moving social feeds, Pinterest and YouTube behave like visual search engines. A strong Pin can send daily visitors to your landing page for years.',
            bulletPoints: ['Link Pinterest Pins directly to your landing page', 'Use relevant keywords in titles and descriptions', 'Use YouTube Shorts to accelerate reach'],
            fullArticleGuide: `### Sustainable evergreen traffic

Instagram posts quickly disappear down the feed, while Pinterest and YouTube work like search engines. Content published today can still bring new visitors in twelve months.

#### Pinterest marketing in three steps

1. Create vertical graphics in Canva—ideally 1080 × 1920 pixels.
2. Write keyword-rich titles such as “Guide: Build a side income from home.”
3. Link each Pin directly to your opt-in landing page.`,
            practicalExamples: ['One successful Pin can generate 300–500 clicks per month for months without requiring a new daily post.'],
          },
          understandContent: { coreTakeaway: 'Evergreen traffic builds a durable digital foundation for long-term success.', keyPrinciples: ['Create reusable Canva templates for fast Pins', 'Keywords are essential for search rankings'] },
          actionTask: { instruction: 'Plan your first three Pinterest Pins with Toolbox support.', checklistItems: ['Pinterest account created and configured', 'Three keyword phrases identified', 'Pins created and linked to the landing page'] },
        },
        '4.4': {
          stageTitle: '4. Reach People', title: 'Your Seven-Day Traffic Plan',
          description: 'Create structure with only 30 minutes of daily action for consistent leads.',
          learnContent: {
            videoTitle: 'The 30-Minute Daily Workflow',
            summaryText: 'Results come from daily routines, not one-off actions. Thirty focused minutes per day are enough.',
            bulletPoints: ['Days 1–3: Facebook value posts and comments', 'Days 4–5: Instagram Reel and Story interaction', 'Days 6–7: Publish Pinterest Pins and review results'],
            fullArticleGuide: `### A structured 30-minute daily plan

Online-business progress does not require eight hours of work every day. It requires discipline with small, repeatable actions.

#### Your weekly plan

* **Monday to Wednesday—15 minutes**: Share one useful post in two Facebook groups and answer questions.
* **Thursday to Friday—15 minutes**: Publish one Reel or Short and reply to direct messages.
* **Saturday—15 minutes**: Plan three Pinterest Pins.
* **Sunday**: Rest and review the leads generated during the week.`,
            practicalExamples: ['After 30 days, you may have published 20 group posts, 10 Reels, and 15 Pins—enough activity to generate 50–150 leads and your first sales.'],
          },
          understandContent: { coreTakeaway: 'Turn your traffic plan into a daily habit.', keyPrinciples: ['Reserve fixed time slots', 'Focus on lead numbers rather than follower numbers'] },
          actionTask: { instruction: 'Commit to your weekly traffic schedule:', placeholder: 'Reserve 30 minutes every day' },
        },
      },
    },
    5: {
      title: '5. Win Prospects',
      subtitle: '🟡 LEADS',
      description: 'Email autoresponders, lead magnets, opt-in pages, and automated follow-up sequences.',
      lessons: {
        '5.1': {
          stageTitle: '5. Win Prospects', title: 'Autoresponder Basics',
          description: 'Your email list is your most valuable asset. Build trust that continues to work for you.',
          learnContent: {
            videoTitle: 'Why Your Email List Is Priceless',
            summaryText: 'A social platform can restrict your account overnight, but your email list belongs to you. It provides a direct channel to interested prospects.',
            bulletPoints: ['Independence from social-media algorithms', 'Strong purchase intent among engaged email readers', 'Automated delivery around the clock'],
            fullArticleGuide: `### Why the email list is an online-business revenue engine

Most successful digital entrepreneurs share one conclusion: **the money is in the list**.

#### Why email marketing is so powerful

1. **Ownership instead of renting attention**: A social-media account belongs to the platform. Your exported contact list belongs to your business.
2. **Direct delivery**: Social posts may reach only a small percentage of followers, while an email goes directly to the reader’s inbox.
3. **Strong intent**: Subscribers joined voluntarily because they want to receive your guidance and recommendations.`,
            practicalExamples: ['Example: With 500 subscribers, a monthly recommendation bought by 3% of the list produces 15 sales. At €40 commission each, that equals €600 in recurring monthly revenue.'],
          },
          understandContent: { coreTakeaway: 'A healthy email list can generate approximately €1–€3 in recurring monthly revenue per engaged subscriber.', keyPrinciples: ['Protect the relationship with your list', 'Provide genuine help in every email', 'Use the integrated GOM-MAR email automation'] },
          actionTask: { instruction: 'Open GOM-MAR email automation and create your first “My First Online Euro” campaign:', checklistItems: ['GOM-MAR email automation opened', 'Campaign created', 'Sequence overview prepared'] },
        },
        '5.2': {
          stageTitle: '5. Win Prospects', title: 'Create a Lead Magnet',
          description: 'Create an irresistible checklist, PDF, cheat sheet, or template in under 30 minutes.',
          learnContent: {
            videoTitle: 'The Perfect Lead Magnet in Three Steps',
            summaryText: 'People rarely want a 200-page ebook. They want a fast, immediately useful solution such as a one-page checklist, cheat sheet, or template.',
            bulletPoints: ['Useful in less than five minutes', 'Solves exactly one specific beginner problem', 'Creates interest in the related affiliate offer'],
            fullArticleGuide: `### The formula for an irresistible lead magnet

A lead magnet is a fair exchange: the prospect receives immediate value and gives permission to communicate by email.

#### Strong formats for beginners

* **One-page checklist**: “The five-point checklist for starting an online side income.”
* **Cheat sheet**: “The ten best AI prompts for Facebook posts.”
* **Template**: “An email template for your first customer contact.”

Keep it short. A lead magnet that can be read and applied in three minutes creates an immediate sense of progress.`,
            practicalExamples: ['Create it in Canva: Select an A4 template, add your five steps, and export it as a PDF. This can take only 20 minutes.'],
          },
          understandContent: { coreTakeaway: 'The lead magnet is the sample; the affiliate product is the main course.', keyPrinciples: ['Compact and valuable', 'Clean, friendly design', 'Available immediately as a PDF'] },
          actionTask: { instruction: 'What is the title of your lead magnet?', placeholder: 'For example, The Five-Step Checklist for Your First Online Side Income' },
        },
        '5.3': {
          stageTitle: '5. Win Prospects', title: 'Opt-In & Welcome Email',
          description: 'Sequence email 1: Deliver the lead magnet and create immediate enthusiasm.',
          learnContent: {
            videoTitle: 'Anatomy of the Perfect Welcome Email',
            summaryText: 'Welcome emails are often opened by more than 70% of readers. Deliver the gift immediately, say thank you, and create curiosity about the next message.',
            bulletPoints: ['Subject: “Your checklist + important information [Download]”', 'Place the direct gift link in the first paragraph', 'Explain what useful content will arrive over the next few days'],
            fullArticleGuide: `### Structure of welcome email 1

Your first email usually has the highest open rate—often 60–70%. Do not waste that moment with a long monologue.

#### The ideal structure

1. **Subject line**: Make the delivery clear, for example “[Download] Here is your checklist + important information.”
2. **Gift delivery**: Put the download link directly in the first paragraph.
3. **Set expectations**: Briefly introduce yourself and announce an important discovery that you will share the next day.`,
            practicalExamples: ['Use the prepared welcome-email template in GOM-MAR email automation.'],
          },
          understandContent: { coreTakeaway: 'The first impression determines whether future messages are read or ignored.', keyPrinciples: ['Send immediately after registration', 'Use a clear subject line', 'Write in a friendly, respectful tone'] },
          actionTask: { instruction: 'Use the Toolbox Email Generator and add email 1 to your automation:', placeholder: 'Welcome email prepared' },
        },
        '5.4': {
          stageTitle: '5. Win Prospects', title: 'Automated Follow-Up Sequence',
          description: 'Use a five-email sequence to build trust and recommend suitable offers automatically.',
          learnContent: {
            videoTitle: 'The Five-Email Sales Formula',
            summaryText: 'Many sales occur only between the third and seventh email. GOM-MAR email automation runs this sequence for you automatically.',
            bulletPoints: ['Email 1—immediately: welcome and lead-magnet download', 'Email 2—day 1: your story and turning point', 'Email 3—day 2: the audience’s biggest mistake', 'Email 4—day 4: present the solution and affiliate link', 'Email 5—day 7: common questions and final recommendation'],
            fullArticleGuide: `### The five-stage follow-up formula for automated sales

A prospect rarely buys at the first contact. Trust grows through several useful touchpoints, and an automated sequence delivers them consistently.

#### The five emails

* **Email 1—day 0**: Welcome and free download.
* **Email 2—day 1**: Story and identification—why you once faced the same situation.
* **Email 3—day 2**: Explain the common misconception and why previous attempts fail.
* **Email 4—day 4**: Present the recommended system and affiliate link as a practical shortcut.
* **Email 5—day 7**: Answer frequent questions and remind the reader about the relevant bonus.`,
            practicalExamples: ['All five emails are available as templates in GOM-MAR email automation and only need to be adapted to your audience and offer.'],
          },
          understandContent: { coreTakeaway: 'Automated emails can sell while you spend time with friends and family.', keyPrinciples: ['Use authentic stories', 'Aim for 80% value and trust, 20% recommendation', 'Keep sensible automatic intervals'] },
          actionTask: { instruction: 'Activate all five emails in GOM-MAR email automation:', checklistItems: ['Email 1 configured—immediately', 'Email 2 configured—day 1', 'Email 3 configured—day 2', 'Email 4 configured—day 4', 'Email 5 configured—day 7'] },
        },
      },
    },
    6: {
      title: '6. Turn Visitors into Customers',
      subtitle: '🔴 MONETISATION',
      description: 'Affiliate-marketing psychology, conversion improvement, and long-term trust building.',
      lessons: {
        '6.1': {
          stageTitle: '6. Turn Visitors into Customers', title: 'Email Monetisation',
          description: 'Turn interested readers into enthusiastic customers step by step—without pressure.',
          learnContent: {
            videoTitle: 'Sell through Honest Recommendations',
            summaryText: 'People dislike being sold to, but they enjoy making a good purchase. Explain honestly why you value the product and what concrete benefit it provides.',
            bulletPoints: ['Explain the before-and-after transformation', 'Show genuine results or demonstrations', 'Make the call-to-action link clearly visible'],
            fullArticleGuide: `### Honest selling through recommendation marketing

Sustainable monetisation grows from trust. When readers see that you genuinely want to help, they are more willing to consider your recommendations.

#### Three principles of monetisation

1. **Present the product as a shortcut**: Explain how it saves time and prevents expensive mistakes.
2. **Use a clear call to action**: Label the link or button precisely—for example, “👉 Click here to access the system.”
3. **Handle objections**: Address doubts proactively, such as whether previous experience is required, and give an honest answer.`,
            practicalExamples: ['Use the prepared templates in the GOM-MAR Email Generator.'],
          },
          understandContent: { coreTakeaway: 'A good salesperson acts as an adviser who helps customers make the best decision for themselves.', keyPrinciples: ['Never make false promises', 'Use clear language', 'Explain the specific benefit'] },
          actionTask: { instruction: 'Create a sales email with the Toolbox Email Generator:', placeholder: 'Sales email generated' },
        },
        '6.2': {
          stageTitle: '6. Turn Visitors into Customers', title: 'Conversion Boosters & Bonuses',
          description: 'Increase sales with exclusive bonuses and responsible scarcity.',
          learnContent: {
            videoTitle: 'The Bonus Lever for Affiliate Sales',
            summaryText: 'Give prospects a clear reason to buy through your affiliate link by including a useful exclusive bonus, such as a checklist or an AI prompt collection.',
            bulletPoints: ['Create one simple additional bonus', 'Use genuine scarcity—for example, for the first 20 buyers', 'A relevant bonus can increase conversion substantially'],
            fullArticleGuide: `### The bonus lever for stronger sales

If ten affiliates promote the same product, why should a prospect buy through you? A relevant **exclusive bonus** can make your recommendation more useful.

#### Suitable bonus ideas

* A personal checklist.
* A short five-minute explanation video.
* Your own tested prompt collection.

Customers who purchase through your link can send their receipt by email and receive the promised bonus. Keep the process simple and deliver it promptly.`,
            practicalExamples: ['Example: “Buy the course through my link and receive my ten tested AI prompts at no additional cost.”'],
          },
          understandContent: { coreTakeaway: 'A relevant bonus gives prospects a strong reason to purchase through your recommendation instead of directly from the provider.', keyPrinciples: ['The bonus must complement the main product', 'Make email delivery simple'] },
          actionTask: { instruction: 'What bonus could you offer your customers?', placeholder: 'For example, My Ten Best AI Prompts for Facebook Posts as a PDF' },
        },
        '6.3': {
          stageTitle: '6. Turn Visitors into Customers', title: 'Trust & Social Proof',
          description: 'Use testimonials, customer feedback, and transparency to strengthen credibility.',
          learnContent: {
            videoTitle: 'Add Social Proof to Email Marketing',
            summaryText: 'People look to the experiences of others. Authentic quotations, testimonials, and short case studies can resolve remaining doubts.',
            bulletPoints: ['Add short genuine quotations to follow-up emails', 'Share your own milestone results honestly', 'Answer frequent objections proactively'],
            fullArticleGuide: `### Social proof as a credibility booster

People often trust the experiences of other customers more than advertising claims.

#### Forms of social proof

* **Quotations and screenshots**: Genuine feedback from participants or customers.
* **Case studies**: For example, “How Markus generated his first three leads in 14 days.”
* **Transparency**: Explain honestly what worked, what did not, and what conditions affected the result.`,
            practicalExamples: ['Include verified quotations from successful participants in relevant sales emails, with permission where required.'],
          },
          understandContent: { coreTakeaway: 'Trust is priceless. Someone who receives honest guidance is more likely to value future recommendations.', keyPrinciples: ['Credibility before boasting', 'Authentic stories beat advertising slogans'] },
          actionTask: { instruction: 'Confirm that objection handling and trust building are included in your sequence.', checklistItems: ['Frequent customer questions identified', 'Answers added to email 5', 'Genuine feedback or demonstrations linked'] },
        },
        '6.4': {
          stageTitle: '6. Turn Visitors into Customers', title: 'First Revenue & Analysis',
          description: 'Analyse open rates, click rates, and sales—and celebrate your first result.',
          learnContent: {
            videoTitle: 'Your First Commissions & Data Analysis',
            summaryText: 'Once leads move through the system, the first commissions can follow. Identify which emails receive the most opens and clicks.',
            bulletPoints: ['Target open rate: above 30–40%', 'Target click rate: above 5–10%', 'Review commissions in the affiliate dashboard'],
            fullArticleGuide: `### Understand metrics and celebrate first commissions

Congratulations on your first measurable results. The next step is to understand the numbers and improve one weak point at a time.

#### Three essential metrics

1. **Open rate**: The percentage of recipients who open the email. A useful initial target is above 30%.
2. **Click-through rate**: The percentage of readers who click the included link. A useful initial target is above 5%.
3. **Conversion rate**: The percentage of visitors who purchase on the destination page. A common starting target is 1–3%.`,
            practicalExamples: ['If an email has a weak open rate, test a clearer and more relevant subject line.'],
          },
          understandContent: { coreTakeaway: 'What you measure, you can improve.', keyPrinciples: ['A/B-test subject lines', 'Improve the weakest step first'] },
          actionTask: { instruction: 'What will you do with your first euro earned online?', placeholder: 'For example, reinvest in the domain or celebrate the milestone' },
        },
      },
    },
    7: {
      title: '7. Your System Is Running',
      subtitle: '🟢 AUTOMATION',
      description: 'Complete automation, AI support, scaling, and your next step as an online entrepreneur.',
      lessons: {
        '7.1': {
          stageTitle: '7. Your System Is Running', title: 'Complete Automation',
          description: 'Let AI and automated workflows handle most of the recurring daily work.',
          learnContent: {
            videoTitle: 'The Complete Automation Stack',
            summaryText: 'Your system is now connected: traffic reaches the landing page, prospects subscribe, GOM-MAR email automation sends the sequence, and purchases are processed automatically.',
            bulletPoints: ['AI can generate fresh weekly content in seconds', 'Email sequences run for months without manual sending', 'You mainly review the key metrics each week'],
            fullArticleGuide: `### Complete automation mode

You have built the core GOM-MAR Academy system. Your digital process can now run consistently and support you like a well-maintained machine.

#### The automated flow

1. **Traffic**: Published Reels, Facebook posts, and Pins continue attracting visitors.
2. **Opt-in**: Interested people subscribe through your landing page.
3. **Email delivery**: GOM-MAR email automation handles communication and recommendations.
4. **Commissions**: Eligible purchases are tracked and credited through the affiliate platform.`,
            practicalExamples: ['Your recurring task can be reduced to approximately 30 minutes of weekly monitoring and content updates with the GOM-MAR AI Toolbox.'],
          },
          understandContent: { coreTakeaway: 'You have built a genuine, working system for additional online income.', keyPrinciples: ['Systems multiply your available time', 'Scale by increasing qualified traffic'] },
          actionTask: { instruction: 'Confirm that all system components are active:', checklistItems: ['Landing page is live', 'GOM-MAR email automation is running', 'Traffic sources are configured', 'AI support tools are active'] },
        },
        '7.2': {
          stageTitle: '7. Your System Is Running', title: 'Scaling & a Second Offer',
          description: 'Add complementary partner offers and increase customer lifetime value.',
          learnContent: {
            videoTitle: 'From the First Euro to Four-Figure Monthly Revenue',
            summaryText: 'A system that works for one qualified lead can also work for 100 or 1,000. Later emails can recommend additional useful tools and courses.',
            bulletPoints: ['Extend your email sequence with additional messages', 'Recommend relevant complementary products', 'Build a long-term brand in your niche'],
            fullArticleGuide: `### Scale and multiply your revenue

A satisfied customer who has already purchased through your recommendation is more likely to value a future recommendation that genuinely fits their needs.

#### Two ways to expand responsibly

* Add a second, complementary partner product after day 14 of the email sequence.
* Send one useful broadcast newsletter per week with current AI news, practical guidance, or relevant resources.

Keep every recommendation connected to the audience’s original goal. More offers are valuable only when they provide a logical next step.`,
            practicalExamples: ['Example: In month two, recommend an appropriate email tool or AI software subscription with recurring commission to customers who completed the starter course.'],
          },
          understandContent: { coreTakeaway: 'Serving existing contacts is often much more efficient than constantly acquiring new ones.', keyPrinciples: ['Expand your email funnel deliberately', 'Send useful newsletters regularly'] },
          actionTask: { instruction: 'Use the Toolbox to create a follow-up email for a second product:', placeholder: 'Follow-up email created' },
        },
        '7.3': {
          stageTitle: '7. Your System Is Running', title: 'Online Entrepreneur Milestone',
          description: 'Congratulations—you have completed all seven core stages. Unlock your certificate.',
          learnContent: {
            videoTitle: 'Your Next Chapter as an Online Entrepreneur',
            summaryText: 'You have done what many people only plan: built and tested a complete online-income system. Stay consistent and celebrate this achievement.',
            bulletPoints: ['All seven core stages completed', 'Integrated email automation and AI tools ready to use', 'Access to the GOM-MAR Pro Community unlocked'],
            fullArticleGuide: `### Congratulations, online entrepreneur! 🎉

You have worked through the complete core GOM-MAR Academy programme, understood the system, and implemented it in practice.

You now have the essential parts of an automated digital side-income system:

* **A clearly defined niche and audience**
* **A working opt-in landing page**
* **Automated GOM-MAR email communication**
* **Ongoing traffic routines supported by AI**

Keep the system moving, stay focused, and continue building greater financial and time flexibility step by step.`,
            practicalExamples: ['Unlock your official GOM-MAR graduate certificate.'],
          },
          understandContent: { coreTakeaway: 'Congratulations—you have reached the GOM-MAR Academy online-entrepreneur milestone.', keyPrinciples: ['Never stop learning', 'Use the community and share your experience'] },
          actionTask: { instruction: 'Complete the final core module and unlock your Level 5 status.', checklistItems: ['I completed every core task', 'My system is running and ready to scale', 'I am proud to call myself an online entrepreneur'] },
        },
      },
    },
    8: {
      title: '8. Bonus & Mastermind',
      subtitle: 'Exclusive Scaling & VIP Strategies',
      description: 'Advanced growth strategies, high-ticket funnels, and exclusive VIP resources for stronger results.',
      lessons: {
        '8.1': {
          stageTitle: '8. Bonus & Mastermind', title: 'The 10x Scaling Formula',
          description: 'Develop an organic side-income system into a scalable business through paid traffic and reinvestment.',
          learnContent: {
            videoTitle: 'Scale Responsibly: The Reinvestment Cycle',
            summaryText: 'Once your organic system produces sales, you can reinvest part of the revenue in carefully tested advertising or partnerships.',
            bulletPoints: ['Reinvest 30–50% of early profits only when affordable', 'Scale proven campaigns with targeted Meta and Google ads', 'Automate content with advanced AI workflows'],
            fullArticleGuide: `### The 10x scaling formula for advanced marketers

When an organic system consistently generates leads and sales, you have evidence that the offer and funnel can work. The next goal is to increase volume without losing control of costs.

#### Three pillars of scaling

1. **Paid traffic**: Use Facebook, Instagram, TikTok, or search ads to bring a clearly defined audience to the opt-in page.
2. **Higher conversion**: Improve headlines, email subject lines, and buttons through controlled A/B tests.
3. **Greater customer lifetime value**: Add relevant follow-up products, software subscriptions, or premium courses to the email funnel.

Start with a small test budget, define a loss limit, and scale only when tracking shows repeatable positive results.`,
            practicalExamples: ['Example: A €50 ad test generates 25 leads and two sales with €60 commission each. That produces €120 revenue and €70 before other costs.'],
          },
          understandContent: { coreTakeaway: 'Scaling means reinvesting part of proven profits into systems that can generate predictable additional value.', keyPrinciples: ['Know acquisition cost and customer lifetime value', 'Test in small steps before scaling'] },
          actionTask: { instruction: 'Use the GOM-MAR Toolbox to create your first scaling post or advertising script:', placeholder: 'Scaling script created' },
        },
        '8.2': {
          stageTitle: '8. Bonus & Mastermind', title: 'High-Ticket Backends & VIP Offers',
          description: 'Learn how premium consulting and mentoring offers can produce larger individual commissions.',
          learnContent: {
            videoTitle: 'High-Ticket Affiliate Offers & Your Own Premium Services',
            summaryText: 'A suitable high-ticket offer requires fewer customers, but also demands stronger qualification, trust, and responsible advice.',
            bulletPoints: ['High-ticket affiliate programmes may pay €300–€1,000+ per sale', 'Use clear B2B qualification questions in conversations', 'Use an automated but personal appointment-booking funnel'],
            fullArticleGuide: `### Understanding high-ticket offers

Entry-level products provide an accessible first step, while high-ticket offers can address more complex problems with deeper support.

#### Why consider high-ticket offers?

* One €500 commission equals twenty-five €20 commissions.
* Premium buyers expect clear outcomes, strong delivery, and honest qualification.
* You can provide your own consultation or refer qualified prospects to an established partner programme.

Never recommend a premium offer purely because of the commission. Confirm that the prospect has a genuine need, understands the commitment, and can make an informed decision.`,
            practicalExamples: ['Example: Add an invitation on day 10 of the email sequence for qualified readers to book a free strategy call about a relevant premium partner programme.'],
          },
          understandContent: { coreTakeaway: 'High-ticket offers create leverage only when trust, fit, and responsible consultation come first.', keyPrinciples: ['Trust is the essential currency', 'Make every consultation genuinely useful'] },
          actionTask: { instruction: 'Create a high-ticket email template in the email editor:', placeholder: 'High-ticket email ready' },
        },
        '8.3': {
          stageTitle: '8. Bonus & Mastermind', title: 'GOM-MAR VIP Community & Partner Programme',
          description: 'Join the partner network, earn eligible referral commissions, and exchange ideas in the VIP community.',
          learnContent: {
            videoTitle: 'The GOM-MAR Partner & Mastermind Network',
            summaryText: 'Graduates can recommend the Academy through the GOM-MAR partner programme and take part in the VIP exchange.',
            bulletPoints: ['Recurring commissions on eligible Pro subscriptions', 'VIP mastermind exchange with experienced graduates', 'Early insight into new AI tools and selected beta features'],
            fullArticleGuide: `### Welcome to the GOM-MAR VIP inner circle

By completing the programme, you have developed the ability to plan and build practical digital systems.

#### Your VIP opportunities

* Recommend GOM-MAR Academy through your personal affiliate link while clearly disclosing the partnership.
* Use tested prompts, templates, and marketing resources from the Toolbox.
* Exchange experiences with other graduates in the VIP community and learn from practical results.

Respect applicable advertising rules, recommend only what fits the audience, and never promise guaranteed income.`,
            practicalExamples: ['Use the AI assistant Mara to plan an individual partner campaign for a clearly defined audience.'],
          },
          understandContent: { coreTakeaway: 'A strong network helps members learn and grow faster through shared experience.', keyPrinciples: ['Share useful experience', 'Build recurring income responsibly'] },
          actionTask: { instruction: 'Complete the Mastermind module and activate your VIP badge:', checklistItems: ['I understand responsible scaling with paid ads', 'I understand high-ticket backend offers', 'I am ready for the GOM-MAR VIP Mastermind'] },
        },
      },
    },
    9: {
      title: '9. AI Agents & Autonomous Workflows',
      subtitle: 'AI Hyperautomation & Prompt Workflows',
      description: 'Learn how to use advanced AI agents for automated market research, content creation, visual generation, and responsive customer interaction.',
      lessons: {
        '9.1': {
          stageTitle: '9. AI Agents & Autonomous Workflows', title: 'Autonomous AI Prompts & Multi-Agent Workflows',
          description: 'Build connected AI prompts that turn one niche idea into a complete marketing bundle.',
          learnContent: {
            videoTitle: 'Connecting Multiple Prompts for Greater Efficiency',
            summaryText: 'By combining focused AI prompts, you can create headlines, landing-page copy, social-media scripts, and email sequences in one structured workflow.',
            bulletPoints: ['Create structured master prompts for your specific niche', 'Connect audience research with immediate content generation', 'Reduce repetitive manual creation work significantly'],
            fullArticleGuide: `### The multi-agent principle for marketing automation

Modern AI systems become especially useful when you treat them not as a single question-and-answer tool, but as a coordinated team of specialised assistants.

#### Three roles in your AI team

1. **Research agent**: Analyses the audience’s problems, goals, language, and objections using reliable source material.
2. **Copywriting agent**: Turns those findings into clear headlines, landing-page copy, and email drafts.
3. **Design agent**: Develops visual directions, advertising concepts, and social-media carousel ideas.

Define the goal, source material, constraints, and review criteria for every role. Always review generated claims, links, and recommendations before publishing.`,
            practicalExamples: ['Example: Give the AI tutor Mara a clearly defined audience idea and request a five-email draft bundle, then verify and edit every message before activation.'],
          },
          understandContent: { coreTakeaway: 'Clear context and review criteria make AI output more useful; automation saves time but does not replace human responsibility.', keyPrinciples: ['Provide clear context and audience', 'Review each step before publishing'] },
          actionTask: { instruction: 'Use GOM-MAR AI Mara for your first structured marketing workflow:', placeholder: 'AI workflow created' },
        },
        '9.2': {
          stageTitle: '9. AI Agents & Autonomous Workflows', title: 'AI Image & Visual Generation for Content Funnels',
          description: 'Create consistent visual concepts, thumbnails, and social-media graphics with AI-assisted tools.',
          learnContent: {
            videoTitle: 'High-Impact Visuals Without Complex Design Software',
            summaryText: 'Learn how to write image prompts for recognisable thumbnails, post visuals, and advertising concepts in a consistent brand style.',
            bulletPoints: ['Generate coherent visual worlds that match your colour palette', 'Develop hooks and visual concepts for Reels and Pinterest Pins', 'Use AI drafts as a starting point and check licences, accuracy, and brand fit'],
            fullArticleGuide: `### Visual attention with AI-assisted graphics

On fast-moving social platforms, a clear visual can help an audience understand the topic before reading the caption.

#### The three-component image recipe

* **Focus subject**: Choose one unmistakable main subject, such as an entrepreneur at work or an abstract technology scene.
* **Colour harmony**: Use defined brand colours such as indigo, deep navy, and accent gold for recognition.
* **Atmosphere**: Keep the composition bright, clear, professional, and free from unnecessary visual noise.

Check every generated image for distorted details, misleading representations, third-party trademarks, and usage rights before publishing it commercially.`,
            practicalExamples: ['Example: Use the image-prompt assistant in the Toolbox to create three visual directions for one campaign, then select and refine the option that best matches your brand.'],
          },
          understandContent: { coreTakeaway: 'Visuals attract attention, while a clear and relevant headline helps the audience decide whether to continue.', keyPrinciples: ['Use consistent brand elements', 'Prioritise clarity over visual noise'] },
          actionTask: { instruction: 'Generate and review an image concept with the AI prompt tool in the Toolbox:', placeholder: 'Image concept reviewed' },
        },
        '9.3': {
          stageTitle: '9. AI Agents & Autonomous Workflows', title: 'Automated 24/7 Lead Nurturing with AI',
          description: 'Set up AI-assisted response systems that answer common questions and help qualify enquiries responsibly.',
          learnContent: {
            videoTitle: 'Helpful Customer Interaction Around the Clock',
            summaryText: 'Connect email sequences and chat channels with a supervised AI assistant so prospects receive timely answers based on approved information.',
            bulletPoints: ['Answer common product and course questions at any time', 'Collect qualification information before appropriate appointments', 'Escalate sensitive, uncertain, or individual questions to a person'],
            fullArticleGuide: `### A supervised 24/7 assistant for customer enquiries

An unanswered question can interrupt a customer journey. A well-configured assistant can provide immediate orientation while keeping people in control of important decisions.

#### Why supervised AI nurturing is useful

* It responds promptly using approved FAQs, product information, and Academy content.
* It can collect relevant context and route qualified enquiries to the right next step.
* It reduces repetitive support work while escalating unclear, sensitive, or high-impact questions to a person.

Tell users when they are communicating with AI, minimise stored personal data, offer a human contact route, and never let the assistant invent prices, guarantees, or income claims.`,
            practicalExamples: ['Use Mara in the AI chat to turn frequently asked objections into helpful FAQ drafts, then approve the answers before automation.'],
          },
          understandContent: { coreTakeaway: 'Fast responses are valuable when they are accurate, transparent, privacy-conscious, and supported by human escalation.', keyPrinciples: ['Respond promptly with approved information', 'Escalate uncertainty to a person'] },
          actionTask: { instruction: 'Complete the AI Agents module and confirm your responsible AI setup:', checklistItems: ['I understand connected AI prompt workflows', 'I can plan and review AI-assisted visuals', 'I understand transparent, supervised 24/7 lead nurturing'] },
        },
      },
    },
    10: {
      title: '10. Email Copywriting & AI Generator',
      subtitle: 'Persuasive Copy & Responsible Sales Launches',
      description: 'Master clear, persuasive email copywriting and use AI-assisted templates for subject lines, hooks, and structured launch campaigns.',
      lessons: {
        '10.1': {
          stageTitle: '10. Email Copywriting & AI Generator', title: 'Anatomy of a Persuasive Email',
          description: 'Learn the five building blocks of an effective sales email: subject line, opening hook, story, offer, and clear call to action.',
          learnContent: {
            videoTitle: 'The AIDA Framework for Email Marketers',
            summaryText: 'Learn how to structure emails that are relevant, easy to read, and guide interested readers toward one clear next step.',
            bulletPoints: ['Relevant subject lines that set accurate expectations', 'Audience-focused opening hooks that earn attention', 'A clear offer without pressure or misleading claims'],
            fullArticleGuide: `### Five essential building blocks of an effective email

1. **Subject line**: Keep it concise, specific, and consistent with the message. Curiosity is useful only when the email fulfils the promise.
2. **Opening hook**: Connect the first two lines to a recognisable situation, goal, or question from the audience.
3. **Story or value**: Link an everyday problem to a useful insight, example, or practical lesson.
4. **Offer**: Explain how the recommended product or next step may help, who it is for, and any relevant limitations.
5. **Call to action**: Use one clear link or button that accurately describes what happens next.

Before sending, check every claim, disclose affiliate relationships where required, and make unsubscribing simple.`,
            practicalExamples: ['Example: Replace “Our new product is here” with “A simpler way to plan your weekly content”—then explain the method honestly in the email.'],
          },
          understandContent: { coreTakeaway: 'Write for a real person: combine empathy and useful information with clear, verifiable details.', keyPrinciples: ['Clarity beats cleverness', 'Use one primary call to action per email'] },
          actionTask: { instruction: 'Use the email generator in the GOM-MAR Toolbox to create and review your first subject line:', placeholder: 'Subject line reviewed' },
        },
        '10.2': {
          stageTitle: '10. Email Copywriting & AI Generator', title: 'The Mara AI Email Generator',
          description: 'Create audience-specific email drafts with the integrated GOM-MAR AI generator, then review and personalise them.',
          learnContent: {
            videoTitle: 'A Step-by-Step Brief for Better AI Email Drafts',
            summaryText: 'Provide the goal, audience, offer details, and constraints. Mara creates a subject line, preview text, and editable email draft.',
            bulletPoints: ['Draft welcome, newsletter, promotional, and re-engagement emails', 'Choose an appropriate professional, enthusiastic, or direct tone', 'Review facts, links, placeholders, and consent requirements before sending'],
            fullArticleGuide: `### AI-assisted copywriting without the blank-page problem

The GOM-MAR email generator can produce a useful first draft, while you remain responsible for accuracy, tone, and the final sending decision.

#### How to brief the generator effectively

* **Define the objective**: Choose welcome, promotion, newsletter, education, or re-engagement.
* **Describe the audience**: Include the reader’s situation, goal, knowledge level, and likely questions.
* **Provide verified facts**: Add two or three confirmed benefits, conditions, prices, or deadlines.
* **Set constraints**: Specify tone, length, prohibited claims, and the desired call to action.
* **Review and personalise**: Replace placeholders such as [NAME], verify every link, and add your own experience or perspective.

Never enter unnecessary personal or confidential customer data into a prompt.`,
            practicalExamples: ['Use the generator to draft a promotional email for a genuine discount code, then verify the price, validity period, conditions, and destination link.'],
          },
          understandContent: { coreTakeaway: 'AI is a drafting assistant: you provide direction, evidence, and final editorial control.', keyPrinciples: ['Give clear, verified instructions', 'Review and personalise before sending'] },
          actionTask: { instruction: 'Open the email generator and create a reviewed draft:', placeholder: 'Email draft reviewed' },
        },
        '10.3': {
          stageTitle: '10. Email Copywriting & AI Generator', title: 'The Five-Day Product Launch Flow',
          description: 'Plan a structured email campaign for a genuine launch, promotion, or special offer without artificial pressure.',
          learnContent: {
            videoTitle: 'The Five-Day Sales Campaign Blueprint',
            summaryText: 'Introduce the topic, present the offer, provide credible evidence, answer questions, and close with an honest reminder when a real deadline applies.',
            bulletPoints: ['Day 1: Topic introduction and useful preview', 'Day 2: Offer launch and primary benefits', 'Day 3: Verified customer experience or demonstration', 'Day 4: Objection handling and frequently asked questions', 'Day 5: Final reminder for a genuine deadline'],
            fullArticleGuide: `### A five-day launch plan for clear customer communication

A structured launch gives readers enough context to understand an offer and decide whether it fits their needs.

#### The five phases

1. **Preparation—day 1**: Introduce the problem, share a useful insight, and explain what readers can expect next.
2. **Launch—day 2**: Open the offer with clear benefits, price, conditions, and a transparent call to action.
3. **Evidence—day 3**: Share an authorised testimonial, verified case study, product demonstration, or your own documented experience.
4. **Questions—day 4**: Address common objections, suitability, required effort, limitations, refunds, and support.
5. **Close—day 5**: Remind readers of a real deadline or availability limit. If there is no genuine deadline, do not invent one.

Keep unsubscribe options visible, respect consent, and stop promotional follow-up when a recipient opts out.`,
            practicalExamples: ['Load the five-day launch outline into the sequence editor, replace every placeholder, and verify the offer details before scheduling.'],
          },
          understandContent: { coreTakeaway: 'A good campaign guides readers through a clear story while preserving their ability to make an informed decision.', keyPrinciples: ['Use only genuine deadlines', 'Provide useful information throughout the sequence'] },
          actionTask: { instruction: 'Complete the Email Copywriting module and confirm your launch preparation:', checklistItems: ['I know the five building blocks of an effective email', 'I can use and review the AI email generator responsibly', 'I understand the five-day launch structure and use only genuine urgency'] },
        },
      },
    },
    11: {
      title: '11. Funnel Analytics & Performance Scaling',
      subtitle: 'Data-Informed Decisions & KPI Optimisation',
      description: 'Analyse funnel metrics such as conversion rate, click-through rate, and cost per lead, identify bottlenecks, and improve performance through controlled tests.',
      lessons: {
        '11.1': {
          stageTitle: '11. Funnel Analytics & Performance Scaling', title: 'Four Core KPIs for a Healthy Funnel',
          description: 'Understand opt-in rate, email open rate, click-through rate, and sales conversion rate so you can diagnose your funnel.',
          learnContent: {
            videoTitle: 'Funnel Analysis: Reading the Numbers',
            summaryText: 'Reliable measurements help you decide what to improve. Learn four important performance indicators, how to calculate them, and how to interpret them in context.',
            bulletPoints: ['Opt-in rate: leads divided by eligible landing-page visitors', 'Email open rate: measured opens divided by delivered emails; treat privacy-related tracking as an estimate', 'Click-through rate: unique clicks divided by delivered emails or opens—use one definition consistently', 'Sales conversion rate: verified purchases divided by qualified clicks or leads'],
            fullArticleGuide: `### Four pillars of funnel analytics

Useful marketing decisions rely on consistent data rather than isolated impressions. When you know where people leave the funnel, you can investigate that stage first.

#### Four KPI formulas

1. **Opt-in rate**: How many eligible visitors become leads? *(Leads ÷ eligible visitors × 100)*
2. **Open rate**: How many delivered emails register an open? *(Measured unique opens ÷ delivered emails × 100)*
3. **Click-through rate**: How many recipients click? *(Unique clicks ÷ delivered emails × 100)* Use click-to-open rate separately if needed.
4. **Sales conversion rate**: How many qualified clicks or leads result in a verified purchase? *(Purchases ÷ chosen denominator × 100)*

Targets vary by market, traffic quality, offer, device, consent, and tracking method. Record the exact definition and date range for every report before comparing results.`,
            practicalExamples: ['Example: If measured opens are relatively strong but clicks remain weak, investigate message relevance, offer clarity, link placement, and the call to action before changing the subject line.'],
          },
          understandContent: { coreTakeaway: 'Consistent definitions and sufficient data help you find the largest measurable bottleneck and improve it first.', keyPrinciples: ['Change one meaningful variable at a time', 'Avoid conclusions from tiny or biased samples'] },
          actionTask: { instruction: 'Review and document your campaign metrics in the GOM-MAR dashboard:', placeholder: 'Funnel metrics documented' },
        },
        '11.2': {
          stageTitle: '11. Funnel Analytics & Performance Scaling', title: 'A/B Testing & Bottleneck Analysis with Mara',
          description: 'Compare headlines, subject lines, and button copy systematically to learn which version performs better for your audience.',
          learnContent: {
            videoTitle: 'Systematic A/B Testing in Online Marketing',
            summaryText: 'Learn how to split eligible traffic between two versions, define one primary metric, and adopt a winner only when the result is sufficiently reliable.',
            bulletPoints: ['Compare one substantial subject-line difference at a time', 'Test specific button wording while keeping placement and design stable', 'Use Mara to draft variants, then review them for accuracy and fairness'],
            fullArticleGuide: `### The practice of responsible A/B testing

Small copy changes can affect behaviour, but a short-term difference does not automatically prove that one version is better.

#### A/B testing rules

* **Rule 1**: Change one meaningful variable per test so the result remains interpretable.
* **Rule 2**: Define the audience, primary metric, minimum sample, and test duration before starting.
* **Rule 3**: Split traffic randomly and run both versions during the same period.
* **Rule 4**: Check practical impact as well as statistical uncertainty. Do not stop merely because one version is temporarily ahead.
* **Rule 5**: Document the outcome, implement a credible winner, and test the next hypothesis.

For low traffic, collect data for longer or treat the result as directional rather than definitive.`,
            practicalExamples: ['Ask Mara for three truthful subject-line concepts, select two genuinely different approaches, and test them with the same audience and sending window.'],
          },
          understandContent: { coreTakeaway: 'A/B testing replaces guesswork with structured learning when the test is designed and interpreted carefully.', keyPrinciples: ['Test hypotheses instead of random details', 'Let evidence guide the decision'] },
          actionTask: { instruction: 'Create and review one subject-line test variant with GOM-MAR AI:', placeholder: 'A/B test variant reviewed' },
        },
        '11.3': {
          stageTitle: '11. Funnel Analytics & Performance Scaling', title: 'Re-Engagement & Customer-Value Strategy',
          description: 'Reconnect with inactive subscribers and improve long-term customer value through relevant, permission-based follow-up.',
          learnContent: {
            videoTitle: 'Customer Lifetime Value: Serve Subscribers Over Time',
            summaryText: 'Many customers need several useful interactions before making a decision. Build measured re-engagement and follow-up flows that respect consent and preferences.',
            bulletPoints: ['Send a short re-engagement sequence after a defined period of inactivity', 'Offer relevant follow-up products only when they match the original need', 'Use optional surveys and preference controls to improve communication'],
            fullArticleGuide: `### The customer lifetime value perspective

Long-term value grows when subscribers receive relevant support over time—not when they are pressured with more messages.

#### Three responsible optimisation steps

1. **Re-engagement**: Ask inactive contacts whether they still want the content and offer a clear preference or unsubscribe option.
2. **Cross-selling**: Recommend a complementary tool or course only when it logically supports the customer’s existing goal; disclose affiliate relationships.
3. **List hygiene**: Suppress or remove persistently inactive addresses according to your retention policy, while preserving legally required records and opt-out status.

Use only consented data, minimise tracking, honour withdrawal immediately, and avoid sensitive profiling without an appropriate legal basis.`,
            practicalExamples: ['Use the re-engagement template in the email editor to send a concise preference check instead of an aggressive sales message.'],
          },
          understandContent: { coreTakeaway: 'Sustainable customer value comes from relevant follow-up, trust, and respect for subscriber choices.', keyPrinciples: ['Provide value consistently', 'Automate follow-up with clear consent and safeguards'] },
          actionTask: { instruction: 'Complete the Analytics & Scaling module and confirm your measurement process:', checklistItems: ['I can define and calculate the four core funnel KPIs', 'I understand how to design and interpret an A/B test', 'I can improve customer value with relevant, consent-based follow-up'] },
        },
      },
    },
    12: {
      title: '12. High-Performing Landing Pages & No-Code Builder',
      subtitle: 'Build Fast, Accessible Pages Without Coding',
      description: 'Create clear, fast landing pages without programming and improve mobile usability, consent, accessibility, and measurement.',
      lessons: {
        '12.1': {
          stageTitle: '12. High-Performing Landing Pages & No-Code Builder', title: 'Anatomy of a Focused Opt-In Landing Page',
          description: 'Combine a clear hero section, useful subheadline, simple form, and credible trust elements around one conversion goal.',
          learnContent: {
            videoTitle: 'Landing-Page Structure for Clearer Decisions',
            summaryText: 'Learn a practical template for opt-in pages that explains the value, sets accurate expectations, and makes the next step easy to understand.',
            bulletPoints: ['A clear above-the-fold value proposition', 'One primary action without unnecessary distractions', 'A responsive, accessible mobile-first layout'],
            fullArticleGuide: `### A practical landing-page structure

An opt-in page should help an eligible visitor understand the offer and decide whether to subscribe. Conversion rate matters, but informed consent and relevance come first.

#### Essential elements

1. **Simple header**: Use a recognisable logo and only genuine trust indicators.
2. **Hero headline**: State the audience, problem, or desired outcome in plain language without exaggerated promises.
3. **Subheadline**: Explain the specific value of the lead magnet and what the subscriber will receive.
4. **Form and call to action**: Request only necessary information and describe the action accurately.
5. **Consent and privacy**: Explain email use, link the privacy notice, and include any required consent wording.

Treat benchmark conversion rates as context, not guarantees. Measure your own eligible traffic and improve the page through controlled tests.`,
            practicalExamples: ['Use the GOM-MAR Landing Page Generator to create a first draft, then replace every placeholder and review the wording, consent, links, and mobile layout.'],
          },
          understandContent: { coreTakeaway: 'A focused page combines a clear benefit with transparent expectations and one easy next step.', keyPrinciples: ['Explain the value clearly', 'Keep forms minimal and consent transparent'] },
          actionTask: { instruction: 'Configure and review your page in the GOM-MAR Landing Page Generator:', placeholder: 'Landing page reviewed' },
        },
        '12.2': {
          stageTitle: '12. High-Performing Landing Pages & No-Code Builder', title: 'Mobile Optimisation & Fast Loading',
          description: 'Improve smartphone usability, reduce loading time, and remove technical or visual barriers.',
          learnContent: {
            videoTitle: 'Speed, Accessibility & Mobile UX Optimisation',
            summaryText: 'Learn how to create touch-friendly controls, readable layouts, efficient media, and reliable performance across common mobile devices.',
            bulletPoints: ['Use touch targets that are easy to tap and clear form labels', 'Compress and correctly size images while preserving sufficient quality', 'Use HTTPS, an appropriate privacy notice, and accessible interaction states'],
            fullArticleGuide: `### Mobile first: remove barriers for visitors

Slow loading, unreadable text, and controls that are difficult to tap can interrupt a visitor before they understand the offer.

#### Mobile review checklist

* Use readable text—normally at least 16 px for body copy—and sufficient colour contrast.
* Make interactive controls large enough to tap comfortably, with clear labels and visible focus states.
* Serve modern, correctly sized images and avoid loading media that is not needed above the fold.
* Do not use intrusive pop-ups that hide the page or make closing difficult.
* Test keyboard navigation, screen-reader labels, error messages, and different viewport widths.
* Measure real-user performance where possible instead of relying on one laboratory result.

Fast is valuable, but stable layout, accessibility, and reliable functionality are equally important.`,
            practicalExamples: ['Check the mobile preview in the GOM-MAR Builder and complete a real test on at least one iPhone-sized and one Android-sized viewport before publishing.'],
          },
          understandContent: { coreTakeaway: 'A fast, readable, accessible mobile page gives more visitors a fair chance to complete the intended action.', keyPrinciples: ['Optimise images and critical content', 'Design and test mobile first'] },
          actionTask: { instruction: 'Complete the mobile and accessibility preview in the Landing Page Generator:', placeholder: 'Mobile review completed' },
        },
        '12.3': {
          stageTitle: '12. High-Performing Landing Pages & No-Code Builder', title: 'Automated Connection & Go-Live',
          description: 'Connect your landing page to a domain and consent-based email automation, then verify the complete subscriber journey.',
          learnContent: {
            videoTitle: 'Landing-Page Go-Live, Email Connection & Measurement',
            summaryText: 'Connect the form to the correct email workflow, configure the domain, and run a complete test before sending live traffic.',
            bulletPoints: ['Connect the form to the intended GOM-MAR email list and automation', 'Use your verified domain or an approved GOM-MAR subdomain with HTTPS', 'Submit a test entry and verify consent, confirmation, delivery, links, and unsubscribe behaviour'],
            fullArticleGuide: `### The final steps to a working funnel

Go-live is a verification process, not merely a publish button. Test each hand-off so subscribers receive exactly what the page promised.

#### Go-live sequence

1. **Connect the form**: Select the correct list, lawful consent method, field mapping, and welcome workflow.
2. **Configure the destination**: Use an appropriate confirmation, thank-you, or bridge page without hiding essential conditions.
3. **Connect the domain**: Verify DNS, HTTPS, canonical URL, and expected redirects.
4. **Run a complete test**: Use a controlled test address and check submission, validation, consent record, confirmation, lead-magnet delivery, links, and unsubscribe.
5. **Verify measurement**: Confirm that analytics records only the intended events and respects consent choices.

Do not use real customer data for testing, and avoid publishing until failures and misleading states have been corrected.`,
            practicalExamples: ['Publish to a preview or limited test URL first, complete the checklist, and only then direct live campaign traffic to the page.'],
          },
          understandContent: { coreTakeaway: 'A funnel is ready only after the complete subscriber journey has been tested successfully.', keyPrinciples: ['Test the full journey before launch', 'Monitor errors, delivery, and consent after publication'] },
          actionTask: { instruction: 'Complete the Landing Page module and confirm your go-live readiness:', checklistItems: ['I understand the structure of a focused opt-in landing page', 'I tested mobile usability, accessibility, and loading performance', 'I connected and tested the page with consent-based email automation'] },
        },
      },
    },
    13: {
      title: '13. Community, Evergreen Funnels & Business Mastery',
      subtitle: 'Sustainable Growth & Recurring Customer Value',
      description: 'Build a supportive community, create transparent evergreen presentations, and develop repeatable systems for long-term customer value.',
      lessons: {
        '13.1': {
          stageTitle: '13. Community, Evergreen Funnels & Business Mastery', title: 'Build Your Brand & VIP Community',
          description: 'Turn customers and subscribers into engaged community members through useful groups, peer exchange, and well-moderated events.',
          learnContent: {
            videoTitle: 'Community Building: From Subscribers to Active Members',
            summaryText: 'An engaged community can strengthen learning, retention, and trust when its purpose, rules, moderation, and member benefits are clear.',
            bulletPoints: ['Choose a suitable community platform and define its purpose', 'Encourage participation through surveys, Q&As, practical challenges, and member spotlights', 'Protect members with clear rules, moderation, privacy controls, and reporting routes'],
            fullArticleGuide: `### Why community can strengthen a digital business

People may value not only educational content, but also access to peers who share similar goals and can exchange practical experience.

#### Three stages of community building

1. **Onboarding**: Welcome members, explain the purpose and rules, show where to begin, and let them control notifications and profile visibility.
2. **Participation**: Ask useful weekly questions, host transparent Q&As, celebrate verified progress, and encourage respectful peer support.
3. **Recognition**: Thank helpful members through fair, clearly explained recognition or optional VIP benefits without manipulating participation.

Appoint moderators, obtain consent before featuring member stories, minimise collected data, and create a clear process for complaints, removal, and account deletion.`,
            practicalExamples: ['Example: Offer interested email subscribers optional access to a moderated peer group, clearly explaining its purpose, rules, price if any, and privacy settings.'],
          },
          understandContent: { coreTakeaway: 'A healthy community earns trust through useful exchange, consistent moderation, and respect for every member.', keyPrinciples: ['Build trust through authenticity and safeguards', 'Celebrate progress without exaggeration'] },
          actionTask: { instruction: 'Create and review a community concept with the AI tutor Mara:', placeholder: 'Community concept reviewed' },
        },
        '13.2': {
          stageTitle: '13. Community, Evergreen Funnels & Business Mastery', title: 'Evergreen Webinars & Automated VSL Funnels',
          description: 'Create an on-demand video presentation that educates prospects, explains an offer, and supports informed decisions.',
          learnContent: {
            videoTitle: 'Evergreen Funnels: An On-Demand Presentation System',
            summaryText: 'An evergreen webinar can be available at any time. It should be labelled as recorded or on demand and must not imitate a live event deceptively.',
            bulletPoints: ['Structure a concise 15-minute video sales letter', 'Offer genuine on-demand viewing or real scheduled support sessions', 'Send consent-based reminders before and after the presentation'],
            fullArticleGuide: `### The principle of a transparent evergreen webinar

An evergreen webinar is a prerecorded or automated presentation that visitors can watch on demand or at scheduled playback times. Tell viewers clearly which format they are using.

#### A practical 15-minute VSL structure

* **Hook—minutes 0–2**: State the audience, problem, and value of watching without using misleading claims.
* **Context—minutes 2–5**: Share a relevant, truthful story or explain why the problem matters.
* **Approach—minutes 5–10**: Teach the core method, show its limits, and provide enough value to stand alone.
* **Call to action—minutes 10–15**: Present the offer, price, conditions, suitability, and one clear next step.

Do not use fake attendee counts, simulated chat messages, invented scarcity, or resetting countdown timers. If a bonus or deadline is shown, it must be real and consistently enforced.`,
            practicalExamples: ['Use the GOM-MAR Toolbox to create a VSL draft, then verify every factual claim and add a visible “recorded” or “on-demand” label before publishing.'],
          },
          understandContent: { coreTakeaway: 'A transparent on-demand presentation can educate prospects consistently without pretending to be live.', keyPrinciples: ['Use a clear educational structure', 'Be transparent about automation and availability'] },
          actionTask: { instruction: 'Generate and review a VSL script in the Email & Content Generator:', placeholder: 'VSL script reviewed' },
        },
        '13.3': {
          stageTitle: '13. Community, Evergreen Funnels & Business Mastery', title: 'Business Mastery Blueprint & Certificate',
          description: 'Review your systems, organise your next improvements, and complete the GOM-MAR Business Mastery milestone.',
          learnContent: {
            videoTitle: 'Your Next Stage as a Digital Entrepreneur',
            summaryText: 'Congratulations on completing this learning milestone. You now have a structured foundation for building, measuring, and improving responsible digital marketing systems.',
            bulletPoints: ['Review the complete funnel and customer journey', 'Complete the requirements for the GOM-MAR Business Mastery certificate', 'Join the graduate peer community if it supports your goals'],
            fullArticleGuide: `### A milestone—and the beginning of continuous improvement

You have worked through core and advanced tools for planning, communicating, measuring, and improving digital offers.

#### Your next milestones

1. **Protect the system**: Maintain backups, access controls, documentation, privacy settings, and a recovery procedure.
2. **Improve deliberately**: Choose the largest verified bottleneck, run a controlled test, and document the result before increasing spend.
3. **Support customers**: Review feedback, delivery quality, refunds, accessibility, and support response times.
4. **Share responsibly**: Contribute useful experience to the graduate community without exposing customer information or promising guaranteed results.

A certificate documents completion of the Academy requirements; it does not guarantee commercial success, regulated professional status, or a particular income.`,
            practicalExamples: ['Complete the required lessons and tasks, then download the GOM-MAR graduate certificate if the progress check confirms eligibility.'],
          },
          understandContent: { coreTakeaway: 'Completion is a meaningful milestone; sustainable progress comes from continued implementation, measurement, and learning.', keyPrinciples: ['Implement and review consistently', 'Keep learning and protect customer trust'] },
          actionTask: { instruction: 'Complete the GOM-MAR Academy milestone and confirm your Business Mastery foundations:', checklistItems: ['I understand the principles of safe community building', 'I can create a transparent evergreen VSL funnel', 'I reviewed my system and understand what the certificate represents'] },
        },
      },
    },
    14: {
      title: '14. Legal, Compliance & GDPR',
      subtitle: 'Responsible foundations for online businesses',
      description: 'Learn practical privacy, marketing, website-disclosure, consumer and record-keeping basics—and when local professional advice is required.',
      lessons: {
        '14.1': {
          stageTitle: '14. Legal, Compliance & GDPR', title: 'GDPR & compliant email marketing',
          description: 'Collect and use email addresses transparently, document consent, and make withdrawal and objections easy.',
          learnContent: {
            videoTitle: 'Privacy-aware email marketing under the GDPR',
            summaryText: 'Email marketing needs a valid legal basis and clear information. Double opt-in is a widely used way to verify an address and document consent, but the precise requirements also depend on national electronic-marketing law.',
            bulletPoints: ['Record the wording, time, source and confirmation of consent', 'Link the privacy notice and use a clear, unbundled choice where consent is required', 'Provide a visible, working unsubscribe route and honour withdrawals promptly'],
            fullArticleGuide: `### Three foundations for responsible email marketing

Privacy compliance is not a badge a tool can guarantee. The organisation using the tool remains responsible for its purpose, legal basis, information, records and recipients.

#### Practical checklist

1. **Choose and document the legal basis**: For promotional newsletters, consent is commonly required. State who sends what, how often, and for which purpose. Do not use pre-ticked or vague consent.
2. **Verify and retain evidence**: Double opt-in can verify control of an address and strengthen the evidence of consent. Keep a proportionate audit record; do not claim that DOI alone makes every campaign lawful.
3. **Enable withdrawal and objections**: Make unsubscribing as easy as subscribing, process it promptly, and suppress the address from further marketing unless another lawful reason requires limited retention.
4. **Minimise and protect data**: Collect only necessary fields, restrict access, set retention periods, and review processors and international transfers.

Rules differ by country and type of message. Obtain qualified local advice for unusual campaigns, purchased lists, profiling, sensitive data or cross-border activity. This lesson is general education, not legal advice.`,
            practicalExamples: ['In the GOM-MAR email editor, review the form wording, privacy link, DOI flow, consent log and unsubscribe test yourself; the presence of these features is not an automatic compliance guarantee.'],
          },
          understandContent: { coreTakeaway: 'Transparent choices, reliable evidence and easy withdrawal protect recipients and support trustworthy marketing.', keyPrinciples: ['Document the legal basis and consent evidence', 'Make withdrawal as easy as sign-up'] },
          actionTask: { instruction: 'Review and test the consent, DOI, privacy and unsubscribe flow in the GOM-MAR Email Editor:', placeholder: 'Email compliance flow reviewed' },
        },
        '14.2': {
          stageTitle: '14. Legal, Compliance & GDPR', title: 'Legal notice, terms & consumer information',
          description: 'Make required provider, privacy, advertising and consumer information accurate, accessible and appropriate to your jurisdiction and offer.',
          learnContent: {
            videoTitle: 'Website disclosures and avoidable compliance risks',
            summaryText: 'Required disclosures vary by country, legal form, audience and transaction. They should be easy to find, current and tailored to the actual operator and offer.',
            bulletPoints: ['Provide the operator identity, a serviceable address and required contact or registration details', 'Clearly label advertising and affiliate relationships where required', 'Use reviewed, jurisdiction-specific privacy, terms and withdrawal information instead of relying blindly on a generator'],
            fullArticleGuide: `### Legal information for websites and social profiles

A footer or profile link is useful, but there is no universal statutory “two-click rule” that makes every site compliant. Applicable duties depend on the operator, jurisdiction, service, audience and sales process.

#### Review these areas

* **Provider information**: Identify the responsible business and include the address, contact, registration, supervisory and tax details required in the relevant country.
* **Privacy information**: Explain purposes, legal bases, recipients, retention, rights, transfers and contact details in clear language matching the real data flows.
* **Commercial communication**: Label ads, sponsorships and affiliate relationships clearly enough that users understand the commercial nature before acting.
* **Contracts and consumers**: If selling online, check pre-contract information, prices, payment, delivery, cancellation or withdrawal rights, digital-content rules and the required ordering flow. Terms are not a substitute for mandatory law and may not be necessary in every model.
* **Current information**: Do not copy obsolete references—for example, the former EU online dispute-resolution platform was discontinued in 2025.

Use official local guidance and have material or cross-border offers reviewed by a qualified professional. This lesson is general education, not legal advice.`,
            practicalExamples: ['Link the legal notice and privacy information prominently, then test every link and compare the content with the actual business, tools, tracking and checkout flow.'],
          },
          understandContent: { coreTakeaway: 'Accurate, accessible and jurisdiction-specific disclosures reduce risk and help customers make informed decisions.', keyPrinciples: ['Match disclosures to the real operator and data flows', 'Review consumer information before selling'] },
          actionTask: { instruction: 'Add and review the required legal and privacy links in the Landing Page Generator:', placeholder: 'Legal information reviewed' },
        },
        '14.3': {
          stageTitle: '14. Legal, Compliance & GDPR', title: 'Business registration, tax & record keeping',
          description: 'Identify the registration, tax, invoicing and bookkeeping duties that apply where you operate instead of relying on another country’s thresholds.',
          learnContent: {
            videoTitle: 'Business and tax setup: a jurisdiction-aware checklist',
            summaryText: 'Registration and tax obligations depend on your country, legal form, activity, customers and turnover. German terms such as §19 UStG and EÜR must not be treated as universal EU rules.',
            bulletPoints: ['Confirm whether and when your activity must be registered locally', 'Clarify income tax, VAT, invoicing and cross-border obligations before taking payments', 'Keep complete, secure records and follow local retention requirements'],
            fullArticleGuide: `### Set up the administrative foundation responsibly

There is no single EU-wide registration process or small-business VAT threshold. Austria, Germany, Poland and other countries use different authorities, classifications, thresholds and reporting rules.

#### Practical sequence

1. **Define the activity and location**: Record what you sell, where the business is established, who the customers are and where delivery occurs.
2. **Check registrations**: Ask the competent trade or business authority and tax office which registrations, licences and social-insurance duties apply and from which date.
3. **Clarify VAT and invoicing**: Check the current local small-business rules, B2B/B2C place-of-supply rules, digital-service rules and invoice requirements. Do not copy an old threshold from another jurisdiction.
4. **Separate and retain records**: Store invoices, receipts, contracts and payment records consistently, protect personal data and follow applicable retention periods.
5. **Get advice when needed**: A tax adviser or relevant authority should review cross-border sales, platforms, employees, regulated activities and uncertain classifications.

This lesson is a planning checklist, not legal, tax or accounting advice.`,
            practicalExamples: ['Create a weekly bookkeeping routine in a suitable spreadsheet or accounting system, then confirm the setup and retention rules with the competent local authority or adviser.'],
          },
          understandContent: { coreTakeaway: 'A reliable business starts with country-specific registration, tax and record-keeping decisions based on current facts.', keyPrinciples: ['Verify duties with competent local sources', 'Keep complete and protected records from day one'] },
          actionTask: { instruction: 'Complete the Legal & Compliance module and confirm your next verification steps:', checklistItems: ['I know how to document consent and test withdrawal', 'I will tailor legal and privacy information to my jurisdiction and real data flows', 'I know which local authority or adviser must confirm my registration and tax duties'] },
        },
      },
    },
    15: {
      title: '15. AI-Assisted Scaling & Global Markets',
      subtitle: 'International funnels, qualification & paid growth',
      description: 'Test international markets, qualify suitable prospects, and use AI to support—rather than blindly automate—responsible paid-growth workflows.',
      lessons: {
        '15.1': {
          stageTitle: '15. AI-Assisted Scaling & Global Markets', title: 'Multilingual localisation & global market testing',
          description: 'Use AI-assisted translation and human review to adapt funnels, emails and landing pages for selected international audiences.',
          learnContent: {
            videoTitle: 'International expansion through responsible localisation',
            summaryText: 'A translation can open a market test, but successful localisation also requires cultural, legal, commercial and linguistic validation.',
            bulletPoints: ['Select one promising market using evidence instead of assumed audience multiples', 'Use AI for a first draft, then review meaning, tone, terminology and claims with a proficient human', 'Adapt currency, examples, support, consent, taxes and consumer information to the target market'],
            fullArticleGuide: `### International growth is a validation process

AI can reduce the time needed to prepare a localised draft, but it does not remove language risk, cultural differences, local law, customer support needs or product-market fit.

#### A practical market-entry sequence

1. **Choose one market**: Study demand, competition, acquisition cost, purchasing power, payment preferences and your ability to serve customers there.
2. **Localise the complete journey**: Adapt the message, examples, units, currencies, dates, forms, emails, checkout, support and legal information—not only the headline.
3. **Review quality**: Have a proficient person check meaning, brand voice, idioms, sensitive wording and factual claims. Back-translation can reveal important errors.
4. **Run a limited test**: Start with a small audience and measure qualified leads, conversion, refunds, support demand and customer feedback by language.
5. **Improve before expanding**: Fix the largest verified problem before adding another language or increasing spend.

AI output requires human accountability. Never publish invented testimonials, inaccurate guarantees or untranslated legal and checkout elements.`,
            practicalExamples: ['Switch the GOM-MAR landing-page and Academy language, then test the complete path with a proficient English- or Polish-speaking reviewer before sending campaign traffic.'],
          },
          understandContent: { coreTakeaway: 'International growth comes from careful localisation and market validation, not translation alone.', keyPrinciples: ['Validate one market at a time', 'Use qualified human review for customer-facing content'] },
          actionTask: { instruction: 'Test and review the language switch and one complete localised user journey:', placeholder: 'Localised journey reviewed' },
        },
        '15.2': {
          stageTitle: '15. AI-Assisted Scaling & Global Markets', title: 'Higher-value offers & responsible qualification',
          description: 'Build a transparent qualification and booking flow for coaching, agency or consulting offers that genuinely match the prospect’s needs.',
          learnContent: {
            videoTitle: 'Higher-value offers: fit before automation',
            summaryText: 'Forms and scheduling can organise enquiries, but a higher price does not guarantee higher profit, easier delivery or suitable customers.',
            bulletPoints: ['Ask only necessary questions about goals, context, timing and fit', 'Use AI to summarise information—not to make opaque eligibility decisions', 'Explain scope, price, requirements, limitations and the purpose of the call before booking'],
            fullArticleGuide: `### The purpose of a qualification funnel

Qualification should help both parties decide whether a conversation is useful. It must not manipulate people, discriminate unlawfully or present an automated score as professional judgement.

#### A responsible qualification chain

1. **Clear offer page**: Describe the intended customer, scope, price or price range, delivery format, exclusions and realistic outcomes.
2. **Short enquiry form**: Ask a small number of relevant questions. Avoid sensitive personal data unless it is necessary, lawful and properly protected.
3. **Human-owned review**: AI may structure or summarise answers, but a responsible person should validate consequential decisions and provide a contact route.
4. **Booking and preparation**: Offer suitable prospects a genuine consultation slot and explain duration, participants, preparation and cancellation terms.
5. **Honest sales conversation**: Diagnose needs, disclose limitations and recommend against purchase when the offer is not a good fit.

Revenue per sale is not profit. Include fulfilment time, support, refunds, acquisition costs, taxes and capacity before deciding that a higher-value offer is commercially better.`,
            practicalExamples: ['Use Mara to draft five neutral qualification questions, then remove unnecessary or sensitive fields and define a documented human-review step.'],
          },
          understandContent: { coreTakeaway: 'Good qualification protects prospects and delivery quality by establishing genuine fit before a sales conversation.', keyPrinciples: ['Collect only information needed for fit', 'Keep consequential decisions explainable and human-owned'] },
          actionTask: { instruction: 'Create and review a transparent qualification script with Mara:', placeholder: 'Qualification script reviewed' },
        },
        '15.3': {
          stageTitle: '15. AI-Assisted Scaling & Global Markets', title: 'Measured traffic scaling & AI-assisted advertising',
          description: 'Use AI to develop ad variants, then control claims, consent, measurement, budgets and optimisation with human oversight.',
          learnContent: {
            videoTitle: 'Paid growth: controlled experiments instead of autopilot',
            summaryText: 'AI can accelerate creative drafts and analysis, but no platform, campaign or model can guarantee conversions, profitable traffic or a maximum ROAS.',
            bulletPoints: ['Create distinct, policy-compliant concepts and verify every factual or performance claim', 'Test one meaningful variable at a time with a defined budget and decision rule', 'Assess contribution margin, refunds and lead quality—not ROAS in isolation'],
            fullArticleGuide: `### A controlled approach to paid traffic

Paid advertising buys opportunities to reach an audience; it does not create predictable customers by itself. Results depend on the offer, audience, creative, landing page, tracking quality, competition and fulfilment.

#### Five parts of a useful experiment

1. **Define the objective**: Choose a business outcome and the event that validly represents it.
2. **Build truthful variants**: Use AI for ideas and drafts, then verify claims, assets, rights, disclosures and platform-policy compliance.
3. **Align the journey**: The ad and landing page should describe the same offer without hidden conditions or misleading urgency.
4. **Set guardrails**: Define the test budget, duration, minimum evidence, stop conditions and who may approve changes.
5. **Evaluate business value**: Review tracking limitations, qualified conversions, acquisition cost, contribution margin, refunds, retention and support load.

Scale gradually only when results remain credible after costs. Do not let an AI system independently change budgets, targeting or claims without limits, logging and accountable human review.`,
            practicalExamples: ['Generate five clearly different ad-hook drafts, verify every claim, select two for a limited test and document the budget, metric and stop rule before launch.'],
          },
          understandContent: { coreTakeaway: 'Paid growth becomes more manageable through truthful creative, controlled testing and complete unit economics—not through an autopilot promise.', keyPrinciples: ['Use budget and policy guardrails', 'Scale only verified contribution, not headline ROAS'] },
          actionTask: { instruction: 'Complete the scaling module and confirm your controlled growth plan:', checklistItems: ['I can validate one international market and localised journey at a time', 'I can build a transparent, human-reviewed qualification flow', 'I can define a limited paid-ad experiment with claims, budget and stop controls'] },
        },
      },
    },
    16: {
      title: '16. AI Automation, Processes & Reliable Operations',
      subtitle: 'Efficient workflows with controls and accountable oversight',
      description: 'Connect CRM, email, payment and AI services through observable workflows that fail safely and keep consequential actions under human control.',
      lessons: {
        '16.1': {
          stageTitle: '16. AI Automation, Processes & Reliable Operations', title: 'Integrated workflows & secure webhooks',
          description: 'Connect lead sources, email, CRM and payment services while validating data, authenticating events and handling failures safely.',
          learnContent: {
            videoTitle: 'Workflow automation: integrations, webhooks and safeguards',
            summaryText: 'Automations reduce repetitive work, but reliable data flow requires authentication, validation, idempotency, monitoring and a recovery path.',
            bulletPoints: ['Authenticate webhook senders and grant each integration only the permissions it needs', 'Validate, minimise and map incoming data before using it', 'Prevent duplicate actions and route failed events to logs, alerts and controlled retries'],
            fullArticleGuide: `### Build automation that can be trusted

No workflow is permanently error-free. Providers time out, payloads change, users submit duplicate forms and credentials expire. A production workflow must detect and contain these failures.

#### A safe event lifecycle

1. **Trigger**: Receive an event through an authenticated connection. Verify the signature, timestamp and expected source.
2. **Validate and minimise**: Check the schema, required fields and consent state. Reject malformed input and retain only necessary data.
3. **Deduplicate**: Use a stable event or transaction identifier so a retry cannot send duplicate emails, invoices or access grants.
4. **Execute with limits**: Apply least-privilege credentials, timeouts, rate limits and bounded retries with backoff.
5. **Observe and recover**: Record non-sensitive operational logs, alert on failures, quarantine unresolved events and document manual replay or rollback.

Payment, refunds, account deletion, public publishing and large sends should use explicit approval or stronger controls. Never place secrets in source code, browser-visible variables or logs.`,
            practicalExamples: ['Test a GOM-MAR lead workflow with a valid event, a duplicate event and a deliberately invalid payload; verify that each produces the expected safe outcome.'],
          },
          understandContent: { coreTakeaway: 'Reliable automation assumes failures will occur and makes them visible, limited and recoverable.', keyPrinciples: ['Authenticate, validate and deduplicate every event', 'Use bounded retries, alerts and recovery procedures'] },
          actionTask: { instruction: 'Review active GOM-MAR automation triggers and their failure controls:', placeholder: 'Automation controls reviewed' },
        },
        '16.2': {
          stageTitle: '16. AI Automation, Processes & Reliable Operations', title: 'AI-assisted customer support & safe escalation',
          description: 'Use AI for approved FAQs, classification and drafting while preserving privacy, honest disclosure and dependable access to a person.',
          learnContent: {
            videoTitle: 'Support automation with boundaries and human handoff',
            summaryText: 'AI can speed up routine support, but resolution rates vary and sensitive, uncertain or consequential cases need trained human review.',
            bulletPoints: ['Ground answers in an approved, versioned knowledge base and show when information was last reviewed', 'Minimise personal data and restrict access to tickets and conversation history', 'Escalate uncertainty, complaints, payments, safety, privacy and account-access cases to a person'],
            fullArticleGuide: `### Design support around customer safety

An AI assistant should clearly identify itself, describe its limits and provide a visible route to human help. Do not promise 24/7 resolution merely because an automated reply is always available.

#### A responsible support workflow

* **Curated knowledge**: Use approved FAQs, product instructions and policies with owners, review dates and source links.
* **Constrained answers**: Require the assistant to say when it is uncertain and prevent invented policies, refunds, legal conclusions or account changes.
* **Data protection**: Avoid requesting passwords, full payment credentials or unnecessary sensitive information. Redact logs and define retention.
* **Risk-based escalation**: Immediately hand off security, privacy, billing disputes, vulnerable customers, threats, repeated failures and low-confidence answers.
* **Quality review**: Sample conversations, measure correct resolution and escalation—not only response speed—and provide a correction channel.

Automated password resets must use the product’s secure identity flow; a chatbot should never bypass authentication or reveal account data.`,
            practicalExamples: ['Use Mara to draft five FAQ responses, attach an approved source to each, add an uncertainty response and define exactly when a human ticket is created.'],
          },
          understandContent: { coreTakeaway: 'Useful AI support combines fast routine assistance with privacy safeguards, honest limits and reliable human escalation.', keyPrinciples: ['Ground responses in reviewed sources', 'Escalate sensitive or uncertain cases'] },
          actionTask: { instruction: 'Create and review sourced FAQ answers and escalation rules with Mara:', placeholder: 'FAQ and escalation rules reviewed' },
        },
        '16.3': {
          stageTitle: '16. AI Automation, Processes & Reliable Operations', title: 'An operational control system—not a business autopilot',
          description: 'Combine automations into a manageable operating system with ownership, dashboards, approval gates and regular maintenance.',
          learnContent: {
            videoTitle: 'From repetitive operations to supervised systems',
            summaryText: 'Automation can reduce manual effort, but a business still needs accountable decisions, customer care, security updates, financial control and incident response.',
            bulletPoints: ['Assign an owner, purpose, permissions and recovery procedure to every critical workflow', 'Monitor customer outcomes, failures, costs and security—not only marketing KPIs', 'Schedule reviews for credentials, vendors, knowledge, consent, backups and approval rules'],
            fullArticleGuide: `### Your goal: a supervised and resilient operating system

The useful version of “autopilot” is not an unattended business. It is a set of documented routines that handle low-risk repetition while people retain responsibility for strategy and consequential decisions.

#### Weekly operational review

1. **Customer journey**: Check delivery, access, support, complaints, refunds and accessibility problems.
2. **Workflow health**: Review failures, retries, duplicates, queue age, provider status and unusual volume.
3. **Marketing and economics**: Examine qualified outcomes, consent, campaign spend, contribution margin and misleading or outdated content.
4. **Security and privacy**: Review access changes, suspicious events, secret expiry, processor issues and deletion or rights requests.
5. **Improvement decision**: Select one verified bottleneck, assign an owner and test a bounded change with rollback criteria.

Maintain an incident contact list, backups, restoration tests and a manual fallback for critical customer processes. Automation changes the work; it does not remove accountability.`,
            practicalExamples: ['Create a one-page register listing each critical automation, owner, data used, credentials, failure alert, approval requirement and recovery procedure.'],
          },
          understandContent: { coreTakeaway: 'Sustainable automation reduces repetition while keeping ownership, oversight and recovery firmly in place.', keyPrinciples: ['Automate low-risk repetition, not accountability', 'Review and test critical systems regularly'] },
          actionTask: { instruction: 'Complete the operations module and confirm your control foundations:', checklistItems: ['I can secure, validate, deduplicate and monitor webhook workflows', 'I can define grounded AI support with reliable human escalation', 'Every critical automation has an owner, controls and a recovery path'] },
        },
      },
    },
    17: {
      title: '17. Omnichannel Marketing & Responsible AI Media',
      subtitle: 'Video, audio and channel-specific content systems',
      description: 'Create and repurpose AI-assisted video and audio while protecting rights, consent, authenticity and quality on every channel.',
      lessons: {
        '17.1': {
          stageTitle: '17. Omnichannel Marketing & Responsible AI Media', title: 'AI video & faceless short-form content',
          description: 'Produce useful short videos without appearing on camera, while respecting media rights, platform rules and truthful representation.',
          learnContent: {
            videoTitle: 'Faceless short video: clear value without viral promises',
            summaryText: 'Short-form video can test ideas and reach new viewers, but AI, hooks and frequent posting cannot guarantee views, leads or virality.',
            bulletPoints: ['Use footage, images, music, fonts, avatars and voices only with suitable rights or licences', 'Write a clear opening, one useful idea and an honest next step', 'Review captions, pronunciation, accessibility, factual claims and required AI disclosure before publishing'],
            fullArticleGuide: `### Build useful faceless short-form content

You do not need to show your face, but you remain responsible for every generated image, voice, claim and call to action. Synthetic presenters must not impersonate real people or mislead viewers about endorsements or events.

#### A practical short-video structure

1. **Opening**: State the relevant problem or outcome quickly without sensational guarantees.
2. **Value**: Explain one actionable idea with accurate examples and readable captions.
3. **Context**: Mention important limitations, eligibility or evidence when the topic requires it.
4. **Next step**: Offer a clear, proportionate action that matches the linked page.
5. **Quality and rights check**: Confirm licences, consent, platform disclosure, audio levels, captions, spelling, links and mobile rendering.

Keep proof of licences and consent. Do not clone a person’s appearance or voice, fabricate testimonials, conceal sponsorships or present generated scenes as real evidence.`,
            practicalExamples: ['Generate three hook drafts with Mara, choose the clearest one, verify every claim and asset, then publish a limited test without promising a viral result.'],
          },
          understandContent: { coreTakeaway: 'Faceless content succeeds through useful ideas, lawful assets, honest presentation and consistent testing—not guaranteed virality.', keyPrinciples: ['Verify rights, claims and disclosures', 'Optimise for viewer value and accessibility'] },
          actionTask: { instruction: 'Create and review short-video hooks with Mara:', placeholder: 'Video hooks reviewed' },
        },
        '17.2': {
          stageTitle: '17. Omnichannel Marketing & Responsible AI Media', title: 'Voice cloning, podcasts & audio marketing',
          description: 'Create accessible audio and podcasts using voices you are authorised to use and a review process that prevents impersonation and misinformation.',
          learnContent: {
            videoTitle: 'AI audio: consent, quality and accountable publishing',
            summaryText: 'AI can turn approved scripts into audio, but voice cloning requires explicit informed permission, secure source recordings and clear limits on use.',
            bulletPoints: ['Clone only your own voice or a voice covered by explicit, documented permission and tool terms', 'Disclose synthetic or materially altered audio where required or where listeners could otherwise be misled', 'Review pronunciation, facts, music rights, loudness, metadata, transcript and distribution settings'],
            fullArticleGuide: `### Build trust with responsible audio

Audio can be convenient and personal, but a realistic synthetic voice can also enable fraud or impersonation. Consent to record someone is not automatically consent to clone, edit, publish or reuse their voice for every purpose.

#### A safe AI-audio workflow

1. **Rights and consent**: Document whose voice and script are used, permitted purposes, channels, duration, compensation and withdrawal process.
2. **Approved script**: Check facts, names, advertisements, quotations, sensitive claims and calls to action before generation.
3. **Generate securely**: Protect source recordings and model access; do not upload confidential material to an unapproved provider.
4. **Human listening review**: Check meaning, pronunciation, tone, artefacts, accessibility and whether disclosure is needed.
5. **Publish deliberately**: Add accurate title, description, transcript, credits and advertising labels; verify platform and music licences before syndication.

An audio player may improve accessibility for some visitors, but it does not guarantee longer visits or more conversions. Measure actual use and keep a text alternative.`,
            practicalExamples: ['Plan an audio introduction using your own authorised voice or a licensed synthetic voice, add a transcript and disclosure, and review it fully before embedding it.'],
          },
          understandContent: { coreTakeaway: 'Responsible AI audio combines documented voice rights, secure handling, transparent presentation and human review.', keyPrinciples: ['Obtain specific permission before voice cloning', 'Provide disclosure and an accessible transcript'] },
          actionTask: { instruction: 'Plan and review an authorised audio introduction in the Content Editor:', placeholder: 'Audio concept reviewed' },
        },
        '17.3': {
          stageTitle: '17. Omnichannel Marketing & Responsible AI Media', title: 'Channel-specific content repurposing',
          description: 'Transform one verified source into selected formats while adapting context, rights, accessibility and calls to action for each channel.',
          learnContent: {
            videoTitle: 'Content repurposing: one source, carefully adapted outputs',
            summaryText: 'Repurposing can reduce drafting time, but copying one message everywhere often produces weak, repetitive or non-compliant content.',
            bulletPoints: ['Start from a reviewed source with clear claims, ownership and purpose', 'Choose formats based on audience behaviour rather than an arbitrary “one-to-ten” quota', 'Review every output for channel conventions, media rights, accessibility, links and current information'],
            fullArticleGuide: `### A controlled omnichannel workflow

Use one strong source as the factual anchor, then create only the formats that serve a defined audience and objective.

#### Repurposing sequence

1. **Approve the source**: Verify facts, dates, permissions, disclosures and the primary message.
2. **Select channels**: Choose channels you can maintain and where the intended audience is demonstrably active.
3. **Adapt—not copy**: Rewrite length, opening, visual framing, metadata, accessibility and call to action for each format.
4. **Run channel QA**: Preview the actual post, check crops, captions, alt text, links, tags, audio, legal labels and scheduling time.
5. **Publish with controls**: Use approval states, least-privilege connections, duplicate prevention, failure alerts and a pause mechanism.
6. **Learn from outcomes**: Compare meaningful engagement, qualified actions, complaints and production effort; retire formats that do not justify maintenance.

More posts do not automatically create more presence. Coherent, useful and well-maintained content is more valuable than maximum volume.`,
            practicalExamples: ['Use GOM-MAR to turn one reviewed message into three chosen formats, then complete a separate preview and rights check for each channel.'],
          },
          understandContent: { coreTakeaway: 'Effective omnichannel publishing preserves a verified core while adapting each output to its audience, channel and risks.', keyPrinciples: ['Repurpose selectively from an approved source', 'Require channel-specific review before publishing'] },
          actionTask: { instruction: 'Complete the omnichannel module and confirm your media controls:', checklistItems: ['I can produce faceless video without misleading viewers or violating media rights', 'I understand consent, disclosure and review for AI-generated audio', 'I can repurpose content with channel-specific quality and publishing controls'] },
        },
      },
    },
    18: {
      title: '18. AI Agents, Governed Systems & Enterprise Readiness',
      subtitle: 'Bounded agent workflows with accountable human control',
      description: 'Design single- and multi-agent workflows with explicit permissions, budgets, approvals, evidence, monitoring and safe termination.',
      lessons: {
        '18.1': {
          stageTitle: '18. AI Agents, Governed Systems & Enterprise Readiness', title: 'Bounded AI agents & task execution',
          description: 'Understand how agents plan and use tools while keeping their goals, data, permissions, spending and stopping conditions constrained.',
          learnContent: {
            videoTitle: 'AI agents: useful autonomy within defined limits',
            summaryText: 'An agent can decompose work and call tools, but it may still misunderstand objectives, use unreliable information or take unintended actions. Self-review is not independent validation.',
            bulletPoints: ['Define the goal, permitted tools, data sources, budget, time and deliverable before execution', 'Require approval for external messages, purchases, publishing, deletion, permissions and sensitive-data access', 'Record tool calls and outputs, cap loops and costs, and provide pause, cancel and rollback paths'],
            fullArticleGuide: `### From a prompt to a governed agent task

Treat an agent as fallible software operating under delegated authority—not as an employee who can safely improvise without supervision.

#### A controlled execution cycle

1. **Specify**: Define the task, success criteria, prohibited actions, approved sources and data classification.
2. **Constrain**: Grant temporary least-privilege tools, a spending and time limit, a maximum number of steps and a restricted working area.
3. **Plan and inspect**: Let the agent propose steps, but require approval before consequential or irreversible actions.
4. **Execute observably**: Log tool calls, decisions, costs, errors and produced artefacts without exposing secrets or unnecessary personal data.
5. **Validate independently**: Check citations, calculations, files and real-world state with tests or an accountable reviewer. Do not accept the agent’s own confidence as proof.
6. **Stop safely**: End on success, uncertainty, repeated failure, limit breach or human cancellation; preserve enough state for review and recovery.

Begin with read-only, reversible tasks. Expand authority only after measured reliability and a documented risk review.`,
            practicalExamples: ['Ask Mara to research a narrowly defined content topic using approved sources and a fixed step limit; require a cited draft for review rather than automatic publication.'],
          },
          understandContent: { coreTakeaway: 'Agentic work is useful when authority is limited, execution is observable and outcomes are independently verified.', keyPrinciples: ['Grant minimum necessary authority', 'Require approval and independent validation'] },
          actionTask: { instruction: 'Run and review a bounded AI-agent task with Mara:', placeholder: 'Bounded agent task reviewed' },
        },
        '18.2': {
          stageTitle: '18. AI Agents, Governed Systems & Enterprise Readiness', title: 'Multi-agent orchestration & control',
          description: 'Coordinate specialised agent roles through typed handoffs, shared evidence and one accountable approval chain.',
          learnContent: {
            videoTitle: 'Multi-agent workflows: orchestration without multiplied risk',
            summaryText: 'Additional agents can separate roles, but they also add cost, latency, duplicated errors and new attack surfaces. They do not guarantee tenfold productivity or constant quality.',
            bulletPoints: ['Use multiple agents only where role separation produces measurable value', 'Define structured inputs, outputs, evidence and ownership for every handoff', 'Keep shared memory minimal, protect secrets and place human approval before external action'],
            fullArticleGuide: `### Design the smallest system that solves the task

A multi-agent workflow is appropriate when distinct roles, permissions or evaluation methods genuinely improve the process. For many tasks, one constrained agent plus a reviewer is simpler and safer.

#### A governed role pattern

* **Research role**: May read approved sources and return claims with citations; it cannot publish or contact people.
* **Drafting role**: Uses the approved brief and evidence; it cannot invent facts or expand the task scope.
* **Review role**: Checks the output against an explicit rubric, but does not certify legal, privacy or factual compliance by itself.
* **Human owner**: Resolves conflicts, checks material claims and approves publishing, spending, access changes and customer-facing actions.

Use structured handoffs, unique run identifiers, provenance, versioned prompts and isolated credentials. Prevent agents from passing untrusted instructions as commands. Set a total budget and stop the workflow when agents loop, disagree materially or lose required evidence.`,
            practicalExamples: ['Configure a research-to-draft-to-review workflow for one campaign brief, then inspect every handoff, citation, cost and permission before approving any output.'],
          },
          understandContent: { coreTakeaway: 'Multi-agent systems help only when clear role separation outweighs their additional complexity, cost and risk.', keyPrinciples: ['Prefer the smallest sufficient architecture', 'Control every handoff and external action'] },
          actionTask: { instruction: 'Configure and review a governed multi-agent brief in the AI Dashboard:', placeholder: 'Multi-agent brief reviewed' },
        },
        '18.3': {
          stageTitle: '18. AI Agents, Governed Systems & Enterprise Readiness', title: 'Enterprise readiness review & Academy certificate',
          description: 'Complete an evidence-based review of your AI operating controls and document completion of this Academy stage.',
          learnContent: {
            videoTitle: 'Enterprise readiness: evidence before scale',
            summaryText: 'Completing the lessons is a learning milestone. It does not prove enterprise-grade security, regulatory compliance, market leadership or membership in a top percentile.',
            bulletPoints: ['Inventory agent owners, purposes, data, vendors, permissions and critical dependencies', 'Test approvals, incident response, audit logs, backups, termination and manual fallback', 'Document Academy completion separately from professional accreditation or external certification'],
            fullArticleGuide: `### Turn learning into a readiness plan

Enterprise readiness is demonstrated through governance, evidence and repeated operational testing—not through a label or fully autonomous setup.

#### Final control review

1. **Ownership and inventory**: Record every material model, agent, integration, data source, processor and responsible owner.
2. **Risk and access**: Classify use cases, minimise data, review permissions and prohibit agent access to secrets or systems it does not need.
3. **Evaluation**: Maintain representative tests for accuracy, safety, bias, security, cost and task completion before and after changes.
4. **Operations**: Monitor production, log decisions, handle incidents, rotate credentials, test backups and maintain manual alternatives.
5. **Change and retirement**: Version prompts and models, approve releases, track dependencies and define how a system can be disabled and its data removed.

The GOM-MAR certificate records completion of defined Academy requirements. It is not a government-recognised qualification, regulated professional licence, security audit, compliance opinion or guarantee of commercial results.`,
            practicalExamples: ['Download the certificate only after completing the required lessons and control checklist, and describe it accurately as an Academy completion credential.'],
          },
          understandContent: { coreTakeaway: 'Enterprise readiness requires accountable governance and tested evidence; a course certificate documents learning completion only.', keyPrinciples: ['Validate controls with evidence and recurring tests', 'Describe credentials accurately without inflated status claims'] },
          actionTask: { instruction: 'Complete the agent-systems review and confirm the meaning of the certificate:', checklistItems: ['I can bound agent tools, data, budget, steps and stopping conditions', 'I can govern multi-agent handoffs and critical approvals', 'I understand that Academy completion is not external accreditation or proof of enterprise compliance'] },
        },
      },
    },
    19: {
      title: '19. Data Analytics, Experimentation & AI Insights',
      subtitle: 'Evidence-based improvement with uncertainty and privacy controls',
      description: 'Measure funnels, run valid experiments and use cautious forecasts while protecting consent, data quality and customer interests.',
      lessons: {
        '19.1': {
          stageTitle: '19. Data Analytics, Experimentation & AI Insights', title: 'A/B testing & conversion measurement',
          description: 'Test a clear hypothesis with trustworthy events, a pre-defined analysis plan and enough evidence for the decision at hand.',
          learnContent: {
            videoTitle: 'Conversion experiments: learn without promising uplift',
            summaryText: 'An A/B test estimates an effect under uncertainty. It does not turn assumptions into permanent facts or guarantee more sales.',
            bulletPoints: ['Define the population, primary metric, minimum meaningful effect, duration and stopping rule before launch', 'Assign users consistently and check tracking, consent, sample-ratio mismatch and cross-device contamination', 'Report effect size and uncertainty, not only a significance label or the variant with the larger raw number'],
            fullArticleGuide: `### A disciplined A/B-testing cycle

A fixed rule such as “100 conversions” is not a universal sample-size requirement. Required evidence depends on baseline rate, minimum effect worth detecting, variability, desired error rates, allocation and test design.

#### Practical sequence

1. **State the hypothesis**: Describe one change, the expected mechanism, the primary outcome and why the effect would matter commercially or for users.
2. **Prepare measurement**: Validate event definitions, consent state, bot filtering, internal traffic, attribution and stable user assignment.
3. **Plan before looking**: Choose the analysis method, sample-size calculation, duration, exclusions and stopping rule. Account for multiple metrics or repeated checking.
4. **Run without interference**: Avoid changing the experience, audience or campaign mix mid-test unless the test is stopped and documented.
5. **Interpret cautiously**: Review effect size, confidence or credible interval, practical value, segments, data loss and possible novelty or seasonal effects.
6. **Decide and document**: Adopt, reject or retest the change and preserve the hypothesis, setup, result and limitations.

Experiments can reveal evidence for a specific context. Results may not generalise to another audience, season, channel or page.`,
            practicalExamples: ['Use the GOM-MAR dashboard to identify one measurable bottleneck, then write the hypothesis and decision rule before creating a variant.'],
          },
          understandContent: { coreTakeaway: 'A useful experiment combines reliable measurement, a pre-committed plan and an honest account of uncertainty.', keyPrinciples: ['Calculate evidence needs for the actual test', 'Judge effect size and practical value, not significance alone'] },
          actionTask: { instruction: 'Review current metrics and prepare one test plan in the Analytics Dashboard:', placeholder: 'Metrics and test plan reviewed' },
        },
        '19.2': {
          stageTitle: '19. Data Analytics, Experimentation & AI Insights', title: 'Funnel analysis & decision-ready KPIs',
          description: 'Analyse journey drop-off, acquisition cost, contribution margin and customer value with definitions that match your business.',
          learnContent: {
            videoTitle: 'Funnel analytics: metrics in context',
            summaryText: 'KPIs are useful only when their definitions, data sources, time windows and limitations are clear. Universal targets for opt-in rate, CTR or ROAS do not exist.',
            bulletPoints: ['Document the numerator, denominator, time window, cohort, currency and source for every KPI', 'Segment carefully by channel, campaign, device and customer type without over-interpreting small groups', 'Connect marketing metrics to contribution margin, refunds, retention, cash timing and operational capacity'],
            fullArticleGuide: `### Build a funnel view you can act on

Benchmarks such as 30% opt-in, 15% click-through or ROAS above 2 may be irrelevant or harmful without context. Performance varies by offer, audience, traffic intent, attribution, margin and measurement method.

#### Core measures and caveats

* **Conversion rate**: Completed target actions divided by eligible opportunities. Define eligibility and remove invalid traffic consistently.
* **Email click rate**: Clicks may be measured against delivered messages, recipients or opens; privacy features and automated scanners can distort activity.
* **CAC**: Include the acquisition costs relevant to the decision, not only ad spend. State whether it measures a new customer, first order or qualified lead.
* **ROAS**: Revenue attributed to ads divided by ad spend. It excludes many costs and is not profit.
* **Contribution and payback**: Subtract variable fulfilment, fees, refunds and support, then assess how long acquisition cash takes to return.
* **LTV**: Use a clearly defined cohort and horizon; distinguish observed value from a modelled forecast.

Prioritise a bottleneck only after confirming it is real, material and within your control. Improvement is possible, but doubling profit is never guaranteed.`,
            practicalExamples: ['Ask Mara to organise your metric definitions and surface missing inputs, then verify every number against the source system before acting.'],
          },
          understandContent: { coreTakeaway: 'Decision-ready KPIs use consistent definitions and connect customer behaviour to real economics and uncertainty.', keyPrinciples: ['Define every metric before comparing it', 'Optimise contribution and customer outcomes, not vanity ratios'] },
          actionTask: { instruction: 'Run a documented funnel review with Mara and verify it against source data:', placeholder: 'Funnel review verified' },
        },
        '19.3': {
          stageTitle: '19. Data Analytics, Experimentation & AI Insights', title: 'Predictive analytics & responsible customer-value modelling',
          description: 'Estimate future customer outcomes cautiously and use models to support fair, consent-aware decisions rather than automated pressure.',
          learnContent: {
            videoTitle: 'Predictive analytics: forecasts are estimates, not certainty',
            summaryText: 'AI models can estimate churn or future value only when data, labels and assumptions are suitable. Predictions can be wrong, drift over time and affect groups unevenly.',
            bulletPoints: ['Separate observed historical value from forecast LTV and publish the horizon and uncertainty', 'Use only lawful, necessary and sufficiently representative behavioural data', 'Validate accuracy, calibration, drift and group impacts before any automated action'],
            fullArticleGuide: `### Use customer forecasts as decision support

A prediction is not knowledge of an individual’s intent. Opens, clicks and course progress can be incomplete, privacy-sensitive or distorted by technical systems.

#### Responsible modelling workflow

1. **Define the decision**: Specify what action the forecast may influence and whether a simpler cohort analysis is sufficient.
2. **Check lawful data use**: Confirm purpose, legal basis, consent where required, data minimisation, retention and customer information.
3. **Prepare data carefully**: Assess missingness, leakage, changing definitions, selection bias and whether the target outcome is meaningful.
4. **Validate out of sample**: Compare against a simple baseline and measure discrimination, calibration, error by relevant group and financial consequences.
5. **Deploy with limits**: Use thresholds, frequency caps, suppression lists, human review and a route for customers to object or seek help where applicable.
6. **Monitor and retire**: Watch drift, complaints, false positives, cost and incremental benefit; pause the model when evidence degrades.

Never use a predicted score to exploit vulnerability, hide opportunities, spam inactive contacts or claim the “perfect” purchase moment. Test whether an intervention helps customers and creates incremental value.`,
            practicalExamples: ['Review one dashboard recommendation, identify its data and assumptions, and approve no campaign action until the forecast is validated against a baseline and current cohort.'],
          },
          understandContent: { coreTakeaway: 'Forecasts are uncertain decision aids that require lawful data, strong validation, fairness checks and ongoing monitoring.', keyPrinciples: ['Distinguish observed value from predicted LTV', 'Keep customer interventions proportionate and reviewable'] },
          actionTask: { instruction: 'Complete the Analytics module and confirm your measurement controls:', checklistItems: ['I can plan an A/B test without a universal sample-size shortcut', 'I can define CAC, ROAS, contribution and LTV in business context', 'I can evaluate predictive insights for privacy, uncertainty, fairness and incremental value'] },
        },
      },
    },
    20: {
      title: '20. AI Ecosystems, Ethics & Sustainable Growth',
      subtitle: 'Adaptable systems, responsible AI and a credible completion milestone',
      description: 'Build a resilient digital operating foundation, govern AI responsibly and complete the first twenty Academy stages without promises of permanent prosperity or immunity from change.',
      lessons: {
        '20.1': {
          stageTitle: '20. AI Ecosystems, Ethics & Sustainable Growth', title: 'Responsible AI & transparency in marketing',
          description: 'Use AI with clear accountability, proportionate disclosure, privacy safeguards and evidence-based quality review.',
          learnContent: {
            videoTitle: 'Responsible AI: earning trust through accountable practice',
            summaryText: 'Transparency and human responsibility can support trust, but no ethics checklist makes a brand infallible or guarantees customer confidence.',
            bulletPoints: ['Tell people when automation or synthetic media materially affects their interaction or understanding', 'Verify claims, sources, rights, tone and potentially harmful effects before customer-facing use', 'Collect only necessary data and provide accessible human help, correction and objection routes'],
            fullArticleGuide: `### Make responsible AI an operating practice

Ethical marketing is not a one-time tone check. It requires defined ownership, evidence, safeguards and a willingness to stop or correct a system when it causes harm.

#### A practical review

1. **Purpose and necessity**: State the customer problem and determine whether AI is appropriate or a simpler process is safer.
2. **Transparency**: Explain meaningful automation, synthetic media, personalisation and data use in language the intended audience can understand.
3. **Truth and provenance**: Verify claims and sources; preserve permissions; do not fabricate people, testimonials, scarcity or outcomes.
4. **Privacy and fairness**: Minimise data, restrict access, review group impacts and avoid exploiting age, health, financial stress or other vulnerabilities.
5. **Human accountability**: Name an owner, create an escalation and correction route, log material decisions and test the system after changes.

Mara can assist with a review, but an AI cannot certify its own output as ethical, accurate, lawful or emotionally appropriate. The accountable publisher makes the final decision.`,
            practicalExamples: ['Use Mara to flag tone, unsupported claims and disclosure questions, then have the responsible person resolve each issue against evidence and the real campaign context.'],
          },
          understandContent: { coreTakeaway: 'Responsible AI marketing depends on truthful content, proportionate transparency, protected data and accountable human decisions.', keyPrinciples: ['Treat ethics as an ongoing control process', 'Give people clear information and meaningful recourse'] },
          actionTask: { instruction: 'Perform and document a human-owned tone, claims and AI-ethics review with Mara:', placeholder: 'Responsible AI review completed' },
        },
        '20.2': {
          stageTitle: '20. AI Ecosystems, Ethics & Sustainable Growth', title: 'Platform resilience, portability & recoverability',
          description: 'Reduce concentration risk with portable data, documented dependencies, tested backups and realistic migration plans.',
          learnContent: {
            videoTitle: 'Platform resilience: control without pretending independence',
            summaryText: 'A website, email list or community still depends on hosting, domains, email providers, processors, identity systems, law and deliverability. The goal is resilience, not complete independence.',
            bulletPoints: ['Inventory critical providers, data formats, contracts, credentials and single points of failure', 'Export only data you may lawfully retain and preserve consent, suppression and deletion status', 'Test encrypted backups, restoration, domain control, documented fallbacks and provider migration'],
            fullArticleGuide: `### Build a recoverable ecosystem

Customer data is not an untouchable asset that belongs to a business “100%”. People retain rights over their personal data, and its use remains limited by consent, law, contracts, security and the original purpose.

#### Resilience foundations

* **Direct channels**: Maintain permission-based contact routes, but respect withdrawals, objections, deletion and retention limits.
* **Portable content and data**: Use documented, common export formats and preserve field definitions, consent evidence and suppression lists.
* **Dependency register**: Record domains, DNS, hosting, email, payments, analytics, AI vendors, licences, owners and renewal dates.
* **Verified backups**: Encrypt backups, separate access, define retention and regularly restore a sample into a safe environment.
* **Migration plan**: Document how to replace a critical provider, rotate credentials, update integrations, notify customers and maintain a manual fallback.
* **Channel diversification**: Test a manageable mix of search, social, email, referral and partnership channels without duplicating risk or workload blindly.

No ecosystem is indestructible. Resilience comes from understanding dependencies and proving that recovery and migration actually work.`,
            practicalExamples: ['Export an authorised GOM-MAR dataset, store it securely, verify the consent and suppression fields, and perform a documented sample restoration instead of assuming the download is a usable backup.'],
          },
          understandContent: { coreTakeaway: 'Digital resilience comes from lawful portability, tested recovery and replaceable dependencies—not absolute ownership or platform independence.', keyPrinciples: ['Preserve rights and consent state during exports', 'Test restoration and migration regularly'] },
          actionTask: { instruction: 'Review and test your backup, dependency and migration strategy:', placeholder: 'Resilience plan tested' },
        },
        '20.3': {
          stageTitle: '20. AI Ecosystems, Ethics & Sustainable Growth', title: 'Twenty-stage review & GOM-MAR completion diploma',
          description: 'Review the first twenty Academy stages, document remaining gaps and recognise completion without inflated status or income claims.',
          learnContent: {
            videoTitle: 'A meaningful milestone—and the next review cycle',
            summaryText: 'Completing twenty stages demonstrates sustained learning. It does not prove that every feature is implemented, that a business is profitable or scalable, or that the learner is a market-leading performer.',
            bulletPoints: ['Review completed evidence, unresolved risks and the next responsible improvement', 'Unlock the GOM-MAR completion diploma when defined lesson and task requirements are met', 'Treat alumni access and duration according to the actual published programme terms'],
            fullArticleGuide: `### Congratulations on completing the twenty-stage milestone

You have explored a broad set of digital-marketing and AI topics. The lasting value now comes from applying the relevant parts carefully, measuring outcomes and maintaining the systems you actually use.

#### Your next operating cycle

1. **Review evidence**: List what is live, tested, documented and owned—and separate it from drafts, demonstrations and planned features.
2. **Close critical gaps**: Prioritise security, privacy, customer harm, billing, delivery and recovery before adding more automation.
3. **Choose one improvement**: Define a measurable customer or business outcome, a bounded test and a rollback rule.
4. **Maintain competence**: Revisit laws, provider policies, models, permissions, content and procedures as they change.
5. **Describe the milestone accurately**: Share the Academy diploma as evidence of completing stated requirements, not as proof of income, professional licensing, market rank or mastery of every system.

No course can guarantee durable wealth, business success or future-proof technology. Sustainable progress depends on market fit, execution, customer value, resources, risk management and continued learning.`,
            practicalExamples: ['Download the GOM-MAR diploma after the progress check confirms completion and accompany it with a truthful description of the skills and projects you actually completed.'],
          },
          understandContent: { coreTakeaway: 'The diploma marks completion of a structured learning stage; credible growth still requires evidence, maintenance and responsible execution.', keyPrinciples: ['Celebrate completion without overstating it', 'Continue reviewing, testing and improving'] },
          actionTask: { instruction: 'Complete Stage 20 and confirm your responsible completion review:', checklistItems: ['I understand accountable and transparent AI marketing', 'I have documented dependencies and tested a lawful backup or recovery path', 'I understand what the GOM-MAR completion diploma does and does not certify'] },
        },
      },
    },
  },
  pl: {
    1: {
      title: '1. Twój start',
      subtitle: '🟢 START',
      description: 'Jak działa dochód online? Jakie są możliwości i czego naprawdę potrzebujesz?',
      lessons: {
        '1.1': {
          stageTitle: 'Twój start',
          title: 'Jak działa dochód online?',
          description: 'Poznaj podstawy cyfrowej wartości, automatyzacji tworzenia wartości i skalowalności.',
          learnContent: {
            videoTitle: 'Wprowadzenie: fundament dochodu online',
            summaryText: 'Dochód online nie jest kwestią szczęścia ani magii. Powstaje, gdy rozwiązujesz istniejące problemy i łączysz osobę z potrzebą z odpowiednim rozwiązaniem.',
            bulletPoints: [
              'Podaż i popyt: ktoś szuka rozwiązania, a Ty polecasz odpowiedni produkt.',
              'Automatyzacja: Twój system może pracować przez całą dobę, także gdy śpisz.',
              'Niezależność od miejsca: laptop jest Twoim centrum działania.',
            ],
            fullArticleGuide: `### Podstawowe prawo dochodu online

Zarabianie w internecie nie jest tajemniczą sztuczką i nie wymaga wrodzonego talentu. Opiera się na uniwersalnej zasadzie: **tworzeniu wartości poprzez rozwiązywanie problemów**.

Gdy ktoś mierzy się z pilnym problemem—chce dodatkowego dochodu, lepszej kondycji, spokojniejszego snu albo sukcesu zawodowego—aktywnie szuka prostszej drogi. Jeśli dostarczysz lub polecisz odpowiednie rozwiązanie, możesz otrzymać wynagrodzenie za stworzoną wartość.

#### Trzy filary cyfrowej skalowalności

1. **Niskie koszty krańcowe**: Produkt cyfrowy lub strona rekomendacyjna wymaga jednorazowej pracy, a później może obsłużyć 10, 100 albo 10 000 osób jednocześnie.
2. **Zautomatyzowane procesy**: Nowoczesne systemy e-mail i sprzedaży cyfrowej komunikują się i dostarczają treści przez całą dobę, niezależnie od Twojego czasu pracy.
3. **Niezależność od miejsca**: Cała firma może działać z laptopa lub smartfona. Nie potrzebujesz lokalu, magazynu ani pracowników.

#### Twoja rola jako partnera afiliacyjnego

Nie musisz tworzyć własnego produktu. Jako partner afiliacyjny łączysz podaż z popytem. Polecasz sprawdzone produkty uznanych dostawców i otrzymujesz prowizję za każdą skuteczną sprzedaż—często od 30% do 70%.`,
            practicalExamples: ['Przykład dodatkowego dochodu: pracownik chce zarabiać dodatkowe 500 € miesięcznie. Polecasz mu sprawdzony program krok po kroku i otrzymujesz 50% prowizji.', 'Przykład automatyzacji: zainteresowana osoba zapisuje się na stronie o 23:00. System natychmiast wysyła poradnik i przedstawia ofertę partnerską. Sprzedaż może nastąpić, gdy śpisz.'],
            videoChapters: [
              { time: '0:00', title: 'Witamy w GOM-MAR Academy' },
              { time: '2:15', title: 'Zasada tworzenia wartości' },
              { time: '4:30', title: 'Dlaczego afiliacja jest dobra na start' },
              { time: '6:50', title: 'Podsumowanie i pierwsze zadanie' },
            ],
          },
          understandContent: {
            coreTakeaway: 'Nie musisz tworzyć własnego produktu—możesz polecać istniejące, sprawdzone rozwiązania w marketingu afiliacyjnym.',
            keyPrinciples: ['Skup się na rozwiązaniu problemu, nie na presji sprzedażowej', 'Prosty system jest lepszy niż skomplikowany chaos', 'Konsekwencja przez pierwsze 30 dni decyduje o postępie'],
          },
          actionTask: {
            instruction: 'Podejmij zobowiązanie: jaki cel chcesz osiągnąć w ciągu 90 dni?',
            placeholder: 'Wybierz swój główny cel…',
          },
        },
        '1.2': {
          stageTitle: 'Twój start',
          title: 'Jakie są możliwości?',
          description: 'Przegląd marketingu afiliacyjnego, produktów cyfrowych i automatycznych systemów rekomendacji.',
          learnContent: {
            videoTitle: 'Porównanie modeli: która droga pasuje do Ciebie?',
            summaryText: 'Istnieje wiele sposobów zarabiania online. Dla początkujących afiliacja jest najmniej ryzykowna: bez obsługi klienta, tworzenia produktu i logistyki.',
            bulletPoints: ['Marketing afiliacyjny: 30–70% prowizji od sprzedaży.', 'Własne produkty cyfrowe: wysoka marża, ale dużo przygotowań.', 'Usługi i coaching: szybszy przychód, ale zależny od Twojego czasu.'],
            fullArticleGuide: `### Najpopularniejsze modele biznesu online—porównanie

Początkujący często czują się przytłoczeni liczbą możliwości. Nie każdy model nadaje się jednak na start bez specjalistycznej wiedzy lub dużego kapitału.

#### 1. Marketing afiliacyjny—rekomendacja GOM-MAR
* **Jak działa**: Polecasz produkty innych dostawców przez osobisty link partnerski.
* **Zalety**: Bez tworzenia produktu, obsługi klienta i realizacji zamówień; możesz zacząć od razu, a produkty cyfrowe często oferują prowizje 30–70%.
* **Wada**: Nie budujesz przede wszystkim własnej marki produktowej—co na początku często jest zaletą.

#### 2. Własne produkty cyfrowe—e-booki i kursy wideo
* **Jak działa**: Tworzysz i sprzedajesz własne kursy lub poradniki.
* **Zalety**: Pełna kontrola nad cenami, ofertą i lejkiem oraz bardzo wysoka marża.
* **Wady**: Dużo czasu na tworzenie, aktualizacje i obsługę klienta.

#### 3. E-commerce i dropshipping
* **Jak działa**: Sprzedajesz fizyczne produkty w sklepie internetowym.
* **Zaleta**: Duży popyt na produkty fizyczne.
* **Wady**: Zwroty, opóźnienia, odprawa celna i marże wynoszące czasem tylko 10–20% zwiększają ryzyko.

#### Najlepszy punkt startowy

GOM-MAR Academy koncentruje się na **marketingu afiliacyjnym wspieranym przez automatyczną komunikację e-mail**. Łączy on niskie ryzyko z szybką drogą do pierwszego rzeczywistego przychodu online.`,
            practicalExamples: ['Afiliacja kontra sklep: w dropshippingu wymieniasz wadliwe produkty i odpowiadasz na reklamacje. W afiliacji te zadania przejmuje dostawca produktu.'],
            videoChapters: [{ time: '0:00', title: 'Przegląd cyfrowych modeli biznesowych' }, { time: '3:20', title: 'Marketing afiliacyjny w praktyce' }, { time: '6:45', title: 'Porównanie czasu i wyniku' }],
          },
          understandContent: { coreTakeaway: 'Marketing afiliacyjny to najszybsza i najbezpieczniejsza droga do pierwszego dodatkowego dochodu online.', keyPrinciples: ['Mniejsze ryzyko dzięki sprawdzonym procesom dostawcy', 'Natychmiastowy start bez rozbudowanej infrastruktury firmy', 'Skalowanie dzięki automatycznemu pozyskiwaniu kontaktów'] },
          actionTask: { instruction: 'Wybierz model, na którym skupimy się w GOM-MAR Academy.', checklistItems: ['Zaczynam od marketingu afiliacyjnego', 'Będę korzystać z automatycznej sprzedaży e-mail', 'Zbuduję prosty system krok po kroku'] },
        },
        '1.3': {
          stageTitle: 'Twój start',
          title: 'Czego naprawdę potrzebujesz?',
          description: 'Minimalny zestaw potrzebny do udanego startu bez zbędnego balastu.',
          learnContent: {
            videoTitle: 'Startowy system z trzech elementów',
            summaryText: 'Nie pozwól, by dziesiątki narzędzi marketingowych Cię rozpraszały. Na start potrzebujesz trzech rzeczy: landing page, autorespondera e-mail i oferty partnerskiej.',
            bulletPoints: ['1. Domena i landing page—Twoja cyfrowa wizytówka', '2. Autoresponder—automatyczny system sprzedaży e-mail', '3. Oferta partnerska—sprawdzony produkt z prowizją'],
            fullArticleGuide: `### Prosty system GOM-MAR z trzech elementów

Wielu początkujących gubi się w porównywaniu oprogramowania, programach graficznych i szczegółach technicznych. Tygodniami zmieniają ustawienia, nie kontaktując się z ani jedną zainteresowaną osobą.

Ograniczamy system do **absolutnego minimum**, które jest potrzebne do uzyskania mierzalnych wyników.

#### Element 1: Prosty landing page

Jedna strona, na której odwiedzający podaje adres e-mail, aby otrzymać przydatny bezpłatny poradnik. Bez zbędnych dodatków i dziesięciu podstron.

#### Element 2: Automatyczny autoresponder e-mail

Gdy ktoś się zapisze, automatyzacja przejmuje dalszą komunikację. Dostarcza poradnik, a w następnych dniach wysyła przygotowane wiadomości budujące zaufanie i zawierające linki rekomendacyjne.

#### Element 3: Sprawdzona oferta afiliacyjna

Przetestowany produkt z platformy takiej jak Digistore24 lub Copecart, który rozwiązuje realny problem grupy docelowej i zapewnia 30–70% prowizji od sprzedaży.

Wszystko ponadto—logo, wizytówki i skomplikowane lejki—jest na początku rozpraszaczem.`,
            practicalExamples: ['Minimalny system w praktyce: odwiedzający wpisuje e-mail na stronie → system automatycznie wysyła wiadomość powitalną i link rekomendacyjny → zainteresowany kupuje → otrzymujesz powiadomienie o prowizji.'],
          },
          understandContent: { coreTakeaway: 'Mniej znaczy więcej. Im prostszy jest Twój pierwszy system, tym szybciej możesz zarobić pierwsze euro.', keyPrinciples: ['Trzy podstawowe elementy wystarczą do budowy dodatkowego dochodu', 'GOM-MAR udostępnia automatyzację e-mail i narzędzia', 'Perfekcja jest wrogiem postępu'] },
          actionTask: { instruction: 'Potwierdź minimalną listę potrzebną do uruchomienia systemu.', checklistItems: ['Rozumiem: potrzebuję tylko trzech elementów', 'Jestem gotowy korzystać z automatyzacji e-mail GOM-MAR', 'Skupiam się na natychmiastowym wdrożeniu'] },
        },
        '1.4': {
          stageTitle: 'Twój start',
          title: 'Czego NIE potrzebujesz?',
          description: 'Uniknij pięciu najdroższych błędów i pożeraczy czasu początkujących.',
          learnContent: {
            videoTitle: 'Unikaj typowych pożeraczy czasu i pułapek',
            summaryText: 'Większość początkujących ponosi porażkę, ponieważ tygodniami projektuje logo, zajmuje się zbędną biurokracją albo szuka „idealnego” oprogramowania.',
            bulletPoints: ['❌ Na początku nie potrzebujesz drogiej infrastruktury firmy', '❌ Nie trać tygodni na idealne logo i kolory', '❌ Nie nagrywaj 100 filmów przed startem', '❌ Unikaj drogich narzędzi za 200 € miesięcznie'],
            fullArticleGuide: `### Pięć najdroższych pożeraczy czasu początkujących

Dlaczego niektórzy osiągają pierwszy przychód w ciągu 14 dni, a inni po sześciu miesiącach nadal stoją w miejscu? Różnicę często tworzą rzeczy, z których **świadomie rezygnujesz**.

#### 1. Perfekcjonizm przy logo i grafice

Nikt nie kupuje produktu dlatego, że logo jest zielone lub niebieskie. Na początku wystarczy czytelny tekst oraz prosty, profesjonalny wygląd.

#### 2. Skomplikowane abonamenty na oprogramowanie

Nie kupuj drogich platform „wszystko w jednym” za setki euro miesięcznie. Korzystaj ze zintegrowanych narzędzi GOM-MAR Academy, aby utrzymać koszty stałe blisko zera.

#### 3. Tworzenie 50 kont w mediach społecznościowych

Skup się na dokładnie **jednym** głównym źródle ruchu—na przykład grupach na Facebooku lub Instagram Reels—zamiast rozpraszać uwagę na dziesięć platform.

#### 4. Niekończące się poszukiwania bez działania—pułapka poradników

Wiedza bez działania nie przynosi dochodu. Poznaj tylko następny krok, od razu go wykonaj, a dopiero potem przejdź do kolejnej lekcji.`,
            practicalExamples: ['Przykład sukcesu: Marek nie ma logo ani wizytówek i używa prostego zdjęcia profilowego. Zdobywa 15 kontaktów tygodniowo i realizuje pierwsze sprzedaże. Inna osoba przez trzy tygodnie projektuje logo i nie zarabia nic.'],
          },
          understandContent: { coreTakeaway: 'Unikaj nadmiernego analizowania. Twoim głównym zadaniem jest kierowanie zainteresowanych osób na landing page.', keyPrinciples: ['Widoczność wygrywa z perfekcjonizmem', 'Najpierw zdobywaj kontakty, później ulepszaj', 'Korzystaj ze sprawdzonych inspiracji zamiast wymyślać wszystko od nowa'] },
          actionTask: {
            instruction: 'Usuń rozpraszacze: której pułapki będziesz od dziś świadomie unikać?',
            placeholder: 'Np. wielogodzinnego poprawiania logo lub kolorów…',
          },
        },
      },
    },
    2: {
      title: '2. Twój kierunek',
      subtitle: '🔵 FUNDAMENT',
      description: 'Znajdź niszę, określ grupę docelową, poznaj jej główny problem i wybierz odpowiednią ofertę.',
      lessons: {
        '2.1': {
          stageTitle: '2. Twój kierunek', title: 'Znajdź niszę',
          description: 'Znajdź dochodową niszę w jednym z trzech najsilniejszych rynków: zdrowie, finanse lub relacje.',
          learnContent: {
            videoTitle: 'Formuła rentowności Twojej niszy',
            summaryText: 'Produkt sprzedaje się, gdy ludzie już szukają rozwiązania i są gotowi za nie zapłacić. Trzy rynki evergreen zawsze mają aktywnych klientów.',
            bulletPoints: ['1. Finanse i dodatkowy dochód—zarabianie online, oszczędzanie i inwestowanie', '2. Zdrowie i sprawność—odchudzanie, siła, witalność i sen', '3. Relacje i rozwój osobisty—randki, partnerstwo i pewność siebie'],
            fullArticleGuide: `### Trzy wielkie rynki z trwałym popytem

Nisza jest precyzyjnie wybraną częścią większego rynku. Jeśli wybierzesz temat, którego nikt nie szuka, nawet dobry marketing nie pomoże. Zacznij tam, gdzie ludzie już wydają pieniądze.

#### Trzy rynki evergreen

1. **Finanse, kariera i dodatkowy dochód**
   * Tematy: biznes online, dochód pasywny, oszczędzanie, inwestowanie i rozwój kariery.
   * Dlaczego jest rentowny: ludzie inwestują, gdy rezultat może dać im więcej pieniędzy lub wolności.

2. **Zdrowie, sprawność i dobre samopoczucie**
   * Tematy: zdrowe odchudzanie, ból pleców, lepszy sen i budowanie siły po czterdziestce.
   * Dlaczego jest rentowny: zdrowie ma ogromną wartość, a ludzie aktywnie szukają ulgi.

3. **Relacje, randki i rozwój osobisty**
   * Tematy: poprawa relacji, znalezienie partnera, wychowanie psa i większa pewność siebie.
   * Dlaczego jest rentowny: potrzeby emocjonalne silnie motywują do działania.

#### Jak wybrać subniszę

Wybierz precyzyjny kierunek w dużym rynku. Zamiast „zarabiania pieniędzy” wybierz „dodatkowy dochód online dla zapracowanych pracowników”.`,
            practicalExamples: ['Precyzyjne pozycjonowanie: rynek = zdrowie → subnisza = zdrowe odchudzanie dla pracujących matek bez wielogodzinnego gotowania.'],
          },
          understandContent: { coreTakeaway: 'Nie wymyślaj rynku. Wybierz miejsce, w którym istnieją już popyt i wydatki.', keyPrinciples: ['Konkurencja na dużym rynku potwierdza, że klienci wydają pieniądze', 'Zajmij jasną pozycję w jednej subniszy', 'Korzystaj z AI do tworzenia i oceny pomysłów'] },
          actionTask: { instruction: 'Użyj wyszukiwarki nisz GOM-MAR lub wpisz tutaj wybraną niszę:', placeholder: 'Np. dodatkowy dochód online dla pracowników' },
        },
        '2.2': {
          stageTitle: '2. Twój kierunek', title: 'Określ grupę docelową',
          description: 'Stwórz profil idealnego klienta: komu pomagasz i co motywuje tę osobę?',
          learnContent: {
            videoTitle: 'Analiza grupy: kim jest Twój idealny klient?',
            summaryText: 'Im wyraźniej widzisz jedną konkretną osobę, tym bardziej trafne będą Twoje teksty, landing page i wiadomości e-mail.',
            bulletPoints: ['Demografia: wiek, zawód i sytuacja życiowa', 'Cele: większa wolność, bezpieczeństwo finansowe i czas dla rodziny', 'Obawy: inflacja, emerytura i zależność od jednego pracodawcy'],
            fullArticleGuide: `### Profil idealnego klienta

Jeśli próbujesz mówić do wszystkich, nie docierasz do nikogo. Wiadomości napisane „do wszystkich” brzmią chłodno i anonimowo. Pisanie jak do jednej prawdziwej osoby natychmiast zwiększa trafność i zaufanie.

#### Cztery pytania o Twojego klienta

1. **Kim jest ta osoba?** Wiek, zawód i sytuacja rodzinna—np. Tomasz, 42 lata, pracownik przemysłu, żonaty, dwoje dzieci.
2. **Co obecnie ją frustruje?** Mało wolnego czasu, rosnące koszty życia i poczucie utknięcia w rutynie.
3. **Czego pragnie najbardziej?** Dodatkowych 500–1000 € miesięcznie, aby zmniejszyć presję finansową i dać rodzinie więcej możliwości.
4. **Jakie ma wątpliwości?** „Czy mam wystarczająco dużo czasu?”, „Czy dam radę bez doświadczenia?” i „Czy to jest wiarygodne?”

Twoja komunikacja powinna odpowiadać na te wątpliwości i pokazywać, że pożądany rezultat jest osiągalny.`,
            practicalExamples: ['Słaby tekst: „Nasz system oferuje zaawansowane metody syndykacji dla cyfrowych resellerów.” Jest niezrozumiały.', 'Dobry tekst: „Zbuduj dodatkowe źródło dochodu bez doświadczenia w 30 minut dziennie.” Trafia bezpośrednio do odbiorcy.'],
          },
          understandContent: { coreTakeaway: 'Jeśli próbujesz mówić do wszystkich, nie docierasz do nikogo.', keyPrinciples: ['Pisz wiadomości tak, jak do dobrego znajomego', 'Używaj dokładnych słów swojej grupy', 'Odnoś się do najbardziej pilnego codziennego problemu'] },
          actionTask: { instruction: 'Opisz swoją grupę docelową w jednym lub dwóch zdaniach:', placeholder: 'Np. pracownicy w wieku 30–50 lat, którzy bez doświadczenia chcą zarabiać dodatkowe 500–1000 €.' },
        },
        '2.3': {
          stageTitle: '2. Twój kierunek', title: 'Zidentyfikuj problem',
          description: 'Znajdź palący problem, dla którego Twoja grupa aktywnie poszukuje natychmiastowego rozwiązania.',
          learnContent: {
            videoTitle: 'Znajdź i jasno opisz punkty bólu',
            summaryText: 'Ludzie kupują emocjonalnie, a decyzję uzasadniają racjonalnie. Najsilniejszą motywacją jest uniknięcie bólu lub osiągnięcie ważnego celu.',
            bulletPoints: ['Ból: „Mimo pełnego etatu pod koniec miesiąca brakuje pieniędzy.”', 'Cel: „Zarabiać dodatkowe 500 € z domu.”', 'Przeszkoda: „Brakuje mi wiedzy technicznej i czasu.”'],
            fullArticleGuide: `### Palący problem jako impuls zakupowy

Sprzedaż następuje, gdy oferta zamyka lukę między **obecną sytuacją**—bólem i frustracją—a **pożądaną sytuacją**—celem klienta.

#### Przemiana „przed i po”

* **Przed**: Tomasz pod koniec miesiąca prawie nie ma pieniędzy. Martwi go inflacja, czuje się uwięziony w pracy i brakuje mu czasu oraz doświadczenia technicznego.
* **Po**: Tomasz zbudował prosty system. Zapewnia mu dodatkowe 600 € miesięcznie, większe bezpieczeństwo i spokojniejsze weekendy z rodziną.

Twoją rolą jako partnera afiliacyjnego jest pokazanie wiarygodnego mostu od obecnej sytuacji do pożądanego rezultatu.`,
            practicalExamples: ['Formuła oferty: „Osiągnij [pożądany rezultat] bez [największej obawy lub przeszkody].”'],
          },
          understandContent: { coreTakeaway: 'Twój system usuwa główną przeszkodę i prowadzi odbiorcę od problemu do pożądanego rezultatu.', keyPrinciples: ['Pokaż problem konkretnie', 'Wyjaśnij, dlaczego wcześniejsze próby się nie udały', 'Przedstaw swoją drogę jako najprostszy wiarygodny następny krok'] },
          actionTask: { instruction: 'Jaki główny problem Twojej grupy rozwiązuje Twój system?', placeholder: 'Np. brak czasu i wiedzy technicznej potrzebnej do startu online' },
        },
        '2.4': {
          stageTitle: '2. Twój kierunek', title: 'Wybierz ofertę',
          description: 'Wybierz skuteczną ofertę afiliacyjną z platformy takiej jak Digistore24 lub Copecart.',
          learnContent: {
            videoTitle: 'Znajdź i oceń odpowiednią ofertę afiliacyjną',
            summaryText: 'Dobra oferta łączy wysoką konwersję, niski poziom zwrotów, uczciwą prowizję i profesjonalną stronę sprzedażową.',
            bulletPoints: ['Przeszukaj platformę Digistore24 lub Copecart', 'Oceń stronę sprzedażową i jej wideo', 'Sprawdź dostępność szablonów e-mail, grafik i banerów'],
            fullArticleGuide: `### Pięć kryteriów dobrego produktu afiliacyjnego

Nie każdy produkt na platformie zasługuje na Twój czas. Przed wyborem oceń pięć punktów.

1. **Profesjonalna strona z dobrym wideo sprzedażowym**: Obejrzyj stronę jak potencjalny klient. Czy obietnica jest jasna i wiarygodna?
2. **Prowizja**: Kursy cyfrowe powinny zwykle zapewniać co najmniej **30–50%** albo prowizje cykliczne.
3. **Poziom zwrotów**: Wskaźnik poniżej 10% może świadczyć o wysokim zadowoleniu klientów.
4. **Materiały promocyjne**: Dobrzy dostawcy udostępniają partnerom szablony e-mail, grafiki i banery.
5. **Osobisty link promocyjny**: Link zawiera Twój identyfikator afiliacyjny i śledzenie, dzięki któremu sprzedaż zostanie przypisana do Ciebie.

Polecaj tylko oferty, które naprawdę pasują do grupy i dostarczają użyteczną wartość.`,
            practicalExamples: ['Krok praktyczny: załóż bezpłatne konto Digistore24, przejrzyj bestsellery w kategorii Internet Marketing & Business i zapisz link promocyjny wybranej oferty.'],
          },
          understandContent: { coreTakeaway: 'Polecaj tylko produkty, których jakości i przydatności naprawdę ufasz.', keyPrinciples: ['Zaufanie jest najcenniejszym zasobem w biznesie online', 'Zabezpiecz i zapisz swój link afiliacyjny', 'Przetestuj proces sprzedaży z perspektywy klienta'] },
          actionTask: { instruction: 'Jak nazywa się wybrana oferta lub produkt afiliacyjny?', placeholder: 'Np. nazwa produktu lub identyfikator produktu Digistore' },
        },
      },
    },
    3: {
      title: '3. Twój pierwszy system',
      subtitle: '🟣 BUDOWA',
      description: 'Domena, landing page, połączenie oferty afiliacyjnej i fundament techniczny.',
      lessons: {
        '3.1': {
          stageTitle: '3. Twój pierwszy system', title: 'Domena i nazwa marki',
          description: 'Wybierz zapadającą w pamięć nazwę landing page i całego systemu.',
          learnContent: {
            videoTitle: 'Idealna domena i nazwa marki',
            summaryText: 'Domena powinna być krótka, zrozumiała i budzić zaufanie. Unikaj skomplikowanej pisowni oraz znaków specjalnych.',
            bulletPoints: ['Przykłady: twoj-dodatkowy-dochod.pl, sukces-z-systemem.com', 'Korzystaj z zaufanych końcówek, takich jak .pl, .com, .de lub .net', 'Nie naruszaj znaków towarowych innych firm'],
            fullArticleGuide: `### Jak wybrać wiarygodną domenę

Domena jest adresem internetowym Twojej strony zapisu. Powinna brzmieć profesjonalnie i być łatwa do zapamiętania.

#### Zasady dobrej nazwy domeny

1. **Jasna i opisowa**: Nazwa powinna sugerować temat strony, np. formula-wolnosci.pl lub madrze-zacznij.pl.
2. **Krótka**: Użyj maksymalnie dwóch lub trzech słów.
3. **Odpowiednia końcówka**: .pl budzi zaufanie w Polsce, .de w Niemczech, a .com pasuje do oferty międzynarodowej.
4. **Bez cudzych marek**: Nie używaj chronionych nazw takich jak Facebook, Digistore ani innych znaków towarowych.`,
            practicalExamples: ['Dobre przykłady: starter-funnel.pl, twoja-droga-online.pl, kompas-sukcesu.com.', 'Zły przykład: zarabiaj-szybko-i-zostan-bogaty-1234.info.'],
          },
          understandContent: { coreTakeaway: 'Prosta domena od razu buduje zaufanie nowych odwiedzających.', keyPrinciples: ['Łatwa do wpisania', 'Zrozumiała podczas rozmowy telefonicznej', 'Bez nadmiaru łączników'] },
          actionTask: { instruction: 'Wpisz wybraną nazwę lub domenę:', placeholder: 'Np. moja-droga-online.pl' },
        },
        '3.2': {
          stageTitle: '3. Twój pierwszy system', title: 'Podstawy landing page',
          description: 'Zbuduj skuteczną stronę zapisu, która pozyskuje kontakty.',
          learnContent: {
            videoTitle: 'Anatomia landing page z konwersją ponad 50%',
            summaryText: 'Landing page do pozyskiwania kontaktów ma jeden cel: wymienić wartościowy lead magnet na adres e-mail odwiedzającego. Usuń rozpraszacze i schowaj dodatkowe linki.',
            bulletPoints: ['1. Nagłówek budzący ciekawość i pokazujący korzyść', '2. Trzy krótkie główne korzyści', '3. Formularz zapisu z polem e-mail i przyciskiem'],
            fullArticleGuide: `### Anatomia landing page z konwersją ponad 50%

Dlaczego na jednej stronie zapisuje się 50 na 100 osób, a na innej tylko dwie? Różnicę tworzą prostota i jasne prowadzenie odbiorcy.

#### Cztery elementy skutecznej strony zapisu

1. **Główny nagłówek—haczyk ciekawości**: W ciągu trzech sekund powinien wyjaśnić korzyść. Przykład: „Bezpłatna lista kontrolna: zbuduj pierwsze źródło dochodu online w 30 minut dziennie.”
2. **Trzy konkretne korzyści**: Pokaż dokładnie, co zawiera darmowy poradnik, np. plan krok po kroku, proste wyjaśnienia i natychmiastowy plik PDF.
3. **Prosty formularz**: Imię jest opcjonalne, adres e-mail obowiązkowy. Użyj aktywnego przycisku, np. „Pobierz bezpłatnie ➔”.
4. **Elementy zaufania**: Dodaj krótki komunikat: „100% bezpłatnie, rezygnacja w każdej chwili, bez spamu.”`,
            practicalExamples: ['Skorzystaj z Asystenta Landing Page GOM-MAR w Toolboxie, aby automatycznie ulepszyć tekst.'],
          },
          understandContent: { coreTakeaway: 'Usuń wszystkie rozpraszacze. Jedna strona oznacza jeden cel.', keyPrinciples: ['Zastosuj wyraźny kontrast przycisku', 'Użyj formuły nagłówka „Jak [osiągnąć cel] bez [problemu]”', 'Twórz zwięzłe nagłówki z pomocą GOM-MAR Toolbox'] },
          actionTask: { instruction: 'Użyj Asystenta Landing Page GOM-MAR lub napisz własny nagłówek:', placeholder: 'Np. Jak zbudować dodatkowy dochód online w 30 minut dziennie' },
        },
        '3.3': {
          stageTitle: '3. Twój pierwszy system', title: 'Połącz ofertę afiliacyjną',
          description: 'Połącz formularz zapisu ze stroną podziękowania i linkiem afiliacyjnym.',
          learnContent: {
            videoTitle: 'Strategia przekierowania przez bridge page',
            summaryText: 'Po wysłaniu formularza skieruj odwiedzającego na stronę podziękowania z ofertą afiliacyjną. System może generować przychód, gdy sekwencja e-mail działa w tle.',
            bulletPoints: ['Wysłanie formularza → przekierowanie na stronę podziękowania', 'Strona potwierdza lead magnet i pokazuje odpowiednią ofertę partnerską', 'Prowizja jest możliwa już od pierwszego dnia'],
            fullArticleGuide: `### Strategia bridge page dla szybkiego przychodu

Moment bezpośrednio po zapisie jest najcenniejszy w całym lejku. Odbiorca jest uważny, korzysta z telefonu lub komputera i właśnie okazał zaufanie.

#### Dwuetapowy proces przekierowania

1. **Wysłanie formularza**: Odwiedzający wpisuje adres e-mail i klika przycisk. W tle kontakt trafia do automatyzacji e-mail.
2. **Inteligentna strona podziękowania**: Zamiast samego „Dziękujemy” pokaż informację, że bezpłatny poradnik dotrze w ciągu dwóch minut, oraz zaproś do obejrzenia krótkiego filmu z rekomendacją. Pod nim umieść przycisk afiliacyjny. Część nowych kontaktów obejrzy materiał i kupi od razu.`,
            practicalExamples: ['Przykład: ze 100 nowych kontaktów 40 ogląda film, a od dwóch do czterech kupuje jeszcze przed pierwszą wiadomością follow-up.'],
          },
          understandContent: { coreTakeaway: 'Dotrzyj do odbiorcy wtedy, gdy jego uwaga jest największa.', keyPrinciples: ['Nie kieruj do linku afiliacyjnego przed zapisem', 'Najpierw pozyskaj kontakt, potem przedstaw rekomendację', 'Kontakt staje się częścią Twojej własnej grupy odbiorców'] },
          actionTask: { instruction: 'Potwierdź, że rozumiesz logikę przekierowania.', checklistItems: ['Odwiedzający wpisuje adres e-mail', 'Kontakt trafia do automatyzacji e-mail GOM-MAR', 'Odwiedzający zostaje przekierowany na afiliacyjną stronę podziękowania'] },
        },
        '3.4': {
          stageTitle: '3. Twój pierwszy system', title: 'Śledzenie i test systemu',
          description: 'Dokładnie sprawdź cały system przed wysłaniem pierwszych odwiedzających.',
          learnContent: {
            videoTitle: 'Audyt systemu: czy wszystko działa?',
            summaryText: 'Testowanie jest niezbędne. Zapisz się jako kontakt testowy i sprawdź, czy otrzymasz wiadomość powitalną.',
            bulletPoints: ['Przetestuj formularz na telefonie i komputerze', 'Sprawdź skrzynkę odbiorczą oraz spam', 'Zweryfikuj prawidłowe śledzenie linku afiliacyjnego'],
            fullArticleGuide: `### Lista kontrolna przed uruchomieniem

Zanim wyślesz odwiedzających na stronę, upewnij się, że cały system działa. Jeden uszkodzony link lub formularz może kosztować cenne kontakty.

#### Przetestuj samodzielnie cztery kroki

1. **Test zapisu**: Otwórz landing page na telefonie i komputerze, a następnie zapisz się testowym adresem e-mail.
2. **Test przekierowania**: Sprawdź, czy strona podziękowania lub oferta otwiera się natychmiast po zapisie.
3. **Test dostarczenia wiadomości**: E-mail powitalny powinien dotrzeć w ciągu jednej do trzech minut. Sprawdź każdy zawarty link.
4. **Test śledzenia afiliacyjnego**: Kliknij link partnerski i upewnij się, że identyfikator afiliacyjny jest prawidłowo przekazywany w adresie docelowym.`,
            practicalExamples: ['Pięciominutowy test zapobiega problemom i zapewnia prawidłową obsługę każdego przyszłego odwiedzającego.'],
          },
          understandContent: { coreTakeaway: 'Sprawny system daje Ci pewność przed rozpoczęciem pozyskiwania ruchu.', keyPrinciples: ['Zbuduj dobrze raz i korzystaj przez lata', 'Znajdź błędy podczas testu, nie dzięki klientom'] },
          actionTask: { instruction: 'Wykonaj pełny test procesu zapisu.', checklistItems: ['Testowy zapis zakończony powodzeniem', 'Strona podziękowania otwiera się prawidłowo', 'Automatyzacja e-mail GOM-MAR zapisała kontakt'] },
        },
      },
    },
    4: {
      title: '4. Docieraj do ludzi',
      subtitle: '🟠 RUCH',
      description: 'Bezpłatne strategie ruchu na Facebooku, Instagramie, Pintereście i YouTube—bez budżetu reklamowego.',
      lessons: {
        '4.1': {
          stageTitle: '4. Docieraj do ludzi', title: 'Grupy niszowe na Facebooku',
          description: 'Zdobywaj codziennie 5–15 wartościowych kontaktów z istniejących grup na Facebooku.',
          learnContent: {
            videoTitle: 'Organiczny ruch z wartościowych treści w grupach Facebooka',
            summaryText: 'Znajdź grupy, w których Twoi odbiorcy już rozmawiają o swoich problemach. Odpowiadaj konkretnie i kieruj zainteresowanych do bezpłatnego lead magnetu.',
            bulletPoints: ['Znajdź 5–10 odpowiednich grup w swojej niszy', 'Dostarczaj realną wartość zamiast reklamowego spamu', 'Wykorzystuj historie: „Jak rozwiązałem ten problem…”'],
            fullArticleGuide: `### Organiczne pozyskiwanie kontaktów w grupach niszowych

Miliony osób codziennie rozmawiają w grupach na Facebooku o konkretnych zainteresowaniach i problemach. Nie musisz szukać ich pojedynczo—są już zgromadzeni w odpowiednich społecznościach.

#### Formuła wartościowego wpisu grupowego

1. **Bez nachalnego spamu**: Wpisy w stylu „Zarabiaj pieniądze—kliknij tutaj” szybko są usuwane i mogą prowadzić do ograniczenia konta.
2. **Historia plus wartość**: Opisz własne doświadczenie, podaj trzy praktyczne wskazówki i zakończ zaproszeniem budzącym ciekawość. Przykład: „Przygotowałem krótkie podsumowanie PDF. Napisz INFO w komentarzu, jeśli chcesz je otrzymać.”
3. **Strategia komentarzy**: Każdej komentującej osobie wyślij przyjazną wiadomość prywatną z linkiem do landing page.`,
            practicalExamples: ['Przykład: „Długo nie mogłem znaleźć czasu na dodatkowy dochód przy pełnym etacie. Pomogły mi te trzy rutyny. Daj znać, jeśli chcesz listę kontrolną.” Taki wpis może wygenerować 20–40 komentarzy.'],
          },
          understandContent: { coreTakeaway: 'Pomocne wpisy rozpoczynają rozmowy i naturalnie przyciągają zainteresowanych na Twój profil.', keyPrinciples: ['Najpierw pomóż, później sprzedawaj', 'Zoptymalizuj profil jak landing page', 'Korzystaj z Generatora Treści GOM-MAR'] },
          actionTask: { instruction: 'Utwórz pierwszy wpis grupowy z pomocą GOM-MAR Toolbox:', placeholder: 'Np. gotowy projekt wartościowego wpisu na Facebooka' },
        },
        '4.2': {
          stageTitle: '4. Docieraj do ludzi', title: 'Instagram Reels i Stories',
          description: 'Buduj zasięg krótkimi Reelsami i interaktywnymi Stories.',
          learnContent: {
            videoTitle: 'Trzysekundowa formuła Reelsa zwiększającego zasięg',
            summaryText: 'Reelsy mogą zapewnić duży bezpłatny zasięg. Użyj trzech części: haczyka ciekawości, trzech wskazówek i wezwania „Napisz START w komentarzu, aby otrzymać poradnik.”',
            bulletPoints: ['Wizualny haczyk w pierwszych trzech sekundach', 'Dopasowane popularne audio i czytelne napisy', 'Automatyczne wiadomości prywatne wysyłające link po komentarzu'],
            fullArticleGuide: `### Zasięg krótkich filmów dzięki Instagram Reels

Instagram promuje krótkie filmy, które utrzymują uwagę. Nie musisz pokazywać twarzy: kanał faceless może korzystać z nagrań ekranu, natury, biurka lub estetycznych ujęć.

#### Trzy elementy skutecznego Reelsa

1. **Haczyk—sekundy 0–3**: Pokaż mocny tekst, np. „Trzy rzeczy, których nikt nie mówi o dodatkowym dochodzie online.”
2. **Wartość—sekundy 3–12**: Przedstaw krótkie praktyczne punkty w filmie albo opisie.
3. **Wezwanie do działania**: Zakończ zdaniem „Napisz START w komentarzu, a wyślę Ci bezpłatny poradnik w wiadomości prywatnej.”`,
            practicalExamples: ['Reels faceless: nagraj nalewanie kawy przy biurku, umieść haczyk na ekranie, a trzy wskazówki i instrukcję odpowiedzi dodaj w opisie.'],
          },
          understandContent: { coreTakeaway: 'Reelsy przyciągają nowych widzów, a Stories zmieniają obserwujących w wartościowe kontakty.', keyPrinciples: ['Krócej zwykle znaczy lepiej—7 do 15 sekund', 'Ciekawość zamiast żargonu', 'Regularność wygrywa z chwilowym zapałem'] },
          actionTask: { instruction: 'Zaplanuj jeden pomysł na Reels w swojej niszy:', placeholder: 'Np. Trzy rzeczy, których nie wiesz o dochodzie online' },
        },
        '4.3': {
          stageTitle: '4. Docieraj do ludzi', title: 'Evergreen na Pintereście i YouTube',
          description: 'Buduj ruch z wyszukiwarek, który przynosi kliknięcia także po wielu miesiącach.',
          learnContent: {
            videoTitle: 'Pasywny ruch z wizualnych wyszukiwarek',
            summaryText: 'W odróżnieniu od szybkich kanałów społecznościowych Pinterest i YouTube działają jak wizualne wyszukiwarki. Dobry Pin może przez lata codziennie kierować użytkowników na landing page.',
            bulletPoints: ['Linkuj Piny bezpośrednio do landing page', 'Używaj trafnych słów kluczowych w tytule i opisie', 'Przyspieszaj zasięg dzięki YouTube Shorts'],
            fullArticleGuide: `### Trwały ruch evergreen

Wpisy na Instagramie szybko znikają w kanale, natomiast Pinterest i YouTube działają jak wyszukiwarki. Treść opublikowana dzisiaj może nadal zdobywać odwiedzających za dwanaście miesięcy.

#### Marketing na Pintereście w trzech krokach

1. Twórz w Canvie pionowe grafiki, najlepiej 1080 × 1920 pikseli.
2. Pisz tytuły bogate w słowa kluczowe, np. „Poradnik: jak zbudować dodatkowy dochód z domu”.
3. Linkuj każdy Pin bezpośrednio do landing page z formularzem zapisu.`,
            practicalExamples: ['Jeden skuteczny Pin może przez wiele miesięcy generować 300–500 kliknięć miesięcznie bez codziennego publikowania.'],
          },
          understandContent: { coreTakeaway: 'Ruch evergreen buduje trwały cyfrowy fundament długoterminowego sukcesu.', keyPrinciples: ['Twórz szablony Canva do szybkiego przygotowania Pinów', 'Słowa kluczowe decydują o pozycji w wynikach'] },
          actionTask: { instruction: 'Zaplanuj pierwsze trzy Piny z pomocą Toolboxa.', checklistItems: ['Konto Pinterest utworzone i skonfigurowane', 'Trzy frazy kluczowe zidentyfikowane', 'Piny utworzone i połączone z landing page'] },
        },
        '4.4': {
          stageTitle: '4. Docieraj do ludzi', title: 'Twój siedmiodniowy plan ruchu',
          description: 'Wprowadź strukturę: wystarczy 30 minut działania dziennie, aby regularnie zdobywać kontakty.',
          learnContent: {
            videoTitle: 'Codzienny workflow w 30 minut',
            summaryText: 'Wyniki przynoszą codzienne rutyny, a nie jednorazowe akcje. Wystarczy trzydzieści minut skupionej pracy dziennie.',
            bulletPoints: ['Dni 1–3: wartościowe wpisy i komentarze na Facebooku', 'Dni 4–5: Instagram Reel i interakcje w Stories', 'Dni 6–7: publikacja Pinów i analiza wyników'],
            fullArticleGuide: `### Uporządkowany plan 30 minut dziennie

Rozwój biznesu online nie wymaga ośmiu godzin pracy dziennie. Wymaga dyscypliny w małych, powtarzalnych działaniach.

#### Twój plan tygodniowy

* **Od poniedziałku do środy—15 minut**: Udostępnij jeden wartościowy wpis w dwóch grupach i odpowiedz na pytania.
* **Od czwartku do piątku—15 minut**: Opublikuj jeden Reel lub Short i odpowiedz na wiadomości.
* **Sobota—15 minut**: Zaplanuj trzy Piny.
* **Niedziela**: Odpocznij i przeanalizuj kontakty pozyskane w ciągu tygodnia.`,
            practicalExamples: ['Po 30 dniach możesz mieć 20 wpisów grupowych, 10 Reelsów i 15 Pinów—aktywność wystarczającą do zdobycia 50–150 kontaktów i pierwszych sprzedaży.'],
          },
          understandContent: { coreTakeaway: 'Zmień plan ruchu w codzienny nawyk.', keyPrinciples: ['Rezerwuj stałe pory działania', 'Skup się na liczbie kontaktów, nie obserwujących'] },
          actionTask: { instruction: 'Zobowiąż się do tygodniowego planu ruchu:', placeholder: 'Zarezerwuj 30 minut każdego dnia' },
        },
      },
    },
    5: {
      title: '5. Zdobywaj zainteresowanych',
      subtitle: '🟡 KONTAKTY',
      description: 'Autoresponder e-mail, lead magnety, strony zapisu i automatyczne sekwencje follow-up.',
      lessons: {
        '5.1': {
          stageTitle: '5. Zdobywaj zainteresowanych', title: 'Podstawy autorespondera',
          description: 'Lista e-mail jest Twoim najcenniejszym zasobem. Buduj zaufanie, które pracuje na przyszłość.',
          learnContent: {
            videoTitle: 'Dlaczego lista e-mail jest bezcenna',
            summaryText: 'Platforma społecznościowa może ograniczyć konto z dnia na dzień, natomiast lista e-mail należy do Ciebie. Zapewnia bezpośredni kontakt z zainteresowanymi osobami.',
            bulletPoints: ['Niezależność od algorytmów mediów społecznościowych', 'Wysoka gotowość zakupowa zaangażowanych czytelników', 'Automatyczna wysyłka przez całą dobę'],
            fullArticleGuide: `### Dlaczego lista e-mail jest silnikiem przychodu online

Większość skutecznych przedsiębiorców cyfrowych zgadza się z zasadą: **pieniądze są na liście**.

#### Dlaczego e-mail marketing jest tak skuteczny

1. **Własność zamiast wynajmowania uwagi**: Konto społecznościowe należy do platformy, a wyeksportowana lista kontaktów należy do Twojego biznesu.
2. **Bezpośrednie dostarczenie**: Wpis społecznościowy dociera tylko do części obserwujących, a e-mail trafia bezpośrednio do skrzynki odbiorcy.
3. **Silna intencja**: Subskrybenci zapisali się dobrowolnie, ponieważ chcą otrzymywać Twoje wskazówki i rekomendacje.`,
            practicalExamples: ['Przykład: przy 500 subskrybentach miesięczną rekomendację kupuje 3% listy, czyli 15 osób. Prowizja 40 € daje 600 € powtarzalnego miesięcznego przychodu.'],
          },
          understandContent: { coreTakeaway: 'Zdrowa lista może generować średnio około 1–3 € powtarzalnego miesięcznego przychodu na zaangażowanego subskrybenta.', keyPrinciples: ['Chroń relację z listą', 'Pomagaj naprawdę w każdej wiadomości', 'Korzystaj ze zintegrowanej automatyzacji e-mail GOM-MAR'] },
          actionTask: { instruction: 'Otwórz automatyzację e-mail GOM-MAR i utwórz pierwszą kampanię „Moje pierwsze euro online”:', checklistItems: ['Automatyzacja e-mail GOM-MAR otwarta', 'Kampania utworzona', 'Przegląd sekwencji przygotowany'] },
        },
        '5.2': {
          stageTitle: '5. Zdobywaj zainteresowanych', title: 'Utwórz lead magnet',
          description: 'Przygotuj atrakcyjną listę kontrolną, PDF, ściągę lub szablon w mniej niż 30 minut.',
          learnContent: {
            videoTitle: 'Idealny lead magnet w trzech krokach',
            summaryText: 'Ludzie rzadko chcą czytać 200-stronicowy e-book. Potrzebują szybkiego rozwiązania, które mogą od razu zastosować: jednostronicowej listy, ściągi albo szablonu.',
            bulletPoints: ['Przydatny w mniej niż pięć minut', 'Rozwiązuje jeden konkretny problem początkującego', 'Budzi zainteresowanie powiązaną ofertą afiliacyjną'],
            fullArticleGuide: `### Formuła atrakcyjnego lead magnetu

Lead magnet jest uczciwą wymianą: odbiorca otrzymuje natychmiastową wartość i wyraża zgodę na komunikację e-mail.

#### Dobre formaty dla początkujących

* **Jednostronicowa lista kontrolna**: „Pięć punktów potrzebnych do rozpoczęcia dodatkowego dochodu online.”
* **Ściąga**: „Dziesięć najlepszych promptów AI do wpisów na Facebooku.”
* **Szablon**: „Wzór e-maila do pierwszego kontaktu z klientem.”

Zachowaj zwięzłość. Lead magnet, który można przeczytać i zastosować w trzy minuty, od razu daje poczucie postępu.`,
            practicalExamples: ['Utwórz go w Canvie: wybierz szablon A4, dodaj pięć kroków i wyeksportuj jako PDF. Całość może zająć tylko 20 minut.'],
          },
          understandContent: { coreTakeaway: 'Lead magnet jest próbką, a produkt afiliacyjny daniem głównym.', keyPrinciples: ['Zwięzły i wartościowy', 'Prosty, przyjazny wygląd', 'Dostępny natychmiast jako PDF'] },
          actionTask: { instruction: 'Jaki tytuł ma Twój lead magnet?', placeholder: 'Np. Pięć kroków do pierwszego dodatkowego dochodu online' },
        },
        '5.3': {
          stageTitle: '5. Zdobywaj zainteresowanych', title: 'Zapis i wiadomość powitalna',
          description: 'Wiadomość 1: dostarcz lead magnet i od razu wzbudź entuzjazm.',
          learnContent: {
            videoTitle: 'Anatomia idealnej wiadomości powitalnej',
            summaryText: 'Wiadomość powitalną otwiera często ponad 70% odbiorców. Od razu dostarcz prezent, podziękuj i wzbudź ciekawość kolejnego e-maila.',
            bulletPoints: ['Temat: „Twoja lista kontrolna + ważna informacja [Pobierz]”', 'Bezpośredni link do prezentu w pierwszym akapicie', 'Zapowiedź wartościowych treści z kolejnych dni'],
            fullArticleGuide: `### Struktura pierwszej wiadomości powitalnej

Pierwszy e-mail ma zwykle najwyższy wskaźnik otwarć—często 60–70%. Nie marnuj tego momentu na długi monolog.

#### Idealna struktura

1. **Temat**: Jasno zapowiedz dostarczenie, np. „[Pobierz] Oto Twoja lista kontrolna + ważna informacja”.
2. **Dostarczenie prezentu**: Umieść link do pobrania bezpośrednio w pierwszym akapicie.
3. **Ustal oczekiwania**: Krótko się przedstaw i zapowiedz ważne odkrycie, którym podzielisz się następnego dnia.`,
            practicalExamples: ['Użyj gotowego szablonu wiadomości powitalnej w automatyzacji e-mail GOM-MAR.'],
          },
          understandContent: { coreTakeaway: 'Pierwsze wrażenie decyduje, czy następne wiadomości będą czytane, czy ignorowane.', keyPrinciples: ['Wyślij natychmiast po zapisie', 'Użyj jasnego tematu', 'Pisz przyjaźnie i z szacunkiem'] },
          actionTask: { instruction: 'Użyj Generatora E-mail w Toolboxie i dodaj wiadomość 1 do automatyzacji:', placeholder: 'Wiadomość powitalna przygotowana' },
        },
        '5.4': {
          stageTitle: '5. Zdobywaj zainteresowanych', title: 'Automatyczna sekwencja follow-up',
          description: 'Buduj zaufanie i automatycznie polecaj odpowiednie oferty w sekwencji pięciu wiadomości.',
          learnContent: {
            videoTitle: 'Formuła sprzedażowa pięciu wiadomości',
            summaryText: 'Wiele sprzedaży następuje dopiero między trzecim a siódmym e-mailem. Automatyzacja GOM-MAR uruchamia całą sekwencję automatycznie.',
            bulletPoints: ['E-mail 1—natychmiast: powitanie i lead magnet', 'E-mail 2—dzień 1: historia i moment przełomowy', 'E-mail 3—dzień 2: największy błąd grupy', 'E-mail 4—dzień 4: rozwiązanie i link afiliacyjny', 'E-mail 5—dzień 7: częste pytania i końcowa rekomendacja'],
            fullArticleGuide: `### Pięcioetapowa formuła follow-up dla automatycznej sprzedaży

Zainteresowana osoba rzadko kupuje przy pierwszym kontakcie. Zaufanie rośnie dzięki kilku wartościowym punktom styku, a automatyczna sekwencja dostarcza je regularnie.

#### Pięć wiadomości

* **E-mail 1—dzień 0**: Powitanie i bezpłatny materiał.
* **E-mail 2—dzień 1**: Historia i identyfikacja—dlaczego kiedyś byłeś w podobnym miejscu.
* **E-mail 3—dzień 2**: Wyjaśnienie typowego błędu i przyczyn wcześniejszych niepowodzeń.
* **E-mail 4—dzień 4**: Przedstawienie rekomendowanego systemu i linku afiliacyjnego jako praktycznego skrótu.
* **E-mail 5—dzień 7**: Odpowiedzi na częste pytania i przypomnienie o odpowiednim bonusie.`,
            practicalExamples: ['Wszystkie pięć wiadomości jest dostępnych jako szablony w automatyzacji GOM-MAR. Wystarczy dopasować je do grupy i oferty.'],
          },
          understandContent: { coreTakeaway: 'Automatyczne wiadomości mogą sprzedawać, gdy spędzasz czas z rodziną i znajomymi.', keyPrinciples: ['Używaj autentycznych historii', '80% wartości i zaufania, 20% rekomendacji', 'Zachowaj rozsądne automatyczne odstępy'] },
          actionTask: { instruction: 'Aktywuj wszystkie pięć wiadomości w automatyzacji GOM-MAR:', checklistItems: ['E-mail 1 skonfigurowany—natychmiast', 'E-mail 2 skonfigurowany—dzień 1', 'E-mail 3 skonfigurowany—dzień 2', 'E-mail 4 skonfigurowany—dzień 4', 'E-mail 5 skonfigurowany—dzień 7'] },
        },
      },
    },
    6: {
      title: '6. Zmieniaj odwiedzających w klientów',
      subtitle: '🔴 MONETYZACJA',
      description: 'Psychologia afiliacji, zwiększanie konwersji i długoterminowe budowanie zaufania.',
      lessons: {
        '6.1': {
          stageTitle: '6. Zmieniaj odwiedzających w klientów', title: 'Monetyzacja e-mail',
          description: 'Krok po kroku zmieniaj zainteresowanych czytelników w zadowolonych klientów—bez nacisku.',
          learnContent: {
            videoTitle: 'Sprzedaż przez uczciwe rekomendacje',
            summaryText: 'Ludzie nie lubią, gdy coś im się wciska, ale lubią dokonywać dobrych zakupów. Uczciwie wyjaśnij, dlaczego cenisz produkt i jaką konkretną korzyść zapewnia.',
            bulletPoints: ['Wyjaśnij przemianę przed i po', 'Pokaż prawdziwe wyniki lub demonstracje', 'Umieść wyraźnie widoczny link wezwania do działania'],
            fullArticleGuide: `### Uczciwa sprzedaż przez marketing rekomendacyjny

Trwała monetyzacja wyrasta z zaufania. Gdy czytelnicy widzą, że naprawdę chcesz pomóc, chętniej rozważają Twoje rekomendacje.

#### Trzy zasady monetyzacji

1. **Pokaż produkt jako skrót**: Wyjaśnij, jak oszczędza czas i pomaga uniknąć kosztownych błędów.
2. **Użyj jasnego wezwania do działania**: Precyzyjnie podpisz link lub przycisk, np. „👉 Kliknij tutaj, aby uzyskać dostęp do systemu”.
3. **Odpowiadaj na obiekcje**: Z wyprzedzeniem odnieś się do wątpliwości, np. czy potrzebne jest doświadczenie, i odpowiedz uczciwie.`,
            practicalExamples: ['Użyj gotowych szablonów w Generatorze E-mail GOM-MAR.'],
          },
          understandContent: { coreTakeaway: 'Dobry sprzedawca jest doradcą, który pomaga klientowi podjąć najlepszą dla niego decyzję.', keyPrinciples: ['Bez fałszywych obietnic', 'Zrozumiały język', 'Konkretnie pokazana korzyść'] },
          actionTask: { instruction: 'Utwórz e-mail sprzedażowy w Generatorze E-mail Toolboxa:', placeholder: 'E-mail sprzedażowy wygenerowany' },
        },
        '6.2': {
          stageTitle: '6. Zmieniaj odwiedzających w klientów', title: 'Zwiększanie konwersji i bonusy',
          description: 'Zwiększaj sprzedaż dzięki ekskluzywnym bonusom i odpowiedzialnemu ograniczeniu dostępności.',
          learnContent: {
            videoTitle: 'Dźwignia bonusu w sprzedaży afiliacyjnej',
            summaryText: 'Daj odbiorcom jasny powód zakupu przez Twój link, dołączając wartościowy ekskluzywny bonus, np. listę kontrolną lub zestaw promptów AI.',
            bulletPoints: ['Utwórz jeden prosty dodatkowy bonus', 'Stosuj prawdziwe ograniczenie, np. dla pierwszych 20 kupujących', 'Dopasowany bonus może znacznie zwiększyć konwersję'],
            fullArticleGuide: `### Dźwignia bonusu dla lepszej sprzedaży

Jeśli dziesięciu partnerów promuje ten sam produkt, dlaczego odbiorca ma kupić przez Ciebie? Dopasowany **ekskluzywny bonus** może zwiększyć wartość Twojej rekomendacji.

#### Pomysły na bonus

* Osobista lista kontrolna.
* Krótki, pięciominutowy film wyjaśniający.
* Własny zestaw sprawdzonych promptów.

Kupujący przez Twój link może wysłać potwierdzenie e-mailem i otrzymać obiecany bonus. Utrzymuj prosty proces i dostarczaj materiał szybko.`,
            practicalExamples: ['Przykład: „Kup kurs przez mój link, a otrzymasz bez dodatkowych kosztów dziesięć sprawdzonych promptów AI.”'],
          },
          understandContent: { coreTakeaway: 'Dopasowany bonus daje odbiorcy mocny powód do zakupu przez Twoją rekomendację zamiast bezpośrednio u dostawcy.', keyPrinciples: ['Bonus musi uzupełniać główny produkt', 'Uprość dostarczenie e-mailem'] },
          actionTask: { instruction: 'Jaki bonus możesz zaoferować kupującym?', placeholder: 'Np. Moje dziesięć najlepszych promptów AI do wpisów na Facebooku w PDF' },
        },
        '6.3': {
          stageTitle: '6. Zmieniaj odwiedzających w klientów', title: 'Zaufanie i dowody społeczne',
          description: 'Wykorzystuj opinie klientów i przejrzystość, aby wzmacniać wiarygodność.',
          learnContent: {
            videoTitle: 'Dowody społeczne w e-mail marketingu',
            summaryText: 'Ludzie kierują się doświadczeniami innych. Autentyczne cytaty, opinie i krótkie studia przypadku mogą usunąć ostatnie wątpliwości.',
            bulletPoints: ['Dodaj krótkie autentyczne cytaty do wiadomości follow-up', 'Uczciwie dziel się własnymi wynikami etapowymi', 'Odpowiadaj z wyprzedzeniem na częste obiekcje'],
            fullArticleGuide: `### Dowody społeczne jako wzmocnienie wiarygodności

Ludzie często bardziej ufają doświadczeniom klientów niż twierdzeniom reklamowym.

#### Formy dowodów społecznych

* **Cytaty i zrzuty ekranu**: Prawdziwe opinie uczestników lub klientów.
* **Studia przypadku**: Na przykład „Jak Marek zdobył pierwsze trzy kontakty w 14 dni”.
* **Przejrzystość**: Uczciwie wyjaśnij, co działało, co nie działało i jakie warunki wpłynęły na rezultat.`,
            practicalExamples: ['Za zgodą autorów dodaj zweryfikowane cytaty skutecznych uczestników do odpowiednich wiadomości sprzedażowych.'],
          },
          understandContent: { coreTakeaway: 'Zaufanie jest bezcenne. Osoba, która otrzyma uczciwą poradę, bardziej doceni przyszłe rekomendacje.', keyPrinciples: ['Wiarygodność przed przechwałkami', 'Autentyczne historie są lepsze niż slogany reklamowe'] },
          actionTask: { instruction: 'Potwierdź, że obsługa obiekcji i budowanie zaufania są częścią sekwencji.', checklistItems: ['Częste pytania klientów zidentyfikowane', 'Odpowiedzi dodane do e-maila 5', 'Autentyczne opinie lub demonstracje podlinkowane'] },
        },
        '6.4': {
          stageTitle: '6. Zmieniaj odwiedzających w klientów', title: 'Pierwszy przychód i analiza',
          description: 'Analizuj wskaźniki otwarć, kliknięć i sprzedaży oraz świętuj pierwszy wynik.',
          learnContent: {
            videoTitle: 'Pierwsze prowizje i analiza danych',
            summaryText: 'Gdy kontakty przechodzą przez system, mogą pojawić się pierwsze prowizje. Sprawdź, które wiadomości mają najwięcej otwarć i kliknięć.',
            bulletPoints: ['Docelowy wskaźnik otwarć: powyżej 30–40%', 'Docelowy wskaźnik kliknięć: powyżej 5–10%', 'Sprawdzaj prowizje w panelu afiliacyjnym'],
            fullArticleGuide: `### Zrozum wskaźniki i świętuj pierwsze prowizje

Gratulacje z okazji pierwszych mierzalnych wyników. Teraz zrozum liczby i poprawiaj po jednym słabym punkcie.

#### Trzy najważniejsze wskaźniki

1. **Wskaźnik otwarć**: Procent odbiorców, którzy otworzyli e-mail. Dobry cel początkowy to ponad 30%.
2. **Wskaźnik kliknięć**: Procent czytelników, którzy kliknęli zawarty link. Dobry cel początkowy to ponad 5%.
3. **Współczynnik konwersji**: Procent odwiedzających, którzy kupili na stronie docelowej. Typowy cel początkowy to 1–3%.`,
            practicalExamples: ['Jeśli wiadomość ma niski wskaźnik otwarć, przetestuj prostszy i trafniejszy temat.'],
          },
          understandContent: { coreTakeaway: 'To, co mierzysz, możesz poprawić.', keyPrinciples: ['Testuj A/B tematy wiadomości', 'Najpierw poprawiaj najsłabszy etap'] },
          actionTask: { instruction: 'Co zrobisz z pierwszym euro zarobionym online?', placeholder: 'Np. zainwestuję w domenę albo uczczę ten krok' },
        },
      },
    },
    7: {
      title: '7. Twój system działa',
      subtitle: '🟢 AUTOMATYZACJA',
      description: 'Pełna automatyzacja, wsparcie AI, skalowanie i kolejny krok jako przedsiębiorca online.',
      lessons: {
        '7.1': {
          stageTitle: '7. Twój system działa', title: 'Pełna automatyzacja',
          description: 'Pozwól AI i automatycznym workflow obsługiwać większość powtarzalnej codziennej pracy.',
          learnContent: {
            videoTitle: 'Kompletny system automatyzacji',
            summaryText: 'Twój system jest połączony: ruch trafia na landing page, zainteresowani się zapisują, automatyzacja GOM-MAR wysyła wiadomości, a zakupy są obsługiwane automatycznie.',
            bulletPoints: ['AI może tworzyć nowe cotygodniowe treści w kilka sekund', 'Sekwencje e-mail działają miesiącami bez ręcznej wysyłki', 'Co tydzień sprawdzasz przede wszystkim najważniejsze wskaźniki'],
            fullArticleGuide: `### Tryb pełnej automatyzacji

Masz już zbudowany podstawowy system GOM-MAR Academy. Cyfrowy proces może teraz działać regularnie i wspierać Cię jak dobrze utrzymana maszyna.

#### Automatyczny przepływ

1. **Ruch**: Opublikowane Reelsy, wpisy na Facebooku i Piny nadal przyciągają odwiedzających.
2. **Zapis**: Zainteresowane osoby zapisują się przez landing page.
3. **Wysyłka e-mail**: Automatyzacja GOM-MAR prowadzi komunikację i przedstawia rekomendacje.
4. **Prowizje**: Kwalifikujące się zakupy są śledzone i rozliczane przez platformę afiliacyjną.`,
            practicalExamples: ['Twoje powtarzalne zadanie może ograniczyć się do około 30 minut cotygodniowego monitorowania i aktualizacji treści z GOM-MAR AI Toolbox.'],
          },
          understandContent: { coreTakeaway: 'Masz prawdziwy, działający system dodatkowego dochodu online.', keyPrinciples: ['Systemy zwiększają ilość dostępnego czasu', 'Skaluj przez większy ruch właściwych odbiorców'] },
          actionTask: { instruction: 'Potwierdź aktywację wszystkich elementów systemu:', checklistItems: ['Landing page jest aktywny', 'Automatyzacja e-mail GOM-MAR działa', 'Źródła ruchu są skonfigurowane', 'Narzędzia wsparcia AI są aktywne'] },
        },
        '7.2': {
          stageTitle: '7. Twój system działa', title: 'Skalowanie i druga oferta',
          description: 'Dodawaj uzupełniające oferty partnerskie i zwiększaj długoterminową wartość klienta.',
          learnContent: {
            videoTitle: 'Od pierwszego euro do czterocyfrowego miesięcznego przychodu',
            summaryText: 'System działający dla jednego właściwego kontaktu może działać także dla 100 lub 1000. W późniejszych e-mailach możesz polecać dodatkowe użyteczne narzędzia i kursy.',
            bulletPoints: ['Rozszerz sekwencję o kolejne wiadomości', 'Polecaj dopasowane produkty uzupełniające', 'Buduj długoterminową markę w swojej niszy'],
            fullArticleGuide: `### Skaluj i zwiększaj przychód

Zadowolony klient, który kupił już dzięki Twojej rekomendacji, chętniej doceni kolejną propozycję, jeśli rzeczywiście odpowiada ona jego potrzebom.

#### Dwa sposoby odpowiedzialnego rozszerzania systemu

* Po 14. dniu sekwencji dodaj drugi, uzupełniający produkt partnerski.
* Raz w tygodniu wysyłaj wartościowy newsletter z aktualnościami AI, praktyczną poradą albo dopasowanymi materiałami.

Każda rekomendacja powinna wynikać z pierwotnego celu odbiorcy. Więcej ofert ma sens tylko wtedy, gdy stanowią logiczny następny krok.`,
            practicalExamples: ['Przykład: W drugim miesiącu poleć odpowiednie narzędzie e-mail lub abonament oprogramowania AI z cykliczną prowizją klientom, którzy ukończyli kurs startowy.'],
          },
          understandContent: { coreTakeaway: 'Obsługa istniejących kontaktów jest często znacznie skuteczniejsza niż ciągłe pozyskiwanie nowych.', keyPrinciples: ['Rozszerzaj lejek e-mail świadomie', 'Regularnie wysyłaj wartościowe newslettery'] },
          actionTask: { instruction: 'Użyj Toolboxa, aby utworzyć wiadomość follow-up dla drugiego produktu:', placeholder: 'Wiadomość follow-up utworzona' },
        },
        '7.3': {
          stageTitle: '7. Twój system działa', title: 'Kamień milowy przedsiębiorcy online',
          description: 'Gratulacje—ukończyłeś siedem podstawowych etapów. Odblokuj swój certyfikat.',
          learnContent: {
            videoTitle: 'Twój kolejny rozdział jako przedsiębiorca online',
            summaryText: 'Zrobiłeś to, co wiele osób tylko planuje: zbudowałeś i przetestowałeś kompletny system dochodu online. Działaj regularnie i świętuj ten sukces.',
            bulletPoints: ['Wszystkie siedem podstawowych etapów ukończone', 'Automatyzacja e-mail i narzędzia AI gotowe do użycia', 'Dostęp do społeczności GOM-MAR Pro odblokowany'],
            fullArticleGuide: `### Gratulacje, przedsiębiorco online! 🎉

Ukończyłeś pełny podstawowy program GOM-MAR Academy, zrozumiałeś system i wdrożyłeś go w praktyce.

Masz teraz najważniejsze części automatycznego systemu dodatkowego dochodu cyfrowego:

* **Jasno określoną niszę i grupę docelową**
* **Działający landing page z formularzem zapisu**
* **Automatyczną komunikację e-mail GOM-MAR**
* **Stałe rutyny ruchu wspierane przez AI**

Utrzymuj system w ruchu, zachowaj koncentrację i krok po kroku buduj większą swobodę finansową oraz czasową.`,
            practicalExamples: ['Odblokuj oficjalny certyfikat absolwenta GOM-MAR.'],
          },
          understandContent: { coreTakeaway: 'Gratulacje—osiągnąłeś kamień milowy przedsiębiorcy online w GOM-MAR Academy.', keyPrinciples: ['Nigdy nie przestawaj się uczyć', 'Korzystaj ze społeczności i dziel się doświadczeniem'] },
          actionTask: { instruction: 'Ukończ ostatni moduł podstawowy i odblokuj status poziomu 5.', checklistItems: ['Ukończyłem wszystkie zadania podstawowe', 'Mój system działa i jest gotowy do skalowania', 'Z dumą nazywam siebie przedsiębiorcą online'] },
        },
      },
    },
    8: {
      title: '8. Bonus i Mastermind',
      subtitle: 'Ekskluzywne skalowanie i strategie VIP',
      description: 'Zaawansowane strategie wzrostu, lejki high-ticket i ekskluzywne zasoby VIP dla lepszych wyników.',
      lessons: {
        '8.1': {
          stageTitle: '8. Bonus i Mastermind', title: 'Formuła skalowania 10x',
          description: 'Rozwiń organiczny system dodatkowego dochodu w skalowalny biznes dzięki płatnemu ruchowi i reinwestowaniu.',
          learnContent: {
            videoTitle: 'Odpowiedzialne skalowanie: cykl reinwestowania',
            summaryText: 'Gdy system organiczny generuje sprzedaż, możesz reinwestować część przychodu w ostrożnie testowane reklamy lub współprace.',
            bulletPoints: ['Reinwestuj 30–50% początkowych zysków tylko wtedy, gdy możesz sobie na to pozwolić', 'Skaluj sprawdzone kampanie reklamami Meta i Google', 'Automatyzuj treści zaawansowanymi workflow AI'],
            fullArticleGuide: `### Formuła skalowania 10x dla zaawansowanych marketerów

Jeśli organiczny system regularnie zdobywa kontakty i sprzedaże, masz dowód, że oferta oraz lejek mogą działać. Następnym celem jest zwiększanie skali bez utraty kontroli nad kosztami.

#### Trzy filary skalowania

1. **Płatny ruch**: Korzystaj z reklam Facebooka, Instagrama, TikToka lub wyszukiwarki, aby kierować jasno określoną grupę na stronę zapisu.
2. **Wyższa konwersja**: Ulepszaj nagłówki, tematy wiadomości i przyciski za pomocą kontrolowanych testów A/B.
3. **Większa wartość klienta**: Dodaj dopasowane produkty uzupełniające, abonamenty oprogramowania lub kursy premium do lejka e-mail.

Zacznij od małego budżetu testowego, ustal limit straty i skaluj tylko wtedy, gdy śledzenie pokazuje powtarzalne dodatnie wyniki.`,
            practicalExamples: ['Przykład: test reklamowy za 50 € przynosi 25 kontaktów i dwie sprzedaże z prowizją 60 € każda. To 120 € przychodu i 70 € przed innymi kosztami.'],
          },
          understandContent: { coreTakeaway: 'Skalowanie oznacza reinwestowanie części sprawdzonych zysków w systemy, które mogą przewidywalnie tworzyć dodatkową wartość.', keyPrinciples: ['Znaj koszt pozyskania i długoterminową wartość klienta', 'Testuj małymi krokami przed skalowaniem'] },
          actionTask: { instruction: 'Użyj GOM-MAR Toolbox, aby utworzyć pierwszy wpis skalujący lub skrypt reklamy:', placeholder: 'Skrypt skalowania utworzony' },
        },
        '8.2': {
          stageTitle: '8. Bonus i Mastermind', title: 'Backend high-ticket i oferty VIP',
          description: 'Dowiedz się, jak oferty konsultingowe i mentoringowe premium mogą przynosić większe pojedyncze prowizje.',
          learnContent: {
            videoTitle: 'Afiliacja high-ticket i własne usługi premium',
            summaryText: 'Dopasowana oferta high-ticket wymaga mniejszej liczby klientów, ale także lepszej kwalifikacji, większego zaufania i odpowiedzialnego doradztwa.',
            bulletPoints: ['Programy afiliacyjne high-ticket mogą płacić 300–1000 € lub więcej za sprzedaż', 'Stosuj jasne pytania kwalifikacyjne B2B w rozmowie', 'Korzystaj z automatycznego, ale osobistego lejka umawiania spotkań'],
            fullArticleGuide: `### Zrozumienie ofert high-ticket

Produkty startowe zapewniają łatwiejszy pierwszy krok, natomiast oferty high-ticket mogą rozwiązywać bardziej złożone problemy dzięki głębszemu wsparciu.

#### Dlaczego warto rozważyć high-ticket?

* Jedna prowizja 500 € odpowiada dwudziestu pięciu prowizjom po 20 €.
* Klienci premium oczekują jasnych rezultatów, dobrej realizacji i uczciwej kwalifikacji.
* Możesz prowadzić własne konsultacje albo kierować właściwe osoby do sprawdzonego programu partnerskiego.

Nie polecaj oferty premium wyłącznie z powodu prowizji. Upewnij się, że odbiorca ma realną potrzebę, rozumie zobowiązanie i może podjąć świadomą decyzję.`,
            practicalExamples: ['Przykład: W 10. dniu sekwencji zaproś zakwalifikowanych czytelników na bezpłatną rozmowę strategiczną o dopasowanym programie partnerskim premium.'],
          },
          understandContent: { coreTakeaway: 'Oferty high-ticket dają dźwignię tylko wtedy, gdy najważniejsze są zaufanie, dopasowanie i odpowiedzialne doradztwo.', keyPrinciples: ['Zaufanie jest podstawową walutą', 'Każda konsultacja powinna dawać realną wartość'] },
          actionTask: { instruction: 'Utwórz szablon wiadomości high-ticket w edytorze e-mail:', placeholder: 'Wiadomość high-ticket gotowa' },
        },
        '8.3': {
          stageTitle: '8. Bonus i Mastermind', title: 'Społeczność VIP i program partnerski GOM-MAR',
          description: 'Dołącz do sieci partnerskiej, zdobywaj kwalifikujące się prowizje polecające i wymieniaj doświadczenia w społeczności VIP.',
          learnContent: {
            videoTitle: 'Sieć partnerska i Mastermind GOM-MAR',
            summaryText: 'Absolwenci mogą polecać Academy w programie partnerskim GOM-MAR i uczestniczyć w wymianie doświadczeń VIP.',
            bulletPoints: ['Cykliczne prowizje od kwalifikujących się abonamentów Pro', 'Wymiana VIP Mastermind z doświadczonymi absolwentami', 'Wczesny dostęp do informacji o narzędziach AI i wybranych funkcjach beta'],
            fullArticleGuide: `### Witamy w wewnętrznym kręgu VIP GOM-MAR

Ukończenie programu rozwinęło Twoją umiejętność planowania i budowania praktycznych systemów cyfrowych.

#### Twoje możliwości VIP

* Polecaj GOM-MAR Academy przez osobisty link afiliacyjny, jasno informując o współpracy.
* Korzystaj ze sprawdzonych promptów, szablonów i materiałów marketingowych w Toolboxie.
* Wymieniaj doświadczenia z absolwentami w społeczności VIP i ucz się z praktycznych wyników.

Przestrzegaj zasad reklamy, polecaj tylko rozwiązania pasujące do odbiorców i nigdy nie obiecuj gwarantowanego dochodu.`,
            practicalExamples: ['Użyj asystentki AI Mara, aby zaplanować indywidualną kampanię partnerską dla jasno określonej grupy.'],
          },
          understandContent: { coreTakeaway: 'Silna sieć pomaga uczestnikom szybciej się uczyć i rozwijać dzięki wymianie doświadczeń.', keyPrinciples: ['Dziel się użytecznym doświadczeniem', 'Buduj cykliczny dochód odpowiedzialnie'] },
          actionTask: { instruction: 'Ukończ moduł Mastermind i aktywuj odznakę VIP:', checklistItems: ['Rozumiem odpowiedzialne skalowanie płatnymi reklamami', 'Rozumiem oferty backend high-ticket', 'Jestem gotowy na GOM-MAR VIP Mastermind'] },
        },
      },
    },
    9: {
      title: '9. Agenci AI i autonomiczne workflow',
      subtitle: 'Hiperautomatyzacja z AI i promptami',
      description: 'Dowiedz się, jak wykorzystywać zaawansowanych agentów AI do automatycznych badań rynku, tworzenia treści, generowania obrazów i sprawnej obsługi klientów.',
      lessons: {
        '9.1': {
          stageTitle: '9. Agenci AI i autonomiczne workflow', title: 'Autonomiczne prompty AI i workflow wielu agentów',
          description: 'Twórz połączone prompty AI, które przekształcają jeden pomysł na niszę w kompletny pakiet marketingowy.',
          learnContent: {
            videoTitle: 'Łączenie wielu promptów dla większej efektywności',
            summaryText: 'Łącząc ukierunkowane prompty AI, możesz w jednym uporządkowanym workflow tworzyć nagłówki, teksty landing page, skrypty social media i sekwencje e-mail.',
            bulletPoints: ['Twórz uporządkowane prompty główne dla swojej niszy', 'Łącz analizę grupy docelowej z natychmiastowym tworzeniem treści', 'Znacznie ogranicz powtarzalną pracę ręczną'],
            fullArticleGuide: `### Zasada wielu agentów w automatyzacji marketingu

Nowoczesne systemy AI są szczególnie użyteczne, gdy traktujesz je nie jako pojedyncze narzędzie do pytań i odpowiedzi, lecz jako skoordynowany zespół wyspecjalizowanych asystentów.

#### Trzy role w zespole AI

1. **Agent badawczy**: Analizuje problemy, cele, język i obiekcje grupy docelowej na podstawie wiarygodnych materiałów źródłowych.
2. **Agent copywriterski**: Przekształca wyniki w jasne nagłówki, teksty landing page i szkice e-maili.
3. **Agent projektowy**: Opracowuje kierunki wizualne, koncepcje reklam i pomysły na karuzele social media.

Dla każdej roli określ cel, materiały źródłowe, ograniczenia i kryteria kontroli. Przed publikacją zawsze sprawdzaj wygenerowane twierdzenia, linki i rekomendacje.`,
            practicalExamples: ['Przykład: Przekaż tutorowi AI Mara jasno zdefiniowany pomysł na grupę docelową i poproś o pakiet pięciu szkiców e-maili, a następnie sprawdź i popraw każdą wiadomość przed aktywacją.'],
          },
          understandContent: { coreTakeaway: 'Jasny kontekst i kryteria kontroli zwiększają użyteczność wyników AI; automatyzacja oszczędza czas, ale nie zastępuje odpowiedzialności człowieka.', keyPrinciples: ['Podaj jasny kontekst i grupę docelową', 'Sprawdzaj każdy etap przed publikacją'] },
          actionTask: { instruction: 'Użyj GOM-MAR AI Mara do stworzenia pierwszego uporządkowanego workflow marketingowego:', placeholder: 'Workflow AI utworzony' },
        },
        '9.2': {
          stageTitle: '9. Agenci AI i autonomiczne workflow', title: 'Generowanie obrazów i wizualizacji AI dla lejków treści',
          description: 'Twórz spójne koncepcje wizualne, miniatury i grafiki social media przy wsparciu narzędzi AI.',
          learnContent: {
            videoTitle: 'Skuteczne wizualizacje bez skomplikowanego oprogramowania',
            summaryText: 'Dowiedz się, jak pisać prompty obrazowe dla rozpoznawalnych miniatur, grafik do postów i koncepcji reklamowych w spójnym stylu marki.',
            bulletPoints: ['Generuj spójne światy wizualne dopasowane do palety kolorów', 'Opracowuj hooki i koncepcje dla Reelsów oraz Pinów na Pintereście', 'Traktuj szkice AI jako punkt wyjścia i sprawdzaj licencje, poprawność oraz zgodność z marką'],
            fullArticleGuide: `### Wizualna uwaga dzięki grafikom wspieranym przez AI

Na szybko zmieniających się platformach społecznościowych jasny obraz może pomóc odbiorcom zrozumieć temat jeszcze przed przeczytaniem opisu.

#### Trzyelementowy przepis na obraz

* **Główny motyw**: Wybierz jeden wyraźny temat, na przykład przedsiębiorcę przy pracy albo abstrakcyjną scenę technologiczną.
* **Harmonia kolorów**: Stosuj określone kolory marki, takie jak indygo, głęboki granat i złoty akcent.
* **Atmosfera**: Utrzymuj kompozycję jasną, czytelną, profesjonalną i wolną od niepotrzebnego wizualnego szumu.

Przed komercyjną publikacją sprawdź każdy wygenerowany obraz pod kątem zniekształconych detali, mylących przedstawień, cudzych znaków towarowych i praw do wykorzystania.`,
            practicalExamples: ['Przykład: Użyj asystenta promptów obrazowych w Toolboxie, aby stworzyć trzy kierunki wizualne dla jednej kampanii, a potem wybierz i dopracuj wariant najlepiej pasujący do marki.'],
          },
          understandContent: { coreTakeaway: 'Wizualizacje przyciągają uwagę, a jasny i trafny nagłówek pomaga odbiorcom zdecydować, czy chcą czytać dalej.', keyPrinciples: ['Stosuj spójne elementy marki', 'Przedkładaj jasność nad wizualny szum'] },
          actionTask: { instruction: 'Wygeneruj i sprawdź koncepcję obrazu za pomocą narzędzia promptów AI w Toolboxie:', placeholder: 'Koncepcja obrazu sprawdzona' },
        },
        '9.3': {
          stageTitle: '9. Agenci AI i autonomiczne workflow', title: 'Automatyczny lead nurturing 24/7 z AI',
          description: 'Skonfiguruj systemy odpowiedzi wspierane przez AI, które odpowiadają na częste pytania i pomagają odpowiedzialnie kwalifikować zapytania.',
          learnContent: {
            videoTitle: 'Pomocna obsługa klientów przez całą dobę',
            summaryText: 'Połącz sekwencje e-mail i kanały czatu z nadzorowanym asystentem AI, aby zainteresowani otrzymywali szybkie odpowiedzi oparte na zatwierdzonych informacjach.',
            bulletPoints: ['Odpowiadaj na częste pytania o produkty i kursy o każdej porze', 'Zbieraj informacje kwalifikacyjne przed odpowiednimi spotkaniami', 'Przekazuj wrażliwe, niepewne lub indywidualne pytania człowiekowi'],
            fullArticleGuide: `### Nadzorowany asystent 24/7 do obsługi zapytań klientów

Pytanie bez odpowiedzi może przerwać ścieżkę klienta. Dobrze skonfigurowany asystent zapewnia natychmiastową orientację, pozostawiając ważne decyzje pod kontrolą człowieka.

#### Dlaczego nadzorowany lead nurturing AI jest użyteczny

* Szybko odpowiada na podstawie zatwierdzonych FAQ, informacji o produktach i treści Academy.
* Może zebrać istotny kontekst i skierować zakwalifikowane zapytania do właściwego kolejnego kroku.
* Ogranicza powtarzalną pracę supportu, a niejasne, wrażliwe lub istotne pytania przekazuje człowiekowi.

Informuj użytkowników, że rozmawiają z AI, ograniczaj przechowywanie danych osobowych, zapewnij kontakt z człowiekiem i nigdy nie pozwalaj asystentowi wymyślać cen, gwarancji ani obietnic dochodu.`,
            practicalExamples: ['Użyj Mary w czacie AI, aby zamienić często zgłaszane obiekcje w pomocne szkice FAQ, a następnie zatwierdź odpowiedzi przed automatyzacją.'],
          },
          understandContent: { coreTakeaway: 'Szybkie odpowiedzi mają wartość, gdy są poprawne, przejrzyste, chronią prywatność i umożliwiają przekazanie sprawy człowiekowi.', keyPrinciples: ['Odpowiadaj szybko zatwierdzonymi informacjami', 'Przekazuj niepewne przypadki człowiekowi'] },
          actionTask: { instruction: 'Ukończ moduł Agentów AI i potwierdź odpowiedzialną konfigurację:', checklistItems: ['Rozumiem połączone workflow promptów AI', 'Potrafię planować i sprawdzać wizualizacje wspierane przez AI', 'Rozumiem przejrzysty i nadzorowany lead nurturing 24/7'] },
        },
      },
    },
    10: {
      title: '10. Copywriting e-mail i generator AI',
      subtitle: 'Przekonujące teksty i odpowiedzialne kampanie sprzedażowe',
      description: 'Opanuj jasny, przekonujący copywriting e-mail i korzystaj z szablonów wspieranych przez AI do tematów, hooków oraz uporządkowanych kampanii launchowych.',
      lessons: {
        '10.1': {
          stageTitle: '10. Copywriting e-mail i generator AI', title: 'Anatomia przekonującego e-maila',
          description: 'Poznaj pięć elementów skutecznego e-maila sprzedażowego: temat, hook otwierający, historię, ofertę i jasne wezwanie do działania.',
          learnContent: {
            videoTitle: 'Formuła AIDA dla marketerów e-mail',
            summaryText: 'Dowiedz się, jak tworzyć wiadomości trafne, łatwe do przeczytania i prowadzące zainteresowanego odbiorcę do jednego jasnego kolejnego kroku.',
            bulletPoints: ['Trafne tematy, które uczciwie zapowiadają treść', 'Hooki skupione na sytuacji odbiorcy', 'Jasna oferta bez presji i mylących obietnic'],
            fullArticleGuide: `### Pięć podstawowych elementów skutecznego e-maila

1. **Temat wiadomości**: Powinien być krótki, konkretny i zgodny z treścią. Ciekawość ma sens tylko wtedy, gdy e-mail spełnia złożoną obietnicę.
2. **Hook otwierający**: W pierwszych dwóch zdaniach nawiąż do rozpoznawalnej sytuacji, celu albo pytania odbiorcy.
3. **Historia lub wartość**: Połącz codzienny problem z użyteczną wskazówką, przykładem albo praktyczną lekcją.
4. **Oferta**: Wyjaśnij, w jaki sposób polecany produkt lub kolejny krok może pomóc, dla kogo jest przeznaczony i jakie ma ograniczenia.
5. **Wezwanie do działania**: Użyj jednego jasnego linku lub przycisku, który dokładnie opisuje kolejny krok.

Przed wysyłką sprawdź każde twierdzenie, ujawnij relację afiliacyjną, jeśli jest to wymagane, i zapewnij prostą rezygnację z subskrypcji.`,
            practicalExamples: ['Przykład: Zamiast „Nasz nowy produkt już jest” napisz „Prostszy sposób na planowanie tygodniowych treści”, a następnie uczciwie wyjaśnij metodę w wiadomości.'],
          },
          understandContent: { coreTakeaway: 'Pisz do prawdziwej osoby: łącz empatię i użyteczne informacje z jasnymi, możliwymi do sprawdzenia szczegółami.', keyPrinciples: ['Jasność jest ważniejsza niż spryt', 'Stosuj jedno główne wezwanie do działania w e-mailu'] },
          actionTask: { instruction: 'Użyj generatora e-mail w GOM-MAR Toolbox, aby stworzyć i sprawdzić pierwszy temat wiadomości:', placeholder: 'Temat wiadomości sprawdzony' },
        },
        '10.2': {
          stageTitle: '10. Copywriting e-mail i generator AI', title: 'Generator e-mail AI z Marą',
          description: 'Twórz szkice e-maili dopasowane do odbiorców za pomocą zintegrowanego generatora GOM-MAR AI, a potem je sprawdzaj i personalizuj.',
          learnContent: {
            videoTitle: 'Brief krok po kroku dla lepszych szkiców AI',
            summaryText: 'Podaj cel, grupę docelową, szczegóły oferty i ograniczenia. Mara przygotuje temat, tekst podglądu i edytowalny szkic e-maila.',
            bulletPoints: ['Twórz szkice wiadomości powitalnych, newsletterów, promocji i reaktywacji', 'Wybierz odpowiedni ton: profesjonalny, entuzjastyczny albo bezpośredni', 'Przed wysyłką sprawdź fakty, linki, pola zastępcze i wymogi zgody'],
            fullArticleGuide: `### Copywriting wspierany przez AI bez strachu przed pustą stroną

Generator e-mail GOM-MAR może przygotować użyteczny pierwszy szkic, natomiast odpowiedzialność za poprawność, ton i ostateczną decyzję o wysyłce pozostaje po Twojej stronie.

#### Jak skutecznie przygotować brief

* **Określ cel**: Wybierz wiadomość powitalną, promocyjną, newsletter, edukację albo reaktywację.
* **Opisz odbiorcę**: Uwzględnij jego sytuację, cel, poziom wiedzy i prawdopodobne pytania.
* **Podaj sprawdzone fakty**: Dodaj dwa lub trzy potwierdzone benefity, warunki, ceny lub terminy.
* **Ustal ograniczenia**: Określ ton, długość, zakazane twierdzenia i oczekiwane wezwanie do działania.
* **Sprawdź i spersonalizuj**: Zastąp pola takie jak [IMIĘ], zweryfikuj każdy link i dodaj własne doświadczenie lub perspektywę.

Nie wpisuj do promptu zbędnych danych osobowych ani poufnych informacji klientów.`,
            practicalExamples: ['Użyj generatora do stworzenia szkicu e-maila promującego prawdziwy kod rabatowy, a następnie sprawdź cenę, okres ważności, warunki i link docelowy.'],
          },
          understandContent: { coreTakeaway: 'AI jest asystentem tworzącym szkic: Ty wyznaczasz kierunek, dostarczasz dowody i zachowujesz końcową kontrolę redakcyjną.', keyPrinciples: ['Podawaj jasne i sprawdzone instrukcje', 'Sprawdzaj i personalizuj przed wysyłką'] },
          actionTask: { instruction: 'Otwórz generator e-mail i przygotuj sprawdzony szkic:', placeholder: 'Szkic e-maila sprawdzony' },
        },
        '10.3': {
          stageTitle: '10. Copywriting e-mail i generator AI', title: 'Pięciodniowy flow launchu produktu',
          description: 'Zaplanuj uporządkowaną kampanię e-mail dla prawdziwego launchu, promocji lub oferty specjalnej bez sztucznej presji.',
          learnContent: {
            videoTitle: 'Plan pięciodniowej kampanii sprzedażowej',
            summaryText: 'Wprowadź temat, przedstaw ofertę, pokaż wiarygodne dowody, odpowiedz na pytania i zakończ uczciwym przypomnieniem, jeśli obowiązuje prawdziwy termin.',
            bulletPoints: ['Dzień 1: Wprowadzenie tematu i użyteczna zapowiedź', 'Dzień 2: Otwarcie oferty i główne korzyści', 'Dzień 3: Zweryfikowane doświadczenie klienta lub demonstracja', 'Dzień 4: Odpowiedzi na obiekcje i częste pytania', 'Dzień 5: Ostatnie przypomnienie o prawdziwym terminie'],
            fullArticleGuide: `### Pięciodniowy plan launchu dla jasnej komunikacji z klientami

Uporządkowany launch daje odbiorcom wystarczający kontekst, aby zrozumieli ofertę i ocenili, czy pasuje do ich potrzeb.

#### Pięć etapów

1. **Przygotowanie—dzień 1**: Przedstaw problem, podziel się użyteczną wskazówką i wyjaśnij, czego czytelnicy mogą oczekiwać dalej.
2. **Launch—dzień 2**: Otwórz ofertę, jasno podając korzyści, cenę, warunki i przejrzyste wezwanie do działania.
3. **Dowody—dzień 3**: Udostępnij autoryzowaną opinię, zweryfikowane studium przypadku, demonstrację produktu albo własne udokumentowane doświadczenie.
4. **Pytania—dzień 4**: Omów częste obiekcje, dopasowanie, wymagany wysiłek, ograniczenia, zwroty i wsparcie.
5. **Zamknięcie—dzień 5**: Przypomnij o prawdziwym terminie albo ograniczeniu dostępności. Jeśli nie ma realnego terminu, nie wymyślaj go.

Wyraźnie pokazuj możliwość rezygnacji, respektuj zgodę i zatrzymaj komunikację promocyjną po wypisaniu odbiorcy.`,
            practicalExamples: ['Wczytaj zarys pięciodniowego launchu do edytora sekwencji, zastąp wszystkie pola i sprawdź szczegóły oferty przed zaplanowaniem wysyłki.'],
          },
          understandContent: { coreTakeaway: 'Dobra kampania prowadzi odbiorców przez jasną historię, zachowując ich możliwość podjęcia świadomej decyzji.', keyPrinciples: ['Stosuj wyłącznie prawdziwe terminy', 'Dostarczaj użyteczne informacje w całej sekwencji'] },
          actionTask: { instruction: 'Ukończ moduł Copywritingu e-mail i potwierdź przygotowanie kampanii:', checklistItems: ['Znam pięć elementów skutecznego e-maila', 'Potrafię odpowiedzialnie używać i sprawdzać generator AI', 'Rozumiem pięciodniową strukturę launchu i stosuję wyłącznie prawdziwą pilność'] },
        },
      },
    },
    11: {
      title: '11. Analityka lejka i skalowanie wyników',
      subtitle: 'Decyzje oparte na danych i optymalizacja KPI',
      description: 'Analizuj wskaźniki lejka, takie jak konwersja, współczynnik kliknięć i koszt pozyskania leada, identyfikuj wąskie gardła i poprawiaj wyniki za pomocą kontrolowanych testów.',
      lessons: {
        '11.1': {
          stageTitle: '11. Analityka lejka i skalowanie wyników', title: 'Cztery główne KPI zdrowego lejka',
          description: 'Zrozum współczynnik zapisu, otwarć e-maili, kliknięć i konwersji sprzedażowej, aby trafnie diagnozować lejek.',
          learnContent: {
            videoTitle: 'Analiza lejka: jak czytać liczby',
            summaryText: 'Wiarygodne pomiary pomagają zdecydować, co poprawić. Poznaj cztery ważne wskaźniki, sposób ich obliczania i interpretację w odpowiednim kontekście.',
            bulletPoints: ['Współczynnik zapisu: leady podzielone przez kwalifikujące się wizyty na landing page', 'Współczynnik otwarć: zarejestrowane otwarcia podzielone przez dostarczone e-maile; traktuj śledzenie ograniczone prywatnością jako szacunek', 'CTR: unikalne kliknięcia podzielone przez dostarczone wiadomości lub otwarcia—stosuj jedną definicję konsekwentnie', 'Konwersja sprzedażowa: potwierdzone zakupy podzielone przez kwalifikujące się kliknięcia lub leady'],
            fullArticleGuide: `### Cztery filary analityki lejka

Użyteczne decyzje marketingowe opierają się na spójnych danych, a nie na pojedynczych wrażeniach. Gdy wiesz, na którym etapie ludzie opuszczają lejek, możesz najpierw zbadać właśnie ten fragment.

#### Cztery formuły KPI

1. **Współczynnik zapisu**: Ilu kwalifikujących się odwiedzających zostaje leadami? *(Leady ÷ kwalifikujące się wizyty × 100)*
2. **Współczynnik otwarć**: Ile dostarczonych e-maili rejestruje otwarcie? *(Zmierzone unikalne otwarcia ÷ dostarczone e-maile × 100)*
3. **Współczynnik kliknięć**: Ilu odbiorców klika? *(Unikalne kliknięcia ÷ dostarczone e-maile × 100)* W razie potrzeby osobno mierz click-to-open rate.
4. **Konwersja sprzedażowa**: Ile kwalifikujących się kliknięć lub leadów kończy się potwierdzonym zakupem? *(Zakupy ÷ wybrany mianownik × 100)*

Cele zależą od rynku, jakości ruchu, oferty, urządzenia, zgody i metody pomiaru. Przed porównaniem wyników zapisz dokładną definicję oraz zakres dat każdego raportu.`,
            practicalExamples: ['Przykład: Jeśli zmierzone otwarcia są stosunkowo wysokie, ale kliknięcia pozostają niskie, zbadaj trafność treści, jasność oferty, położenie linku i wezwanie do działania przed zmianą tematu.'],
          },
          understandContent: { coreTakeaway: 'Spójne definicje i wystarczająca ilość danych pomagają znaleźć największe mierzalne wąskie gardło i poprawić je jako pierwsze.', keyPrinciples: ['Zmieniaj jedną istotną zmienną naraz', 'Nie wyciągaj wniosków z bardzo małych lub stronniczych prób'] },
          actionTask: { instruction: 'Sprawdź i udokumentuj wskaźniki kampanii w panelu GOM-MAR:', placeholder: 'Wskaźniki lejka udokumentowane' },
        },
        '11.2': {
          stageTitle: '11. Analityka lejka i skalowanie wyników', title: 'Testy A/B i analiza wąskich gardeł z Marą',
          description: 'Systematycznie porównuj nagłówki, tematy i teksty przycisków, aby sprawdzić, która wersja lepiej działa dla Twoich odbiorców.',
          learnContent: {
            videoTitle: 'Systematyczne testy A/B w marketingu online',
            summaryText: 'Dowiedz się, jak dzielić kwalifikujący się ruch między dwie wersje, ustalić jeden główny wskaźnik i wybrać zwycięzcę dopiero wtedy, gdy wynik jest wystarczająco wiarygodny.',
            bulletPoints: ['Porównuj jedną istotną różnicę w temacie wiadomości naraz', 'Testuj konkretny tekst przycisku przy zachowaniu stałego miejsca i wyglądu', 'Użyj Mary do tworzenia wariantów, a potem sprawdź ich poprawność i uczciwość'],
            fullArticleGuide: `### Praktyka odpowiedzialnych testów A/B

Niewielkie zmiany tekstu mogą wpływać na zachowanie, ale krótkotrwała różnica nie dowodzi automatycznie, że jedna wersja jest lepsza.

#### Zasady testów A/B

* **Zasada 1**: Zmieniaj jedną istotną zmienną w teście, aby wynik pozostał możliwy do interpretacji.
* **Zasada 2**: Przed startem określ odbiorców, główny wskaźnik, minimalną próbę i czas trwania testu.
* **Zasada 3**: Dziel ruch losowo i uruchamiaj obie wersje w tym samym okresie.
* **Zasada 4**: Sprawdzaj praktyczny wpływ oraz niepewność statystyczną. Nie kończ testu tylko dlatego, że jedna wersja chwilowo prowadzi.
* **Zasada 5**: Udokumentuj wynik, wdroż wiarygodnego zwycięzcę i przetestuj kolejną hipotezę.

Przy małym ruchu zbieraj dane dłużej albo traktuj wynik jako wskazówkę, a nie ostateczny dowód.`,
            practicalExamples: ['Poproś Marę o trzy uczciwe koncepcje tematów, wybierz dwa wyraźnie różne podejścia i przetestuj je na tej samej grupie w tym samym oknie wysyłki.'],
          },
          understandContent: { coreTakeaway: 'Testy A/B zastępują zgadywanie uporządkowaną nauką, jeśli są starannie zaprojektowane i interpretowane.', keyPrinciples: ['Testuj hipotezy zamiast przypadkowych detali', 'Pozwól dowodom kierować decyzją'] },
          actionTask: { instruction: 'Utwórz i sprawdź jeden wariant testowy tematu z GOM-MAR AI:', placeholder: 'Wariant testu A/B sprawdzony' },
        },
        '11.3': {
          stageTitle: '11. Analityka lejka i skalowanie wyników', title: 'Strategia reaktywacji i wartości klienta',
          description: 'Nawiąż ponowny kontakt z nieaktywnymi subskrybentami i zwiększaj długoterminową wartość klienta dzięki trafnej komunikacji opartej na zgodzie.',
          learnContent: {
            videoTitle: 'Wartość klienta w czasie: wspieraj subskrybentów długoterminowo',
            summaryText: 'Wielu klientów potrzebuje kilku użytecznych kontaktów przed podjęciem decyzji. Buduj mierzalne procesy reaktywacji i follow-up, które respektują zgodę oraz preferencje.',
            bulletPoints: ['Wyślij krótką sekwencję reaktywacyjną po określonym okresie braku aktywności', 'Polecaj produkty uzupełniające tylko wtedy, gdy odpowiadają pierwotnej potrzebie', 'Korzystaj z dobrowolnych ankiet i ustawień preferencji, aby poprawiać komunikację'],
            fullArticleGuide: `### Perspektywa wartości klienta w czasie

Długoterminowa wartość rośnie, gdy subskrybenci otrzymują trafne wsparcie—nie wtedy, gdy wywiera się na nich presję większą liczbą wiadomości.

#### Trzy odpowiedzialne kroki optymalizacji

1. **Reaktywacja**: Zapytaj nieaktywne kontakty, czy nadal chcą otrzymywać treści, i zapewnij jasny wybór preferencji lub rezygnacji.
2. **Cross-selling**: Polecaj uzupełniające narzędzie lub kurs tylko wtedy, gdy logicznie wspiera istniejący cel klienta; ujawnij relację afiliacyjną.
3. **Higiena listy**: Wstrzymaj lub usuń stale nieaktywne adresy zgodnie z polityką przechowywania, zachowując wymagane prawem zapisy i status rezygnacji.

Korzystaj wyłącznie z danych objętych zgodą, ograniczaj śledzenie, natychmiast respektuj wycofanie zgody i unikaj profilowania wrażliwego bez odpowiedniej podstawy prawnej.`,
            practicalExamples: ['Użyj szablonu reaktywacji w edytorze e-mail, aby wysłać krótkie pytanie o preferencje zamiast agresywnej wiadomości sprzedażowej.'],
          },
          understandContent: { coreTakeaway: 'Trwała wartość klienta wynika z trafnego follow-upu, zaufania i szacunku dla wyborów subskrybenta.', keyPrinciples: ['Regularnie dostarczaj wartość', 'Automatyzuj follow-up z jasną zgodą i zabezpieczeniami'] },
          actionTask: { instruction: 'Ukończ moduł Analityki i Skalowania oraz potwierdź proces pomiaru:', checklistItems: ['Potrafię definiować i obliczać cztery główne KPI lejka', 'Rozumiem, jak projektować i interpretować test A/B', 'Potrafię zwiększać wartość klienta dzięki trafnemu follow-upowi opartemu na zgodzie'] },
        },
      },
    },
    12: {
      title: '12. Skuteczne landing page i kreator no-code',
      subtitle: 'Szybkie i dostępne strony bez programowania',
      description: 'Twórz jasne, szybkie landing page bez kodowania oraz poprawiaj użyteczność mobilną, zgodę, dostępność i pomiar.',
      lessons: {
        '12.1': {
          stageTitle: '12. Skuteczne landing page i kreator no-code', title: 'Anatomia skoncentrowanej strony zapisu',
          description: 'Połącz jasną sekcję hero, użyteczny podtytuł, prosty formularz i wiarygodne elementy zaufania wokół jednego celu.',
          learnContent: {
            videoTitle: 'Struktura landing page ułatwiająca decyzję',
            summaryText: 'Poznaj praktyczny szablon strony zapisu, który wyjaśnia wartość, uczciwie określa oczekiwania i ułatwia zrozumienie kolejnego kroku.',
            bulletPoints: ['Jasna propozycja wartości widoczna bez przewijania', 'Jedno główne działanie bez niepotrzebnych rozproszeń', 'Responsywny i dostępny układ mobile-first'],
            fullArticleGuide: `### Praktyczna struktura landing page

Strona zapisu powinna pomóc właściwemu odwiedzającemu zrozumieć ofertę i zdecydować, czy chce się zapisać. Konwersja jest ważna, ale świadoma zgoda i trafność są ważniejsze.

#### Podstawowe elementy

1. **Prosty nagłówek strony**: Użyj rozpoznawalnego logo i wyłącznie prawdziwych elementów zaufania.
2. **Nagłówek hero**: Jasno określ grupę, problem lub oczekiwany rezultat bez przesadzonych obietnic.
3. **Podtytuł**: Wyjaśnij konkretną wartość lead magnetu i co otrzyma subskrybent.
4. **Formularz i wezwanie do działania**: Proś tylko o niezbędne informacje i dokładnie opisuj działanie.
5. **Zgoda i prywatność**: Wyjaśnij sposób wykorzystania e-maila, podlinkuj politykę prywatności i dodaj wymagane informacje o zgodzie.

Traktuj branżowe wskaźniki konwersji jako kontekst, a nie gwarancję. Mierz własny kwalifikujący się ruch i poprawiaj stronę kontrolowanymi testami.`,
            practicalExamples: ['Użyj generatora landing page GOM-MAR do stworzenia pierwszego szkicu, a potem zastąp wszystkie pola i sprawdź tekst, zgodę, linki oraz układ mobilny.'],
          },
          understandContent: { coreTakeaway: 'Skoncentrowana strona łączy jasną korzyść, przejrzyste oczekiwania i jeden łatwy kolejny krok.', keyPrinciples: ['Jasno wyjaśnij wartość', 'Ogranicz formularz i przejrzyście przedstaw zgodę'] },
          actionTask: { instruction: 'Skonfiguruj i sprawdź stronę w generatorze landing page GOM-MAR:', placeholder: 'Landing page sprawdzona' },
        },
        '12.2': {
          stageTitle: '12. Skuteczne landing page i kreator no-code', title: 'Optymalizacja mobilna i szybkie ładowanie',
          description: 'Popraw użyteczność na smartfonach, skróć czas ładowania i usuń bariery techniczne oraz wizualne.',
          learnContent: {
            videoTitle: 'Optymalizacja szybkości, dostępności i mobilnego UX',
            summaryText: 'Dowiedz się, jak tworzyć wygodne elementy dotykowe, czytelne układy, wydajne media i niezawodne działanie na popularnych urządzeniach mobilnych.',
            bulletPoints: ['Stosuj łatwe do dotknięcia elementy i jasne etykiety formularza', 'Kompresuj obrazy i dobieraj właściwe rozmiary przy zachowaniu odpowiedniej jakości', 'Używaj HTTPS, odpowiedniej polityki prywatności i dostępnych stanów interakcji'],
            fullArticleGuide: `### Mobile first: usuń bariery dla odwiedzających

Powolne ładowanie, nieczytelny tekst i trudne do dotknięcia elementy mogą przerwać wizytę, zanim odbiorca zrozumie ofertę.

#### Lista kontroli mobilnej

* Stosuj czytelny tekst—zwykle co najmniej 16 px dla treści—i odpowiedni kontrast kolorów.
* Zapewnij wygodny rozmiar elementów interaktywnych, jasne etykiety i widoczny fokus.
* Udostępniaj nowoczesne obrazy o właściwym rozmiarze i nie wczytuj zbędnych mediów nad linią przewijania.
* Nie stosuj nachalnych popupów, które zasłaniają stronę lub trudno je zamknąć.
* Sprawdź obsługę klawiaturą, etykiety czytnika ekranu, komunikaty błędów i różne szerokości ekranu.
* Jeśli to możliwe, mierz wydajność prawdziwych użytkowników zamiast polegać na jednym teście laboratoryjnym.

Szybkość ma znaczenie, ale stabilny układ, dostępność i niezawodna funkcjonalność są równie ważne.`,
            practicalExamples: ['Sprawdź podgląd mobilny w kreatorze GOM-MAR i przed publikacją wykonaj prawdziwy test co najmniej w widoku odpowiadającym iPhone’owi oraz urządzeniu z Androidem.'],
          },
          understandContent: { coreTakeaway: 'Szybka, czytelna i dostępna strona mobilna daje większej liczbie osób realną szansę wykonania zamierzonego działania.', keyPrinciples: ['Optymalizuj obrazy i treści krytyczne', 'Projektuj i testuj mobile first'] },
          actionTask: { instruction: 'Ukończ podgląd mobilny i kontrolę dostępności w generatorze landing page:', placeholder: 'Kontrola mobilna ukończona' },
        },
        '12.3': {
          stageTitle: '12. Skuteczne landing page i kreator no-code', title: 'Automatyczne połączenie i publikacja',
          description: 'Połącz landing page z domeną i automatyzacją e-mail opartą na zgodzie, a następnie sprawdź pełną ścieżkę subskrybenta.',
          learnContent: {
            videoTitle: 'Publikacja landing page, połączenie e-mail i pomiar',
            summaryText: 'Połącz formularz z właściwym workflow e-mail, skonfiguruj domenę i wykonaj pełny test przed skierowaniem ruchu na stronę.',
            bulletPoints: ['Połącz formularz z odpowiednią listą i automatyzacją GOM-MAR', 'Użyj zweryfikowanej domeny lub zatwierdzonej subdomeny GOM-MAR z HTTPS', 'Wykonaj testowy zapis i sprawdź zgodę, potwierdzenie, dostarczenie, linki oraz rezygnację'],
            fullArticleGuide: `### Ostatnie kroki do działającego lejka

Publikacja jest procesem weryfikacji, a nie tylko kliknięciem przycisku. Sprawdź każde przekazanie danych, aby subskrybenci otrzymali dokładnie to, co obiecuje strona.

#### Kolejność publikacji

1. **Połącz formularz**: Wybierz właściwą listę, zgodną z prawem metodę zgody, mapowanie pól i workflow powitalny.
2. **Skonfiguruj stronę docelową**: Użyj odpowiedniej strony potwierdzenia, podziękowania lub bridge page bez ukrywania ważnych warunków.
3. **Połącz domenę**: Sprawdź DNS, HTTPS, adres kanoniczny i oczekiwane przekierowania.
4. **Wykonaj pełny test**: Użyj kontrolowanego adresu testowego i sprawdź wysłanie, walidację, zapis zgody, potwierdzenie, dostarczenie lead magnetu, linki i rezygnację.
5. **Sprawdź pomiar**: Potwierdź, że analityka rejestruje tylko zamierzone zdarzenia i respektuje wybory dotyczące zgody.

Nie używaj prawdziwych danych klientów do testów i nie publikuj, dopóki błędy oraz mylące stany nie zostaną poprawione.`,
            practicalExamples: ['Najpierw opublikuj stronę pod adresem podglądu lub ograniczonego testu, ukończ listę kontrolną i dopiero potem skieruj na nią ruch kampanii.'],
          },
          understandContent: { coreTakeaway: 'Lejek jest gotowy dopiero po pomyślnym sprawdzeniu całej ścieżki subskrybenta.', keyPrinciples: ['Przetestuj pełną ścieżkę przed publikacją', 'Po publikacji monitoruj błędy, dostarczenie i zgodę'] },
          actionTask: { instruction: 'Ukończ moduł Landing Page i potwierdź gotowość do publikacji:', checklistItems: ['Rozumiem strukturę skoncentrowanej strony zapisu', 'Sprawdziłem użyteczność mobilną, dostępność i wydajność ładowania', 'Połączyłem i przetestowałem stronę z automatyzacją e-mail opartą na zgodzie'] },
        },
      },
    },
    13: {
      title: '13. Społeczność, lejki evergreen i rozwój biznesu',
      subtitle: 'Trwały rozwój i długoterminowa wartość klienta',
      description: 'Buduj wspierającą społeczność, twórz przejrzyste prezentacje evergreen i rozwijaj powtarzalne systemy zapewniające długoterminową wartość klienta.',
      lessons: {
        '13.1': {
          stageTitle: '13. Społeczność, lejki evergreen i rozwój biznesu', title: 'Zbuduj markę i społeczność VIP',
          description: 'Zmieniaj klientów i subskrybentów w zaangażowanych członków społeczności dzięki użytecznym grupom, wymianie doświadczeń i dobrze moderowanym wydarzeniom.',
          learnContent: {
            videoTitle: 'Budowanie społeczności: od subskrybentów do aktywnych członków',
            summaryText: 'Zaangażowana społeczność może wzmacniać naukę, utrzymanie i zaufanie, gdy jej cel, zasady, moderacja oraz korzyści dla członków są jasne.',
            bulletPoints: ['Wybierz właściwą platformę i jasno określ cel społeczności', 'Zachęcaj do udziału przez ankiety, Q&A, praktyczne wyzwania i prezentowanie członków', 'Chroń członków za pomocą jasnych zasad, moderacji, ustawień prywatności i sposobu zgłaszania problemów'],
            fullArticleGuide: `### Dlaczego społeczność może wzmacniać biznes cyfrowy

Ludzie mogą cenić nie tylko materiały edukacyjne, lecz także dostęp do osób o podobnych celach, z którymi mogą wymieniać praktyczne doświadczenia.

#### Trzy etapy budowania społeczności

1. **Onboarding**: Powitaj członków, wyjaśnij cel i zasady, pokaż pierwszy krok oraz pozwól im kontrolować powiadomienia i widoczność profilu.
2. **Uczestnictwo**: Zadawaj użyteczne cotygodniowe pytania, prowadź przejrzyste Q&A, świętuj potwierdzone postępy i wspieraj kulturalną pomoc wzajemną.
3. **Uznanie**: Dziękuj pomocnym członkom poprzez uczciwie opisane wyróżnienia lub dobrowolne korzyści VIP bez manipulowania aktywnością.

Wyznacz moderatorów, uzyskuj zgodę przed publikacją historii członków, ograniczaj zbierane dane i przygotuj jasny proces skarg, usunięcia treści oraz konta.`,
            practicalExamples: ['Przykład: Zaproponuj zainteresowanym subskrybentom dobrowolny dostęp do moderowanej grupy, jasno opisując jej cel, zasady, ewentualną cenę i ustawienia prywatności.'],
          },
          understandContent: { coreTakeaway: 'Zdrowa społeczność buduje zaufanie dzięki użytecznej wymianie, konsekwentnej moderacji i szacunkowi dla każdego członka.', keyPrinciples: ['Buduj zaufanie autentycznością i zabezpieczeniami', 'Świętuj postępy bez przesady'] },
          actionTask: { instruction: 'Utwórz i sprawdź koncepcję społeczności z tutorem AI Marą:', placeholder: 'Koncepcja społeczności sprawdzona' },
        },
        '13.2': {
          stageTitle: '13. Społeczność, lejki evergreen i rozwój biznesu', title: 'Webinary evergreen i automatyczne lejki VSL',
          description: 'Stwórz prezentację wideo na żądanie, która edukuje zainteresowanych, wyjaśnia ofertę i wspiera świadome decyzje.',
          learnContent: {
            videoTitle: 'Lejki evergreen: system prezentacji na żądanie',
            summaryText: 'Webinar evergreen może być dostępny w dowolnym czasie. Powinien być oznaczony jako nagrany lub dostępny na żądanie i nie może w mylący sposób imitować wydarzenia na żywo.',
            bulletPoints: ['Zbuduj zwięzłą, 15-minutową prezentację video sales letter', 'Zapewnij prawdziwy dostęp na żądanie albo realne terminy spotkań ze wsparciem', 'Wysyłaj przypomnienia przed i po prezentacji wyłącznie na podstawie zgody'],
            fullArticleGuide: `### Zasada przejrzystego webinaru evergreen

Webinar evergreen to nagrana lub automatyczna prezentacja, którą można obejrzeć na żądanie albo o wyznaczonych porach odtwarzania. Jasno poinformuj odbiorców, z jakiego formatu korzystają.

#### Praktyczna struktura 15-minutowego VSL

* **Hook—minuty 0–2**: Określ odbiorcę, problem i wartość obejrzenia bez mylących twierdzeń.
* **Kontekst—minuty 2–5**: Opowiedz trafną, prawdziwą historię albo wyjaśnij znaczenie problemu.
* **Podejście—minuty 5–10**: Naucz podstawowej metody, pokaż jej ograniczenia i zapewnij samodzielnie użyteczną wartość.
* **Wezwanie do działania—minuty 10–15**: Przedstaw ofertę, cenę, warunki, dopasowanie i jeden jasny kolejny krok.

Nie używaj fałszywej liczby uczestników, symulowanych wiadomości czatu, wymyślonego niedoboru ani resetujących się liczników. Jeśli pokazujesz bonus lub termin, musi być prawdziwy i konsekwentnie egzekwowany.`,
            practicalExamples: ['Użyj GOM-MAR Toolbox do stworzenia szkicu VSL, sprawdź każde twierdzenie i przed publikacją dodaj widoczne oznaczenie „nagranie” lub „na żądanie”.'],
          },
          understandContent: { coreTakeaway: 'Przejrzysta prezentacja na żądanie może konsekwentnie edukować zainteresowanych bez udawania transmisji na żywo.', keyPrinciples: ['Stosuj jasną strukturę edukacyjną', 'Informuj przejrzyście o automatyzacji i dostępności'] },
          actionTask: { instruction: 'Wygeneruj i sprawdź skrypt VSL w generatorze e-mail i treści:', placeholder: 'Skrypt VSL sprawdzony' },
        },
        '13.3': {
          stageTitle: '13. Społeczność, lejki evergreen i rozwój biznesu', title: 'Plan rozwoju biznesu i certyfikat',
          description: 'Sprawdź systemy, uporządkuj kolejne ulepszenia i ukończ etap GOM-MAR Business Mastery.',
          learnContent: {
            videoTitle: 'Twój kolejny etap jako przedsiębiorca cyfrowy',
            summaryText: 'Gratulacje z okazji ukończenia tego etapu nauki. Masz teraz uporządkowaną podstawę do budowania, mierzenia i poprawiania odpowiedzialnych systemów marketingu cyfrowego.',
            bulletPoints: ['Sprawdź cały lejek i ścieżkę klienta', 'Ukończ wymagania certyfikatu GOM-MAR Business Mastery', 'Dołącz do społeczności absolwentów, jeśli wspiera Twoje cele'],
            fullArticleGuide: `### Ważny etap—i początek ciągłego doskonalenia

Poznałeś podstawowe i zaawansowane narzędzia do planowania, komunikowania, mierzenia oraz poprawiania ofert cyfrowych.

#### Twoje kolejne kroki

1. **Zabezpiecz system**: Utrzymuj kopie zapasowe, kontrolę dostępu, dokumentację, ustawienia prywatności i procedurę odzyskiwania.
2. **Ulepszaj świadomie**: Wybierz największe potwierdzone wąskie gardło, przeprowadź kontrolowany test i udokumentuj wynik przed zwiększeniem wydatków.
3. **Wspieraj klientów**: Analizuj opinie, jakość realizacji, zwroty, dostępność i czas odpowiedzi supportu.
4. **Dziel się odpowiedzialnie**: Wnoś użyteczne doświadczenia do społeczności absolwentów bez ujawniania danych klientów i obietnic gwarantowanych wyników.

Certyfikat dokumentuje spełnienie wymagań Academy; nie gwarantuje sukcesu komercyjnego, regulowanych uprawnień zawodowych ani określonego dochodu.`,
            practicalExamples: ['Ukończ wymagane lekcje i zadania, a następnie pobierz certyfikat absolwenta GOM-MAR, jeśli kontrola postępu potwierdzi uprawnienie.'],
          },
          understandContent: { coreTakeaway: 'Ukończenie jest ważnym etapem; trwały postęp wynika z dalszego wdrażania, pomiaru i nauki.', keyPrinciples: ['Wdrażaj i regularnie sprawdzaj', 'Ucz się dalej i chroń zaufanie klientów'] },
          actionTask: { instruction: 'Ukończ etap GOM-MAR Academy i potwierdź podstawy Business Mastery:', checklistItems: ['Rozumiem zasady bezpiecznego budowania społeczności', 'Potrafię stworzyć przejrzysty lejek VSL evergreen', 'Sprawdziłem system i rozumiem znaczenie certyfikatu'] },
        },
      },
    },
    14: {
      title: '14. Prawo, zgodność i RODO',
      subtitle: 'Odpowiedzialne podstawy biznesu online',
      description: 'Poznaj praktyczne podstawy prywatności, marketingu, informacji na stronie, praw konsumenta i dokumentacji—oraz sytuacje wymagające lokalnej porady specjalisty.',
      lessons: {
        '14.1': {
          stageTitle: '14. Prawo, zgodność i RODO', title: 'RODO i zgodny e-mail marketing',
          description: 'Zbieraj i wykorzystuj adresy e-mail przejrzyście, dokumentuj zgodę oraz ułatwiaj jej wycofanie i wniesienie sprzeciwu.',
          learnContent: {
            videoTitle: 'E-mail marketing z poszanowaniem prywatności',
            summaryText: 'E-mail marketing wymaga właściwej podstawy prawnej i jasnej informacji. Double opt-in jest powszechnym sposobem weryfikacji adresu i udokumentowania zgody, lecz szczegóły zależą także od krajowych przepisów o komunikacji elektronicznej.',
            bulletPoints: ['Zapisuj treść, czas, źródło i potwierdzenie zgody', 'Podaj link do polityki prywatności i stosuj jasny, odrębny wybór, gdy wymagana jest zgoda', 'Zapewnij widoczną i działającą rezygnację oraz szybko respektuj wycofanie zgody'],
            fullArticleGuide: `### Trzy podstawy odpowiedzialnego e-mail marketingu

Zgodność z prawem nie jest odznaką, którą może zagwarantować narzędzie. Organizacja korzystająca z narzędzia odpowiada za cel, podstawę prawną, informacje, rejestry i odbiorców.

#### Praktyczna lista kontrolna

1. **Wybierz i udokumentuj podstawę prawną**: W przypadku newsletterów promocyjnych często wymagana jest zgoda. Wyjaśnij, kto, co, jak często i w jakim celu wysyła. Nie stosuj zaznaczonych z góry ani niejasnych zgód.
2. **Zweryfikuj i zachowaj dowody**: Double opt-in może potwierdzić kontrolę nad adresem i wzmocnić dowód zgody. Zachowaj proporcjonalny zapis, ale nie twierdź, że sam DOI czyni każdą kampanię zgodną z prawem.
3. **Umożliw wycofanie i sprzeciw**: Rezygnacja powinna być równie łatwa jak zapis. Obsłuż ją szybko i zablokuj dalszy marketing na ten adres, chyba że inna podstawa wymaga ograniczonego przechowywania.
4. **Minimalizuj i chroń dane**: Zbieraj tylko potrzebne pola, ogranicz dostęp, ustal okresy przechowywania oraz sprawdź podmioty przetwarzające i transfery międzynarodowe.

Zasady różnią się zależnie od kraju i rodzaju wiadomości. W nietypowych kampaniach, zakupionych bazach, profilowaniu, danych wrażliwych lub działalności transgranicznej skorzystaj z lokalnej porady. To materiał edukacyjny, nie porada prawna.`,
            practicalExamples: ['W edytorze e-mail GOM-MAR samodzielnie sprawdź treść formularza, link prywatności, przebieg DOI, rejestr zgody i rezygnację; sama obecność funkcji nie gwarantuje zgodności.'],
          },
          understandContent: { coreTakeaway: 'Przejrzysty wybór, wiarygodne dowody i łatwa rezygnacja chronią odbiorców oraz wspierają uczciwy marketing.', keyPrinciples: ['Dokumentuj podstawę prawną i dowody zgody', 'Uczyń rezygnację równie łatwą jak zapis'] },
          actionTask: { instruction: 'Sprawdź i przetestuj zgodę, DOI, prywatność i rezygnację w edytorze e-mail GOM-MAR:', placeholder: 'Przebieg zgodności e-mail sprawdzony' },
        },
        '14.2': {
          stageTitle: '14. Prawo, zgodność i RODO', title: 'Dane operatora, regulaminy i informacje konsumenckie',
          description: 'Zapewnij dokładne, dostępne i właściwe dla jurysdykcji oraz oferty informacje o operatorze, prywatności, reklamie i prawach konsumenta.',
          learnContent: {
            videoTitle: 'Informacje na stronie i ryzyka zgodności',
            summaryText: 'Wymagane informacje zależą od kraju, formy prawnej, odbiorców i transakcji. Powinny być łatwe do znalezienia, aktualne i dopasowane do rzeczywistego operatora oraz oferty.',
            bulletPoints: ['Podaj tożsamość operatora, adres do doręczeń oraz wymagane dane kontaktowe lub rejestrowe', 'Wyraźnie oznacz reklamę i relacje afiliacyjne, gdy jest to wymagane', 'Korzystaj ze sprawdzonych, lokalnych informacji o prywatności, warunkach i odstąpieniu zamiast bezkrytycznie ufać generatorowi'],
            fullArticleGuide: `### Informacje prawne na stronach i profilach społecznościowych

Link w stopce lub profilu jest przydatny, ale nie istnieje uniwersalna ustawowa „zasada dwóch kliknięć”, która zapewnia zgodność każdej strony. Obowiązki zależą od operatora, jurysdykcji, usługi, odbiorców i procesu sprzedaży.

#### Sprawdź następujące obszary

* **Dane usługodawcy**: Wskaż odpowiedzialny podmiot i podaj adres, kontakt, dane rejestrowe, nadzorcze i podatkowe wymagane w danym kraju.
* **Informacje o prywatności**: Jasno opisz cele, podstawy prawne, odbiorców, okresy przechowywania, prawa, transfery i dane kontaktowe zgodnie z rzeczywistym przepływem danych.
* **Komunikacja handlowa**: Oznacz reklamy, sponsoring i afiliację tak, aby użytkownik rozumiał charakter komercyjny przed podjęciem działania.
* **Umowy i konsumenci**: Przy sprzedaży online sprawdź informacje przedumowne, ceny, płatność, dostawę, prawo odstąpienia, treści cyfrowe i przebieg zamówienia. Regulamin nie zastępuje prawa i nie zawsze jest potrzebny.
* **Aktualność**: Nie kopiuj nieaktualnych odniesień—dawna unijna platforma internetowego rozstrzygania sporów została wyłączona w 2025 roku.

Korzystaj z oficjalnych lokalnych źródeł, a istotne lub transgraniczne oferty poddaj kontroli specjalisty. To materiał edukacyjny, nie porada prawna.`,
            practicalExamples: ['Umieść wyraźne linki do danych prawnych i informacji o prywatności, a następnie sprawdź każdy link oraz zgodność treści z firmą, narzędziami, śledzeniem i procesem zakupu.'],
          },
          understandContent: { coreTakeaway: 'Dokładne, dostępne i lokalnie dopasowane informacje ograniczają ryzyko i pomagają klientom podejmować świadome decyzje.', keyPrinciples: ['Dopasuj informacje do operatora i rzeczywistych przepływów danych', 'Sprawdź informacje konsumenckie przed sprzedażą'] },
          actionTask: { instruction: 'Dodaj i sprawdź wymagane linki prawne i prywatności w generatorze landing page:', placeholder: 'Informacje prawne sprawdzone' },
        },
        '14.3': {
          stageTitle: '14. Prawo, zgodność i RODO', title: 'Rejestracja firmy, podatki i dokumentacja',
          description: 'Ustal obowiązki rejestracyjne, podatkowe, fakturowe i księgowe właściwe dla miejsca działalności zamiast polegać na progach z innego kraju.',
          learnContent: {
            videoTitle: 'Firma i podatki: lista kontrolna uwzględniająca jurysdykcję',
            summaryText: 'Obowiązki zależą od kraju, formy prawnej, działalności, klientów i obrotu. Niemieckich pojęć, takich jak §19 UStG i EÜR, nie należy traktować jako uniwersalnych zasad UE.',
            bulletPoints: ['Potwierdź, czy i od kiedy działalność wymaga lokalnej rejestracji', 'Wyjaśnij podatek dochodowy, VAT, fakturowanie i obowiązki transgraniczne przed przyjęciem płatności', 'Prowadź pełną, bezpieczną dokumentację i przestrzegaj lokalnych okresów przechowywania'],
            fullArticleGuide: `### Odpowiedzialnie przygotuj podstawy administracyjne

Nie istnieje jeden unijny proces rejestracji ani wspólny próg zwolnienia małych firm z VAT. Austria, Niemcy, Polska i inne kraje stosują różne urzędy, klasyfikacje, progi i zasady raportowania.

#### Praktyczna kolejność

1. **Określ działalność i miejsce**: Zapisz, co sprzedajesz, gdzie firma ma siedzibę, kim są klienci i gdzie następuje świadczenie.
2. **Sprawdź rejestracje**: Zapytaj właściwy urząd gospodarczy i podatkowy o wymagane rejestracje, licencje, ubezpieczenia społeczne i datę rozpoczęcia obowiązków.
3. **Wyjaśnij VAT i faktury**: Sprawdź aktualne lokalne zasady dla małych firm, miejsce świadczenia B2B/B2C, usługi cyfrowe i wymagania fakturowe. Nie kopiuj starego progu z innej jurysdykcji.
4. **Oddziel i przechowuj dokumenty**: Systematycznie zapisuj faktury, rachunki, umowy i płatności, chroń dane osobowe i przestrzegaj okresów przechowywania.
5. **W razie potrzeby skorzystaj z porady**: Doradca podatkowy lub właściwy urząd powinien sprawdzić sprzedaż transgraniczną, platformy, pracowników, działalność regulowaną i niejasne klasyfikacje.

To lista planowania, a nie porada prawna, podatkowa ani księgowa.`,
            practicalExamples: ['Ustal cotygodniowy proces księgowy w odpowiednim arkuszu lub systemie, a następnie potwierdź konfigurację i okresy przechowywania we właściwym urzędzie lub u doradcy.'],
          },
          understandContent: { coreTakeaway: 'Rzetelny biznes zaczyna się od właściwych dla kraju decyzji rejestracyjnych, podatkowych i dokumentacyjnych opartych na aktualnych faktach.', keyPrinciples: ['Weryfikuj obowiązki w kompetentnych lokalnych źródłach', 'Od początku prowadź pełną i chronioną dokumentację'] },
          actionTask: { instruction: 'Ukończ moduł Prawo i zgodność oraz potwierdź kolejne kroki weryfikacji:', checklistItems: ['Wiem, jak dokumentować zgodę i testować rezygnację', 'Dopasuję informacje prawne i prywatności do jurysdykcji oraz rzeczywistych przepływów danych', 'Wiem, który lokalny urząd lub doradca powinien potwierdzić moje obowiązki rejestracyjne i podatkowe'] },
        },
      },
    },
    15: {
      title: '15. Skalowanie wspierane przez AI i rynki globalne',
      subtitle: 'Międzynarodowe lejki, kwalifikacja i płatny rozwój',
      description: 'Testuj rynki międzynarodowe, kwalifikuj odpowiednich zainteresowanych i wykorzystuj AI do wspierania—nie bezkrytycznej automatyzacji—odpowiedzialnego płatnego wzrostu.',
      lessons: {
        '15.1': {
          stageTitle: '15. Skalowanie wspierane przez AI i rynki globalne', title: 'Wielojęzyczna lokalizacja i testowanie rynków',
          description: 'Wykorzystaj tłumaczenie wspierane przez AI i kontrolę człowieka, aby dopasować lejki, wiadomości i landing page do wybranych odbiorców międzynarodowych.',
          learnContent: {
            videoTitle: 'Ekspansja międzynarodowa przez odpowiedzialną lokalizację',
            summaryText: 'Tłumaczenie może otworzyć test rynku, ale skuteczna lokalizacja wymaga także weryfikacji kulturowej, prawnej, handlowej i językowej.',
            bulletPoints: ['Wybierz jeden obiecujący rynek na podstawie danych, a nie założonych mnożników odbiorców', 'Użyj AI do pierwszej wersji, a następnie sprawdź znaczenie, ton, terminologię i twierdzenia z biegłą osobą', 'Dopasuj walutę, przykłady, obsługę, zgodę, podatki i informacje konsumenckie do rynku docelowego'],
            fullArticleGuide: `### Rozwój międzynarodowy to proces walidacji

AI może skrócić przygotowanie pierwszej wersji lokalizacji, lecz nie usuwa ryzyka językowego, różnic kulturowych, lokalnego prawa, potrzeb obsługi ani konieczności dopasowania produktu do rynku.

#### Praktyczna kolejność wejścia na rynek

1. **Wybierz jeden rynek**: Zbadaj popyt, konkurencję, koszt pozyskania, siłę nabywczą, preferencje płatnicze i możliwość obsługi klientów.
2. **Zlokalizuj całą ścieżkę**: Dopasuj komunikat, przykłady, jednostki, waluty, daty, formularze, e-maile, zakup, obsługę i informacje prawne—a nie tylko nagłówek.
3. **Sprawdź jakość**: Poproś biegłą osobę o kontrolę znaczenia, głosu marki, idiomów, wrażliwych sformułowań i twierdzeń. Tłumaczenie zwrotne może ujawnić ważne błędy.
4. **Przeprowadź ograniczony test**: Zacznij od małej grupy i mierz kwalifikowane kontakty, konwersję, zwroty, obciążenie obsługi i opinie w danym języku.
5. **Popraw przed ekspansją**: Usuń największy potwierdzony problem przed dodaniem języka lub zwiększeniem wydatków.

Za wynik AI odpowiada człowiek. Nie publikuj zmyślonych opinii, nieprawdziwych gwarancji ani nieprzetłumaczonych elementów prawnych i zakupowych.`,
            practicalExamples: ['Przełącz język landing page i Academy GOM-MAR, a potem przetestuj całą ścieżkę z biegłą osobą mówiącą po angielsku lub polsku przed uruchomieniem ruchu.'],
          },
          understandContent: { coreTakeaway: 'Rozwój międzynarodowy wynika ze starannej lokalizacji i walidacji rynku, a nie z samego tłumaczenia.', keyPrinciples: ['Waliduj jeden rynek naraz', 'Treści dla klientów poddawaj kontroli biegłej osoby'] },
          actionTask: { instruction: 'Przetestuj zmianę języka i sprawdź jedną pełną zlokalizowaną ścieżkę użytkownika:', placeholder: 'Zlokalizowana ścieżka sprawdzona' },
        },
        '15.2': {
          stageTitle: '15. Skalowanie wspierane przez AI i rynki globalne', title: 'Oferty o wyższej wartości i odpowiedzialna kwalifikacja',
          description: 'Zbuduj przejrzysty proces kwalifikacji i rezerwacji dla coachingu, agencji lub doradztwa, który rzeczywiście odpowiada potrzebom zainteresowanego.',
          learnContent: {
            videoTitle: 'Oferty o wyższej wartości: dopasowanie przed automatyzacją',
            summaryText: 'Formularze i kalendarz porządkują zapytania, lecz wyższa cena nie gwarantuje większego zysku, łatwiejszej realizacji ani odpowiednich klientów.',
            bulletPoints: ['Pytaj tylko o potrzebne cele, kontekst, termin i dopasowanie', 'Używaj AI do podsumowania informacji, a nie nieprzejrzystych decyzji o kwalifikacji', 'Przed rezerwacją wyjaśnij zakres, cenę, wymagania, ograniczenia i cel rozmowy'],
            fullArticleGuide: `### Cel lejka kwalifikacyjnego

Kwalifikacja powinna pomóc obu stronom ocenić, czy rozmowa ma sens. Nie może manipulować, bezprawnie dyskryminować ani przedstawiać automatycznej punktacji jako profesjonalnej oceny.

#### Odpowiedzialny proces kwalifikacji

1. **Jasna strona oferty**: Opisz właściwego klienta, zakres, cenę lub przedział cenowy, sposób realizacji, wyłączenia i realistyczne rezultaty.
2. **Krótki formularz**: Zadaj niewiele istotnych pytań. Unikaj danych wrażliwych, jeśli nie są konieczne, legalnie przetwarzane i chronione.
3. **Kontrola człowieka**: AI może porządkować lub podsumowywać odpowiedzi, lecz odpowiedzialna osoba powinna zatwierdzać istotne decyzje i zapewnić kontakt.
4. **Rezerwacja i przygotowanie**: Zaproponuj właściwym osobom prawdziwy termin i wyjaśnij czas, uczestników, przygotowanie oraz zasady odwołania.
5. **Uczciwa rozmowa**: Zdiagnozuj potrzeby, ujawnij ograniczenia i odradź zakup, jeśli oferta nie pasuje.

Przychód ze sprzedaży nie jest zyskiem. Uwzględnij realizację, obsługę, zwroty, koszt pozyskania, podatki i możliwości czasowe przed uznaniem droższej oferty za lepszą.`,
            practicalExamples: ['Użyj Mary do przygotowania pięciu neutralnych pytań, usuń zbędne lub wrażliwe pola i określ udokumentowany etap kontroli człowieka.'],
          },
          understandContent: { coreTakeaway: 'Dobra kwalifikacja chroni zainteresowanego i jakość realizacji, ustalając prawdziwe dopasowanie przed rozmową sprzedażową.', keyPrinciples: ['Zbieraj tylko dane potrzebne do oceny dopasowania', 'Istotne decyzje pozostaw wyjaśnialne i pod kontrolą człowieka'] },
          actionTask: { instruction: 'Utwórz i sprawdź przejrzysty skrypt kwalifikacyjny z Marą:', placeholder: 'Skrypt kwalifikacyjny sprawdzony' },
        },
        '15.3': {
          stageTitle: '15. Skalowanie wspierane przez AI i rynki globalne', title: 'Mierzone skalowanie ruchu i reklamy wspierane przez AI',
          description: 'Używaj AI do opracowania wariantów reklam, a twierdzenia, zgodę, pomiar, budżet i optymalizację kontroluj z udziałem człowieka.',
          learnContent: {
            videoTitle: 'Płatny rozwój: kontrolowane eksperymenty zamiast autopilota',
            summaryText: 'AI może przyspieszyć tworzenie kreacji i analizę, ale żadna platforma, kampania ani model nie gwarantuje konwersji, rentownego ruchu lub maksymalnego ROAS.',
            bulletPoints: ['Twórz odrębne koncepcje zgodne z zasadami i sprawdzaj każde twierdzenie faktyczne lub wynikowe', 'Testuj jedną istotną zmienną naraz z określonym budżetem i regułą decyzji', 'Oceniaj marżę pokrycia, zwroty i jakość kontaktów, a nie sam ROAS'],
            fullArticleGuide: `### Kontrolowane podejście do płatnego ruchu

Reklama płatna kupuje możliwość dotarcia do odbiorców; sama nie tworzy przewidywalnych klientów. Wyniki zależą od oferty, grupy, kreacji, landing page, jakości pomiaru, konkurencji i realizacji.

#### Pięć elementów użytecznego eksperymentu

1. **Określ cel**: Wybierz rezultat biznesowy i zdarzenie, które prawidłowo go reprezentuje.
2. **Twórz prawdziwe warianty**: Użyj AI do pomysłów i szkiców, a następnie sprawdź twierdzenia, materiały, prawa, oznaczenia i zgodność z zasadami platformy.
3. **Ujednolić ścieżkę**: Reklama i landing page powinny przedstawiać tę samą ofertę bez ukrytych warunków i mylącej presji czasu.
4. **Ustal zabezpieczenia**: Określ budżet, czas, minimalne dowody, warunki zatrzymania i osobę zatwierdzającą zmiany.
5. **Oceń wartość biznesową**: Sprawdź ograniczenia pomiaru, kwalifikowane konwersje, koszt pozyskania, marżę, zwroty, utrzymanie i obciążenie obsługi.

Skaluj stopniowo tylko wtedy, gdy wyniki pozostają wiarygodne po kosztach. Nie pozwalaj AI samodzielnie zmieniać budżetu, targetowania ani twierdzeń bez limitów, logów i odpowiedzialnej kontroli człowieka.`,
            practicalExamples: ['Wygeneruj pięć wyraźnie różnych hooków, sprawdź każde twierdzenie, wybierz dwa do ograniczonego testu i przed startem zapisz budżet, miernik oraz warunek zatrzymania.'],
          },
          understandContent: { coreTakeaway: 'Płatny rozwój staje się łatwiejszy do zarządzania dzięki prawdziwym kreacjom, kontrolowanym testom i pełnej ekonomii jednostkowej, a nie obietnicy autopilota.', keyPrinciples: ['Stosuj limity budżetu i zgodności', 'Skaluj potwierdzoną marżę, nie sam nagłówkowy ROAS'] },
          actionTask: { instruction: 'Ukończ moduł skalowania i potwierdź kontrolowany plan rozwoju:', checklistItems: ['Potrafię walidować jeden rynek i zlokalizowaną ścieżkę naraz', 'Potrafię zbudować przejrzysty proces kwalifikacji kontrolowany przez człowieka', 'Potrafię określić ograniczony test reklamowy z kontrolą twierdzeń, budżetu i zatrzymania'] },
        },
      },
    },
    16: {
      title: '16. Automatyzacja AI, procesy i niezawodne operacje',
      subtitle: 'Wydajne workflow z kontrolą i odpowiedzialnym nadzorem',
      description: 'Połącz CRM, e-mail, płatności i usługi AI w obserwowalne procesy, które bezpiecznie obsługują błędy, a istotne działania pozostawiają pod kontrolą człowieka.',
      lessons: {
        '16.1': {
          stageTitle: '16. Automatyzacja AI, procesy i niezawodne operacje', title: 'Zintegrowane workflow i bezpieczne webhooki',
          description: 'Połącz źródła kontaktów, e-mail, CRM i płatności, jednocześnie walidując dane, uwierzytelniając zdarzenia i bezpiecznie obsługując błędy.',
          learnContent: {
            videoTitle: 'Automatyzacja workflow: integracje, webhooki i zabezpieczenia',
            summaryText: 'Automatyzacja ogranicza powtarzalną pracę, lecz niezawodny przepływ wymaga uwierzytelniania, walidacji, idempotencji, monitorowania i procedury odzyskiwania.',
            bulletPoints: ['Uwierzytelniaj nadawców webhooków i przyznawaj integracjom tylko niezbędne uprawnienia', 'Waliduj, minimalizuj i mapuj dane przed ich użyciem', 'Zapobiegaj duplikatom, a błędy kieruj do logów, alertów i kontrolowanych ponowień'],
            fullArticleGuide: `### Buduj automatyzację, której można zaufać

Żaden workflow nie jest trwale bezbłędny. Dostawcy mają przerwy, format danych się zmienia, użytkownicy wysyłają formularz dwukrotnie, a poświadczenia wygasają. Proces produkcyjny musi wykrywać i ograniczać te awarie.

#### Bezpieczny cykl zdarzenia

1. **Wyzwalacz**: Odbierz zdarzenie przez uwierzytelnione połączenie. Sprawdź podpis, czas i oczekiwane źródło.
2. **Walidacja i minimalizacja**: Sprawdź schemat, pola oraz stan zgody. Odrzuć błędne dane i zachowaj tylko to, co potrzebne.
3. **Usuwanie duplikatów**: Użyj stałego identyfikatora zdarzenia lub transakcji, aby ponowienie nie wysłało kolejnego e-maila, faktury lub dostępu.
4. **Wykonanie z limitami**: Stosuj minimalne uprawnienia, limity czasu i częstotliwości oraz ograniczone ponowienia z opóźnieniem.
5. **Obserwacja i odzyskiwanie**: Zapisuj bezpieczne logi operacyjne, alarmuj o błędach, izoluj nierozwiązane zdarzenia i opisz ręczne odtworzenie lub wycofanie.

Płatności, zwroty, usuwanie kont, publikacja i masowe wysyłki powinny wymagać jawnej akceptacji lub silniejszych kontroli. Nie umieszczaj sekretów w kodzie, zmiennych widocznych w przeglądarce ani logach.`,
            practicalExamples: ['Przetestuj workflow kontaktu GOM-MAR poprawnym zdarzeniem, duplikatem i celowo błędnymi danymi; sprawdź, czy każde kończy się oczekiwanym bezpiecznym wynikiem.'],
          },
          understandContent: { coreTakeaway: 'Niezawodna automatyzacja zakłada wystąpienie błędów i czyni je widocznymi, ograniczonymi oraz możliwymi do naprawienia.', keyPrinciples: ['Uwierzytelniaj, waliduj i deduplikuj każde zdarzenie', 'Stosuj ograniczone ponowienia, alerty i procedury odzyskiwania'] },
          actionTask: { instruction: 'Sprawdź aktywne wyzwalacze GOM-MAR oraz kontrolę błędów:', placeholder: 'Kontrole automatyzacji sprawdzone' },
        },
        '16.2': {
          stageTitle: '16. Automatyzacja AI, procesy i niezawodne operacje', title: 'Obsługa klienta wspierana przez AI i bezpieczna eskalacja',
          description: 'Używaj AI do zatwierdzonych FAQ, klasyfikacji i szkiców, zachowując prywatność, uczciwe informowanie i niezawodny dostęp do człowieka.',
          learnContent: {
            videoTitle: 'Automatyzacja obsługi z granicami i przekazaniem człowiekowi',
            summaryText: 'AI może przyspieszyć rutynową obsługę, lecz skuteczność jest różna, a sprawy wrażliwe, niepewne lub istotne wymagają kontroli wyszkolonej osoby.',
            bulletPoints: ['Opieraj odpowiedzi na zatwierdzonej, wersjonowanej bazie wiedzy i pokazuj datę kontroli', 'Minimalizuj dane osobowe i ogranicz dostęp do zgłoszeń oraz historii rozmów', 'Przekazuj człowiekowi niepewność, reklamacje, płatności, bezpieczeństwo, prywatność i dostęp do konta'],
            fullArticleGuide: `### Projektuj obsługę wokół bezpieczeństwa klienta

Asystent AI powinien jasno się identyfikować, opisywać ograniczenia i udostępniać widoczną drogę do pomocy człowieka. Całodobowa automatyczna odpowiedź nie oznacza całodobowego rozwiązania sprawy.

#### Odpowiedzialny workflow obsługi

* **Kontrolowana wiedza**: Używaj zatwierdzonych FAQ, instrukcji i zasad z właścicielem, datą kontroli oraz źródłami.
* **Ograniczone odpowiedzi**: Wymagaj przyznania niepewności i blokuj wymyślanie zasad, zwrotów, wniosków prawnych lub zmian konta.
* **Ochrona danych**: Nie proś o hasła, pełne dane płatnicze ani zbędne informacje wrażliwe. Redaguj logi i określ okres przechowywania.
* **Eskalacja według ryzyka**: Natychmiast przekazuj bezpieczeństwo, prywatność, spory płatnicze, osoby podatne, groźby, powtarzalne błędy i odpowiedzi o niskiej pewności.
* **Kontrola jakości**: Przeglądaj próbki rozmów i mierz poprawne rozwiązanie oraz eskalację, nie tylko szybkość. Zapewnij sposób korekty.

Reset hasła musi korzystać z bezpiecznego procesu tożsamości produktu; chatbot nie może omijać uwierzytelniania ani ujawniać danych konta.`,
            practicalExamples: ['Użyj Mary do przygotowania pięciu FAQ, dodaj zatwierdzone źródło do każdego, odpowiedź na niepewność i dokładne reguły utworzenia zgłoszenia dla człowieka.'],
          },
          understandContent: { coreTakeaway: 'Użyteczna obsługa AI łączy szybką rutynową pomoc z ochroną prywatności, uczciwymi ograniczeniami i niezawodną eskalacją.', keyPrinciples: ['Opieraj odpowiedzi na sprawdzonych źródłach', 'Eskaluj sprawy wrażliwe lub niepewne'] },
          actionTask: { instruction: 'Utwórz i sprawdź oparte na źródłach FAQ oraz reguły eskalacji z Marą:', placeholder: 'FAQ i reguły eskalacji sprawdzone' },
        },
        '16.3': {
          stageTitle: '16. Automatyzacja AI, procesy i niezawodne operacje', title: 'System kontroli operacyjnej zamiast autopilota biznesu',
          description: 'Połącz automatyzacje w zarządzalny system z właścicielami, dashboardami, progami akceptacji i regularnym utrzymaniem.',
          learnContent: {
            videoTitle: 'Od powtarzalnych operacji do nadzorowanych systemów',
            summaryText: 'Automatyzacja może zmniejszyć wysiłek ręczny, ale firma nadal wymaga odpowiedzialnych decyzji, obsługi klienta, aktualizacji zabezpieczeń, kontroli finansowej i reakcji na incydenty.',
            bulletPoints: ['Przypisz właściciela, cel, uprawnienia i procedurę odzyskiwania do każdego krytycznego workflow', 'Monitoruj wyniki klientów, błędy, koszty i bezpieczeństwo, a nie tylko KPI marketingu', 'Planuj przeglądy poświadczeń, dostawców, wiedzy, zgód, kopii zapasowych i reguł akceptacji'],
            fullArticleGuide: `### Cel: nadzorowany i odporny system operacyjny

Użyteczny „autopilot” nie oznacza firmy bez nadzoru. To udokumentowane procedury obsługujące powtarzalne zadania niskiego ryzyka, podczas gdy ludzie odpowiadają za strategię i istotne decyzje.

#### Cotygodniowy przegląd operacyjny

1. **Ścieżka klienta**: Sprawdź dostarczenie, dostęp, support, reklamacje, zwroty i problemy dostępności.
2. **Stan workflow**: Przejrzyj błędy, ponowienia, duplikaty, wiek kolejki, status dostawców i nietypowy wolumen.
3. **Marketing i ekonomia**: Oceń kwalifikowane wyniki, zgody, wydatki, marżę i mylące lub nieaktualne treści.
4. **Bezpieczeństwo i prywatność**: Sprawdź zmiany dostępu, podejrzane zdarzenia, wygasanie sekretów, problemy procesorów i żądania praw lub usunięcia.
5. **Decyzja o poprawie**: Wybierz jedno potwierdzone wąskie gardło, przypisz właściciela i przetestuj ograniczoną zmianę z kryterium wycofania.

Utrzymuj listę kontaktów incydentowych, kopie zapasowe, testy odtworzenia i ręczny proces awaryjny dla krytycznej obsługi klienta. Automatyzacja zmienia pracę, ale nie usuwa odpowiedzialności.`,
            practicalExamples: ['Utwórz jednostronicowy rejestr każdego krytycznego procesu: właściciel, używane dane, poświadczenia, alert błędu, wymagana akceptacja i procedura odzyskiwania.'],
          },
          understandContent: { coreTakeaway: 'Trwała automatyzacja ogranicza powtarzalność, zachowując jasną odpowiedzialność, nadzór i odzyskiwanie.', keyPrinciples: ['Automatyzuj rutynę niskiego ryzyka, nie odpowiedzialność', 'Regularnie sprawdzaj i testuj systemy krytyczne'] },
          actionTask: { instruction: 'Ukończ moduł operacyjny i potwierdź podstawy kontroli:', checklistItems: ['Potrafię zabezpieczyć, walidować, deduplikować i monitorować webhooki', 'Potrafię określić obsługę AI opartą na wiedzy z niezawodną eskalacją', 'Każda krytyczna automatyzacja ma właściciela, kontrolę i procedurę odzyskiwania'] },
        },
      },
    },
    17: {
      title: '17. Marketing omnichannel i odpowiedzialne media AI',
      subtitle: 'Systemy wideo, audio i treści dopasowanych do kanału',
      description: 'Twórz i przekształcaj wideo oraz audio wspierane przez AI, chroniąc prawa, zgodę, autentyczność i jakość w każdym kanale.',
      lessons: {
        '17.1': {
          stageTitle: '17. Marketing omnichannel i odpowiedzialne media AI', title: 'Wideo AI i faceless short-form content',
          description: 'Twórz użyteczne krótkie filmy bez występowania przed kamerą, respektując prawa do mediów, zasady platform i prawdziwy przekaz.',
          learnContent: {
            videoTitle: 'Faceless short video: jasna wartość bez obietnic viralności',
            summaryText: 'Krótkie wideo pozwala testować pomysły i docierać do nowych widzów, lecz AI, hooki i regularne publikowanie nie gwarantują wyświetleń, kontaktów ani viralności.',
            bulletPoints: ['Używaj nagrań, obrazów, muzyki, fontów, awatarów i głosów tylko z właściwymi prawami lub licencjami', 'Napisz jasne otwarcie, jedną użyteczną ideę i uczciwy kolejny krok', 'Przed publikacją sprawdź napisy, wymowę, dostępność, twierdzenia i wymagane oznaczenie AI'],
            fullArticleGuide: `### Twórz użyteczny faceless short-form content

Nie musisz pokazywać twarzy, ale odpowiadasz za każdy wygenerowany obraz, głos, twierdzenie i wezwanie do działania. Syntetyczni prezenterzy nie mogą podszywać się pod prawdziwe osoby ani wprowadzać w błąd co do rekomendacji lub wydarzeń.

#### Praktyczna struktura krótkiego wideo

1. **Otwarcie**: Szybko określ istotny problem lub rezultat bez sensacyjnych gwarancji.
2. **Wartość**: Wyjaśnij jedną możliwą do użycia ideę z poprawnymi przykładami i czytelnymi napisami.
3. **Kontekst**: Podaj ważne ograniczenia, warunki lub dowody, gdy temat tego wymaga.
4. **Kolejny krok**: Zaproponuj jasne, proporcjonalne działanie zgodne ze stroną docelową.
5. **Kontrola jakości i praw**: Potwierdź licencje, zgodę, oznaczenie, dźwięk, napisy, pisownię, linki i widok mobilny.

Zachowuj dowody licencji i zgody. Nie klonuj wyglądu ani głosu osoby, nie wymyślaj opinii, nie ukrywaj sponsoringu i nie przedstawiaj wygenerowanych scen jako prawdziwego dowodu.`,
            practicalExamples: ['Wygeneruj z Marą trzy hooki, wybierz najjaśniejszy, sprawdź każde twierdzenie i materiał, a następnie opublikuj ograniczony test bez obietnicy viralności.'],
          },
          understandContent: { coreTakeaway: 'Faceless content opiera się na użytecznych ideach, legalnych materiałach, uczciwym przekazie i regularnym testowaniu, a nie gwarantowanej viralności.', keyPrinciples: ['Sprawdzaj prawa, twierdzenia i oznaczenia', 'Optymalizuj wartość i dostępność dla widza'] },
          actionTask: { instruction: 'Utwórz i sprawdź hooki krótkiego wideo z Marą:', placeholder: 'Hooki wideo sprawdzone' },
        },
        '17.2': {
          stageTitle: '17. Marketing omnichannel i odpowiedzialne media AI', title: 'Klonowanie głosu, podcasty i audio marketing',
          description: 'Twórz dostępne audio i podcasty przy użyciu głosów, do których masz uprawnienia, oraz procesu kontroli zapobiegającego podszywaniu się i dezinformacji.',
          learnContent: {
            videoTitle: 'Audio AI: zgoda, jakość i odpowiedzialna publikacja',
            summaryText: 'AI może zamienić zatwierdzony skrypt w audio, lecz klonowanie głosu wymaga wyraźnej świadomej zgody, bezpiecznych nagrań źródłowych i jasnych granic użycia.',
            bulletPoints: ['Klonuj wyłącznie własny głos lub głos objęty wyraźnym, udokumentowanym pozwoleniem i warunkami narzędzia', 'Oznacz syntetyczne lub istotnie zmienione audio, gdy wymagają tego zasady albo brak oznaczenia mógłby wprowadzać w błąd', 'Sprawdź wymowę, fakty, prawa do muzyki, głośność, metadane, transkrypcję i ustawienia dystrybucji'],
            fullArticleGuide: `### Buduj zaufanie odpowiedzialnym audio

Audio jest wygodne i osobiste, ale realistyczny syntetyczny głos może także służyć oszustwu lub podszywaniu się. Zgoda na nagranie nie oznacza automatycznie zgody na klonowanie, edycję, publikację i każde przyszłe użycie.

#### Bezpieczny workflow audio AI

1. **Prawa i zgoda**: Zapisz, czyj głos i skrypt są używane, dozwolone cele, kanały, czas, wynagrodzenie i procedurę wycofania.
2. **Zatwierdzony skrypt**: Przed generowaniem sprawdź fakty, nazwy, reklamy, cytaty, wrażliwe twierdzenia i CTA.
3. **Bezpieczne generowanie**: Chroń nagrania źródłowe i dostęp do modelu; nie przesyłaj poufnych treści niezatwierdzonemu dostawcy.
4. **Odsłuch człowieka**: Sprawdź znaczenie, wymowę, ton, artefakty, dostępność i potrzebę oznaczenia.
5. **Świadoma publikacja**: Dodaj poprawny tytuł, opis, transkrypcję, autorstwo i oznaczenie reklamy; sprawdź zasady platformy oraz licencje muzyczne.

Odtwarzacz może poprawić dostępność dla części osób, ale nie gwarantuje dłuższych wizyt ani konwersji. Mierz użycie i zachowaj alternatywę tekstową.`,
            practicalExamples: ['Zaplanuj intro audio własnym autoryzowanym głosem lub licencjonowanym głosem syntetycznym, dodaj transkrypcję i oznaczenie oraz odsłuchaj całość przed osadzeniem.'],
          },
          understandContent: { coreTakeaway: 'Odpowiedzialne audio AI łączy udokumentowane prawa do głosu, bezpieczną obsługę, przejrzysty przekaz i kontrolę człowieka.', keyPrinciples: ['Uzyskaj konkretną zgodę przed klonowaniem głosu', 'Zapewnij oznaczenie i dostępną transkrypcję'] },
          actionTask: { instruction: 'Zaplanuj i sprawdź autoryzowane intro audio w edytorze treści:', placeholder: 'Koncepcja audio sprawdzona' },
        },
        '17.3': {
          stageTitle: '17. Marketing omnichannel i odpowiedzialne media AI', title: 'Przekształcanie treści dopasowane do kanału',
          description: 'Przekształć jedno sprawdzone źródło w wybrane formaty, dopasowując kontekst, prawa, dostępność i CTA do każdego kanału.',
          learnContent: {
            videoTitle: 'Repurposing: jedno źródło, starannie dopasowane formaty',
            summaryText: 'Repurposing skraca tworzenie szkiców, ale kopiowanie tej samej wiadomości wszędzie często daje słabe, powtarzalne lub niezgodne treści.',
            bulletPoints: ['Zacznij od sprawdzonego źródła z jasnymi twierdzeniami, prawami i celem', 'Wybierz formaty według zachowania odbiorców zamiast arbitralnej zasady „jeden do dziesięciu”', 'Sprawdzaj każdy format pod kątem specyfiki kanału, praw, dostępności, linków i aktualności'],
            fullArticleGuide: `### Kontrolowany workflow omnichannel

Użyj jednego mocnego źródła jako kotwicy faktów, a potem twórz tylko formaty służące określonej grupie i celowi.

#### Kolejność przekształcania

1. **Zatwierdź źródło**: Sprawdź fakty, daty, pozwolenia, oznaczenia i główny przekaz.
2. **Wybierz kanały**: Korzystaj z kanałów, które możesz utrzymać i w których odbiorcy faktycznie są aktywni.
3. **Dopasuj zamiast kopiować**: Zmień długość, otwarcie, warstwę wizualną, metadane, dostępność i CTA dla każdego formatu.
4. **Kontrola kanałowa**: Obejrzyj prawdziwy podgląd; sprawdź kadrowanie, napisy, alt text, linki, tagi, dźwięk, oznaczenia i termin.
5. **Publikuj z kontrolą**: Stosuj status akceptacji, minimalne uprawnienia, ochronę przed duplikatami, alert błędu i możliwość zatrzymania.
6. **Ucz się z wyników**: Porównuj wartościowe zaangażowanie, kwalifikowane działania, skargi i nakład pracy; wyłączaj formaty niewarte utrzymania.

Więcej postów nie tworzy automatycznie większej obecności. Spójna, użyteczna i aktualna treść jest cenniejsza niż maksymalna ilość.`,
            practicalExamples: ['Użyj GOM-MAR do zmiany jednej sprawdzonej wiadomości w trzy wybrane formaty, a następnie wykonaj osobny podgląd i kontrolę praw dla każdego kanału.'],
          },
          understandContent: { coreTakeaway: 'Skuteczny omnichannel zachowuje zweryfikowany rdzeń i dopasowuje każdy format do odbiorcy, kanału oraz ryzyka.', keyPrinciples: ['Przekształcaj selektywnie ze sprawdzonego źródła', 'Wymagaj kontroli kanałowej przed publikacją'] },
          actionTask: { instruction: 'Ukończ moduł omnichannel i potwierdź kontrolę mediów:', checklistItems: ['Potrafię tworzyć faceless video bez wprowadzania w błąd i naruszania praw', 'Rozumiem zgodę, oznaczenie i kontrolę audio generowanego przez AI', 'Potrafię przekształcać treści z kanałową kontrolą jakości i publikacji'] },
        },
      },
    },
    18: {
      title: '18. Agenci AI, systemy nadzorowane i gotowość enterprise',
      subtitle: 'Ograniczone workflow agentowe z odpowiedzialną kontrolą człowieka',
      description: 'Projektuj procesy jedno- i wieloagentowe z jasnymi uprawnieniami, budżetami, akceptacjami, dowodami, monitorowaniem i bezpiecznym zatrzymaniem.',
      lessons: {
        '18.1': {
          stageTitle: '18. Agenci AI, systemy nadzorowane i gotowość enterprise', title: 'Ograniczeni agenci AI i wykonywanie zadań',
          description: 'Zrozum, jak agenci planują i używają narzędzi, zachowując ograniczenia celu, danych, uprawnień, kosztów i warunków zatrzymania.',
          learnContent: {
            videoTitle: 'Agenci AI: użyteczna autonomia w określonych granicach',
            summaryText: 'Agent może dzielić pracę i wywoływać narzędzia, ale nadal może źle zrozumieć cel, użyć niewiarygodnych informacji lub wykonać niezamierzone działania. Samokontrola nie jest niezależną walidacją.',
            bulletPoints: ['Przed wykonaniem określ cel, dozwolone narzędzia, źródła, budżet, czas i rezultat', 'Wymagaj akceptacji dla wiadomości zewnętrznych, zakupów, publikacji, usuwania, uprawnień i dostępu do danych wrażliwych', 'Rejestruj wywołania i wyniki, ogranicz pętle oraz koszty i zapewnij pauzę, anulowanie oraz wycofanie'],
            fullArticleGuide: `### Od promptu do nadzorowanego zadania agenta

Traktuj agenta jako omylne oprogramowanie działające z delegowanymi uprawnieniami, a nie pracownika, który może bezpiecznie improwizować bez nadzoru.

#### Kontrolowany cykl wykonania

1. **Specyfikacja**: Określ zadanie, kryteria sukcesu, zakazane działania, zatwierdzone źródła i klasyfikację danych.
2. **Ograniczenie**: Przyznaj tymczasowe minimalne narzędzia, limit kosztów, czasu i kroków oraz ograniczony obszar pracy.
3. **Plan i kontrola**: Pozwól agentowi zaproponować kroki, ale wymagaj akceptacji przed działaniami istotnymi lub nieodwracalnymi.
4. **Obserwowalne wykonanie**: Loguj narzędzia, decyzje, koszty, błędy i artefakty bez ujawniania sekretów i zbędnych danych osobowych.
5. **Niezależna walidacja**: Sprawdź źródła, obliczenia, pliki i stan rzeczywisty testami lub odpowiedzialnym recenzentem. Pewność agenta nie jest dowodem.
6. **Bezpieczne zatrzymanie**: Kończ po sukcesie, niepewności, powtarzalnym błędzie, przekroczeniu limitu lub anulowaniu; zachowaj stan do kontroli i odzyskania.

Zaczynaj od zadań tylko do odczytu i odwracalnych. Zwiększaj uprawnienia dopiero po zmierzeniu niezawodności i udokumentowanej analizie ryzyka.`,
            practicalExamples: ['Poproś Marę o zbadanie wąskiego tematu z zatwierdzonych źródeł i limitem kroków; wymagaj szkicu ze źródłami do kontroli zamiast automatycznej publikacji.'],
          },
          understandContent: { coreTakeaway: 'Praca agentowa jest użyteczna, gdy uprawnienia są ograniczone, wykonanie obserwowalne, a wyniki niezależnie sprawdzane.', keyPrinciples: ['Przyznawaj minimalne niezbędne uprawnienia', 'Wymagaj akceptacji i niezależnej walidacji'] },
          actionTask: { instruction: 'Uruchom i sprawdź ograniczone zadanie agenta z Marą:', placeholder: 'Ograniczone zadanie agenta sprawdzone' },
        },
        '18.2': {
          stageTitle: '18. Agenci AI, systemy nadzorowane i gotowość enterprise', title: 'Orkiestracja i kontrola wielu agentów',
          description: 'Koordynuj wyspecjalizowane role agentów przez ustrukturyzowane przekazania, wspólne dowody i jeden odpowiedzialny łańcuch akceptacji.',
          learnContent: {
            videoTitle: 'Workflow wieloagentowe: orkiestracja bez mnożenia ryzyka',
            summaryText: 'Dodatkowi agenci rozdzielają role, ale zwiększają koszt, opóźnienie, powielanie błędów i powierzchnię ataku. Nie gwarantują dziesięciokrotnej produktywności ani stałej jakości.',
            bulletPoints: ['Stosuj wielu agentów tylko wtedy, gdy rozdział ról daje mierzalną wartość', 'Określ strukturalne dane wejściowe, wyniki, dowody i właściciela każdego przekazania', 'Minimalizuj wspólną pamięć, chroń sekrety i umieść akceptację człowieka przed działaniem zewnętrznym'],
            fullArticleGuide: `### Projektuj najmniejszy system rozwiązujący zadanie

Workflow wieloagentowy ma sens, gdy różne role, uprawnienia lub metody oceny rzeczywiście poprawiają proces. W wielu zadaniach jeden ograniczony agent z recenzentem jest prostszy i bezpieczniejszy.

#### Nadzorowany schemat ról

* **Badacz**: Może czytać zatwierdzone źródła i zwracać twierdzenia z cytowaniami; nie publikuje i nie kontaktuje ludzi.
* **Autor**: Korzysta z zatwierdzonego briefu i dowodów; nie wymyśla faktów ani nie rozszerza zakresu.
* **Recenzent**: Sprawdza rezultat według jawnych kryteriów, ale sam nie potwierdza zgodności prawnej, prywatności ani prawdy.
* **Właściciel-człowiek**: Rozwiązuje konflikty, sprawdza istotne twierdzenia i zatwierdza publikację, wydatki, zmiany dostępu oraz działania wobec klientów.

Stosuj ustrukturyzowane przekazania, unikalne identyfikatory, pochodzenie danych, wersjonowane prompty i odizolowane poświadczenia. Nie pozwalaj agentom przekazywać niezaufanych instrukcji jako poleceń. Ustal wspólny budżet i zatrzymaj proces przy pętli, istotnej rozbieżności lub utracie dowodów.`,
            practicalExamples: ['Skonfiguruj proces badanie–szkic–kontrola dla jednego briefu kampanii, a przed akceptacją sprawdź każde przekazanie, źródło, koszt i uprawnienie.'],
          },
          understandContent: { coreTakeaway: 'Systemy wieloagentowe pomagają tylko wtedy, gdy jasny rozdział ról przewyższa dodatkową złożoność, koszt i ryzyko.', keyPrinciples: ['Preferuj najmniejszą wystarczającą architekturę', 'Kontroluj każde przekazanie i działanie zewnętrzne'] },
          actionTask: { instruction: 'Skonfiguruj i sprawdź nadzorowany brief wieloagentowy w dashboardzie AI:', placeholder: 'Brief wieloagentowy sprawdzony' },
        },
        '18.3': {
          stageTitle: '18. Agenci AI, systemy nadzorowane i gotowość enterprise', title: 'Przegląd gotowości enterprise i certyfikat Academy',
          description: 'Ukończ oparty na dowodach przegląd kontroli operacyjnych AI i udokumentuj ukończenie tej części Academy.',
          learnContent: {
            videoTitle: 'Gotowość enterprise: dowody przed skalowaniem',
            summaryText: 'Ukończenie lekcji jest etapem nauki. Nie dowodzi bezpieczeństwa klasy enterprise, zgodności prawnej, pozycji lidera rynku ani przynależności do najwyższego percentyla.',
            bulletPoints: ['Zinwentaryzuj właścicieli, cele, dane, dostawców, uprawnienia i krytyczne zależności agentów', 'Przetestuj akceptacje, reakcję na incydenty, logi audytowe, kopie, zatrzymanie i ręczny proces awaryjny', 'Oddziel ukończenie Academy od zawodowej akredytacji i zewnętrznej certyfikacji'],
            fullArticleGuide: `### Zamień naukę w plan gotowości

Gotowość enterprise wykazuje się nadzorem, dowodami i powtarzalnymi testami operacyjnymi, a nie etykietą lub w pełni autonomicznym systemem.

#### Końcowy przegląd kontroli

1. **Własność i inwentarz**: Zapisz każdy istotny model, agenta, integrację, źródło danych, procesora i odpowiedzialnego właściciela.
2. **Ryzyko i dostęp**: Klasyfikuj zastosowania, minimalizuj dane, sprawdzaj uprawnienia i zabroń dostępu do niepotrzebnych sekretów oraz systemów.
3. **Ewaluacja**: Utrzymuj reprezentatywne testy dokładności, bezpieczeństwa, uprzedzeń, kosztów i wykonania przed oraz po zmianach.
4. **Operacje**: Monitoruj produkcję, loguj decyzje, obsługuj incydenty, rotuj poświadczenia, testuj kopie i zachowuj ręczne alternatywy.
5. **Zmiana i wycofanie**: Wersjonuj prompty oraz modele, zatwierdzaj wydania, śledź zależności i określ sposób wyłączenia systemu oraz usunięcia danych.

Certyfikat GOM-MAR dokumentuje spełnienie określonych wymagań Academy. Nie jest państwowym kwalifikowaniem, licencją zawodową, audytem bezpieczeństwa, opinią prawną ani gwarancją wyniku komercyjnego.`,
            practicalExamples: ['Pobierz certyfikat dopiero po ukończeniu wymaganych lekcji i listy kontroli oraz opisuj go dokładnie jako potwierdzenie ukończenia Academy.'],
          },
          understandContent: { coreTakeaway: 'Gotowość enterprise wymaga odpowiedzialnego nadzoru i sprawdzonych dowodów; certyfikat kursu dokumentuje wyłącznie ukończenie nauki.', keyPrinciples: ['Waliduj kontrole dowodami i powtarzalnymi testami', 'Opisuj certyfikat dokładnie bez zawyżania jego znaczenia'] },
          actionTask: { instruction: 'Ukończ przegląd systemów agentowych i potwierdź znaczenie certyfikatu:', checklistItems: ['Potrafię ograniczyć narzędzia, dane, budżet, kroki i warunki zatrzymania agenta', 'Potrafię nadzorować przekazania wielu agentów i krytyczne akceptacje', 'Rozumiem, że ukończenie Academy nie jest zewnętrzną akredytacją ani dowodem zgodności enterprise'] },
        },
      },
    },
    19: {
      title: '19. Analityka danych, eksperymenty i wnioski AI',
      subtitle: 'Ulepszanie oparte na dowodach, niepewności i ochronie prywatności',
      description: 'Mierz lejki, prowadź poprawne eksperymenty i ostrożnie korzystaj z prognoz, chroniąc zgodę, jakość danych i interes klientów.',
      lessons: {
        '19.1': {
          stageTitle: '19. Analityka danych, eksperymenty i wnioski AI', title: 'Testy A/B i pomiar konwersji',
          description: 'Testuj jasną hipotezę z wiarygodnymi zdarzeniami, wcześniej określonym planem analizy i dowodami odpowiednimi do decyzji.',
          learnContent: {
            videoTitle: 'Eksperymenty konwersji: nauka bez obietnic wzrostu',
            summaryText: 'Test A/B szacuje efekt w warunkach niepewności. Nie zmienia założeń w trwałe fakty ani nie gwarantuje większej sprzedaży.',
            bulletPoints: ['Przed startem określ populację, główny miernik, minimalny istotny efekt, czas i regułę zatrzymania', 'Przypisuj użytkowników konsekwentnie i sprawdź tracking, zgodę, nierówny podział próby oraz przenikanie między urządzeniami', 'Raportuj wielkość efektu i niepewność, a nie tylko istotność lub wariant z większą surową liczbą'],
            fullArticleGuide: `### Zdyscyplinowany cykl testu A/B

Stała reguła „100 konwersji” nie jest uniwersalnym wymaganiem próby. Potrzebne dowody zależą od poziomu bazowego, najmniejszego wartościowego efektu, zmienności, akceptowanych błędów, podziału i projektu testu.

#### Praktyczna kolejność

1. **Postaw hipotezę**: Opisz jedną zmianę, oczekiwany mechanizm, główny wynik i powód, dla którego efekt ma znaczenie biznesowe lub użytkowe.
2. **Przygotuj pomiar**: Sprawdź definicje zdarzeń, stan zgody, filtrowanie botów, ruch wewnętrzny, atrybucję i stały przydział użytkownika.
3. **Zaplanuj przed podglądem**: Wybierz metodę, obliczenie próby, czas, wyłączenia i regułę zatrzymania. Uwzględnij wiele metryk i częste sprawdzanie.
4. **Prowadź bez ingerencji**: Nie zmieniaj doświadczenia, grupy ani miksu kampanii w trakcie, chyba że zatrzymasz i udokumentujesz test.
5. **Interpretuj ostrożnie**: Oceń efekt, przedział ufności lub wiarygodności, wartość praktyczną, segmenty, utratę danych oraz efekty nowości i sezonu.
6. **Zdecyduj i zapisz**: Wdróż, odrzuć lub powtórz zmianę oraz zachowaj hipotezę, konfigurację, wynik i ograniczenia.

Eksperyment daje dowody dla konkretnego kontekstu. Wynik może nie przenosić się na inną grupę, sezon, kanał lub stronę.`,
            practicalExamples: ['Użyj dashboardu GOM-MAR, aby znaleźć jedno mierzalne wąskie gardło, a przed utworzeniem wariantu zapisz hipotezę i regułę decyzji.'],
          },
          understandContent: { coreTakeaway: 'Użyteczny eksperyment łączy wiarygodny pomiar, wcześniej przyjęty plan i uczciwe przedstawienie niepewności.', keyPrinciples: ['Obliczaj potrzebne dowody dla konkretnego testu', 'Oceniaj wielkość efektu i wartość praktyczną, nie samą istotność'] },
          actionTask: { instruction: 'Sprawdź obecne metryki i przygotuj jeden plan testu w dashboardzie Analytics:', placeholder: 'Metryki i plan testu sprawdzone' },
        },
        '19.2': {
          stageTitle: '19. Analityka danych, eksperymenty i wnioski AI', title: 'Analiza lejka i KPI gotowe do decyzji',
          description: 'Analizuj odpływ w ścieżce, koszt pozyskania, marżę pokrycia i wartość klienta według definicji pasujących do firmy.',
          learnContent: {
            videoTitle: 'Analityka lejka: metryki w kontekście',
            summaryText: 'KPI są użyteczne tylko wtedy, gdy jasne są definicje, źródła, okresy i ograniczenia. Nie istnieją uniwersalne cele dla opt-in, CTR ani ROAS.',
            bulletPoints: ['Dla każdego KPI zapisz licznik, mianownik, okres, kohortę, walutę i źródło', 'Segmentuj ostrożnie według kanału, kampanii, urządzenia i typu klienta bez nadinterpretacji małych grup', 'Połącz metryki marketingu z marżą, zwrotami, retencją, przepływem gotówki i możliwościami operacyjnymi'],
            fullArticleGuide: `### Zbuduj widok lejka przydatny w decyzjach

Benchmarki typu 30% opt-in, 15% kliknięć lub ROAS powyżej 2 mogą być nieistotne albo szkodliwe bez kontekstu. Wyniki zależą od oferty, odbiorców, intencji ruchu, atrybucji, marży i metody pomiaru.

#### Główne mierniki i zastrzeżenia

* **Współczynnik konwersji**: Wykonane działania podzielone przez uprawnione okazje. Zdefiniuj uprawnienie i konsekwentnie usuwaj nieważny ruch.
* **Kliknięcia w e-mailu**: Mogą być liczone względem dostarczonych wiadomości, odbiorców lub otwarć; funkcje prywatności i skanery automatyczne zniekształcają aktywność.
* **CAC**: Uwzględnij koszty pozyskania istotne dla decyzji, nie tylko reklamę. Określ, czy mierzysz klienta, pierwsze zamówienie czy kwalifikowany kontakt.
* **ROAS**: Przychód przypisany reklamom podzielony przez wydatki. Pomija wiele kosztów i nie jest zyskiem.
* **Marża i zwrot nakładu**: Odejmij zmienne koszty realizacji, opłaty, zwroty i support oraz oceń czas odzyskania wydatku.
* **LTV**: Użyj jasno określonej kohorty i horyzontu; odróżniaj wartość obserwowaną od prognozy modelu.

Nadaj priorytet wąskiemu gardłu dopiero po potwierdzeniu, że jest realne, istotne i pod Twoją kontrolą. Poprawa jest możliwa, ale podwojenie zysku nigdy nie jest gwarantowane.`,
            practicalExamples: ['Poproś Marę o uporządkowanie definicji i wskazanie brakujących danych, a następnie sprawdź każdą liczbę w systemie źródłowym przed działaniem.'],
          },
          understandContent: { coreTakeaway: 'KPI gotowe do decyzji mają spójne definicje i łączą zachowanie klientów z realną ekonomią oraz niepewnością.', keyPrinciples: ['Definiuj każdą metrykę przed porównaniem', 'Optymalizuj marżę i wyniki klientów, nie próżne wskaźniki'] },
          actionTask: { instruction: 'Przeprowadź udokumentowany przegląd lejka z Marą i sprawdź go w danych źródłowych:', placeholder: 'Przegląd lejka zweryfikowany' },
        },
        '19.3': {
          stageTitle: '19. Analityka danych, eksperymenty i wnioski AI', title: 'Analityka predykcyjna i odpowiedzialne modelowanie wartości klienta',
          description: 'Ostrożnie szacuj przyszłe wyniki klientów i używaj modeli do wspierania uczciwych decyzji zgodnych ze zgodą, zamiast automatycznej presji.',
          learnContent: {
            videoTitle: 'Analityka predykcyjna: prognoza jest szacunkiem, nie pewnością',
            summaryText: 'Modele AI mogą szacować odejście lub przyszłą wartość tylko przy odpowiednich danych, etykietach i założeniach. Prognozy bywają błędne, dryfują i różnie wpływają na grupy.',
            bulletPoints: ['Oddziel obserwowaną wartość historyczną od prognozowanego LTV i podaj horyzont oraz niepewność', 'Używaj wyłącznie legalnych, potrzebnych i wystarczająco reprezentatywnych danych behawioralnych', 'Przed automatycznym działaniem sprawdź trafność, kalibrację, dryf i wpływ na grupy'],
            fullArticleGuide: `### Używaj prognoz jako wsparcia decyzji

Prognoza nie jest wiedzą o zamiarze konkretnej osoby. Otwarcia, kliknięcia i postęp kursu mogą być niepełne, wrażliwe prywatnościowo lub zniekształcone technicznie.

#### Odpowiedzialny workflow modelowania

1. **Określ decyzję**: Wskaż działanie, na które prognoza może wpływać, i oceń, czy prostsza analiza kohortowa wystarczy.
2. **Sprawdź legalność danych**: Potwierdź cel, podstawę prawną, zgodę, gdy potrzebna, minimalizację, przechowywanie i informację dla klienta.
3. **Starannie przygotuj dane**: Oceń braki, wyciek informacji, zmiany definicji, bias doboru i sens wyniku docelowego.
4. **Waliduj poza próbą**: Porównaj z prostym baseline i zmierz rozróżnianie, kalibrację, błędy według grup oraz konsekwencje finansowe.
5. **Wdrażaj z limitami**: Użyj progów, limitów częstotliwości, list wykluczeń, kontroli człowieka i drogi sprzeciwu lub pomocy, gdy ma zastosowanie.
6. **Monitoruj i wycofuj**: Śledź dryf, skargi, błędne alarmy, koszt i przyrostową korzyść; wstrzymaj model przy spadku jakości dowodów.

Nie używaj wyniku do wykorzystywania podatności, ukrywania szans, spamowania nieaktywnych osób ani twierdzenia, że istnieje „idealny” moment zakupu. Testuj, czy interwencja pomaga i tworzy przyrostową wartość.`,
            practicalExamples: ['Sprawdź jedną rekomendację dashboardu, określ jej dane i założenia, a działanie kampanii zatwierdź dopiero po walidacji prognozy względem baseline i obecnej kohorty.'],
          },
          understandContent: { coreTakeaway: 'Prognozy są niepewnym wsparciem decyzji i wymagają legalnych danych, mocnej walidacji, kontroli uczciwości oraz ciągłego monitorowania.', keyPrinciples: ['Odróżniaj obserwowaną wartość od prognozowanego LTV', 'Interwencje wobec klientów utrzymuj proporcjonalne i podlegające kontroli'] },
          actionTask: { instruction: 'Ukończ moduł Analytics i potwierdź kontrolę pomiaru:', checklistItems: ['Potrafię zaplanować test A/B bez uniwersalnego skrótu wielkości próby', 'Potrafię zdefiniować CAC, ROAS, marżę i LTV w kontekście firmy', 'Potrafię ocenić wnioski predykcyjne pod kątem prywatności, niepewności, uczciwości i wartości przyrostowej'] },
        },
      },
    },
    20: {
      title: '20. Ekosystemy AI, etyka i trwały rozwój',
      subtitle: 'Elastyczne systemy, odpowiedzialne AI i wiarygodny etap ukończenia',
      description: 'Buduj odporną podstawę cyfrową, odpowiedzialnie nadzoruj AI i ukończ pierwsze dwadzieścia etapów Academy bez obietnic trwałego dobrobytu lub odporności na zmiany.',
      lessons: {
        '20.1': {
          stageTitle: '20. Ekosystemy AI, etyka i trwały rozwój', title: 'Odpowiedzialne AI i przejrzystość w marketingu',
          description: 'Używaj AI z jasną odpowiedzialnością, proporcjonalnym oznaczeniem, ochroną prywatności i kontrolą jakości opartą na dowodach.',
          learnContent: {
            videoTitle: 'Odpowiedzialne AI: zdobywanie zaufania przez rozliczalną praktykę',
            summaryText: 'Przejrzystość i odpowiedzialność człowieka mogą wspierać zaufanie, ale żadna lista etyczna nie czyni marki nieomylną ani nie gwarantuje zaufania klientów.',
            bulletPoints: ['Informuj, gdy automatyzacja lub media syntetyczne istotnie wpływają na interakcję albo jej rozumienie', 'Przed użyciem wobec klientów sprawdź twierdzenia, źródła, prawa, ton i możliwe szkody', 'Zbieraj tylko potrzebne dane i zapewnij dostępną pomoc człowieka, korektę oraz możliwość sprzeciwu'],
            fullArticleGuide: `### Uczyń odpowiedzialne AI praktyką operacyjną

Etyczny marketing nie jest jednorazową kontrolą tonu. Wymaga właściciela, dowodów, zabezpieczeń oraz gotowości do zatrzymania lub poprawienia systemu, gdy wyrządza szkodę.

#### Praktyczny przegląd

1. **Cel i konieczność**: Określ problem klienta i sprawdź, czy AI jest właściwe, czy prostszy proces będzie bezpieczniejszy.
2. **Przejrzystość**: Wyjaśnij istotną automatyzację, media syntetyczne, personalizację i użycie danych językiem zrozumiałym dla odbiorcy.
3. **Prawda i pochodzenie**: Sprawdzaj twierdzenia i źródła; zachowuj pozwolenia; nie wymyślaj osób, opinii, niedoboru ani wyników.
4. **Prywatność i uczciwość**: Minimalizuj dane, ogranicz dostęp, sprawdzaj wpływ na grupy i nie wykorzystuj wieku, zdrowia, trudności finansowych ani innych podatności.
5. **Odpowiedzialność człowieka**: Wyznacz właściciela, drogę eskalacji i korekty, loguj istotne decyzje i testuj system po zmianach.

Mara może pomóc w przeglądzie, ale AI nie może samo potwierdzić, że jego wynik jest etyczny, prawdziwy, legalny lub emocjonalnie właściwy. Ostateczną decyzję podejmuje odpowiedzialny wydawca.`,
            practicalExamples: ['Użyj Mary do wskazania problemów tonu, niepopartych twierdzeń i pytań o oznaczenie, a następnie odpowiedzialna osoba powinna rozwiązać każdy punkt na podstawie dowodów i kontekstu kampanii.'],
          },
          understandContent: { coreTakeaway: 'Odpowiedzialny marketing AI wymaga prawdziwej treści, proporcjonalnej przejrzystości, chronionych danych i rozliczalnych decyzji człowieka.', keyPrinciples: ['Traktuj etykę jako ciągły proces kontroli', 'Zapewnij ludziom jasne informacje i realną drogę odwołania'] },
          actionTask: { instruction: 'Przeprowadź i udokumentuj kontrolowany przez człowieka przegląd tonu, twierdzeń i etyki AI z Marą:', placeholder: 'Przegląd odpowiedzialnego AI ukończony' },
        },
        '20.2': {
          stageTitle: '20. Ekosystemy AI, etyka i trwały rozwój', title: 'Odporność platformowa, przenośność i odzyskiwanie',
          description: 'Ogranicz ryzyko koncentracji dzięki przenośnym danym, opisanym zależnościom, sprawdzonym kopiom zapasowym i realistycznym planom migracji.',
          learnContent: {
            videoTitle: 'Odporność platformowa: kontrola bez udawania niezależności',
            summaryText: 'Strona, lista e-mail i społeczność nadal zależą od hostingu, domen, dostawców poczty, procesorów, tożsamości, prawa i dostarczalności. Celem jest odporność, nie całkowita niezależność.',
            bulletPoints: ['Zinwentaryzuj krytycznych dostawców, formaty danych, umowy, poświadczenia i pojedyncze punkty awarii', 'Eksportuj tylko dane, które możesz legalnie zachować, wraz ze stanem zgód, wykluczeń i usunięć', 'Testuj szyfrowane kopie, odtworzenie, kontrolę domeny, opisane alternatywy i zmianę dostawcy'],
            fullArticleGuide: `### Zbuduj ekosystem możliwy do odzyskania

Dane klientów nie są nietykalnym aktywem należącym do firmy „w 100%”. Osoby zachowują prawa do danych, a użycie ograniczają zgoda, prawo, umowy, bezpieczeństwo i pierwotny cel.

#### Podstawy odporności

* **Kanały bezpośrednie**: Utrzymuj kontakt oparty na pozwoleniu, respektując wycofanie, sprzeciw, usunięcie i okresy przechowywania.
* **Przenośne treści i dane**: Używaj udokumentowanych, popularnych formatów eksportu i zachowuj definicje pól, dowody zgód oraz listy wykluczeń.
* **Rejestr zależności**: Zapisz domeny, DNS, hosting, e-mail, płatności, analitykę, dostawców AI, licencje, właścicieli i daty odnowienia.
* **Sprawdzone kopie**: Szyfruj kopie, rozdziel dostęp, określ retencję i regularnie odtwarzaj próbkę w bezpiecznym środowisku.
* **Plan migracji**: Opisz zmianę dostawcy, rotację poświadczeń, aktualizację integracji, informowanie klientów i ręczny proces awaryjny.
* **Dywersyfikacja kanałów**: Testuj możliwy do utrzymania miks wyszukiwania, social media, e-maila, poleceń i partnerstw bez ślepego powielania ryzyka oraz pracy.

Żaden ekosystem nie jest niezniszczalny. Odporność wynika ze znajomości zależności i dowodu, że odzyskanie oraz migracja naprawdę działają.`,
            practicalExamples: ['Wyeksportuj autoryzowany zestaw GOM-MAR, zapisz bezpiecznie, sprawdź pola zgód i wykluczeń oraz wykonaj udokumentowane próbne odtworzenie zamiast zakładać, że plik jest użyteczną kopią.'],
          },
          understandContent: { coreTakeaway: 'Odporność cyfrowa wynika z legalnej przenośności, sprawdzonego odzyskiwania i wymiennych zależności, a nie absolutnej własności lub niezależności.', keyPrinciples: ['Zachowuj prawa i stan zgody podczas eksportu', 'Regularnie testuj odtwarzanie i migrację'] },
          actionTask: { instruction: 'Sprawdź i przetestuj strategię kopii, zależności i migracji:', placeholder: 'Plan odporności przetestowany' },
        },
        '20.3': {
          stageTitle: '20. Ekosystemy AI, etyka i trwały rozwój', title: 'Przegląd dwudziestu etapów i dyplom GOM-MAR',
          description: 'Przejrzyj pierwsze dwadzieścia etapów Academy, udokumentuj pozostałe luki i uznaj ukończenie bez zawyżania statusu lub dochodów.',
          learnContent: {
            videoTitle: 'Ważny etap i kolejny cykl przeglądu',
            summaryText: 'Ukończenie dwudziestu etapów potwierdza systematyczną naukę. Nie dowodzi wdrożenia każdej funkcji, rentownego i skalowalnego biznesu ani pozycji czołowego marketera.',
            bulletPoints: ['Przejrzyj ukończone dowody, nierozwiązane ryzyka i następną odpowiedzialną poprawę', 'Odblokuj dyplom GOM-MAR po spełnieniu określonych wymagań lekcji i zadań', 'Traktuj dostęp absolwencki i jego czas zgodnie z rzeczywiście opublikowanymi warunkami programu'],
            fullArticleGuide: `### Gratulacje z okazji ukończenia dwudziestu etapów

Poznałeś szeroki zestaw tematów marketingu cyfrowego i AI. Trwała wartość powstaje teraz przez staranne wdrażanie właściwych elementów, mierzenie wyników i utrzymanie używanych systemów.

#### Następny cykl operacyjny

1. **Przejrzyj dowody**: Wypisz, co działa, zostało przetestowane, opisane i ma właściciela, oddzielając to od szkiców, demonstracji i planów.
2. **Zamknij krytyczne luki**: Nadaj pierwszeństwo bezpieczeństwu, prywatności, szkodom klienta, płatnościom, dostarczeniu i odzyskiwaniu przed dalszą automatyzacją.
3. **Wybierz jedną poprawę**: Określ mierzalny wynik klienta lub firmy, ograniczony test i regułę wycofania.
4. **Utrzymuj kompetencje**: Wracaj do prawa, zasad dostawców, modeli, uprawnień, treści i procedur, gdy się zmieniają.
5. **Dokładnie opisuj etap**: Przedstawiaj dyplom jako dowód spełnienia wymagań Academy, nie jako dowód dochodu, licencję zawodową, ranking rynkowy czy znajomość każdego systemu.

Żaden kurs nie gwarantuje trwałego dobrobytu, sukcesu biznesu ani technologii odpornej na przyszłość. Trwały postęp zależy od dopasowania rynkowego, wykonania, wartości dla klienta, zasobów, zarządzania ryzykiem i dalszej nauki.`,
            practicalExamples: ['Pobierz dyplom po potwierdzeniu ukończenia i dołącz prawdziwy opis umiejętności oraz projektów, które rzeczywiście wykonałeś.'],
          },
          understandContent: { coreTakeaway: 'Dyplom oznacza ukończenie uporządkowanego etapu nauki; wiarygodny rozwój nadal wymaga dowodów, utrzymania i odpowiedzialnego działania.', keyPrinciples: ['Świętuj ukończenie bez wyolbrzymiania', 'Kontynuuj przegląd, testowanie i ulepszanie'] },
          actionTask: { instruction: 'Ukończ Etap 20 i potwierdź odpowiedzialny przegląd końcowy:', checklistItems: ['Rozumiem odpowiedzialny i przejrzysty marketing AI', 'Mam opisane zależności i przetestowaną legalną ścieżkę kopii lub odzyskiwania', 'Rozumiem, co dyplom GOM-MAR potwierdza, a czego nie certyfikuje'] },
        },
      },
    },
  },
};

const mergeLesson = (lesson: Lesson, patch?: LessonPatch): Lesson => {
  if (!patch) return lesson;
  return {
    ...lesson,
    ...patch,
    learnContent: { ...lesson.learnContent, ...patch.learnContent },
    understandContent: { ...lesson.understandContent, ...patch.understandContent },
    actionTask: { ...lesson.actionTask, ...patch.actionTask },
  };
};

export const localizeAcademyStages = (stages: Stage[], language: LanguageCode): Stage[] => {
  const languagePatches = translations[language];
  if (!languagePatches) return stages;

  return stages.map((stage) => {
    const patch = languagePatches[stage.id];
    if (!patch) return stage;
    return {
      ...stage,
      ...patch,
      lessons: stage.lessons.map((lesson) => mergeLesson(lesson, patch.lessons?.[lesson.id])),
    };
  });
};
