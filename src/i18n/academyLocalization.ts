Warning: truncated output (original token count: 426536)
... 657566 bytes omitted ...

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
            bulletPoints: ['Reinvest 30–50% of early profits only when affordable', 'Scale proven campa…232152 tokens truncated… ścieżek uprzywilejowanych, migracji i odtwarzania",
                "type": "pdf",
                "iconName": "file-text",
                "actionUrl": "tools"
              },
              {
                "title": "Panel operacji tenantów Mara CRM",
                "subtitle": "Monitoruj routing, limity, klucze, incydenty i testy odtwarzania tenantów",
                "type": "tool",
                "iconName": "settings",
                "actionUrl": "settings"
              }
            ],
            "fullArticleGuide": "### Wybieraj izolację według ryzyka, nie etykiety klienta\n\nWspólna baza może obsługiwać wymagające środowiska przy dobrych kontrolach i testach; dedykowana baza nadal może być niezabezpieczona przy błędach tożsamości, sieci, kopii lub operacji. Nie twierdź, że jeden model daje pełną izolację fizyczną lub logiczną.\n\n#### Praktyczna decyzja architektoniczna\n1. **Klasyfikuj dane i obowiązki**: Zapisz wrażliwość, lokalizację, usuwanie, retencję, szyfrowanie, audyt i odtwarzanie.\n2. **Mapuj ścieżki dostępu**: Uwzględnij API, workery, wsparcie, analitykę, eksporty, kopie, repliki i administrację awaryjną.\n3. **Wybierz model**: Porównaj wspólne tabele z RLS, schemat per tenant, bazę per tenant i modele hybrydowe pod kątem blast radius, skali, kosztu i złożoności.\n4. **Prawidłowo utwardź RLS**: Używaj dedykowanych ról runtime bez własności, unikaj zbędnego SUPERUSER i BYPASSRLS, rozważ FORCE ROW LEVEL SECURITY, testuj polityki odczytu i zapisu oraz funkcje security-definer.\n5. **Testuj przypadki negatywne**: Próbuj odczytu i zapisu między tenantami przez każdy endpoint, rolę, zadanie i migrację. Dodaj fuzzing, integracje i niezależny przegląd zależny od ryzyka.\n6. **Planuj cykl życia**: Zaprojektuj tworzenie tenantów, rotację kluczy, kopie, point-in-time recovery, eksport, usunięcie i migrację. Testuj odtwarzanie i dokumentuj zakres danych per tenant.\n7. **Obserwuj bezpiecznie**: Dodaj metryki i zdarzenia audytowe tenantów bez wycieku danych do logów.\n\nKontrole bazy ograniczają ryzyko, lecz nie zamykają automatycznie luk w kodzie aplikacji lub uprzywilejowanych operacjach."
          },
          "understandContent": {
            "coreTakeaway": "Solidna izolacja tenantów wynika z jawnych granic zaufania, najmniejszych uprawnień i powtarzanych testów negatywnych, a nie z wiary w nieomylność RLS lub dedykowanej bazy.",
            "keyPrinciples": [
              "Wymuszaj zakres tenanta w więcej niż jednej warstwie, a uprzywilejowane obejścia ograniczaj, audytuj i testuj",
              "Testuj odtwarzanie kopii, eksport i usunięcie tenanta jako zdolności operacyjne, wraz z zależnościami i rekordami współdzielonymi"
            ]
          },
          "actionTask": {
            "instruction": "Utwórz zapis decyzji o izolacji tenantów:",
            "checklistItems": [
              "Zmapuj dane tenantów, role ludzi, tożsamości usług i uprzywilejowane ścieżki obejścia",
              "Wybierz model izolacji z udokumentowanymi kompromisami bezpieczeństwa, kosztu, lokalizacji, skali i odtwarzania",
              "Dodaj automatyczne testy odczytu i zapisu między tenantami oraz sprawdzoną procedurę backupu i restore"
            ]
          }
        },
        "76.2": {
          "stageTitle": "76. SOC 2, ISO/IEC 27001 i SLA Enterprise",
          "title": "Zapewnienie Enterprise: badania SOC 2, ISO/IEC 27001 i obronne SLA",
          "description": "Buduj program bezpieczeństwa oparty na dowodach, prawidłowo określaj zakres niezależnego zapewnienia i składaj zobowiązania dostępności wspierane przez system.",
          "learnContent": {
            "videoTitle": "Masterclass: zapewnienie bezpieczeństwa i zobowiązania niezawodności Enterprise",
            "summaryText": "SOC 2 i ISO/IEC 27001 to różne podejścia. Raport SOC 2 wydaje niezależna firma CPA wobec określonych Trust Services Criteria i zakresu; nie jest to certyfikacja. Certyfikacja ISO/IEC 27001 ocenia system zarządzania bezpieczeństwem informacji w określonym zakresie. Żadne nie zastępuje due diligence klienta ani nie gwarantuje braku incydentów.",
            "bulletPoints": [
              "Przed badaniem SOC 2 lub certyfikacją ISO/IEC 27001 określ zakres, systemy, poddostawców, kryteria, właścicieli kontroli i dowody",
              "Platformy automatyzacji zbierają i monitorują dowody, lecz kierownictwo nadal odpowiada, a niezależni audytorzy oceniają kontrole",
              "Ustal RTO i RPO na podstawie wpływu biznesowego, zależności i przetestowanego odtwarzania; RTO 15 minut nie jest uniwersalne ani pełne bez RPO i zakresu",
              "Pisz SLA z dokładną granicą usługi, źródłem pomiaru, zasadami konserwacji i wyłączeń, oknem raportowym, środkami naprawczymi i analizą odpowiedzialności"
            ],
            "coreConcepts": [
              {
                "iconName": "shield",
                "title": "ZAPEWNIENIE W ZAKRESIE",
                "description": "Raporty i certyfikaty zapewniają pewność tylko dla wskazanej jednostki, okresu, systemów, kryteriów i wyłączeń.",
                "highlight": true
              },
              {
                "iconName": "activity",
                "title": "TESTOWANA NIEZAWODNOŚĆ",
                "description": "Zobowiązania dostępności i odtwarzania wynikają z pomiarów, analizy awarii i ćwiczonych runbooków."
              }
            ],
            "resources": [
              {
                "title": "Przewodnik dowodów bezpieczeństwa Enterprise i przeglądu SLA",
                "subtitle": "Lista PDF dla zakresu, kontroli, incydentów, odtwarzania i metryk umownych",
                "type": "pdf",
                "iconName": "file-text",
                "actionUrl": "tools"
              },
              {
                "title": "Strona statusu i monitor niezawodności GOM-MAR",
                "subtitle": "Publikuj stan usług i przejrzyście obliczaj SLI, SLO oraz SLA",
                "type": "tool",
                "iconName": "bar-chart-2",
                "actionUrl": "settings"
              }
            ],
            "fullArticleGuide": "### Zbuduj program bezpieczeństwa przed odznaką\n\nZapewnienie Enterprise zaczyna się od właścicieli ryzyka i powtarzalnych operacji. Szablony i monitoring przyspieszają pracę, ale kopiowanie odpowiedzi lub zbieranie zrzutów nie dowodzi, że kontrola jest właściwie zaprojektowana i skutecznie działa.\n\n#### Obronna mapa zapewnienia\n1. **Poznaj potrzeby klienta**: Określ prawo, umowy, typy danych, regiony i wymagania kupującego. Nie obiecuj raportu ani certyfikatu bez potwierdzenia wartości i zakresu.\n2. **Ustal governance**: Przypisz właścicieli ryzyka, zatwierdź polityki, prowadź rejestry aktywów i dostawców, szkol ludzi i dokumentuj wyjątki.\n3. **Wdróż kontrole**: Obejmij tożsamość, najmniejsze uprawnienia, bezpieczny development, zmiany, podatności, incydenty, ciągłość, dostawców, prywatność i retencję dowodów.\n4. **Precyzyjnie mów o szyfrowaniu**: Szyfrowanie at rest i in transit nie musi być end-to-end. Dobieraj wspierane protokoły i klucze z modelu zagrożeń, nie traktuj nazwy algorytmu jako gwarancji.\n5. **Ćwicz incydenty i odtwarzanie**: Testuj komunikację, integralność kopii, awarię regionu i utratę zależności. Mierz RTO i RPO oraz zamykaj ustalenia.\n6. **Zaangażuj kwalifikowanych oceniających**: Potwierdź zakres firmy CPA dla SOC 2 lub akredytowanej jednostki dla ISO/IEC 27001. Raport Type II rozpatruje kontrole w okresie, w odróżnieniu od przeglądu projektu w punkcie czasu.\n7. **Składaj realistyczne zobowiązania**: Nominalne 99,99% to około 52,6 minuty w 365 dniach, ale wynik umowny zależy od metody, zakresu, wyłączeń i okna. Architektura sama tego nie gwarantuje.\n8. **Utrzymuj ciągle**: Śledź błędy kontroli, incydenty, zmiany i ustalenia; ponownie oceniaj ryzyko zamiast uznawać roczny raport za koniec.\n\nOdpowiedzi w kwestionariuszach muszą być prawdziwe i aktualne. SSO, MFA i kontrolę dostępu dobieraj według ryzyka oraz użyteczności, nie wstrzymuj wyłącznie dla drogiego planu."
          },
          "understandContent": {
            "coreTakeaway": "Zaufanie Enterprise powstaje dzięki działającemu programowi bezpieczeństwa i niezawodności, którego dowody, zakres zapewnienia i obietnice umowne odpowiadają rzeczywistości.",
            "keyPrinciples": [
              "Nigdy nie nazywaj SOC 2 certyfikacją i nie pozwalaj, by automatyzacja dowodów zastąpiła odpowiedzialnych właścicieli kontroli oraz niezależne badanie",
              "Oferuj SLA dopiero po zdefiniowaniu wskaźników i wykazaniu architektury, personelu oraz procesu odtwarzania potrzebnych do jego wsparcia"
            ]
          },
          "actionTask": {
            "instruction": "Przygotuj pakiet zapewnienia Enterprise oparty na dowodach:",
            "checklistItems": [
              "Udokumentuj zakres, systemy, dostawców, właścicieli kontroli i aktualne luki dowodowe",
              "Zdefiniuj SLI/SLO dostępności, RTO, RPO, zasady pomiaru i wyniki testów odtwarzania",
              "Poddaj deklaracje bezpieczeństwa, odpowiedzi i środki SLA przeglądowi odpowiedzialnych specjalistów technicznych, prawnych i audytowych"
            ]
          }
        }
      }
    },


    "77": {
      "title": "77. Nadzorowane agenty AI i przepływy wieloagentowe",
      "subtitle": "Narzędzia, ograniczona autonomia, maszyny stanów, ewaluacje i zgoda człowieka",
      "description": "Buduj przepływy wspierane przez AI, które badają, tworzą wersje robocze i aktualizują systemy w jawnych granicach uprawnień. Naucz się rozpoznawać właściwe zastosowania agentów, traktować wyniki modeli i narzędzi jako niezaufane oraz dodawać ewaluację, monitoring, rollback i nadzór człowieka przed skutkiem w świecie rzeczywistym.",
      "lessons": {
        "77.1": {
          "stageTitle": "77. Architektura agentów i kontrolowane narzędzia",
          "title": "Agenty AI: ograniczone planowanie, wywołania narzędzi i zweryfikowane wykonanie",
          "description": "Przekształcaj decyzje modelu w kontrolowane przepływy z typowanymi narzędziami, najmniejszymi uprawnieniami, walidacją, budżetami i bramkami zgody.",
          "learnContent": {
            "videoTitle": "Masterclass: bezpieczne agenty AI i architektura użycia narzędzi",
            "summaryText": "Agent pozwala modelowi wybierać kroki i narzędzia, lecz nadal działa probabilistycznie i może źle rozumieć cele, zmyślać fakty lub nadużywać poprawnych funkcji. Niezawodne wdrożenie wymaga deterministycznych zabezpieczeń: wąskich narzędzi, uwierzytelniania, walidacji, stanu, limitów, monitoringu, ewaluacji i eskalacji do człowieka.",
            "bulletPoints": [
              "Używaj jawnego stanu przepływu i krótkich planów zamiast ujawniać lub uzależniać się od ukrytego toku rozumowania",
              "Traktuj structured output jako składnię do walidacji, a nie dowód poprawności wartości, intencji lub reguł biznesowych",
              "Traktuj strony, dokumenty, e-maile, tekst bazy i wyniki narzędzi jako niezaufane dane mogące zawierać pośrednią prompt injection",
              "Projektuj pamięć z celem, zgodą, retencją, kontrolą dostępu, usuwaniem i ochroną przed poisoningiem; vector retrieval nie jest ludzką pamięcią"
            ],
            "coreConcepts": [
              {
                "iconName": "shield",
                "title": "OGRANICZONA AUTONOMIA",
                "description": "Agent działa w jawnych uprawnieniach, budżetach działań, warunkach zatrzymania i progach zgody.",
                "highlight": true
              },
              {
                "iconName": "check-square",
                "title": "WERYFIKUJ PRZED SKUTKIEM",
                "description": "Kontrole deterministyczne i upoważnieni ludzie zatwierdzają wrażliwe działania przed skutkiem zewnętrznym."
              }
            ],
            "resources": [
              {
                "title": "Przewodnik bezpiecznej architektury agentów i modelowania zagrożeń",
                "subtitle": "Ramy PDF dla narzędzi, uprawnień, ochrony przed injection, pamięci i zgód",
                "type": "pdf",
                "iconName": "file-text",
                "actionUrl": "tools"
              },
              {
                "title": "Nadzorowane centrum agentów Mara CRM",
                "subtitle": "Konfiguruj wąskie narzędzia, zgody, budżety, ślady audytu i środowiska testowe",
                "type": "tool",
                "iconName": "cpu",
                "actionUrl": "ai"
              }
            ],
            "fullArticleGuide": "### Zacznij od przepływu i jego ryzyka\n\nNie każda automatyzacja potrzebuje agenta. Używaj oprogramowania deterministycznego, gdy kroki i reguły są stabilne. Rozważ agenta, gdy zadanie rzeczywiście wymaga interpretacji lub elastycznej kolejności, zachowując deterministyczne kontrole nad każdym istotnym skutkiem.\n\n#### Kontrolowana architektura agenta\n1. **Określ wynik i właściciela**: Zdefiniuj sukces, błąd, przekazanie, odpowiedzialność i użytkowników uprawnionych do startu.\n2. **Klasyfikuj działania**: Oddziel odczyt, odwracalne szkice, komunikację, zmiany rekordów, kod, usuwanie oraz działania finansowe i prawne.\n3. **Projektuj wąskie narzędzia**: Używaj jawnych schematów, list dozwolonych parametrów, zakresu tenanta, krótkich poświadczeń i autoryzacji po stronie serwera. Prompt nie egzekwuje uprawnień.\n4. **Waliduj każdą granicę**: Sprawdzaj schemat, typ, zakres, tożsamość, politykę, stan i reguły biznesowe. Bezpiecznie obsługuj wynik przed kodem, SQL, HTML lub shellem.\n5. **Broń przed injection**: Oddziel politykę systemową od treści, oznacz pochodzenie, ogranicz narzędzia przy niezaufanym wyszukiwaniu i nie wykonuj instrukcji znalezionych w danych.\n6. **Kontroluj wykonanie**: Dodaj budżety czasu, kroków, tokenów, kosztu i retry; idempotency, rate limit, dry-run, potwierdzenie zmian i kill switch. Dziesięć kroków to przykład, nie uniwersalna liczba.\n7. **Chroń pamięć**: Zapisuj minimum, zapobiegaj wyciekom między użytkownikami, waliduj zapis, wspieraj korektę i usuwanie oraz nie przechowuj sekretów bez podstawy.\n8. **Ewaluuj i monitoruj**: Testuj przypadki normalne, adversarial i awarie na reprezentatywnych danych. Loguj decyzje, wywołania, zgody i skutki z minimalizacją danych.\n9. **Bezpiecznie eskaluj**: Wymagaj świadomej zgody przy działaniach wysokiego wpływu, nieodwracalnych, finansowych, prawnych, bezpieczeństwa, zatrudnienia lub prywatności. Recenzent potrzebuje kontekstu i uprawnień, nie ceremonialnego kliknięcia.\n\nSandbox ogranicza część skutków technicznych, lecz nie zapobiega wyciekom danych, szkodliwym API ani błędnym decyzjom biznesowym. Nadal potrzebne są warstwy kontroli."
          },
          "understandContent": {
            "coreTakeaway": "Agent jest godny zaufania tylko w takim stopniu, w jakim jego uprawnienia, granice danych, ewaluacje i skutki zewnętrzne są celowo kontrolowane i obserwowalne.",
            "keyPrinciples": [
              "Zakładaj, że wynik modelu i pobrana treść mogą być błędne lub wrogie; egzekwuj autoryzację i politykę poza modelem",
              "Stosuj zgodę człowieka przy działaniach wysokiego wpływu oraz automatyczne zatrzymanie i eskalację po przekroczeniu limitów, niepewności lub błędów"
            ]
          },
          "actionTask": {
            "instruction": "Zaprojektuj agenta badawczego read-first z ograniczonymi uprawnieniami:",
            "checklistItems": [
              "Określ właściciela, dozwolone źródła, narzędzia tylko do odczytu, retencję i jawnie zakazane działania",
              "Dodaj walidację schematów i polityk, testy injection, limity kosztu i retry, audyt oraz kill switch",
              "Wymagaj przeglądu źródeł i zgody przed zapisem CRM, e-mailem, publikacją lub innym skutkiem zewnętrznym"
            ]
          }
        },
        "77.2": {
          "stageTitle": "77. Systemy wieloagentowe i orkiestracja",
          "title": "Przepływy wieloagentowe: dodawaj role tylko przy wykazanej wartości",
          "description": "Porównuj wzorce deterministyczne, jednoagentowe i wieloagentowe, koordynuj wersjonowany stan i zapobiegaj kaskadowym błędom.",
          "learnContent": {
            "videoTitle": "Masterclass: ewaluowana orkiestracja wieloagentowa",
            "summaryText": "Wiele agentów może pomóc, gdy zadania mają rzeczywiście odrębne konteksty, uprawnienia lub role oceny, ale nie przewyższa automatycznie dobrego pojedynczego agenta lub zwykłego przepływu. Dodatkowi agenci zwiększają latency, koszt, attack surface i ryzyko wzmacniania błędów. Wybieraj najprostszy wariant przechodzący zdefiniowane testy.",
            "bulletPoints": [
              "Porównaj przepływ deterministyczny i jednego agenta przed dodaniem specjalistów lub supervisora",
              "Nadaj każdej roli jasne wejście, wyjście, uprawnienia, warunek stop i eskalację zamiast polegać na etykiecie persony",
              "Używaj wersjonowanej maszyny stanów z walidowanymi przejściami, pochodzeniem i idempotency zamiast swobodnej rozmowy jako źródła prawdy",
              "Dobieraj modele według zmierzonej jakości, bezpieczeństwa, latency, prywatności i kosztu na swoim zadaniu; marka i cena nie wystarczą"
            ],
            "coreConcepts": [
              {
                "iconName": "git-branch",
                "title": "JAWNA ORKIESTRACJA",
                "description": "Przejścia stanu, własność i uprawnienia są zdefiniowane poza modelem i możliwe do inspekcji.",
                "highlight": true
              },
              {
                "iconName": "bar-chart-2",
                "title": "EWALUOWANA ZŁOŻONOŚĆ",
                "description": "Dodawaj agenta tylko wtedy, gdy testy pokazują korzyść większą od dodatkowego ryzyka i kosztu."
              }
            ],
            "resources": [
              {
                "title": "Przewodnik ewaluacji i orkiestracji multi-agent",
                "subtitle": "Blueprint PDF dla baseline, stanu, uprawnień, reviewerów i obsługi błędów",
                "type": "pdf",
                "iconName": "file-text",
                "actionUrl": "tools"
              },
              {
                "title": "Studio testów multi-agent GOM-MAR",
                "subtitle": "Porównuj warianty, śledź stan, ograniczaj budżety i analizuj błędy",
                "type": "tool",
                "iconName": "cpu",
                "actionUrl": "ai"
              }
            ],
            "fullArticleGuide": "### Złożoność musi zasłużyć na miejsce\n\nResearcher, writer i critic brzmią jak zespół, lecz role mogą dziedziczyć te same słabości modelu, źródła i prompty. Critic może przeoczyć błąd, dodać nowy albo zgodzić się ze szkicem. Review multi-agent nie eliminuje halucynacji ani odpowiedzialności.\n\n#### Sekwencja oparta na dowodach\n1. **Utwórz baseline**: Zmierz przepływ deterministyczny i jednoagentowy na reprezentatywnych zadaniach. Śledź fakty, ukończenie, bezpieczeństwo, korektę człowieka, latency i koszt.\n2. **Znajdź realną granicę**: Dodaj rolę tylko dla odrębnego kontekstu, umiejętności, uprawnienia lub niezależnej oceny. Jedno wąskie zadanie może pomagać, lecz nie jest obowiązkiem.\n3. **Najmniejsze uprawnienia roli**: Researcher czyta zatwierdzone źródła; drafter zapisuje staging; reviewer nie publikuje; publisher przyjmuje tylko zatwierdzoną treść.\n4. **Utrzymuj autorytatywny stan**: Zapisuj wejścia, źródła, wyniki, ewaluacje, zgody i wersje przejść. Blokuj stale writes i duplikaty skutków.\n5. **Oddziel generowanie od weryfikacji**: Używaj kontroli deterministycznych oraz niezależnych źródeł, modeli lub wiedzy człowieka. Reviewer agent jest sygnałem probabilistycznym, nie dowodem.\n6. **Ogranicz kaskady**: Ustaw budżety globalne i per-agent, circuit breakers, wykrywanie pętli, maksimum handoff i stany końcowe. Nie pozwalaj agentom tworzyć narzędzi, uprawnień ani agentów produkcyjnych bez zgody.\n7. **Chroń dane w handoff**: Minimalizuj kontekst, redaguj sekrety, respektuj tenantów i regiony oraz loguj odbiorców danych.\n8. **Publikuj przez bramkę**: Weryfikuj twierdzenia i prawa, uruchamiaj kontrole oraz wymagaj upoważnionej zgody dla treści publicznej i komunikacji.\n9. **Ciągle oceniaj**: Porównuj multi-agent z baseline po zmianie modelu, promptu, narzędzia lub danych. Usuwaj role bez mierzalnej wartości.\n\nCelem są niezawodne wyniki, nie pozór autonomicznego działu ani niepoparte twierdzenie o ludzkiej jakości sto razy szybciej."
          },
          "understandContent": {
            "coreTakeaway": "System wieloagentowy ma sens tylko wtedy, gdy jawne role i kontrolowany stan poprawiają wyniki wystarczająco, aby zrównoważyć koszt, latency i nowe błędy.",
            "keyPrinciples": [
              "Nie zakładaj, że wzajemny review agentów eliminuje błędy; łącz niezależne dowody, walidację deterministyczną i osąd człowieka",
              "Przechowuj wersjonowany, walidowany stan z pochodzeniem i zgodami zamiast uznawać rozmowę agentów za autorytatywną"
            ]
          },
          "actionTask": {
            "instruction": "Przeprowadź kontrolowane porównanie przed wdrożeniem multi-agent:",
            "checklistItems": [
              "Zdefiniuj reprezentatywne testy i zmierz baseline deterministyczny, jednoagentowy i wieloagentowy",
              "Przypisz każdej roli wąskie uprawnienia, walidowane przejścia, budżety, circuit breakers i eskalację",
              "Udokumentuj jakość, bezpieczeństwo, korektę człowieka, latency i koszt, pozostawiając tylko role z mierzalną korzyścią"
            ]
          }
        }
      }
    },


    "78": {
      "title": "78. Strategiczne IP, znaki towarowe i zarządzanie know-how",
      "subtitle": "Badanie znaków, System Madrycki, licencjonowanie i kontrola tajemnic przedsiębiorstwa",
      "description": "Buduj strategię własności intelektualnej dla nazw, marek, treści, oprogramowania i poufnego know-how. Poznaj współdziałanie zakresu rejestracji, wcześniejszych praw, terytoriów, umów i kontroli operacyjnych bez zakładania monopolu, gwarancji egzekwowania lub pasywnego dochodu.",
      "lessons": {
        "78.1": {
          "stageTitle": "78. Znaki towarowe i rejestracja międzynarodowa",
          "title": "Strategia znaków: badanie, klasyfikacja i ochrona terytorialna",
          "description": "Planuj zgłoszenie według rzeczywistych towarów, usług i rynków, badaj wcześniejsze prawa i rozumiej granice procedur krajowych, unijnych oraz madryckich.",
          "learnContent": {
            "videoTitle": "Masterclass: badanie znaków i strategia zgłoszeń międzynarodowych",
            "summaryText": "Zarejestrowany znak może chronić oznaczenie dla określonych towarów lub usług na danym terytorium, ale nie daje nieograniczonego monopolu na słowo. Zdolność rejestrowa, zakres, wcześniejsze prawa, wymóg używania i egzekwowanie zależą od jurysdykcji i faktów. Badanie i analiza prawna powinny poprzedzać zgłoszenie oraz start marki.",
            "bulletPoints": [
              "Porównuj znaki słowne, graficzne i kombinowane według odróżnialności, faktycznego użycia i dowodów, nie zakładając zawsze najsilniejszej formy",
              "Twórz wykaz towarów i usług z realnego planu; klasy nicejskie porządkują wykaz, ale same numery nie definiują naruszenia ani ochrony",
              "Szukaj identycznych i podobnych oznaczeń w rejestrach krajowych, UE i międzynarodowych oraz w nazwach firm, domenach i użyciu rynkowym",
              "Używaj Systemu Madryckiego do żądania i centralnego zarządzania ochroną; każdy wyznaczony urząd nadal może badać, odmówić lub ograniczyć ochronę"
            ],
            "coreConcepts": [
              {
                "iconName": "search",
                "title": "BADANIE PRZED ZGŁOSZENIEM",
                "description": "Wyniki wymagają analizy podobieństwa, towarów, usług, terytorium i wcześniejszych praw.",
                "highlight": true
              },
              {
                "iconName": "map",
                "title": "PRAWA TERYTORIALNE I OGRANICZONE",
                "description": "Ochrona zależy od znaku, wykazu, terytorium, ważności i właściwych ograniczeń."
              }
            ],
            "resources": [
              {
                "title": "Przewodnik badania i decyzji o zgłoszeniu znaku",
                "subtitle": "Lista PDF dla oznaczeń, wykazu, badań, terytoriów i przeglądu prawnika",
                "type": "pdf",
                "iconName": "file-text",
                "actionUrl": "tools"
              },
              {
                "title": "Rejestr praw do marki Mara CRM",
                "subtitle": "Śledź zgłoszenia, terytoria, klasy, terminy, dowody używania i spory",
                "type": "tool",
                "iconName": "shield",
                "actionUrl": "settings"
              }
            ],
            "fullArticleGuide": "### Rejestracja to część zarządzania ryzykiem marki\n\nPrzed inwestycją w nazwę ustal właściciela, miejsca użycia i produkty lub usługi. Badanie rejestru nie gwarantuje wolnej drogi: znaczenie mogą mieć podobne znaki, prawa niezarejestrowane, nazwy firm i inne roszczenia. DPMA nie bada automatycznie identycznych ani podobnych wcześniejszych znaków przed rejestracją.\n\n#### Kontrolowany proces zgłoszenia\n1. **Zinwentaryzuj oznaczenie**: Zapisz słowa, logo, kolory, języki, domeny i warianty.\n2. **Sprawdź odróżnialność**: Określenia opisowe lub zwyczajowe mogą zostać odrzucone albo mieć wąską ochronę, zależnie od znaku, wykazu i kraju.\n3. **Zdefiniuj wykaz**: Użyj aktualnych akceptowanych terminów i uzasadnionego zakresu. Zbyt szeroki wykaz zwiększa koszt i może tworzyć podatność lub obowiązek używania.\n4. **Zbadaj prawa**: Przeszukaj DPMAregister, TMview/EUIPO, WIPO i lokalne źródła. Podstawowe wyszukiwanie nie zastępuje profesjonalnej opinii o podobieństwie.\n5. **Wybierz terytoria**: Porównaj procedury krajowe, UE i madryckie pod kątem rynku, kosztu, uprawnienia, zależności, odmowy i egzekwowania. Rejestracja madrycka początkowo zależy od znaku bazowego i tworzy pakiet praw terytorialnych, nie automatyczną ochronę światową.\n6. **Zgłoś dokładnie**: Potwierdź zgłaszającego, znak, priorytet i wykaz; wielu elementów nie można później swobodnie rozszerzyć.\n7. **Monitoruj terminy**: Śledź badanie, publikację, sprzeciw, odnowienie, używanie, wpis licencji i reprezentację. Nie zakładaj wszędzie trzech miesięcy na sprzeciw.\n8. **Egzekwuj proporcjonalnie**: Zbadaj fakty, zabezpiecz dowody i uzyskaj poradę przed wezwaniem. Podobieństwo nie oznacza automatycznie naruszenia, a bezpodstawne groźby tworzą ryzyko.\n\nRejestracja może zwiększać wartość biznesową, lecz nie można obiecać uniwersalnego procentowego wzrostu wartości firmy."
          },
          "understandContent": {
            "coreTakeaway": "Obronny portfel znaków łączy odróżniające oznaczenia, realny zakres, priorytety terytorialne, analizę wcześniejszych praw i zarządzanie używaniem oraz terminami.",
            "keyPrinciples": [
              "Nie traktuj badania ani rejestracji jako gwarancji braku wcześniejszego prawa, sprzeciwu lub problemu naruszenia",
              "Monitoruj zgłoszenia i terminy, lecz podejmuj spór dopiero po analizie praw, podobieństwa, zakresu i kontekstu"
            ]
          },
          "actionTask": {
            "instruction": "Przygotuj brief badania znaku do profesjonalnego przeglądu:",
            "checklistItems": [
              "Zapisz dokładny znak, właściciela, kraje, daty startu i towary lub usługi",
              "Wyszukaj identyczne i podobne oznaczenia w właściwych rejestrach oraz udokumentuj wyniki i ograniczenia",
              "Opracuj priorytetowy plan zgłoszeń i monitoringu z kosztami, terminami, używaniem i przeglądem specjalisty"
            ]
          }
        },
        "78.2": {
          "stageTitle": "78. Licencjonowanie i tajemnice przedsiębiorstwa",
          "title": "Modele licencyjne: przekształcanie chronionych aktywów i know-how w zarządzaną ofertę",
          "description": "Ustal, co można legalnie licencjonować, chroń poufne know-how operacyjnie i negocjuj warunki dopasowane do aktywa, rynku oraz prawa konkurencji.",
          "learnContent": {
            "videoTitle": "Masterclass: licencje IP i kontrola tajemnic przedsiębiorstwa",
            "summaryText": "Licencja tworzy umowne uprawnienia; nie czyni pomysłu własnością wyłączną ani nie gwarantuje przychodu. Najpierw zweryfikuj własność, zdolność ochrony i prawa osób trzecich. Ochrona tajemnicy zależy od poufności, wartości z tej poufności i rozsądnych środków ochrony, a nie tylko etykiety lub NDA.",
            "bulletPoints": [
              "Precyzyjnie zdefiniuj aktywa: prawa rejestrowe, materiały chronione, software, dane, markę i poufne know-how mogą wymagać różnych zgód",
              "Wybieraj zakres wyłączny, sole lub niewyłączny po analizie terytorium, pola, kanałów, zdolności, konkurencji i zachowanych praw",
              "Modeluj opłatę stałą, za użycie, royalty od przychodu lub milestone według ekonomiki i audytowalności, nie uniwersalnej stawki 3–8%",
              "Buduj rozsądne środki tajemnicy przez klasyfikację, need-to-know, umowy, bezpieczeństwo, szkolenia, logi, offboarding i reakcję na incydent"
            ],
            "coreConcepts": [
              {
                "iconName": "file-text",
                "title": "ŁAŃCUCH PRAW",
                "description": "Licencja zaczyna się od udokumentowanej własności, cesji twórców i przeglądu praw osób trzecich.",
                "highlight": true
              },
              {
                "iconName": "lock",
                "title": "AKTYWNE ŚRODKI TAJEMNICY",
                "description": "Poufne know-how wymaga proporcjonalnej ochrony prawnej, technicznej i organizacyjnej w praktyce."
              }
            ],
            "resources": [
              {
                "title": "Przewodnik przeglądu licencji IP i tajemnic",
                "subtitle": "Zestaw pytań PDF o własność, zakres, ekonomikę, zgodność, audyt i zakończenie",
                "type": "pdf",
                "iconName": "file-text",
                "actionUrl": "tools"
              },
              {
                "title": "Rejestr licencji i poufności Mara CRM",
                "subtitle": "Śledź licencjobiorców, aktywa, terytoria, raporty, płatności, dostęp i terminy",
                "type": "tool",
                "iconName": "dollar-sign",
                "actionUrl": "crm"
              }
            ],
            "fullArticleGuide": "### Licencjonuj tylko to, co możesz zdefiniować i kontrolować\n\nMetody, pomysły i fakty nie są automatycznie prawami wyłącznymi. Pakiet może łączyć znaki, materiały autorskie, dostęp do software, usługi i poufne know-how, lecz każdy element potrzebuje podstawy prawnej i planu dostawy.\n\n#### Zbuduj umowę możliwą do przeglądu\n1. **Zweryfikuj własność**: Zbierz cesje pracowników i wykonawców, rejestracje, licencje źródeł, obowiązki open source, zgody na obrazy i dane oraz współwłaścicieli.\n2. **Zdefiniuj grant**: Wskaż aktywa, wersje, terytorium, pole, kanały, użytkowników, sublicencje, wyłączność, zachowane prawa i modyfikacje. Unikaj roszczeń do wszystkich metod.\n3. **Modeluj ekonomikę**: Testuj opłaty stałe, minimalne, za użycie, przychodowe i milestone wobec wsparcia, sprzedaży, podatku, waluty, raportów, długu i egzekwowania. Licencja nie gwarantuje 95% marży ani pasywnego cash flow.\n4. **Chroń jakość marki zgodnie z prawem**: Ustal rozsądne zasady użycia, jakości, akceptacji i cure period. Wymogi oraz rozwiązanie muszą być zgodne z prawem umów, znaków, franczyzy, agencji i konkurencji.\n5. **Operacyjnie chroń tajemnice**: Klasyfikuj, ograniczaj dostęp, używaj bezpiecznych repozytoriów, kontroluj kopie, szkol, loguj, zarządzaj dostawcami i odbieraj dostęp. Sama etykieta Confidential nie wystarcza.\n6. **Zapewnij audytowalne raporty**: Zdefiniuj bazę royalty, odliczenia, walutę, podatki, rekordy, częstotliwość, zawiadomienie, zakres, poufność, koszty i progi niedopłaty. Prawa audytu są negocjowane; coroczny audyt nie jest automatyczny.\n7. **Zaplanuj zmianę i wyjście**: Obejmij aktualizacje, wsparcie, bezpieczeństwo, roszczenia, naruszenie, naprawę, zakończenie, dalsze użycie oraz zwrot lub usunięcie danych.\n8. **Sprawdź ograniczenia**: Zakaz konkurencji, terytorium, ceny odsprzedaży i wyłączność mogą być ograniczone lub nieważne. Dwuletni zakaz po umowie nie jest uniwersalny. Uzyskaj poradę.\n\nSzablon nie jest prawnie zatwierdzony dla każdej transakcji. Dostosuj umowę z prawnikiem we właściwych jurysdykcjach."
          },
          "understandContent": {
            "coreTakeaway": "Trwały model licencyjny łączy zweryfikowane prawa, precyzyjne zgody, realną ekonomikę, wykonalne warunki i codzienną kontrolę poufności.",
            "keyPrinciples": [
              "Nie obiecuj wyłączności, minimum ani formuły royalty przed analizą zdolności, konkurencji, podatków, umów i rynku",
              "Stosuj warstwowe środki tajemnicy i dowody ich działania; etykiety i NDA same nie zachowują tajemnicy przedsiębiorstwa"
            ]
          },
          "actionTask": {
            "instruction": "Przygotuj pakiet licencyjny do przeglądu specjalisty:",
            "checklistItems": [
              "Wymień każde aktywo, właściciela, rejestrację lub podstawę, zależności osób trzecich i dozwolone użycie",
              "Modeluj zakres, wsparcie, raporty, definicje royalty, audyt, poufność, zakończenie i pełną ekonomikę",
              "Utwórz rejestr rozsądnych środków dla dostępu, umów, bezpieczeństwa, szkoleń, incydentów i offboardingu"
            ]
          }
        }
      }
    },


    "79": {
      "title": "79. Odpowiedzialna franczyza i zarządzanie jakością sieci",
      "subtitle": "Zweryfikowany pilotaż, ujawnienia, trwałe opłaty, standardy i uczciwe audyty",
      "description": "Oceń, czy sprawdzony biznes może wspierać franczyzobiorców w różnych jurysdykcjach. Buduj przejrzystą ekonomikę, prawdziwe ujawnienia, adaptowalne standardy i proporcjonalne kontrole bez gwarancji rentowności, łatwej globalnej ekspansji lub idealnej jednolitości.",
      "lessons": {
        "79.1": {
          "stageTitle": "79. Architektura i ekonomika franczyzy",
          "title": "Projekt franczyzy: unit economics, ujawnienia, opłaty i terytorium",
          "description": "Zweryfikuj model, poznaj obowiązki ujawnienia i rejestracji w danym kraju oraz projektuj opłaty i wsparcie wokół rentownej ekonomiki partnera.",
          "learnContent": {
            "videoTitle": "Masterclass: odpowiedzialny projekt systemu franczyzowego",
            "summaryText": "Franczyza przekazuje zdefiniowany format i system wsparcia niezależnym operatorom, lecz nie czyni wyników przewidywalnymi. Przed sprzedażą zweryfikuj ekonomikę w reprezentatywnej działalności, udokumentuj ryzyka i koszty, zapewnij kandydatowi czas na decyzję i uzyskaj poradę w każdej jurysdykcji.",
            "bulletPoints": [
              "Modeluj inwestycję, kapitał obrotowy, rozruch, koszty, opłaty, scenariusze break-even i koszt wsparcia na udokumentowanych danych",
              "Ustalaj opłatę wejściową, royalty i fundusz marketingowy według świadczonych usług i trwałej ekonomiki, nie standardowych procentów",
              "Definiuj terytorium według popytu, zdolności, kanałów, rezerwacji, sprzedaży online i ekspansji; wyłączność nie usuwa automatycznie kanibalizacji",
              "Stosuj aktualne ujawnienia zgodne z jurysdykcją; w USA FTC Franchise Rule wymaga FDD z 23 pozycjami i zwykle minimum 14 dni przed podpisem lub płatnością"
            ],
            "coreConcepts": [
              {
                "iconName": "bar-chart-2",
                "title": "ZWERYFIKOWANA EKONOMIKA",
                "description": "Decyzje opierają się na reprezentatywnych danych o przychodzie, kosztach, kapitale, rozruchu i zamknięciach.",
                "highlight": true
              },
              {
                "iconName": "file-text",
                "title": "ŚWIADOMA ZGODA",
                "description": "Kandydaci otrzymują dokładne informacje, czas na analizę i możliwość niezależnej porady."
              }
            ],
            "resources": [
              {
                "title": "Przewodnik wykonalności i ujawnień franczyzy",
                "subtitle": "Ramy PDF dla pilotażu, ekonomiki, opłat, terytoriów, twierdzeń i analizy prawnej",
                "type": "pdf",
                "iconName": "file-text",
                "actionUrl": "tools"
              },
              {
                "title": "Centrum kandydatów franczyzowych Mara CRM",
                "subtitle": "Śledź zgody, dokumenty, okresy przeglądu, due diligence i decyzje",
                "type": "tool",
                "iconName": "users",
                "actionUrl": "crm"
              }
            ],
            "fullArticleGuide": "### Udowodnij zdolność wsparcia przed sprzedażą modelu\n\nUdany punkt nie dowodzi jeszcze przenoszalności franczyzy. Franczyzodawca musi uczyć, wspierać i monitorować model, pozostawiając partnerowi wystarczającą marżę i kapitał. Nie ma uniwersalnej zasady dokładnie dwóch lat lub dwóch–trzech punktów; dowody muszą pasować do koncepcji, sezonowości i rynku.\n\n#### Odpowiedzialna gotowość\n1. **Zweryfikuj operacje**: Testuj popyt, zatrudnienie, dostawy, sezonowość, rozruch, udział właściciela oraz koszt zamknięcia lub transferu.\n2. **Oddziel system od operatora**: Dokumentuj wpływ lokalizacji, doświadczenia, cen i wyjątkowej pracy założyciela.\n3. **Modeluj obie strony**: Uwzględnij inwestycję partnera oraz koszty szkolenia, wsparcia, technologii, zgodności i jakości franczyzodawcy.\n4. **Projektuj przejrzyste opłaty**: Wyjaśnij finansowanie, termin, zmiany, zwroty, podatki i opóźnienia. Kwoty 25–50 tys. euro i 5–8% royalty to przykłady rynkowe, nie cele.\n5. **Kontroluj twierdzenia finansowe**: Używaj ich tylko, gdy prawo zezwala i istnieje rozsądna udokumentowana podstawa w wymaganej formie. Nie wybieraj tylko najlepszych punktów.\n6. **Mapuj jurysdykcje**: Definicja franczyzy, rejestracja, ujawnienia, cooling-off, język, prawo, dane, zatrudnienie, konsument i konkurencja różnią się. Amerykański FDD nie jest dokumentem globalnym.\n7. **Wybieraj uczciwie**: Stosuj kryteria związane z rolą, legalnie weryfikuj finansowanie, unikaj dyskryminacji i pozwól na niezależną poradę.\n8. **Definiuj terytorium i kanały**: Wskaż klientów zastrzeżonych, online, dostawy, nietypowe lokalizacje, relokacje, warunki i politykę encroachment.\n9. **Zarządzaj funduszem marketingowym**: Określ użycie, administrację, raportowanie, alokację i audyt. Rachunek powierniczy nie jest wszędzie wymagany ani zawsze właściwy.\n\nFranczyza wykorzystuje kapitał partnera, lecz nadal wymaga istotnej inwestycji franczyzodawcy i tworzy obowiązki."
          },
          "understandContent": {
            "coreTakeaway": "Franczyza jest gotowa, gdy format jest przenoszalny, ekonomika partnera wiarygodnie trwała, twierdzenia udokumentowane, a wsparcie spełnia ujawnione obowiązki.",
            "keyPrinciples": [
              "Nie wybieraj partnerów dla samej opłaty ani nie używaj niepopartych twierdzeń o przychodzie, zysku, zwrocie lub sukcesie",
              "Przejrzyście dokumentuj fundusz i terytorium z analizą prawa konkurencji, podatków i umów"
            ]
          },
          "actionTask": {
            "instruction": "Przygotuj dokumentację wykonalności franczyzy:",
            "checklistItems": [
              "Zbuduj konserwatywny, bazowy i stresowy scenariusz ekonomiki partnera oraz franczyzodawcy",
              "Udokumentuj każdą opłatę, usługę, warunek terytorium, obowiązek wsparcia i podstawę twierdzeń",
              "Utwórz listę jurysdykcji dla definicji, ujawnień, rejestracji, terminów, reklamy i zgody"
            ]
          }
        },
        "79.2": {
          "stageTitle": "79. Podręcznik operacyjny, szkolenia i jakość",
          "title": "Adaptowalny podręcznik operacyjny i uczciwe audyty jakości",
          "description": "Przekształcaj kluczowe standardy w użyteczne, wersjonowane instrukcje i monitoruj jakość przez przejrzyste, legalne kontrole nastawione na poprawę.",
          "learnContent": {
            "videoTitle": "Masterclass: operacje franczyzowe i proporcjonalna kontrola jakości",
            "summaryText": "Podręcznik powinien jasno określać krytyczne standardy, pozwalając na legalną lokalną adaptację i uczenie. Długość, szkolenia i audyty zależą od ryzyka. Mystery shopping daje jeden sygnał perspektywy klienta, lecz nie gwarantuje spójności i musi respektować prywatność, prawo pracy, konsumenta oraz dowody.",
            "bulletPoints": [
              "Strukturyzuj podręcznik według ról i zadań, z właścicielami, datami, wariantami lokalnymi, bezpieczeństwem i historią zmian",
              "Stosuj zatwierdzonych dostawców lub obowiązkowy zakup tylko przy obiektywnym uzasadnieniu, ujawnieniu, jasnej umowie i zgodności z konkurencją",
              "Łącz opinie klientów, dane operacyjne, zapowiedziane kontrole, szkolenia i proporcjonalny mystery shopping zamiast jednego wyniku",
              "Używaj ustaleń, poziomu wagi, cure planu, wsparcia i eskalacji; ostrzeżenie i rozwiązanie zależą od umowy, faktów i prawa"
            ],
            "coreConcepts": [
              {
                "iconName": "book-open",
                "title": "WERSJONOWANY SYSTEM OPERACYJNY",
                "description": "Standardy mają właścicieli, uzasadnienie, daty, warianty i kontrolowane aktualizacje.",
                "highlight": true
              },
              {
                "iconName": "check-circle",
                "title": "PROPORCJONALNE ZAPEWNIENIE",
                "description": "Dowody jakości są wieloźródłowe, uwzględniają prywatność i prowadzą do wsparcia oraz korekty."
              }
            ],
            "resources": [
              {
                "title": "Przewodnik podręcznika i przeglądu jakości",
                "subtitle": "Struktura PDF dla standardów, szkoleń, dowodów, prywatności i korekty",
                "type": "pdf",
                "iconName": "file-text",
                "actionUrl": "tools"
              },
              {
                "title": "Centrum nauki i standardów GOM-MAR",
                "subtitle": "Publikuj wersjonowane procedury, szkolenia, potwierdzenia, ustalenia i plany poprawy",
                "type": "tool",
                "iconName": "award",
                "actionUrl": "settings"
              }
            ],
            "fullArticleGuide": "### Standaryzuj wyniki bez blokowania poprawy\n\nCelem podręcznika jest bezpieczne i powtarzalne wykonanie, nie absolutna identyczność. Lokalne prawo, dostępność, język, lokal i potrzeby klientów mogą wymagać zmian. Rozróżnij standardy bezpieczeństwa, marki lub zgodności od obszarów lokalnego wyboru.\n\n#### Żywy system operacyjny\n1. **Priorytetyzuj procesy**: Obejmij otwarcie, bezpieczeństwo, klienta, dane, kasę, reklamacje, dostawców, recall, zatrudnienie, awarie i zamknięcie. Podręcznik może mieć mniej lub więcej niż 300 stron.\n2. **Pisz dla użytkownika**: Używaj wyszukiwalnych kroków, ról, checklist, alternatywnych mediów i dostępnych formatów. Testuj z nowymi operatorami.\n3. **Kontroluj zmiany**: Przypisz właścicieli, przegląd prawny, wersje, daty, potwierdzenia, archiwum i pilne zmiany.\n4. **Szkol do kompetencji**: Dobieraj czas i ocenę do roli i ryzyka; cztery tygodnie nie są uniwersalne. Rejestruj ukończenie, dostosowania i retraining.\n5. **Legalnie oceniaj dostawców**: Dokumentuj potrzebę jakości, ceny, rebates, alternatywy, odporność i konflikty. Mandatory sourcing może rodzić obowiązki ujawnienia i konkurencji.\n6. **Projektuj uczciwe audyty**: Publikuj standardy i scoring, szkol audytorów, zachowuj dowody, pozwalaj na odpowiedź i odróżniaj incydent od systemu.\n7. **Ostrożnie stosuj mystery shopping**: Ustal podstawę, minimalizuj dane, unikaj nadmiernego monitoringu pracowników, kontroluj nagrania i retencję oraz konsultuj lokalne wymogi pracy.\n8. **Koryguj przed karą**: Klasyfikuj wagę, natychmiast usuwaj ryzyko bezpieczeństwa, ustal remediation i sprawdzaj zamknięcie. Nie wystawiaj automatycznie ostrzeżenia za każdą różnicę.\n9. **Rozwiązuj z prawnikiem**: Przestrzegaj umowy, notice, cure, dobrej wiary, antydyskryminacji i lokalnych zasad. Szablon nie gwarantuje bezpiecznego rozwiązania.\n10. **Ucz się od sieci**: Oceniaj innowacje partnerów przed kontrolowanym wdrożeniem pod kątem praw, bezpieczeństwa i lokalności.\n\nNPS może być użyteczny, lecz porównuj porównywalne dane i nie czyń jednej metryki jedynym osądem."
          },
          "understandContent": {
            "coreTakeaway": "Jakość sieci rośnie dzięki jasnym krytycznym standardom, kompetentnym szkoleniom, wielu źródłom dowodów i uczciwej korekcie, nie absolutnej standaryzacji lub nadzorowi.",
            "keyPrinciples": [
              "Audytuj według ujawnionych, istotnych standardów i stosuj proporcjonalną reakcję z dowodami, wsparciem, cure i odwołaniem",
              "Sprawdź mystery shopping, dane pracowników, nagrania, ograniczenia dostawców i rozwiązanie umowy według lokalnego prawa"
            ]
          },
          "actionTask": {
            "instruction": "Utwórz pierwszą kontrolowaną wersję systemu operacyjnego:",
            "checklistItems": [
              "Wymień krytyczne procesy z właścicielem, ryzykiem, regułą lokalnej zmiany, dowodem i terminem przeglądu",
              "Opracuj przejrzystą metodę audytu łączącą operacje, klienta, szkolenia i proporcjonalne obserwacje",
              "Zdefiniuj prywatność, remediation, eskalację, wersjonowanie i przegląd prawny przed wdrożeniem"
            ]
          }
        }
      }
    },


    "80": {
      "title": "80. Venture debt, mezzanine i finansowanie zależne od przychodu",
      "subtitle": "Zdolność dłużna, covenants, warranty, ryzyko spłaty i analiza pełnego kosztu",
      "description": "Oceniaj private debt i finansowanie sprzedażowe jako ryzykowne zobowiązania, nie łatwy kapitał wzrostowy. Modeluj cash flow, rozwodnienie, zabezpieczenia, gwarancje, covenants, skutki defaultu oraz lokalne ujęcie księgowe, podatkowe i regulacyjne.",
      "lessons": {
        "80.1": {
          "stageTitle": "80. Venture debt, covenants i warranty",
          "title": "Venture debt: test zdolności spłaty przed dodaniem dźwigni",
          "description": "Poznaj term sheet, odsetki, opłaty, zabezpieczenia, warranty i scenariusze covenantów bez zakładania wzrostu wyceny lub małego rozwodnienia.",
          "learnContent": {
            "videoTitle": "Masterclass: ryzyko venture debt i analiza term sheet",
            "summaryText": "Venture debt może wydłużyć runway lub sfinansować aktywo, ale tworzy stałe roszczenia wobec firmy o niepewnych przychodach. Może zawierać warranty, opłaty, zabezpieczenia, gwarancje i restrykcyjne covenants, więc nie jest automatycznie nierozwadniający ani bezpieczniejszy od equity. Dopasowanie zależy od downside cash flow i refinansowania.",
            "bulletPoints": [
              "Oblicz pełny koszt gotówkowy i equity-linked: odsetki, discount, opłaty, niewykorzystanie, prepayment, exit fees, prawnicy i warranty",
              "Modeluj amortyzację, interest-only i maturity w scenariuszu bazowym, downside i severe downside zamiast opierać się na przedziałach rynkowych",
              "Przekształć covenants dotyczące płynności, przychodu, fundraisingu, raportów, długu i MAC w monitorowane triggery i cure rights",
              "Przeanalizuj collateral, priority, account control, IP security, gwarancje, intercreditor i remedies przed podpisaniem"
            ],
            "coreConcepts": [
              {
                "iconName": "alert-triangle",
                "title": "ZDOLNOŚĆ DŁUŻNA W DOWNSIDE",
                "description": "Zdolność wyznacza stresowy cash flow i realny dostęp do kapitału, nie prognoza wzrostu.",
                "highlight": true
              },
              {
                "iconName": "file-text",
                "title": "PEŁNA EKONOMIKA WARUNKÓW",
                "description": "Cena obejmuje gotówkę, rozwodnienie, ograniczenia, zabezpieczenia, raporty i skutki defaultu."
              }
            ],
            "resources": [
              {
                "title": "Przewodnik term sheet i covenantów venture debt",
                "subtitle": "Lista PDF dla kosztu, warrantów, zabezpieczeń, triggerów, remedies i scenariuszy",
                "type": "pdf",
                "iconName": "file-text",
                "actionUrl": "tools"
              },
              {
                "title": "Model zdolności dłużnej i runway Mara CRM",
                "subtitle": "Symuluj cash, debt service, covenants, rozwodnienie i refinansowanie",
                "type": "tool",
                "iconName": "bar-chart-2",
                "actionUrl": "crm"
              }
            ],
            "fullArticleGuide": "### Dług zamienia ryzyko prognozy w obowiązek umowny\n\nDług zachowuje obecną własność tylko przy dobrym wyniku i spłacie. Warranty lub konwersja rozwadniają, a kryzys może wymusić finansowanie, sprzedaż aktywów lub utratę kontroli. Żadne finansowanie nie gwarantuje wyższej wyceny.\n\n#### Obronna analiza\n1. **Określ użycie i alternatywy**: Powiąż środki z potrzebą i porównaj equity, gotówkę, finansowanie klienta, bank i opóźnienie wydatku.\n2. **Buduj zintegrowane scenariusze**: Modeluj P&L, cash flow i bilans miesięcznie do maturity, z podatkami, working capital, opóźnioną rundą i spadkiem przychodu.\n3. **Oblicz all-in cost**: Pokaż odsetki, kapitalizację, opłaty, wartość warrantów, koszty i early exit. Sam procent nie jest porównywalnym kosztem.\n4. **Mapuj waterfall**: Uwzględnij istniejący dług, leasing, podatki, payroll, dostawców i seniority.\n5. **Stresuj covenants**: Prognozuj headroom i moment breach lub defaultu. Nie zakładaj usunięcia covenantów lub 6–12 miesięcy interest-only.\n6. **Sprawdź prawa kontroli**: Zgody na rundy, przejęcia, dywidendy, budżet, nowy dług, sprzedaż aktywów i zmianę biznesu.\n7. **Wyceń warranty**: Modeluj strike, coverage, anti-dilution, exercise, transfer, informacje i exit. 1–2% nie jest uniwersalne.\n8. **Planuj distress**: Ustal raportowanie, progi płynności, kontakt, cure, waivers, refinansowanie i restrukturyzację.\n9. **Uzyskaj poradę**: Analiza prawna, podatkowa, księgowa i finansowa musi odpowiadać podmiotowi, inwestorom, collateral i krajowi.\n\nLTV:CAC 3x nie dowodzi zdolności. Znaczenie mają kohorty, payback, marża, churn, koncentracja i cash conversion."
          },
          "understandContent": {
            "coreTakeaway": "Używaj venture debt tylko, gdy stresowy cash flow obsługuje całość, a firma rozumie rozwodnienie, ograniczenia, collateral i remedies.",
            "keyPrinciples": [
              "Negocjuj covenants według realnej zmienności i cure, lecz nie oczekuj usunięcia ochrony wierzyciela",
              "Utrzymuj zatwierdzone przez zarząd progi płynności i eskalacji przez cały okres finansowania"
            ]
          },
          "actionTask": {
            "instruction": "Przygotuj memorandum zdolności dłużnej do niezależnego przeglądu:",
            "checklistItems": [
              "Modeluj miesięczny cash w scenariuszu bazowym, downside i severe downside do maturity i refinansowania",
              "Oblicz opłaty, rozwodnienie, headroom covenantów, zabezpieczenia i remedies",
              "Porównaj debt, equity i alternatywy bez finansowania na tych samych założeniach"
            ]
          }
        },
        "80.2": {
          "stageTitle": "80. Finansowanie przychodowe i mezzanine",
          "title": "Finansowanie sprzedażowe i mezzanine: elastyczność cash flow a pełne ryzyko",
          "description": "Analizuj repayment od przychodu, factor rates, reconciliation, dostęp do danych, gwarancje, subordination i księgowanie.",
          "learnContent": {
            "videoTitle": "Masterclass: analiza ryzyka RBF i mezzanine",
            "summaryText": "Finansowanie sprzedażowe może zmieniać płatność z przychodem, ale produkty są różne, a część stosuje stałe dzienne obciążenia lub trudne reconciliation. Factor lub cap nie jest APR i przy szybkiej spłacie może oznaczać wysoki koszt roczny. Mezzanine łączy cechy debt i equity, lecz klasyfikacja zależy od umowy i standardu rachunkowości.",
            "bulletPoints": [
              "Przelicz factor, opłaty, holdback i czas na total cash cost oraz scenariusze roczne bez błędnego nazywania APR",
              "Sprawdź rzeczywistą zmienność płatności, reconciliation, definicję przychodu oraz skutki zwrotów, sezonowości i awarii platformy",
              "Zweryfikuj gwarancje osobiste, collateral, account control i default; brak jednego zabezpieczenia nigdy nie jest automatyczny",
              "Oceń subordination, maturity, cash lub PIK interest, participation, conversion i remedies przed nazwaniem instrumentu mezzanine lub equity-like"
            ],
            "coreConcepts": [
              {
                "iconName": "calculator",
                "title": "PORÓWNYWALNY PEŁNY KOSZT",
                "description": "Porównuj cash flow przy tym samym czasie i scenariuszu, nie headline rate lub factor cap.",
                "highlight": true
              },
              {
                "iconName": "layers",
                "title": "TREŚĆ PRAWNA PONAD ETYKIETĄ",
                "description": "Umowa określa płatność, priority, kontrolę, księgowanie i podatki, nie nazwa produktu."
              }
            ],
            "resources": [
              {
                "title": "Przewodnik porównania RBF i mezzanine",
                "subtitle": "Ramy PDF dla cash flow, factor rates, gwarancji, priority i analizy prawnej",
                "type": "pdf",
                "iconName": "file-text",
                "actionUrl": "tools"
              },
              {
                "title": "Monitor scenariuszy finansowania GOM-MAR",
                "subtitle": "Porównuj spłatę, koszt, płynność i covenants bez udostępniania live credentials",
                "type": "tool",
                "iconName": "activity",
                "actionUrl": "settings"
              }
            ],
            "fullArticleGuide": "### Elastyczna płatność nie usuwa ryzyka spłaty\n\nFinansowanie sprzedażowe obejmuje różne formy. Część to kredyt, część deklaruje zakup przyszłych należności. Treść, prawo i umowa decydują. Niższa płatność w słabym miesiącu nadal może odebrać środki na payroll, podatki, dostawców i zwroty.\n\n#### Porównaj oferty na jednym modelu\n1. **Ustal formę prawną**: Określ finansującego, prawo, status regulacyjny i rzeczywiste zobowiązanie.\n2. **Mapuj cash flow**: Advance, potrącone fees, factor, fixed lub variable withdrawals, minimum, true-up, late/default fees i termination.\n3. **Ostrożnie annualizuj**: Oblicz koszt dla kilku prędkości spłaty i jasno podaj założenia. Cap 1.15x może być tani lub drogi zależnie od czasu.\n4. **Testuj mechanikę**: Holdback base, gross/net revenue, refunds, chargebacks, taxes, konta, reconciliation i spory.\n5. **Chroń dane**: Stosuj least privilege i read-only, analizuj privacy i nie przekazuj credentials przez niebezpieczny workflow.\n6. **Czytaj default szeroko**: Stacking, nowy dług, zmiana konta, spadek przychodu, informacje, cross-default, guarantees, collateral i debit authority. Nie zakładaj oferty w 48 godzin.\n7. **Analizuj mezzanine**: Seniority, subordination, maturity, interest, PIK, participation, warrants, conversion i enforcement. Nie jest automatycznie księgowym equity ani dużą poprawą ratingu.\n8. **Porównaj alternatywy**: Bank, overdraft, invoice finance, equity, dostawcy, prepayment klienta i wolniejszy wzrost.\n9. **Planuj exit i distress**: Testuj wcześniejszą spłatę, refinansowanie, sprzedaż, default i restructuring. Nakładające się facilities tworzą konflikty, lecz zasady zależą od umów.\n\nKorzystaj z prawników, podatkowców i księgowych. Platformy, ceny, gwarancje i dane zmieniają się i wymagają weryfikacji."
          },
          "understandContent": {
            "coreTakeaway": "Wybierz RBF lub mezzanine dopiero, gdy porównywalny model pokazuje dopasowanie elastyczności, kosztu, priority i downside remedies.",
            "keyPrinciples": [
              "Nie porównuj factor rate bezpośrednio z oprocentowaniem; modeluj datowane cash flow i podawaj założenia annualizacji",
              "Zweryfikuj guarantees, collateral, debit rights, reconciliation, stacking i dostęp do danych w podpisanych dokumentach"
            ]
          },
          "actionTask": {
            "instruction": "Zbuduj porównywalną analizę ofert finansowania:",
            "checklistItems": [
              "Wprowadź każdy datowany cash flow, fee, factor, regułę spłaty i early-exit term",
              "Stresuj przychód, zwroty, sezonowość i timing, śledząc minimalną płynność",
              "Udokumentuj formę prawną, priority, gwarancje, dane, default i pytania księgowe lub podatkowe"
            ]
          }
        }
      }
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
