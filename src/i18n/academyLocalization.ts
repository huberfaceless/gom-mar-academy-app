Warning: truncated output (original token count: 136700)
Total output lines: 5000

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
    21: {
      title: '21. CRM, Pipeline Management & Responsible Lead Prioritisation',
      subtitle: 'Useful contact context without opaque surveillance',
      description: 'Organise contacts and opportunities with proportionate data, explainable prioritisation, clear pipeline ownership and human review.',
      lessons: {
        '21.1': {
          stageTitle: '21. CRM, Pipeline Management & Responsible Lead Prioritisation', title: 'Explainable lead scoring & contact qualification',
          description: 'Use a score as a limited prioritisation signal—not as proof of purchase intent or permission to contact someone.',
          learnContent: {
            videoTitle: 'Lead scoring: a testable aid, not a “hot lead” detector',
            summaryText: 'A score such as 85/100 reflects chosen rules or a model. It does not reveal readiness to buy, and arbitrary points or an assumed 80/20 revenue split must be validated with your own outcomes.',
            bulletPoints: ['Define the purpose, eligible population, lawful data, feature meaning and score owner', 'Avoid treating opens, page views or inactivity as certain intent; technical and contextual noise is common', 'Validate predictions against real outcomes and require human review before consequential follow-up'],
            fullArticleGuide: `### Build lead prioritisation that can be explained

Lead scoring ranks records according to assumptions. Those assumptions may be wrong, become outdated or disadvantage groups with different behaviour.

#### Responsible scoring workflow

1. **Define the decision**: State whether the score orders a work queue, suggests an information request or supports another limited action.
2. **Choose lawful signals**: Use necessary, documented data consistent with notices, consent and the contact’s communication preferences. Avoid sensitive traits and unjustified proxies.
3. **Create transparent rules**: Document why each signal matters, its weight, decay and exclusions. A pricing-page visit or email open is not automatically buying intent.
4. **Validate**: Compare bands against suitable outcomes, calibration and error rates over time and across relevant groups. Test whether using the score improves results over a simple baseline.
5. **Control action**: Let a trained person review context, frequency, consent and suitability before outreach. Provide correction, suppression and objection handling.
6. **Monitor and retire**: Review drift, complaints and harmful false positives; change or stop a score when evidence no longer supports it.

Do not label a person “hot” as a fact. Prefer neutral operational bands such as “review next”, with the reason and last validation date visible.`,
            practicalExamples: ['Review one CRM score, inspect the contributing signals and consent status, and record whether a human agrees before scheduling any follow-up.'],
          },
          understandContent: { coreTakeaway: 'A lead score is useful only as an explainable, validated and reviewable prioritisation aid.', keyPrinciples: ['Never equate activity with certain purchase intent', 'Validate scoring and keep outreach under human control'] },
          actionTask: { instruction: 'Review score reasons, consent and validation status for selected CRM contacts:', placeholder: 'Lead-prioritisation controls reviewed' },
        },
        '21.2': {
          stageTitle: '21. CRM, Pipeline Management & Responsible Lead Prioritisation', title: 'Proportionate interaction history & CRM notes',
          description: 'Record only necessary customer context with clear provenance, access controls, retention and correction procedures.',
          learnContent: {
            videoTitle: 'A useful CRM history without collecting everything',
            summaryText: 'A complete surveillance timeline is neither necessary nor automatically lawful. CRM records should serve a defined relationship or process and remain accurate, respectful and limited.',
            bulletPoints: ['Record relevant communications, commitments and next steps rather than every observable action', 'Separate facts, customer statements, consent records and internal assessments with author and date', 'Restrict access, define retention and let authorised staff correct or delete inappropriate notes'],
            fullArticleGuide: `### Create CRM context that helps the customer relationship

Website visits, email activity, calls and notes can reveal personal information. Collecting more data does not automatically produce better service and can increase privacy, security and discrimination risk.

#### CRM note standards

1. **Purpose and necessity**: Record information needed to deliver the service, honour a request or manage a legitimate sales process.
2. **Source and accuracy**: Mark whether a field is customer-provided, system-observed or staff assessment. Add author, time and uncertainty where relevant.
3. **Respectful language**: Use neutral facts and agreed next steps; avoid insults, speculation, health details, financial vulnerability or unrelated personal observations.
4. **Sensitive details**: Do not request or store budget, health, family or identity information unless it is necessary, lawful, secured and transparently handled.
5. **Access and retention**: Apply role-based access, audit important changes and remove records when their defined retention period expires.
6. **Before contact**: Verify the contact route, permission, suppression status, last interaction and promised next step—not merely the latest tracking events.

Secure quick actions against accidental sends and wrong recipients with previews, confirmation and permission checks.`,
            practicalExamples: ['Add a factual follow-up note containing the agreed action and date, then confirm who may access it and when it should be reviewed or deleted.'],
          },
          understandContent: { coreTakeaway: 'Good CRM notes are necessary, factual, attributable, protected and retained only as long as justified.', keyPrinciples: ['Record useful context, not exhaustive surveillance', 'Protect, review and delete CRM data deliberately'] },
          actionTask: { instruction: 'Create and review a proportionate follow-up note in the CRM:', placeholder: 'CRM note reviewed' },
        },
        '21.3': {
          stageTitle: '21. CRM, Pipeline Management & Responsible Lead Prioritisation', title: 'Segmentation, tagging & accountable pipelines',
          description: 'Use well-defined tags and stages to coordinate work without turning assumptions into customer facts or triggering inappropriate automation.',
          learnContent: {
            videoTitle: 'Segments and pipeline stages with clear ownership',
            summaryText: 'A pipeline improves coordination when stages have objective entry and exit criteria, owners and next actions. It cannot ensure that every opportunity converts or is remembered.',
            bulletPoints: ['Maintain a small tag dictionary with purpose, owner, source and expiry rules', 'Define stages from observable process events rather than arbitrary score thresholds', 'Place approval and consent checks before automated messages or consequential stage actions'],
            fullArticleGuide: `### Build a pipeline that reflects real work

Pipeline stages should describe the current process—not make psychological claims about a person.

#### Example stage design

1. **Enquiry received**: A permitted contact or request entered the system; source and communication preference are recorded.
2. **Fit review**: An owner checks stated needs, service scope, capacity and missing information. A score may inform order but does not decide alone.
3. **Conversation or proposal**: The customer has knowingly entered the relevant process; the proposal version, terms and next date are recorded.
4. **Decision**: Mark won, lost, paused or withdrawn with a neutral reason where appropriate. Do not keep sending sales messages after objection or withdrawal.
5. **Onboarding or closure**: Start only approved fulfilment actions, or apply the correct retention and deletion workflow.

Prevent uncontrolled tag growth, conflicting stages and duplicate automation. Audit bulk changes, offer rollback and review inactive opportunities instead of hiding them indefinitely.`,
            practicalExamples: ['Create one consent-compatible segment and a four- or five-stage pipeline with documented entry, exit, owner and next-action rules.'],
          },
          understandContent: { coreTakeaway: 'Clear definitions, ownership and communication controls make segmentation and pipelines useful without overstating intent.', keyPrinciples: ['Use neutral, documented tags and stages', 'Require consent and approval before automated outreach'] },
          actionTask: { instruction: 'Complete the CRM module and confirm responsible pipeline controls:', checklistItems: ['I understand that a lead score is a validated prioritisation aid, not proof of intent', 'I can keep necessary, factual and access-controlled interaction records', 'I can define neutral segments and pipeline stages with consent, ownership and review'] },
        },
      },
    },
    22: {
      title: '22. Conversion Optimisation & Landing Page Masterclass',
      subtitle: 'Clear, accessible landing pages improved through reliable evidence',
      description: 'Design focused landing pages, communicate claims honestly and improve the experience with privacy-aware measurement and disciplined experiments.',
      lessons: {
        '22.1': {
          stageTitle: '22. Conversion Optimisation & Landing Page Masterclass', title: 'A clear and trustworthy landing-page structure',
          description: 'Build a focused, accessible landing page that helps visitors understand the offer and make an informed decision.',
          learnContent: {
            videoTitle: 'Landing-page structure: clarity, trust and accessibility',
            summaryText: 'A useful landing page explains the audience, value, evidence, conditions and next step without distraction, fabricated proof or pressure.',
            bulletPoints: ['State the offer and intended audience in plain language near the top', 'Use genuine, permission-based evidence and qualify all measurable claims', 'Make the primary action prominent, descriptive and accessible on mobile and desktop', 'Include essential price, privacy, cancellation and contact information before commitment'],
            coreConcepts: [
              { iconName: 'title', title: 'CLEAR HEADING', description: 'Explain what is offered and for whom. A three-second rule is a heuristic, not a universal law.', highlight: true },
              { iconName: 'anchor', title: 'RELEVANT INTRODUCTION', description: 'Connect the visitor’s stated need with the offer without exaggerating pain, fear or urgency.' },
              { iconName: 'stars', title: 'VERIFIABLE EVIDENCE', description: 'Use authentic testimonials with permission and context. Never invent identities, numbers or outcomes.' },
              { iconName: 'touch_app', title: 'ACCESSIBLE ACTION', description: 'Use a descriptive button, sufficient contrast, keyboard focus and a clear explanation of what happens next.' },
            ],
            fullArticleGuide: `### A landing page that supports an informed choice

A landing page usually has one primary objective, but it still needs enough context for a visitor to understand the decision.

#### Recommended structure

1. **Heading and introduction**: Name the offer, intended audience and main value in plain language. Avoid unsupported guarantees and artificial scarcity.
2. **Benefits and fit**: Explain relevant benefits, limitations and who may not be a suitable customer.
3. **Evidence**: Support claims with current sources, representative results and necessary qualifications. Testimonials require permission and should not imply typical results when they are exceptional.
4. **Offer details**: Present price, recurring charges, cancellation, delivery, eligibility and material conditions before the visitor commits.
5. **Primary action**: Use a descriptive label such as “Download the free checklist”. Do not disguise consent or preselect optional marketing.
6. **Trust and access**: Provide contact, privacy and legal information. Check headings, labels, focus order, contrast, zoom and screen-reader meaning.

Visual prominence should not come at the expense of accessibility. Contrast must be sufficient for text and controls, while colour should never be the only signal. Review every page on real mobile devices and slower connections before publishing.`,
            practicalExamples: ['Weak: “Innovative synergies for modern growth.” Better: “Plan your first permission-based email sequence with a guided checklist.”', 'Replace “5–10 qualified leads every week—fully automated” with a substantiated description of the process and factors that affect results.'],
          },
          understandContent: { coreTakeaway: 'A strong landing page combines clarity, truthful evidence, accessible interaction and transparent conditions.', keyPrinciples: ['One clear primary action with enough decision context', 'Use only substantiated claims and authorised proof', 'Test accessibility and mobile usability'] },
          actionTask: { instruction: 'Review your landing page before publication:', checklistItems: ['The heading clearly explains the offer and audience', 'Claims and testimonials are genuine, authorised and appropriately qualified', 'The primary action is descriptive and keyboard accessible', 'Price, consent, privacy and material conditions are visible at the right time'], toolboxCategory: 'landingpage' },
        },
        '22.2': {
          stageTitle: '22. Conversion Optimisation & Landing Page Masterclass', title: 'A/B testing, behavioural maps & performance',
          description: 'Find friction with validated events, privacy-aware behavioural data and experiments planned around a specific decision.',
          learnContent: {
            videoTitle: 'Responsible conversion experiments and page diagnostics',
            summaryText: 'A/B tests estimate uncertain effects; heatmaps visualise sampled interactions. Neither guarantees uplift nor explains motivation on its own.',
            bulletPoints: ['Write one hypothesis and primary metric before viewing results', 'Estimate the required sample and duration from baseline, useful effect and error tolerance', 'Check consent, data minimisation, bot filtering and event quality before collecting behavioural data', 'Treat mobile speed, accessibility and task completion as guardrails—not only conversion'],
            coreConcepts: [
              { iconName: 'compare', title: 'A/B TESTING', description: 'Randomly compare controlled variants with stable assignment and a predeclared analysis plan. Start where evidence suggests the greatest uncertainty—not automatically with the headline.', highlight: true },
              { iconName: 'thermostat', title: 'BEHAVIOURAL MAPS', description: 'Use aggregated click and scroll patterns as clues. Exclude sensitive fields, mask personal data and investigate causes with additional evidence.' },
            ],
            fullArticleGuide: `### Evidence-led conversion improvement

Optimisation is a cycle of diagnosis, hypothesis, measurement and review—not a promise to double conversion.

1. Confirm that analytics events, eligibility and consent states are correct.
2. Identify one meaningful friction point from quantitative and qualitative evidence.
3. Define the audience, change, mechanism, primary metric, guardrails, minimum useful effect, duration and stopping rule.
4. Randomise consistently and avoid changing traffic or the experience during the test.
5. Evaluate effect size, uncertainty, missing data, sample-ratio mismatch and practical value.
6. Document the decision and limitations, then monitor after rollout.

Heatmaps can miss keyboard use, dynamic content and cross-device behaviour. Session recordings can capture personal information, so use strict masking, short retention, access controls and an appropriate legal basis. Performance checks should include real-user measures where available and laboratory tests under representative mobile conditions.`,
            practicalExamples: ['Test whether clearer pricing information improves qualified completions while monitoring errors, refunds and support requests as guardrails.'],
          },
          understandContent: { coreTakeaway: 'Reliable optimisation requires trustworthy measurement, a planned experiment, privacy controls and an honest account of uncertainty.', keyPrinciples: ['Do not rely on universal uplift or significance shortcuts', 'Use behavioural maps as diagnostic clues, not mind-reading', 'Protect usability, accessibility and customer outcomes'] },
          actionTask: { instruction: 'Prepare one responsible landing-page experiment:', checklistItems: ['One hypothesis, primary metric and guardrails documented', 'Sample, duration and stopping rule planned', 'Mobile performance and accessibility checked', 'Tracking, consent and privacy controls verified'], toolboxCategory: 'landingpage' },
        },
      },
    },
    23: {
      title: '23. Email Marketing Masterclass: Subject Lines & Automation',
      subtitle: 'Relevant subject lines and respectful lifecycle communication',
      description: 'Write accurate subject lines and build permission-based automated sequences that deliver value, respect preferences and are measured with reliable signals.',
      lessons: {
        '23.1': {
          stageTitle: '23. Email Marketing Masterclass', title: 'Subject lines that set honest expectations',
          description: 'Create concise, relevant subject lines and preview text without fabricated urgency, misleading curiosity or unsupported outcome claims.',
          learnContent: {
            videoTitle: 'Subject-line design: relevance, clarity and trustworthy testing',
            summaryText: 'A subject line influences whether a delivered message is noticed, but it does not determine campaign success by itself. Sender recognition, consent, timing, deliverability and content all matter.',
            bulletPoints: ['Useful: state a genuine benefit or purpose that the message fulfils', 'Specific: use numbers or facts only when they are accurate, substantiated and properly contextualised', 'Timely: mention a deadline only when it is real and material', 'Consistent: align the subject, preview text, sender and message content'],
            coreConcepts: [
              { iconName: 'zap', title: 'REAL TIMELINESS', description: 'Use urgency only for an actual deadline, availability change or time-sensitive need. Do not manufacture FOMO.', highlight: true },
              { iconName: 'sparkles', title: 'DISTINCTIVE BUT ACCURATE', description: 'Use a relevant angle or question without clickbait, false replies, deceptive prefixes or hidden commercial intent.' },
              { iconName: 'target', title: 'SUPPORTED SPECIFICITY', description: 'Specific claims need evidence and context. Never invent revenue, percentages, case studies or personalisation.' },
              { iconName: 'gift', title: 'USEFUL PROMISE', description: 'Promise only what the email actually provides, and make the next step easy to understand.' },
            ],
            actionBanner: { title: 'Need ideas for the next newsletter?', description: 'Use the AI-assisted generator to draft ten subject-line options, then verify every claim, condition and personalisation field before use.', buttonText: 'Open Email Generator', actionUrl: 'email', iconName: 'auto_awesome' },
            resources: [
              { title: 'Email Generator (AI tool)', subtitle: 'Draft ten subject-line options', type: 'tool', iconName: 'smart_toy', actionUrl: 'email' },
              { title: 'Subject-line review templates', subtitle: 'PDF review resource', type: 'pdf', iconName: 'picture_as_pdf' },
            ],
            fullArticleGuide: `### The subject line begins an expectation

The subject line, sender name and preview text form the first visible context of an email. Their job is to help the recipient recognise relevance—not to force an open.

#### A responsible review framework

* **Useful**: Does the message provide the promised information or benefit?
* **Specific**: Are names, figures, deadlines and claims accurate, authorised and meaningful?
* **Timely**: Is urgency genuine, and will the stated deadline really be enforced?
* **Distinctive**: Is the wording easy to recognise without mimicking a personal reply or security warning?
* **Accessible**: Does the important meaning survive truncation, screen readers, emojis being omitted and dark mode?

There is no universal ideal length. Test rendering in the main inboxes and place essential meaning early. Preview text should complement rather than repeat the subject. Avoid relying on “spam-word” lists: deliverability also depends on permission, reputation, authentication, complaints, engagement and content.

Open tracking is incomplete and can be inflated by privacy protections or automated scanners. Evaluate downstream actions, replies, unsubscribes, complaints and customer outcomes alongside opens. Test one meaningful hypothesis with a predefined metric and sufficient evidence.`,
            practicalExamples: ['Misleading: “[Case study] How Thomas doubled opens by 42%” when the case or calculation cannot be verified.', 'Clear: “Your five-step welcome-sequence checklist” when the email contains exactly that resource.', 'Timely: “Registration closes Friday at 18:00” only when the deadline is real and the terms are visible.'],
          },
          understandContent: { coreTakeaway: 'A subject line should create an accurate, relevant expectation; campaign quality depends on the complete permission, delivery and message experience.', keyPrinciples: ['Never fabricate urgency, personalisation or results', 'Optimise for meaning across devices rather than a fixed character limit', 'Measure trustworthy downstream outcomes, not opens alone'] },
          actionTask: { instruction: 'Complete the pre-send review for the subject line and email:', checklistItems: ['Subject and preview text accurately match the message', 'Claims, deadlines and personalisation have been verified', 'Mobile truncation and accessibility have been checked', 'Consent, suppression, sender identity and authentication are valid', 'The test hypothesis and decision metric are documented'], toolboxCategory: 'email' },
        },
        '23.2': {
          stageTitle: '23. Email Marketing Masterclass', title: 'Permission-based welcome & nurture sequences',
          description: 'Build a measured automated sequence that fulfils the sign-up promise, adapts to preferences and stops appropriately.',
          learnContent: {
            videoTitle: 'Designing a responsible welcome and nurture flow',
            summaryText: 'Automation can deliver consistent support, but it cannot turn every new contact into a buyer. Relevance, permission, frequency and customer value require ongoing human oversight.',
            bulletPoints: ['Message 1: deliver the requested resource, identify the sender and set expectations', 'Messages 2–3: provide useful guidance and invite feedback without inventing a personal story', 'Message 4: share a genuine, authorised example with limitations', 'Message 5: present an appropriate offer with complete terms and no artificial deadline', 'Pause or exit when a person unsubscribes, objects, completes the goal or needs human help'],
            coreConcepts: [
              { iconName: 'mail', title: 'WELCOME FLOW', description: 'Deliver the promised resource promptly and explain content, frequency, sender and preference options.', highlight: true },
              { iconName: 'user_check', title: 'RELEVANT NURTURE', description: 'Use declared needs and consent-compatible behaviour carefully. Do not infer vulnerabilities or pretend automation is personal human contact.' },
            ],
            resources: [{ title: 'Email Automation Workflow', subtitle: 'Open templates in the automation editor', type: 'tool', iconName: 'mail', actionUrl: 'email' }],
            fullArticleGuide: `### Build a welcome sequence around the recipient’s expectation

A fixed five-email pattern is a starting template, not a guarantee of higher opens, loyalty or three-times more customers.

1. **Define entry**: Record the source, permission, promised content, locale and applicable preferences.
2. **Deliver first**: Send the requested resource, sender identity, support route and realistic expectations.
3. **Add value**: Teach one useful step per message and distinguish evidence, opinion and affiliate recommendation.
4. **Offer transparently**: Explain price, material terms, relationship or commission disclosure and who the offer is for.
5. **Control frequency**: Choose delays from audience context and test results rather than applying a universal one-day rule.
6. **Handle exits**: Honour unsubscribes and objections promptly, prevent duplicate journeys and stop sales messages after conversion where inappropriate.
7. **Monitor quality**: Review delivery, clicks, replies, task completion, complaints, unsubscribes and business outcomes. Opens alone are unreliable.

Authenticate the sending domain with SPF and DKIM and configure DMARC deliberately. Test links, fallback text, language, accessibility and merge fields. Keep an accountable owner and a safe manual override for every automation.`,
            practicalExamples: ['A subscriber requesting a checklist receives it first, then two optional educational messages and an accurately disclosed offer; unsubscribe and preference changes stop the relevant path immediately.'],
          },
          understandContent: { coreTakeaway: 'A responsible nurture flow consistently fulfils permission-based expectations and improves through measured customer outcomes—not pressure or unsupported multipliers.', keyPrinciples: ['Deliver the promised value before promoting', 'Respect consent, frequency preferences and exits', 'Monitor deliverability and customer impact with human oversight'] },
          actionTask: { instruction: 'Create and test your first responsible welcome sequence:', checklistItems: ['Entry source, consent and promise are documented', 'Resource-delivery and educational messages are complete', 'Offer terms and affiliate relationship are disclosed where applicable', 'Delays, exits, suppression and duplicate prevention are configured', 'SPF, DKIM, DMARC, links, merge fields and accessibility are tested'], toolboxCategory: 'email' },
        },
      },
    },
    24: {
      title: '24. Mara CRM: Explainable Lead Insights & Responsible Sales Support',
      subtitle: 'Proportionate signals, reviewable recommendations and consent-aware follow-up',
      description: 'Use Mara to organise relevant CRM signals and draft possible next steps without treating tracking data as certain intent or delegating customer decisions to AI.',
      lessons: {
        '24.1': {
          stageTitle: '24. Mara CRM: Explainable Lead Insights', title: 'Responsible scoring, behavioural signals & human review',
          description: 'Learn how Mara can summarise permitted CRM activity, explain a prioritisation result and draft follow-up for an authorised person to review.',
          learnContent: {
            videoTitle: 'Mara lead insights: evidence, uncertainty and safe action',
            summaryText: 'Clicks, opens and page visits are incomplete behavioural signals. Mara may help prioritise work, but it cannot know buying intent, guarantee a close or determine the best contact time for an individual.',
            bulletPoints: ['Show the signals, source, age, rule or model version and uncertainty behind every result', 'Treat open tracking, pricing-page clicks and recent activity as context—not proof of purchase intent', 'Generate drafts only after checking consent, channel preference, frequency and suppression status', 'Require a trained person to verify the recipient, claims, tone, timing and next action', 'Monitor errors, complaints, drift and group impact; pause the feature when evidence is inadequate'],
            coreConcepts: [
              { iconName: 'sparkles', title: 'EXPLAINABLE MARA INSIGHTS', description: 'Summarise authorised signals and display why a record was prioritised. Do not label a person “high intent” as an established fact.', highlight: true },
              { iconName: 'trending_up', title: 'TIMING AS A TESTABLE SUGGESTION', description: 'Suggest a permitted contact window from limited evidence, then respect local time, preferences, frequency limits and human judgement.' },
            ],
            resources: [{ title: 'Open Mara CRM Lead Insights', subtitle: 'Review a test or authorised CRM record', type: 'tool', iconName: 'users', actionUrl: 'crm' }],
            fullArticleGuide: `### Use Mara as decision support—not an autonomous salesperson

Behavioural events can be missing, duplicated or generated by privacy protection, security scanners, shared devices and accidental clicks. A percentage displayed by a model is an estimate based on definitions and historical data—not a personal truth.

#### Responsible insight workflow

1. **Confirm purpose and permission**: Identify the business process, lawful basis, notice, communication permission and any objection or suppression.
2. **Minimise inputs**: Use only data necessary for the stated purpose. Avoid sensitive data and unjustified proxies for health, age, finances or vulnerability.
3. **Explain the result**: Display important contributing signals, timestamps, source, model or rule version, confidence limits and missing information.
4. **Validate performance**: Compare the prioritisation with a simple baseline and relevant outcomes. Check calibration, false positives, drift and differences between groups.
5. **Review the action**: A trained person checks identity, context, frequency, claims, offer suitability and whether no contact is the better choice.
6. **Control automation**: Use previews, approval, rate limits, quiet hours, duplicate prevention, audit logs and an immediate stop or rollback.
7. **Learn safely**: Monitor complaints, unsubscribes, corrections and customer outcomes—not only clicks or sales.

Do not impose rules such as “90% means contact within four hours” unless a specific, validated process justifies them. A fixed day 1–3–7 schedule may be inappropriate for the recipient or channel. AI-generated text must never invent prior conversations, urgency, personal knowledge or promised outcomes.`,
            practicalExamples: ['Instead of “Julia Weber has a 92% close probability”, show “Priority review suggested: requested a demo yesterday; email-open data excluded; consent and latest contact require confirmation.”', 'Use a synthetic test record in training. Do not expose a real person’s CRM profile or start a campaign merely to complete the lesson.'],
          },
          understandContent: { coreTakeaway: 'Mara insights are reviewable, uncertain decision support; consent, validation and accountable human judgement determine whether any follow-up is appropriate.', keyPrinciples: ['Never equate behavioural tracking with certain buying intent', 'Explain and validate every prioritisation method', 'Require permission checks and human approval before outreach'] },
          actionTask: { instruction: 'Review Mara Insights safely with a synthetic or authorised test record:', checklistItems: ['The purpose, consent, source and suppression state are visible', 'Signals, timestamps, uncertainty and scoring version can be explained', 'The suggested action was checked against frequency, local time and customer context', 'The AI draft contains no invented facts, pressure or unsupported claims', 'No message or campaign starts without explicit human approval'], toolboxCategory: 'email' },
        },
      },
    },
    25: {
      title: '25. Coordinated Channels & Responsible Scaling',
      subtitle: 'Sustainable reach, consent-aware retargeting and controlled sales operations',
      description: 'Coordinate a manageable channel mix, reuse content appropriately and scale only after measurement, customer safeguards and operational capacity are proven.',
      lessons: {
        '25.1': {
          stageTitle: '25. Coordinated Channels & Responsible Scaling', title: 'Multi-channel planning, retargeting & content reuse',
          description: 'Build a focused channel plan that respects consent, platform context, frequency and audience wellbeing instead of pursuing omnipresence.',
          learnContent: {
            videoTitle: 'Coordinated channels and privacy-aware retargeting',
            summaryText: 'More touchpoints do not automatically create trust or sales. Choose channels from evidence, adapt content to each context and limit repeated advertising.',
            bulletPoints: ['Select channels from audience evidence, capacity and measurable purpose rather than trying to appear everywhere', 'Use discovery, education and decision support as flexible journey states—not labels of a person’s psychology', 'Repurpose a source only when rights, accuracy, accessibility and platform context are preserved', 'Apply consent, suppression, retention and frequency controls before creating or synchronising audiences', 'Use UTM parameters and permitted events as partial attribution evidence, not “complete” conversion tracking'],
            coreConcepts: [
              { iconName: 'layers', title: 'JOURNEY-BASED COMMUNICATION', description: 'Match useful information to an observed process state without inferring sensitive traits or using artificial scarcity.', highlight: true },
              { iconName: 'trending_up', title: 'SUSTAINABLE CHANNEL MIX', description: 'Coordinate only the channels the team can maintain, measure and support. Familiarity is not the same as authority or trust.' },
              { iconName: 'sparkles', title: 'CONTEXTUAL REPURPOSING', description: 'Transform a verified source into fewer, useful formats with platform-specific editing, captions, attribution and quality review.' },
            ],
            resources: [
              { title: 'Retargeting Planning Blueprints', subtitle: 'Campaign safeguards and budget worksheet', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Email & CRM Campaigns', subtitle: 'Coordinate permitted follow-up journeys', type: 'tool', iconName: 'mail', actionUrl: 'email' },
            ],
            fullArticleGuide: `### Design coordinated reach without surveillance or pressure

“Omnipresence” can create excessive frequency, wasted spend and a poor customer experience. The goal is useful continuity across a limited set of channels.

#### A responsible three-part journey

1. **Discovery**: Offer accessible organic content or ads to an eligible audience. Explain tracking and collect only the data needed for a defined purpose.
2. **Education and evaluation**: Provide tutorials, comparisons and authorised case studies. Include limitations and do not hide commercial relationships.
3. **Decision support**: Present a clear offer, price, terms and genuine availability. Never use fabricated scarcity, countdowns that reset or targeting based on vulnerability.

Before activating a pixel, audience upload or CRM synchronisation, confirm the legal basis, consent requirements, platform terms, retent…36700 tokens truncated… must not imply that applicants are inferior, pressure them to disclose unnecessary information or automatically exclude them through hidden rules.

#### Four phases

1. **Inform before collecting**: Explain provider identity, service scope, evidence, material risks, exclusions, representative outcomes, price range, expected customer work, availability and how questions can be asked without applying.
2. **Collect a proportionate application**: State the purpose of each section and request only information needed for fit and delivery. Avoid sensitive data unless necessary and lawfully handled. Save progress, support keyboard and screen readers and provide another channel.
3. **Review and offer a meeting**: Apply documented criteria consistently. Validate important answers, allow correction and route uncertain or consequential cases to a trained human. A calendar invitation is optional and must not silently subscribe the person to marketing.
4. **Confirm, decline or redirect respectfully**: Explain the outcome in useful terms, provide a contact or review route where appropriate, apply retention and deletion rules and offer genuinely relevant public resources—not an automatic paid downsell.

#### Operating controls

- Separate service-enquiry processing from consent for email, SMS, WhatsApp or other marketing.
- Identify every processor, integration and recipient; secure form data and restrict CRM access.
- Do not ask applicants to expose passwords, health details, protected traits or financial hardship without a necessary, lawful and safeguarded purpose.
- Never infer seriousness from questionnaire length. Test completion, comprehension, accessibility, abandonment and downstream fit.
- Case studies must be authorised and accurately state context, selection, conditions and limitations.
- Preparation material should help the applicant evaluate the service; do not make unpaid “homework” a hidden condition or sunk-cost pressure.
- Set response-time expectations and a recovery route for failed forms, missed messages and unavailable calendars.
- Review acceptance patterns for unjustified disparity and update criteria when they exclude suitable people.

The goal is not a “perfect funnel”. It is a documented, understandable service journey that produces informed mutual decisions.`,
            practicalExamples: [
              'A consultancy publishes its scope and price range, asks six necessary questions, manually reviews borderline cases and explains a non-fit without adding the person to a campaign.',
              'A captioned case study states the client context and limits; applicants can read the same information as text and book an accessibility-supported call.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Submitting an application signals interest, not ability to pay or consent to persuasion; suitability is a fair, two-way and reviewable judgment.',
            keyPrinciples: ['Explain criteria and data use before collection', 'Minimise questions and provide accessible alternatives', 'Keep material decisions reviewable by a trained person'],
          },
          actionTask: {
            instruction: 'Design a fair application and review pilot:',
            checklistItems: ['Service scope, price range, evidence, exclusions and criteria published', 'Each form field has a necessary purpose, retention rule and accessibility check', 'Marketing consent is separate, specific and unbundled', 'Human review, correction and respectful non-fit route documented', 'Completion, comprehension, disparity, complaints and downstream fit will be monitored'],
            toolboxCategory: 'landingpage',
          },
        },
        '37.2': {
          stageTitle: '37. Responsible lead scoring & routing',
          title: 'Build explainable prioritisation with privacy and human oversight',
          description: 'Use CRM rules to manage response queues and service fit while avoiding hidden wealth scoring, sensitive inference, intrusive messaging and fully automated consequential decisions.',
          learnContent: {
            videoTitle: 'Masterclass: Explainable CRM scoring and routing',
            summaryText: 'A score is a fallible operational signal, not a measurement of a person’s value or guaranteed purchase probability. Define a lawful purpose, use necessary data, test validity and bias, keep meaningful human oversight and honour communication preferences.',
            bulletPoints: [
              'Score observable service-fit factors with documented rationale; do not use protected traits, vulnerability or opaque behavioural proxies',
              'Separate response priority from acceptance, price, creditworthiness and entitlement to service',
              'Send alerts only to assigned staff through approved channels and never expose application details in insecure notifications',
              'Give every segment an appropriate response, correction route and communication choice instead of automatic pressure or paid downsells',
            ],
            coreConcepts: [
              { iconName: 'bar-chart-2', title: 'EXPLAINABLE SIGNAL', description: 'Every factor has a purpose, source, weight, validation record, owner and expiry. Staff can see why a score changed and override it with a reason.', highlight: true },
              { iconName: 'send', title: 'CONSENT-AWARE ROUTING', description: 'Route the enquiry to the right queue without treating it as permission for calls, SMS, messaging apps or nurture campaigns.' },
            ],
            resources: [
              { title: 'Lead-Scoring Governance & Validation Matrix', subtitle: 'Purpose, factors, fairness, overrides, retention and monitoring', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM Review Queue', subtitle: 'Explain scores, record overrides and enforce contact preferences', type: 'tool', iconName: 'settings', actionUrl: 'crm' },
            ],
            fullArticleGuide: `### Responsible scoring supports work; it does not rank human worth

CRM scoring can help allocate limited response capacity. It can also reproduce discrimination, hide weak assumptions and turn a service enquiry into unwanted surveillance. Treat the system as governed decision support.

#### Governance workflow

1. **Define the purpose and boundary**: State the operational problem, affected people, decisions the score may support and decisions it must never make.
2. **Map data and legal responsibilities**: Record source, purpose, legal basis where required, recipients, retention, rights, processors and transfers. Marketing objections must be honoured promptly.
3. **Choose necessary factors**: Prefer direct, current indicators of service scope, timing, language, provider capacity and stated preference. Exclude sensitive traits and proxies unless a qualified review establishes necessity and safeguards.
4. **Do not equate budget with merit**: A declared range may identify commercial feasibility, but it must not determine respect, eligibility for public information or willingness to engage. Offer transparent service tiers or alternatives.
5. **Create understandable rules**: Document weights, thresholds, missing-value treatment, confidence and examples. Avoid invented precision such as “purchase probability in milliseconds”.
6. **Validate before use**: Test against a representative historical or controlled sample for accuracy, false positives, false negatives, calibration and unjustified group disparity. Do not train on biased past sales without review.
7. **Keep meaningful human involvement**: Reviewers need authority, time and information to challenge the output—not merely click approve. Record overrides and use them to improve the system.
8. **Design communications separately**: Determine channel permission, frequency, quiet hours and opt-out before calls, SMS, WhatsApp, Telegram or email. An internal urgency flag is not consent.
9. **Secure alerts and access**: Notifications should contain the minimum data, use approved systems, avoid shared credentials and be logged. Revoke access when roles change.
10. **Provide information and routes to act**: Explain relevant profiling and consequences where required, enable access and correction and provide human contact and contest routes for significant outcomes.
11. **Monitor customer outcomes**: Track response quality, wait time, fit, no-shows, complaints, opt-outs, acceptance disparities, refunds and overrides. A faster call is not automatically a better outcome.
12. **Revalidate and retire**: Review factors after product, market, data or legal changes. Pause the model when drift, harm or poor explainability exceeds the defined threshold.

Requirements for profiling and automated decision-making depend on context and jurisdiction. Obtain current privacy, consumer, employment or financial-services advice where relevant.`,
            practicalExamples: [
              'A score prioritises enquiries by requested start date and available specialist capacity; acceptance still receives human review and the applicant can correct an outdated answer.',
              'An SMS alert contains only a record ID, while the CRM enforces role-based access and checks the person’s channel preference before any message is sent.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Lead scoring is accountable decision support: limited in purpose, explainable, validated, privacy-aware and subject to meaningful human judgment.',
            keyPrinciples: ['Never rank people by wealth or sensitive proxies', 'An enquiry is not universal marketing consent', 'Validate outcomes and disparities, not only sales'],
          },
          actionTask: {
            instruction: 'Prepare a governed scoring and routing pilot:',
            checklistItems: ['Purpose, prohibited uses, factors, sources, weights and expiry documented', 'Privacy, retention, rights, processor and security review completed', 'Validation covers errors, calibration and unjustified disparity', 'Human review, override, correction and contest process configured', 'Channel permission, opt-out, monitoring and model stop rule implemented'],
            toolboxCategory: 'crm',
          },
        },
      },
    },
    38: {
      title: '38. Sustainable YouTube discovery & evergreen journeys',
      subtitle: 'Audience research, honest packaging, accessible retention and privacy-aware measurement',
      description: 'Build a useful long-form video library that can be discovered over time, using audience evidence, truthful titles and thumbnails, inclusive production and measured next steps instead of viral or lead guarantees.',
      lessons: {
        '38.1': {
          stageTitle: '38. YouTube discovery & audience retention',
          title: 'Create discoverable videos that fulfil the viewer promise',
          description: 'Research a real audience question, package it accurately and improve comprehension and retention with YouTube Analytics rather than fixed viral formulas.',
          learnContent: {
            videoTitle: 'Masterclass: Evidence-led YouTube discovery and retention',
            summaryText: 'YouTube discovery depends on many changing signals, audience contexts and competing videos. CTR, watch time and audience retention are useful diagnostics, not universal targets or guarantees of recommendations, views or daily leads.',
            bulletPoints: [
              'Start with a specific viewer problem and search intent, then confirm demand through several sources rather than a single keyword-volume estimate',
              'Make the title and thumbnail accurate, legible and consistent with the opening; curiosity must not become misleading metadata',
              'Use retention reports and comparisons with similar-length videos to diagnose moments—not arbitrary rules such as a 20% drop-off or 50% retention',
              'Improve pacing with purposeful examples, chapters, captions, audio quality and visuals instead of forced cuts or stimulation every ten seconds',
            ],
            coreConcepts: [
              { iconName: 'video', title: 'VIEWER OUTCOME', description: 'Define what the intended viewer should understand or do safely after watching, then structure, edit and measure around that outcome.', highlight: true },
              { iconName: 'image', title: 'TRUTHFUL PACKAGING', description: 'The title and thumbnail identify the subject and value without fabricated results, impersonation, shock or a promise the video does not deliver.' },
            ],
            resources: [
              { title: 'YouTube Research, Script & Accessibility Workbook', subtitle: 'Intent, evidence, structure, captions, packaging and review', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'GOM-MAR Title & Thumbnail Review Assistant', subtitle: 'Generate variants and check clarity, accuracy and policy risk', type: 'tool', iconName: 'cpu', actionUrl: 'tools' },
            ],
            fullArticleGuide: `### Build a useful video, not an algorithm myth

YouTube Analytics reports watch time, average view duration and key moments for audience retention, but no single metric ensures recommendation or virality. A sound workflow begins with a viewer need and treats performance as uncertain evidence.

#### Evidence-led production cycle

1. **Choose a defined audience and job**: State who the video serves, the situation, the question and the safe, realistic outcome. Do not promise to solve a complex problem forever.
2. **Research the topic**: Review search suggestions, audience questions, support records, comments, trends and credible sources. Check freshness, competition and whether video is an appropriate format.
3. **Create a claim and source register**: Record support, date, conditions and limitations for factual, financial, health or performance claims. Use primary sources where possible and qualified review for high-risk topics.
4. **Draft packaging early—but keep it revisable**: Prepare several accurate title and thumbnail concepts before production to clarify the promise. Finalise only after checking that the finished video delivers it.
5. **Open with orientation**: Quickly confirm the subject, intended viewer and what will be covered. Avoid a manufactured crisis, fake countdown or delayed answer solely to inflate watch time.
6. **Structure for comprehension**: Use chapters, plain language, examples, summaries and visible sources. Motion, zoom and graphics should explain something and respect viewers sensitive to flashing or excessive movement.
7. **Make the video accessible**: Provide accurate edited captions, readable on-screen text, sufficient contrast, clear audio, meaningful verbal description and a transcript where practical. Identify language and avoid burning essential information into inaccessible visuals.
8. **Review rights and safety**: Clear music, footage, logos, people’s likenesses and AI-generated assets. Disclose material sponsorships and synthetic or altered content where required. Protect private information visible on screens.
9. **Publish with complete context**: Add an accurate description, sources, chapters, corrections route and relevant next step. Select audience and age settings correctly and moderate predictable comment risks.
10. **Read analytics proportionately**: Compare CTR, watch time and retention by traffic source, device, audience and similar video length. Small samples and mixed audiences can mislead.
11. **Run controlled improvements**: Change one meaningful element where possible, document date and hypothesis and judge both reach and viewer satisfaction. Never buy fake engagement or repeatedly bait viewers.
12. **Maintain the library**: Correct outdated claims, links and disclosures; update or retire videos that can harm, confuse or no longer match the offer.

A high-quality video earns the next minute through usefulness. It does not need to trap the viewer until the end.`,
            practicalExamples: [
              'A faceless tutorial uses a truthful search-led title, narrated screen actions, edited captions and a transcript; retention shows one confusing setup step that is clarified in an update.',
              'A thumbnail variant improves impressions CTR but increases early exits because it overpromises; the creator rejects it and keeps the more accurate version.',
            ],
          },
          understandContent: {
            coreTakeaway: 'YouTube metrics help diagnose how a particular audience experienced a video; they are not thresholds that guarantee viral distribution.',
            keyPrinciples: ['Fulfil the title and thumbnail promise immediately', 'Design pacing and visuals for understanding and accessibility', 'Interpret analytics by context, sample and viewer outcome'],
          },
          actionTask: {
            instruction: 'Prepare one evidence-led evergreen video brief:',
            checklistItems: ['Audience, search intent, desired outcome and non-goals documented', 'Claims, sources, rights and safety risks reviewed', 'Three accurate title and thumbnail variants created', 'Script includes orientation, chapters, examples, captions and clear next step', 'Analytics hypothesis, review date, quality guardrails and update owner assigned'],
            toolboxCategory: 'content',
          },
        },
        '38.2': {
          stageTitle: '38. YouTube journey integration',
          title: 'Connect viewers to useful next steps without coercive lead capture',
          description: 'Offer relevant resources and onward viewing with clear disclosures, accessible landing pages, meaningful consent and measurement that respects privacy and attribution limits.',
          learnContent: {
            videoTitle: 'Masterclass: Responsible YouTube conversion and measurement',
            summaryText: 'Views without a business outcome may not support a commercial channel, but viewers are not automatically “high-intent” or ready to buy. A responsible journey provides value before asking for data and measures contribution without claiming that one video caused every later sale.',
            bulletPoints: [
              'Match each call to action to the viewer’s current task and offer a no-sign-up option where a gated download is unnecessary',
              'Use descriptions, pinned comments, cards and end screens according to availability and policy; no placement has a universal click-rate advantage',
              'Build fast, accessible mobile landing pages that state provider, value, data use, commercial intent and material terms before submission',
              'Use UTM parameters and consented analytics as directional attribution while documenting cross-device, cookie, privacy and multi-touch limitations',
            ],
            coreConcepts: [
              { iconName: 'link', title: 'CONTEXTUAL NEXT STEP', description: 'Place a clear, accurate destination where it helps the viewer. Verify links regularly and never route through deceptive, unsafe or undisclosed pages.', highlight: true },
              { iconName: 'file-text', title: 'USEFUL COMPANION RESOURCE', description: 'A worksheet or template extends the lesson and is accessible on its own; email collection is optional unless genuinely necessary to deliver or support it.' },
            ],
            resources: [
              { title: 'YouTube Journey & Consent Checklist', subtitle: 'CTA, links, landing page, disclosure, accessibility and measurement', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM Campaign Link Builder', subtitle: 'Create governed UTMs and document source definitions', type: 'tool', iconName: 'bar-chart-2', actionUrl: 'crm' },
            ],
            fullArticleGuide: `### Build a viewer-controlled path from video to action

Time watched can indicate attention, not purchase readiness. Calls to action should help viewers continue a task and allow them to understand the exchange before leaving YouTube or sharing personal data.

#### Responsible journey workflow

1. **Define the next-step hypothesis**: Specify the video, viewer need, relevant resource, expected helpful action and evidence that would support or reject the link.
2. **Deliver core value in the video**: Do not withhold the promised answer merely to force a click or email submission. A companion asset should extend, organise or personalise what was taught.
3. **Choose placements by context**: Use a spoken CTA, on-screen cue, description, pinned comment, card or end screen only where available and useful. Platform features and visibility vary by device, account and time.
4. **Write an accurate CTA**: Name the resource, provider, price if any, data exchange and destination. Disclose affiliate, sponsorship or other material relationships clearly and near the recommendation.
5. **Protect external links**: Use HTTPS, maintain domain ownership, check redirects and prohibit malware, phishing, unauthorised products and deceptive pages. Keep a link register and removal owner.
6. **Create an accessible mobile destination**: Optimise loading, keyboard and screen-reader use, labels, focus, contrast, errors and zoom. The page must match the language and promise of the video.
7. **Minimise data**: Ask only for fields needed for the stated purpose. Explain controller, purpose, basis where required, processors, retention and rights. Separate delivery from optional marketing consent.
8. **Confirm safely**: Use appropriate verification, prevent list abuse and provide immediate access or a clear delivery expectation. Every marketing message needs an easy, effective opt-out.
9. **Govern measurement**: Standardise campaign, source, medium and content values; avoid putting personal data in URLs. Apply consent requirements and limit analytics access and retention.
10. **Interpret attribution cautiously**: UTMs can identify a tagged session but may miss cross-device journeys, privacy controls and later touches. Reconcile CRM outcomes without claiming sole causation.
11. **Measure quality**: Review landing-page comprehension, accessibility errors, valid sign-ups, activation, opt-outs, complaints, refunds and customer-reported usefulness alongside clicks.
12. **Maintain and retire**: Test links, forms, disclosures and delivery after every material change. Correct pinned comments and descriptions on older videos when the resource expires.

An evergreen video is maintained content, not a free salesperson working unchanged for five years.`,
            practicalExamples: [
              'A budgeting tutorial links to an ungated accessible worksheet and offers a separate optional newsletter checkbox; UTM data is treated as one contribution signal.',
              'An affiliate tool review states the relationship in the video and near the link, compares limitations and alternatives and removes the destination when its terms change.',
            ],
          },
          understandContent: {
            coreTakeaway: 'A strong YouTube journey gives viewers a relevant, transparent and reversible next step while measuring contribution rather than claiming guaranteed conversion.',
            keyPrinciples: ['Deliver the promised value before asking for data', 'Separate resource delivery from optional marketing consent', 'Use attribution as bounded evidence, not proof of causation'],
          },
          actionTask: {
            instruction: 'Build and review one viewer-controlled conversion path:',
            checklistItems: ['Companion resource directly extends the video and works accessibly', 'CTA, commercial relationship, destination and data exchange are clear', 'Landing page is fast, mobile, accessible and data-minimised', 'UTM taxonomy, consent, retention and attribution limits documented', 'Link tests, opt-outs, complaints, activation and update ownership scheduled'],
            toolboxCategory: 'landingpage',
          },
        },
      },
    },
    39: {
      title: '39. Sustainable Pinterest visual discovery',
      subtitle: 'Audience-led visual search, useful Pins, compliant links and governed publishing',
      description: 'Build a maintainable Pinterest presence through relevant visual content, honest metadata, accessible destinations and measured experiments—without passive-traffic guarantees, repetitive automation or fabricated purchase intent.',
      lessons: {
        '39.1': {
          stageTitle: '39. Pinterest discovery & Pin architecture',
          title: 'Research topics and create useful, discoverable Pins',
          description: 'Connect audience planning needs with accurate titles, descriptions, imagery and destination pages while treating format and ranking advice as hypotheses to test.',
          learnContent: {
            videoTitle: 'Masterclass: Evidence-led Pinterest visual discovery',
            summaryText: 'Pinterest supports discovery, planning and inspiration, but user intent varies and no Pin format, keyword placement or verified domain guarantees ranking, clicks or longevity. Useful content and trustworthy destinations are the foundation.',
            bulletPoints: [
              'Research audience language with Pinterest search and Trends where available, then validate it against your own queries, content and destination evidence',
              'Use descriptive Pin titles, board context and image meaning naturally; avoid keyword stuffing and unsupported claims',
              'Design legible vertical creative as one testable option—not a universal “high-CTR” formula—and check mobile cropping and accessibility',
              'Claim the correct website and configure supported metadata only when it accurately matches a stable, policy-compliant destination',
            ],
            coreConcepts: [
              { iconName: 'search', title: 'TOPIC RELEVANCE', description: 'Align audience need, visual, title, description, board and landing page around one genuine topic without repetitive or misleading variants.', highlight: true },
              { iconName: 'image', title: 'ACCESSIBLE VISUAL', description: 'Use readable text, strong contrast, meaningful imagery and destination context; essential information must not exist only inside an image.' },
            ],
            resources: [
              { title: 'Pinterest Topic & Pin Quality Workbook', subtitle: 'Research, claims, rights, accessibility, destination and review', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'GOM-MAR Pinterest Template Review Kit', subtitle: 'Adaptable layouts with clarity and accessibility checks', type: 'tool', iconName: 'layout', actionUrl: 'tools' },
            ],
            fullArticleGuide: `### Design for useful visual discovery

Pinterest combines visual browsing, search and recommendations. Some Pins may continue receiving impressions, while others may not. Longevity, traffic and purchase intent are outcomes to observe, not promises.

#### Responsible visual-search workflow

1. **Define one audience task**: State who the Pin helps, what they are planning or solving and what useful outcome the destination provides.
2. **Research language and context**: Review Pinterest suggestions and Trends where available, audience questions, your analytics and credible sources. Record region, language, season and date.
3. **Verify claims and rights**: Substantiate benefits, prices and comparisons. Clear photos, illustrations, fonts, logos, testimonials and AI assets, and disclose material commercial relationships.
4. **Create a coherent content cluster**: Organise boards and Pins around real themes people can understand. Board names and descriptions should clarify scope rather than repeat keyword lists.
5. **Design accessible creative**: Test vertical formats appropriate to the placement, readable typography, contrast, safe margins and mobile cropping. Add meaningful text alternatives and ensure the landing page repeats essential information as accessible text.
6. **Write accurate metadata**: Use a concise title and natural description that match both image and destination. Do not promise a checklist, recipe, result or price that the landing page does not provide.
7. **Use website and metadata features correctly**: Claim only domains you control, protect account access and implement supported rich metadata from the current source page. Test that updates and removals propagate.
8. **Publish a small baseline**: Start with a manageable set of genuinely different Pins. Avoid near-duplicate images, irrelevant boards and arbitrary daily-volume rules.
9. **Measure in context**: Review impressions, saves, outbound clicks and destination quality by topic, format, device and period. Metrics and feature availability change; small samples do not establish a ranking law.
10. **Improve one variable at a time**: Test a meaningful difference in image, title or proposition while keeping claims truthful. Document hypothesis, dates and decision.
11. **Maintain destinations**: Monitor speed, mobile use, accessibility, redirects, consent, disclosures, availability and link health. Remove stale prices and expired offers.
12. **Review account and user impact**: Track complaints, hides, policy warnings, misleading-click signals and conversion quality. Retire content that produces traffic through confusion.

Consistency means maintaining a useful publishing and review process—not posting three to five Pins every day regardless of value.`,
            practicalExamples: [
              'A Vital50 recipe Pin uses a readable vertical image, accurately names the recipe and links to the complete accessible instructions rather than a gated unrelated offer.',
              'A high-impression Pin produces many immediate exits because the headline overstates the destination; it is corrected instead of cloned into more variants.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Pinterest can support long-term discovery, but durable traffic comes from relevant, accurate and maintained content—not a fixed format or posting quota.',
            keyPrinciples: ['Match visual, metadata and destination', 'Test formats and keywords instead of treating them as ranking rules', 'Measure user value and destination quality alongside reach'],
          },
          actionTask: {
            instruction: 'Prepare a responsible Pinterest discovery pilot:',
            checklistItems: ['Audience task, topic evidence, region, language and season documented', 'Business account, domain ownership and account security checked', 'Five distinct Pins use substantiated claims, cleared assets and accessible design', 'Boards, titles, descriptions and destinations align naturally', 'Analytics baseline, review date, complaints, link health and update owner defined'],
            toolboxCategory: 'content',
          },
        },
        '39.2': {
          stageTitle: '39. Governed Pinterest publishing & journey',
          title: 'Schedule useful Pins without creating automated spam',
          description: 'Use approved publishing methods, human review and resilient landing pages to reduce repetitive work while retaining accuracy, consent, security and editorial control.',
          learnContent: {
            videoTitle: 'Masterclass: Responsible Pinterest publishing pipelines',
            summaryText: 'Automation can schedule approved content, but it does not make a channel passive. Pinterest’s guidelines prohibit unapproved automation and repetitive, misleading or irrelevant content. Every generated variation needs a purpose, review and maintained destination.',
            bulletPoints: [
              'Use Pinterest-supported scheduling, approved partner tools or authorised APIs and respect current account, rate and feature limits',
              'Generate variants only when image, audience angle or destination value is meaningfully different—not to evade spam detection',
              'Compare direct landing pages and useful editorial pages by audience task, disclosure, accessibility and downstream quality',
              'Promote organic content only after policy, rights, tracking and customer-outcome review; a small daily budget does not guarantee scalable results',
            ],
            coreConcepts: [
              { iconName: 'repeat', title: 'APPROVED SCHEDULING', description: 'A human-approved queue publishes through supported methods with rate controls, logs, pause, retries and a safe failure state.', highlight: true },
              { iconName: 'zap', title: 'PURPOSEFUL VARIATION', description: 'Each variant tests a documented hypothesis and adds distinct value. Repetition for volume is not a content strategy.' },
            ],
            resources: [
              { title: 'Pinterest Publishing Governance Blueprint', subtitle: 'Approvals, API boundaries, rights, logs, incidents and rollback', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM Pinterest Destination Monitor', subtitle: 'Mobile pages, UTMs, consent, errors and link health', type: 'tool', iconName: 'layout', actionUrl: 'landingpage' },
            ],
            fullArticleGuide: `### Automate the queue, not editorial responsibility

A publishing pipeline can reduce manual uploading, but content quality, policy compliance, rights, destination reliability and measurement still require human ownership. Monthly traffic and working time vary by niche, assets, tools and review needs.

#### Governed monthly cycle

1. **Set scope and capacity**: Define approved account, markets, topics, destinations, frequency range, budget, owners and excluded content. Capacity comes before a volume target.
2. **Choose an authorised route**: Confirm that the scheduler, partner tool or API use is currently approved and follows Pinterest terms. Do not automate browser actions with unapproved services.
3. **Build from verified source content**: Select maintained articles, products or resources with evidence, rights, availability and a clear audience benefit. AI output is a draft requiring fact and rights review.
4. **Create purposeful variants**: Record what changes and why—such as audience angle, genuine image, format or proposition. Avoid superficial duplicates pointing repeatedly to the same page.
5. **Run editorial checks**: Review claim accuracy, language, spelling, brand, accessibility, commercial disclosure, sensitive topics and alignment between Pin and destination.
6. **Protect the integration**: Use scoped credentials, secure secret storage, separate environments where practical, minimal permissions, logs, rate limits and prompt revocation. Never paste tokens into templates or screenshots.
7. **Schedule conservatively**: Spread content according to relevance and observed audience patterns, not fabricated “active times”. Detect duplicate payloads and provide manual pause and approval.
8. **Handle failures safely**: Use idempotency, bounded retries and alerts for rejected Pins, expired tokens, invalid media and broken links. Do not retry indefinitely or publish partial records.
9. **Prepare the destination**: Test mobile speed, accessibility, clear ownership, material terms, affiliate disclosure, consent, form delivery and useful content before traffic arrives. A universal 1.5-second threshold is not a guarantee.
10. **Measure contribution**: Standardise UTMs without personal data and analyse valid outbound sessions, engagement, sign-ups, opt-outs, sales quality, refunds and complaints. Respect consent and attribution limits.
11. **Approve paid amplification separately**: Check ad eligibility, claim evidence, audience settings, budget cap, billing and landing-page compliance. Run a bounded experiment with a stop rule rather than “scaling the top 5%”.
12. **Review and maintain**: Pause weak or harmful content, refresh sources, rotate only meaningful creative and audit permissions, disclosures and logs. Publishing is never “set and forget”.

The safest pipeline makes it easy to inspect, pause, correct and retire every Pin.`,
            practicalExamples: [
              'Four maintained articles produce eight genuinely different Pins after a human rights and claim review; an approved scheduler publishes them with duplicate detection and a pause control.',
              'A destination starts returning errors, so monitoring pauses queued Pins and alerts the owner rather than continuing to send users to a broken funnel.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Responsible automation reduces repetitive operations while human owners remain accountable for every Pin, destination and outcome.',
            keyPrinciples: ['Use only approved automation and scoped access', 'Every variant needs distinct value and human review', 'Build pause, monitoring, correction and retirement into the pipeline'],
          },
          actionTask: {
            instruction: 'Configure a controlled Pinterest publishing pilot:',
            checklistItems: ['Approved publishing method, scope, permissions and policy owner confirmed', 'Source content, rights, claims, disclosures and accessibility reviewed', 'Purposeful variants, schedule, approvals and duplicate controls configured', 'Landing-page health, consent, UTM rules and failure alerts tested', 'Budget cap, quality metrics, stop rule, audit and maintenance dates assigned'],
            toolboxCategory: 'landingpage',
          },
        },
      },
    },
    40: {
      title: '40. Responsible TikTok Shop, creator affiliate & social commerce',
      subtitle: 'Market eligibility, truthful listings, fair creator partnerships and controlled paid amplification',
      description: 'Evaluate and operate TikTok commerce responsibly where available, with compliant products, reliable fulfilment, transparent affiliate relationships, creator rights and evidence-led tests instead of viral-order guarantees.',
      lessons: {
        '40.1': {
          stageTitle: '40. TikTok Shop & creator-partnership architecture',
          title: 'Set up a compliant shop and a fair creator affiliate programme',
          description: 'Verify current market and product eligibility, build dependable commerce operations and recruit suitable creators through clear terms, genuine choice and accountable oversight.',
          learnContent: {
            videoTitle: 'Masterclass: TikTok Shop readiness and creator partnerships',
            summaryText: 'TikTok Shop features, supported products, fees, affiliate tools and checkout flows vary by market and change over time. In-app commerce may reduce some steps, but it does not remove customer hesitation, compliance duties or operational risk.',
            bulletPoints: [
              'Confirm seller, market, product-category, tax, consumer, safety and logistics requirements before creating a listing',
              'Set commission and programme access from verified unit economics, service capacity and current platform options—not a universal percentage',
              'Offer samples under written terms that preserve honest creator judgment and clearly disclose the gift and any commission',
              'Use product tags and creator content only with current platform eligibility, accurate inventory and explicit content and advertising permissions',
            ],
            coreConcepts: [
              { iconName: 'shopping-bag', title: 'COMMERCE READINESS', description: 'Product legality, documentation, listing accuracy, inventory, fulfilment, returns, support, privacy and incident ownership are verified before launch.', highlight: true },
              { iconName: 'users', title: 'FAIR CREATOR PARTNERSHIP', description: 'Creators are independent partners with transparent compensation, disclosure duties, creative boundaries, usage rights, safety and a practical exit—not an “army”.' },
            ],
            resources: [
              { title: 'TikTok Shop Readiness & Creator Agreement Pack', subtitle: 'Eligibility, economics, claims, samples, rights and monitoring', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM Social-Commerce Operations Register', subtitle: 'Products, creators, permissions, orders, returns and incidents', type: 'tool', iconName: 'shopping-cart', actionUrl: 'settings' },
            ],
            fullArticleGuide: `### Social commerce starts with operational and customer readiness

Discovery may happen through search, recommendations, creator content or advertising. No channel removes the need for a suitable product, truthful offer, informed customer choice and reliable fulfilment.

#### Responsible setup workflow

1. **Check current availability**: Confirm TikTok Shop and affiliate features for the seller’s country, customer market, entity and account. Do not instruct users to bypass regional or identity controls.
2. **Screen the product**: Verify category eligibility, safety, recalls, age restrictions, certifications, labelling, intellectual property, claims, warranty and applicable consumer rights. Physical and digital product support may differ.
3. **Model full economics**: Include product, sample, creator, platform, payment, tax, shipping, returns, support, ad, fraud and chargeback costs. Set a loss limit and do not assume a low price or “wow effect” creates demand.
4. **Build accurate listings**: Use owned or licensed assets and match title, images, variant, quantity, condition, ingredients or specifications, delivery and total price to what the buyer receives.
5. **Prepare fulfilment and service**: Validate inventory, packaging, carrier, truthful tracking, delivery updates, cancellation, returns, refunds, complaints and recall handling. Never falsify logistics or expose customer data to unauthorised suppliers.
6. **Define the creator profile**: Select by audience fit, content quality, safety, disclosure history, rights, language and reliability—not follower count or a presumed conversion band.
7. **Publish fair programme terms**: State commission basis, attribution, payment timing, reversals, samples, required disclosures, prohibited claims, deliverables if any, content ownership, licence duration, edit rights, termination and dispute route.
8. **Handle samples honestly**: A free or discounted product is a material relationship. Do not require a positive review. If a posting obligation exists, agree it before shipment and allow truthful experience and compliant disclosure.
9. **Protect outreach and data**: Use authentic brand accounts, relevant welcomed contact and secure forms. Avoid bulk unsolicited messages, false flattery, upfront fees, credential requests and unnecessary identity collection.
10. **Train and review proportionately**: Provide current product evidence, disclosure examples and prohibited claims. Review high-risk posts before publication where appropriate and monitor live content without dictating a false personal opinion.
11. **Control permissions**: Obtain explicit, scoped permission for reposting, editing, whitelisting, Spark Ads or other paid use. Record post, territory, channels, term, compensation and revocation conditions.
12. **Pilot and monitor**: Start with limited products and creators. Track approved content, valid orders, delivery, returns, complaints, disclosure, creator payment, customer outcome and margin. Pause on safety, policy or fulfilment failure.

TikTok and local legal requirements must be reviewed at launch and periodically thereafter; platform access is not proof of legal compliance.`,
            practicalExamples: [
              'A merchant pilots one documented product with three suitable creators, written sample and licence terms, conspicuous disclosures and a returns capacity test before expanding.',
              'A creator dislikes the sample and declines endorsement under the agreement; the brand does not demand praise or reuse the draft as an ad.',
            ],
          },
          understandContent: {
            coreTakeaway: 'A durable creator-commerce programme is built on eligible products, reliable operations, truthful recommendations, clear compensation and controlled rights—not scale promises.',
            keyPrinciples: ['Verify market and product rules before listing', 'Free products and commissions require clear disclosure', 'Creator content needs explicit, scoped usage permission'],
          },
          actionTask: {
            instruction: 'Prepare a controlled TikTok Shop creator pilot:',
            checklistItems: ['Market, seller, product, tax, safety and consumer eligibility verified', 'Listing, inventory, fulfilment, returns, support and unit economics tested', 'Creator criteria and fair programme terms documented', 'Samples, disclosures, claims, content rights and paid-use permissions controlled', 'Pilot limits, monitoring, payment, incident and stop rules assigned'],
            toolboxCategory: 'affiliate',
          },
        },
        '40.2': {
          stageTitle: '40. Truthful short-form commerce content',
          title: 'Brief UGC-style videos that disclose advertising and demonstrate real use',
          description: 'Develop short-form creative that is clear, engaging and native to the format while remaining recognisable as commercial content, evidence-based and accessible.',
          learnContent: {
            videoTitle: 'Masterclass: Responsible creator briefs and short-form tests',
            summaryText: 'Commercial creator content must not be designed to “never look like an ad”. Authenticity means the creator’s genuine experience, not concealed sponsorship. No hook, smartphone aesthetic or UGC format universally outperforms studio creative or guarantees revenue.',
            bulletPoints: [
              'Open with a truthful, relevant demonstration or question and make the commercial relationship clear from the start',
              'Show the actual product and typical use without staged before-and-after results, fabricated discovery stories or unsupported outcomes',
              'Brief mandatory facts, safety, claims, disclosure and deliverables while leaving room for the creator’s own honest voice',
              'Use paid amplification only with explicit creator authorisation, a verified ad setup, budget cap and customer-outcome guardrails',
            ],
            coreConcepts: [
              { iconName: 'video', title: 'DISCLOSED AUTHENTICITY', description: 'The creator speaks from real experience and clearly identifies payment, commission, free product or other material connection in the content itself.', highlight: true },
              { iconName: 'trending-up', title: 'CONTROLLED AMPLIFICATION', description: 'Organic response is one input. Paid use requires separate rights, policy review, measurement, frequency control and a stop rule.' },
            ],
            resources: [
              { title: 'Creator Brief, Disclosure & Claims Template', subtitle: 'Facts, prohibited claims, accessibility, rights and approvals', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'GOM-MAR Short-Form Draft Assistant', subtitle: 'Generate testable concepts with evidence and disclosure checks', type: 'tool', iconName: 'cpu', actionUrl: 'tools' },
            ],
            fullArticleGuide: `### Create short-form commerce content people can recognise and trust

The first seconds affect attention, but they do not decide virality. A responsible brief helps a creator communicate quickly without scripting a false personal story or hiding the ad relationship.

#### Brief and production workflow

1. **Define the audience task**: Identify who may benefit, the use situation, the material product facts, exclusions and the safe next action.
2. **Create a substantiated claim sheet**: List permitted claims, evidence, conditions, typical results, mandatory warnings and prohibited wording. High-risk health, finance or safety content needs qualified review.
3. **Choose a truthful concept**: Options may include demonstration, comparison, tutorial, unboxing or problem-and-response. “Before and after” requires genuine, representative, documented conditions and must not mislead through editing.
4. **Make advertising apparent**: Disclose payment, affiliate commission, gifted samples, employment or other material connection clearly and conspicuously in the video and where required in caption or platform tools. Do not rely on vague tags.
5. **Preserve the creator’s voice**: Specify facts, compliance boundaries and deliverables, but never require claims the creator cannot honestly make or disguise a script as spontaneous discovery.
6. **Design an accurate opening**: Show the real product, relevant context and truthful benefit. Avoid “stop scrolling” threats, false enemies, fear, fabricated scarcity and bait unrelated to the content.
7. **Demonstrate safely**: Use the actual variant and follow instructions, age restrictions and warnings. Do not hide setup, side effects, limits, required accessories or recurring costs.
8. **Provide accessible media**: Use edited captions, readable on-screen text, contrast, safe audio, meaningful visuals and no unnecessary flashing. Essential disclosure should be perceivable and remain long enough to understand.
9. **Use a fair CTA**: State destination, total price and material terms; scarcity or discounts must be real and current. Give customers time and a clear route to product details, returns and support.
10. **Approve without falsifying**: Review disclosure, claims, rights, safety and listing match. Correct errors while protecting the creator’s independent opinion and clearly marking dramatisation or reconstruction.
11. **Authorise paid use separately**: For Spark Ads or other amplification, document the authorised account or post, channels, territory, duration, editing, compensation, audience and revocation process.
12. **Run a bounded experiment**: Set budget, duration, audience, creative variants, attribution limits and stop thresholds. Measure valid orders, cancellations, returns, complaints, margin, frequency and customer satisfaction—not revenue screenshots alone.
13. **Monitor and close**: Check live disclosures and comments, remove expired claims, stop ads when rights expire, pay creators correctly and archive evidence and final assets according to retention rules.

Native style can improve relevance, but advertising must remain recognisable and truthful.`,
            practicalExamples: [
              'A creator states that the product was gifted and links may earn commission, demonstrates one ordinary use and explains both a benefit and limitation in captions and speech.',
              'A promising organic post is licensed for a 14-day Spark Ads test with written authorisation, a capped budget and automatic stop on excessive returns or complaints.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Effective creator content combines genuine experience, conspicuous disclosure, substantiated claims and controlled rights; it never needs to impersonate an unpaid recommendation.',
            keyPrinciples: ['Commercial content must be recognisable as advertising', 'Never script experience or results the creator cannot verify', 'Paid amplification requires separate permission and downside controls'],
          },
          actionTask: {
            instruction: 'Prepare and test one responsible creator brief:',
            checklistItems: ['Audience, product facts, evidence, limits and prohibited claims documented', 'Compensation, gift and affiliate disclosure appears clearly in content', 'Creator retains truthful voice and safe demonstration requirements', 'Captions, readable text, listing match and fair CTA reviewed', 'Usage rights, ad authorisation, budget, metrics and stop rule signed off'],
            toolboxCategory: 'content',
          },
        },
      },
    },
    41: {
      title: '41. Responsible gamification & learner motivation',
      subtitle: 'Voluntary progress support, meaningful feedback, inclusive challenges and private achievement',
      description: 'Use game-inspired elements only where they support learning, autonomy and wellbeing, with accessible alternatives, privacy and evidence—never addictive loops, loss pressure or guaranteed completion rates.',
      lessons: {
        '41.1': {
          stageTitle: '41. Learner-centred gamification architecture',
          title: 'Design progress, feedback and optional streaks without compulsion',
          description: 'Connect feedback, milestones and practice to real learning outcomes while letting people pause, opt out and recover without shame or penalty.',
          learnContent: {
            videoTitle: 'Masterclass: Ethical gamification in digital learning',
            summaryText: 'Course completion varies by learner, goal, difficulty, support and measurement. XP, badges and streaks may help some people and distract or pressure others; “dopamine loops” do not justify addictive design or a promise to multiply completion.',
            bulletPoints: [
              'Begin with a measurable learning outcome and use game elements only when they provide useful feedback, choice or practice',
              'Offer streaks as optional routines with pause, grace and recovery instead of threats about losing progress',
              'Keep progress and achievement private by default and obtain clear permission before any social sharing',
              'Provide reduced-motion, sound-off, non-competitive and assistive-technology alternatives to celebrations and points',
            ],
            coreConcepts: [
              { iconName: 'zap', title: 'MEANINGFUL FEEDBACK', description: 'Feedback explains what was completed, what was learned and the next useful option; it does not exploit variable rewards or obscure the learner’s goal.', highlight: true },
              { iconName: 'award', title: 'RECOVERABLE ROUTINE', description: 'Optional streaks can be paused and restored without losing earned learning, access, status or paid value.' },
            ],
            resources: [
              { title: 'Ethical Gamification & Accessibility Workbook', subtitle: 'Outcomes, choice, privacy, safeguards, tests and retirement', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'GOM-MAR Private Progress Tracker', subtitle: 'Learner-controlled milestones, reminders and accessibility settings', type: 'tool', iconName: 'award', actionUrl: 'progress' },
            ],
            fullArticleGuide: `### Use game elements to support learning, not dependency

Learning requires effort, rest, context and meaningful practice. Animations, points or streaks do not automatically create mastery, and simplified claims about “dopamine kicks” should not substitute for evidence or learner consent.

#### Responsible design workflow

1. **Define the learning outcome**: State what the learner should understand or demonstrate, the evidence of mastery and what completion does and does not prove.
2. **Understand learner contexts**: Research goals, time, disability, language, device, caregiving, work patterns and reasons for pausing. Do not assume daily use is desirable.
3. **Choose the minimum useful mechanic**: Add a progress indicator, milestone, practice prompt or feedback only when it helps orientation, recall or skill. Record the hypothesis and a no-gamification alternative.
4. **Represent progress honestly**: Base progress on meaningful completion, not screen time, clicks or unnecessary activity. Explain calculation and let learners correct errors.
5. **Make streaks optional and forgiving**: Allow opt-in, quiet days, time-zone control, pause and recovery. Never erase completed work, restrict paid access or use shame because someone rested.
6. **Design notifications respectfully**: Default to proportionate frequency, show a preview, respect quiet hours and provide granular pause and unsubscribe controls. Avoid urgency or loss language.
7. **Keep achievements private by default**: The learner chooses whether a badge, certificate, streak or score appears to peers or social networks. Sharing must not expose sensitive learning, purchase or performance data.
8. **Build accessible feedback**: Support keyboard, screen readers, contrast, zoom and reduced motion. Confetti, colour, sound and haptics require equivalent non-sensory feedback and user controls.
9. **Avoid deceptive reward systems**: Do not use random rewards, artificial scarcity, purchased status, hidden odds or reward withdrawal to increase time spent. Virtual points need clear meaning and no misleading monetary implication.
10. **Protect children and vulnerable learners**: Apply stronger safeguards, age-appropriate design and qualified review. Avoid profiling distress, financial vulnerability or compulsive behaviour for engagement.
11. **Test learning and wellbeing**: Compare knowledge retention, task success, accessibility, pressure, interruptions, opt-outs and support requests—not daily opens alone. Segment results carefully and allow negative findings.
12. **Maintain and retire**: Monitor complaints, compulsive-use signals, inequity and feature drift. Pause or remove mechanics that increase activity while harming learning, autonomy or wellbeing.

The best indicator of success is useful learning that fits the person’s life, not an unbroken streak.`,
            practicalExamples: [
              'A learner pauses reminders during shift work and resumes later with all completed lessons intact; progress remains private unless they choose to share a certificate.',
              'A celebration uses text confirmation by default, with optional sound and motion; the same milestone is fully understandable to a screen-reader user.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Ethical gamification makes learning clearer and more manageable while preserving rest, privacy, accessibility and the right to opt out.',
            keyPrinciples: ['Tie mechanics to learning outcomes, not time spent', 'Make streaks and reminders voluntary and recoverable', 'Keep progress private and accessible by default'],
          },
          actionTask: {
            instruction: 'Design one learner-centred gamification pilot:',
            checklistItems: ['Learning outcome, mastery evidence and non-gamified path defined', 'Progress logic is accurate, understandable and correctable', 'Streak, reminders, pause, recovery and opt-out controls specified', 'Privacy, sharing, reduced-motion, sound-off and assistive alternatives tested', 'Learning, wellbeing, complaint and retirement guardrails scheduled'],
            toolboxCategory: 'content',
          },
        },
        '41.2': {
          stageTitle: '41. Inclusive community challenges',
          title: 'Run collaborative quests without public pressure or unfair rankings',
          description: 'Create time-bounded, voluntary community activities that encourage practice and peer support while protecting consent, privacy, accessibility and participants with different resources.',
          learnContent: {
            videoTitle: 'Masterclass: Inclusive community challenges and peer support',
            summaryText: 'Community can support learning, but public leaderboards and prizes can also expose personal data, reward spam, intensify comparison and disadvantage people with less time or access. Challenges should be voluntary, cooperative and evaluated by learning—not loyalty.',
            bulletPoints: [
              'Define a realistic skill or contribution goal with flexible participation windows and an individual route',
              'Use private or team progress and opt-in recognition rather than publishing performance or revenue by default',
              'Match learning partners only with informed agreement, compatible preferences, boundaries and an easy rematch or exit',
              'Reward evidence of learning, helpfulness and reflection through transparent criteria—not raw activity, sales or constant presence',
            ],
            coreConcepts: [
              { iconName: 'users', title: 'CONSENTED PEER SUPPORT', description: 'Participants choose whether to join, what to share and whether to be matched. Expectations, reporting, safeguarding and exit are clear.', highlight: true },
              { iconName: 'trophy', title: 'COOPERATIVE MILESTONE', description: 'The group works toward an accessible shared outcome; recognition is optional and does not rank personal worth or commercial success.' },
            ],
            resources: [
              { title: 'Inclusive Challenge & Community Safety Guide', subtitle: 'Consent, accessibility, moderation, criteria and evaluation', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM Challenge Participation Controls', subtitle: 'Opt-in, preferences, private progress and safeguarding records', type: 'tool', iconName: 'award', actionUrl: 'crm' },
            ],
            fullArticleGuide: `### Build community practice without turning learners into a leaderboard

A shared challenge can create structure and encouragement, but duration, competition and prizes do not guarantee participation, completion or loyalty. Design for different schedules, abilities and motivations.

#### Inclusive challenge lifecycle

1. **Define the learning purpose**: Choose one skill, habit or contribution that can be practised safely. State prerequisites, non-goals, evidence and why community adds value.
2. **Make participation voluntary**: Explain workload, dates, data use, communications, visibility, prizes and alternatives before opt-in. Access to paid learning must not depend on joining.
3. **Offer flexible pacing**: Provide a suggested path plus catch-up, pause and asynchronous options. Avoid a rigid daily schedule where it is not educationally necessary.
4. **Set accessible tasks**: Use plain language, multiple formats, sufficient time and reasonable alternatives. Do not require public video, income disclosure, purchases or social posting.
5. **Establish community safeguards**: Publish conduct, moderation, reporting, escalation, privacy and emergency boundaries. Train moderators and clarify that peers are not therapists or professional advisers.
6. **Match buddies with consent**: Collect only necessary preferences, avoid sensitive inference and let participants decline, block, rematch or leave. Do not share contact details until both sides agree.
7. **Prefer cooperation to ranking**: Use shared milestones, personal baselines or private reflection. If a leaderboard is genuinely useful, make it opt-in, explain the score, limit visibility and provide a non-ranked mode.
8. **Use fair criteria**: Do not reward message volume, revenue or uninterrupted attendance. Validate helpfulness and learning evidence, prevent gaming and provide correction and appeal.
9. **Handle rewards transparently**: State eligibility, selection, value, tax implications where relevant, fulfilment and conflicts. Rewards must not pressure overspending or excessive activity.
10. **Protect data and identity**: Keep participation, performance, purchases and revenue private by default. Apply retention, access, deletion and image-consent controls.
11. **Support live and asynchronous access**: Caption sessions, provide summaries and avoid making attendance the only path to essential content. Record only with informed notice and manage replay access.
12. **Evaluate balanced outcomes**: Measure learning, belonging, accessibility, workload, drop-out, conflict, pressure, reports and support needs. Do not claim that a buddy system doubles completion without valid evidence.
13. **Close responsibly**: Celebrate privately or publicly according to each person’s choice, deliver promised rewards, revoke temporary access, retain only necessary records and publish what will improve next time.

People may value content, community, quiet independent study or a mixture. Status should never be the price of belonging.`,
            practicalExamples: [
              'A 14-day planning challenge offers three tasks per week, asynchronous alternatives and private progress; participants opt separately into buddy matching and public recognition.',
              'Instead of ranking revenue, a group unlocks a shared resource after completing peer-reviewed practice, while individuals who prefer not to compete receive the same core learning.',
            ],
          },
          understandContent: {
            coreTakeaway: 'A healthy community challenge strengthens practice and support through choice, safety and inclusion—not public comparison, pressure or promised loyalty.',
            keyPrinciples: ['Community participation and visibility require informed choice', 'Use cooperative or private progress before public rankings', 'Reward learning and helpfulness without disadvantaging limited time or resources'],
          },
          actionTask: {
            instruction: 'Prepare one inclusive community challenge:',
            checklistItems: ['Learning purpose, workload, flexible path and independent alternative published', 'Opt-in, visibility, communications, data and reward terms are clear', 'Accessibility, moderation, reporting and safeguarding controls assigned', 'Buddy consent, preferences, rematch and exit process configured', 'Learning, belonging, pressure, inequity and closure review scheduled'],
            toolboxCategory: 'content',
          },
        },
      },
    },
    42: {
      title: '42. Responsible LinkedIn thought leadership & B2B relationship building',
      subtitle: 'Evidence-led expertise, accessible content, respectful outreach and accountable lead management',
      description: 'Build a credible LinkedIn presence and develop relevant B2B conversations without reach guarantees, manipulative engagement tactics, invasive profiling or automated spam.',
      lessons: {
        '42.1': {
          stageTitle: '42. Credible LinkedIn content & profile design',
          title: 'Publish useful expertise and create an accurate, accessible profile',
          description: 'Turn verified experience into useful posts and documents while making your role, evidence, offer and next step easy to understand.',
          learnContent: {
            videoTitle: 'Masterclass: Evidence-led LinkedIn content for B2B audiences',
            summaryText: 'LinkedIn distribution changes over time and no format, posting time or engagement window guarantees reach. A sustainable strategy starts with audience needs, reliable evidence, clear authorship and accessible presentation, then tests formats against meaningful business outcomes.',
            bulletPoints: [
              'Treat algorithm advice as a testable hypothesis and use current first-party analytics rather than fixed reach formulas',
              'Choose text, image, video or document posts according to the audience task, available evidence and accessibility needs',
              'Separate informed professional opinion from fact and link claims, examples and case studies to appropriate evidence',
              'Design the profile as an accurate professional introduction with a clear offer, disclosures and a low-pressure next step',
            ],
            coreConcepts: [
              { iconName: 'file-text', title: 'EVIDENCE-LED CONTENT', description: 'Every post has a defined audience question, trustworthy source, useful explanation and proportionate claim instead of a promise of virality.', highlight: true },
              { iconName: 'user-check', title: 'TRUSTWORTHY PROFILE', description: 'Identity, role, experience, services, affiliations and contact route are current, specific and not misleading.' },
            ],
            resources: [
              { title: 'LinkedIn Editorial & Evidence Matrix', subtitle: 'Audience questions, sources, formats, accessibility and review', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'GOM-MAR LinkedIn Draft Assistant', subtitle: 'Create reviewable drafts without fabricated expertise or results', type: 'tool', iconName: 'cpu', actionUrl: 'tools' },
            ],
            fullArticleGuide: `### Build authority by being useful, accurate and accountable

Thought leadership is not a claim of superiority. It is a repeated practice of explaining relevant issues, showing evidence, acknowledging limits and helping a defined professional audience make better decisions.

#### Responsible LinkedIn publishing workflow

1. **Define the audience task**: Identify the role, context and decision the content should support. Avoid targeting people through sensitive inferred traits.
2. **Select a defensible topic**: Use questions you can address through direct experience, reliable research or clearly attributed expert sources.
3. **Build an evidence sheet**: Record sources, dates, assumptions, limitations, permissions and review owner. Remove invented statistics, clients and outcomes.
4. **Choose the appropriate format**: Match text, image, video or document to the explanation. A document post is not inherently superior and reach varies by account, audience and time.
5. **Write an accurate opening**: State the problem and value without fear, outrage bait, fake controversy or a claim that one view destroys an entire industry myth.
6. **Explain, do not merely assert**: Show method, context and trade-offs. Label opinion, estimates, simulations and sponsored relationships clearly.
7. **Protect confidential information**: Obtain permission for names, logos, screenshots, quotes and case studies. Aggregate or anonymise only where re-identification risk is controlled.
8. **Make content accessible**: Use descriptive headings, plain language, alt text, edited captions, sufficient contrast, readable documents and meaningful link labels.
9. **Review professional and regulated claims**: Legal, financial, health, employment and safety content may require qualified review and jurisdiction-specific caveats.
10. **Prepare a fair next step**: Offer a relevant resource, newsletter or conversation with clear terms. Do not disguise lead capture, scarcity or paid promotion.
11. **Publish and moderate responsibly**: Correct material errors visibly, address good-faith questions and manage harassment without manufacturing early engagement.
12. **Measure useful outcomes**: Track qualified profile visits, saves, meaningful replies, consented enquiries, accessibility feedback and downstream fit—not impressions alone.
13. **Maintain the profile**: Keep role, offer, proof, affiliations, featured links, privacy notice and contact preferences current.

Credibility compounds when readers can understand where a claim came from, what it means and where its limits are.`,
            practicalExamples: [
              'A consultant publishes a documented process improvement with client permission, explains the baseline and limitations, and links to the methodology instead of promising identical savings.',
              'A document post includes readable type, a text summary and descriptive link; analytics are reviewed after a defined test period without claiming the format always triples reach.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Durable B2B credibility comes from useful evidence, accurate identity, accessible communication and visible corrections—not algorithm myths or dominance claims.',
            keyPrinciples: ['Test formats instead of promising reach', 'Distinguish evidence, experience and opinion', 'Protect confidentiality and design for accessibility'],
          },
          actionTask: {
            instruction: 'Prepare one evidence-led LinkedIn profile and content pilot:',
            checklistItems: ['Audience question, useful outcome and non-goals defined', 'Profile identity, role, offer, proof and disclosures verified', 'Sources, permissions, claims and limitations reviewed', 'Post and destination tested for accessibility and mobile use', 'Metrics, review date, correction route and stop rule documented'],
            toolboxCategory: 'content',
          },
        },
        '42.2': {
          stageTitle: '42. Respectful social selling & executive outreach',
          title: 'Develop relevant B2B conversations without spam or pressure',
          description: 'Research accounts proportionately, interact genuinely and invite a conversation only when relevance, lawful data use and the recipient’s choices are clear.',
          learnContent: {
            videoTitle: 'Masterclass: Permission-aware B2B outreach and discovery',
            summaryText: 'A profile view, comment sequence or “value-first” message does not guarantee a meeting. Responsible outreach uses minimal relevant data, human review, honest intent, reasonable frequency and an easy way to decline while measuring fit and harm as well as replies.',
            bulletPoints: [
              'Define legitimate audience criteria without scraping prohibited data or inferring sensitive personal characteristics',
              'Use public professional context only where relevant and verify it before personalising a message',
              'Make identity and commercial intent clear; do not simulate friendship or hide a pitch behind an unsolicited audit',
              'Use CRM retention, suppression, access and deletion controls and stop promptly after refusal or repeated non-response',
            ],
            coreConcepts: [
              { iconName: 'send', title: 'RESPECTFUL RELEVANCE', description: 'The message explains why this person, why now and what optional value is offered, without surveillance language, pressure or fabricated familiarity.', highlight: true },
              { iconName: 'calendar', title: 'CONSENTED DISCOVERY', description: 'A call has a clear purpose, duration, participants and cancellation route; discovery is not a disguised commitment.' },
            ],
            resources: [
              { title: 'Responsible B2B Outreach Playbook', subtitle: 'Research boundaries, message patterns, objections and suppression', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM B2B Governance Pipeline', subtitle: 'Source, lawful basis, consent, retention, opt-out and deal fit', type: 'tool', iconName: 'users', actionUrl: 'crm' },
            ],
            fullArticleGuide: `### Build B2B relationships without turning LinkedIn into a surveillance funnel

Social selling should improve relevance and trust, not automate unwanted contact. Platform rules, privacy and direct-marketing requirements vary by location and context, so obtain qualified advice where needed.

#### Account-based outreach workflow

1. **Define a narrow business problem**: State the organisations and roles that can reasonably benefit, plus exclusions and disqualifiers.
2. **Set governance before prospecting**: Document data sources, access, retention, lawful basis, suppression, security, owners and escalation. Do not import scraped or purchased lists without verification.
3. **Research proportionately**: Use relevant public professional information and company signals. Avoid sensitive inferences, personal surveillance or mentioning details that would feel intrusive.
4. **Verify the record**: Confirm role, organisation, market and source date. Mark uncertainty rather than inventing personalisation.
5. **Engage only when genuine**: Comment when you can add useful substance. Never deploy generic bot comments to manufacture familiarity or engagement.
6. **Write a transparent invitation**: Identify yourself, explain the specific relevance and keep the request optional. Do not pretend a sales message is neutral networking.
7. **Offer value without coercion**: A checklist or observation must be genuinely useful, safe and accessible without requiring a meeting. Do not manufacture flaws in an unsolicited “audit”.
8. **Control frequency**: Use a small, documented contact sequence with human approval, quiet periods and immediate suppression after opt-out. No endless follow-ups or account rotation.
9. **Respect platform and channel rules**: Use supported features and current limits. Do not evade restrictions, automate prohibited actions or move contact to email or phone without a valid basis.
10. **Run a fair discovery call**: Share agenda, duration and participants; ask permission for notes or recording. Explore need, stakeholders, constraints, alternatives and no-fit conditions before presenting an offer.
11. **Substantiate commercial claims**: Use comparable case evidence with context and permission. Never imply guaranteed ROI, access to executives, meeting volume or five- or six-figure contracts.
12. **Record responsibly**: Store source, status, objections, commitments and next step in the CRM with role-based access and a retention schedule. Keep sensitive speculation out.
13. **Measure quality and harm**: Review relevant replies, accepted calls, no-fit decisions, complaints, opt-outs, conversion quality, sales cycle and customer outcomes.
14. **Pause and improve**: Stop a segment or message when complaints, low relevance or poor downstream fit exceed the agreed threshold.

A respectful “no” is a useful outcome: it protects both parties and improves targeting.`,
            practicalExamples: [
              'After reading a public company report, a specialist sends a short note connecting one disclosed operational priority to a relevant checklist and explicitly says no reply is required.',
              'A prospect declines. The CRM records suppression and retention date, and automation blocks further messages across the campaign.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Good social selling earns permission through relevance, transparency and restraint; it never depends on hidden intent, mass automation or guaranteed meetings.',
            keyPrinciples: ['Use minimal verified professional data', 'Make identity, intent and opt-out clear', 'Measure complaints and fit alongside meetings and revenue'],
          },
          actionTask: {
            instruction: 'Run a controlled, respectful B2B outreach pilot:',
            checklistItems: ['Audience, exclusions, data sources and governance approved', 'Ten records manually verified for role, relevance and source', 'Message states identity, relevance, optional value and easy decline', 'Frequency, suppression, retention and human approval controls tested', 'Quality, complaints, opt-outs, call fit and stop rule scheduled for review'],
            toolboxCategory: 'crm',
          },
        },
      },
    },
    43: {
      title: '43. Email authentication, sender reputation & responsible deliverability',
      subtitle: 'SPF, DKIM, DMARC, optional BIMI, consent-based lists and evidence-led monitoring',
      description: 'Improve the conditions for legitimate email delivery through correct authentication, secure sending operations and healthy recipient relationships—without inbox-placement guarantees or artificial warm-up traffic.',
      lessons: {
        '43.1': {
          stageTitle: '43. Domain authentication & sender trust',
          title: 'Deploy SPF, DKIM and DMARC safely; assess BIMI separately',
          description: 'Inventory every authorised sender, configure authentication with staged enforcement and verify alignment, reporting and operational ownership.',
          learnContent: {
            videoTitle: 'Masterclass: Email authentication and domain protection',
            summaryText: 'Authentication helps receiving systems verify who may send for a domain, but it cannot guarantee inbox placement. Provider requirements and supported features change, so teams should consult current official documentation, test every sender and monitor results before tightening policy.',
            bulletPoints: [
              'SPF authorises sending infrastructure but must remain within DNS lookup limits and should not be duplicated',
              'DKIM signs messages; use supported key lengths, protect private keys and plan selector rotation',
              'DMARC evaluates aligned SPF or DKIM and supplies aggregate reporting; move toward enforcement only after review',
              'BIMI has separate trademark, logo, certificate and mailbox-provider requirements and is not a deliverability shortcut',
            ],
            coreConcepts: [
              { iconName: 'shield-check', title: 'ALIGNED AUTHENTICATION', description: 'SPF and DKIM are configured for each real sender and at least one aligns with the visible From domain under DMARC.', highlight: true },
              { iconName: 'check-circle-2', title: 'OBSERVED ENFORCEMENT', description: 'DMARC policy is tightened from monitored evidence, with owners for legitimate failures, abuse reports and rollback.' },
            ],
            resources: [
              { title: 'Email Authentication Deployment Workbook', subtitle: 'Inventory, DNS records, alignment, reports, tests and rollback', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM Sending-Domain Settings', subtitle: 'Verify sender configuration and operational ownership', type: 'tool', iconName: 'settings', actionUrl: 'settings' },
            ],
            fullArticleGuide: `### Authenticate email without promising the inbox

SPF, DKIM and DMARC reduce impersonation risk and help receivers evaluate identity. Placement still depends on consent, reputation, content, complaint signals, infrastructure and each provider’s systems.

#### Safe authentication rollout

1. **Inventory every sender**: List marketing, transactional, support, CRM, ticketing, billing and third-party services, including return-path and subdomain ownership.
2. **Minimise and secure access**: Remove unknown senders, use scoped credentials, multi-factor authentication, change control and a named incident owner.
3. **Publish one valid SPF record**: Include only authorised sources, stay within the lookup limit and test DNS resolution. SPF alone does not protect the visible From address.
4. **Enable DKIM per service**: Prefer supported strong keys, keep private keys with the sender, document selectors and rotate them without breaking in-flight mail.
5. **Check identifier alignment**: Confirm that authenticated SPF or DKIM domains align with the visible From domain as required by DMARC.
6. **Begin DMARC with observation**: Publish a valid reporting address, protect report data and review aggregate results. A monitoring policy is a phase, not proof of protection.
7. **Resolve legitimate failures**: Correct forwarded, vendor and subdomain flows; do not weaken policy merely to hide errors.
8. **Increase enforcement gradually**: Move toward quarantine or reject only when legitimate sources authenticate reliably, reports are reviewed and rollback is ready.
9. **Separate streams where useful**: Use managed subdomains for distinct sending purposes to isolate operations, while preserving truthful brand identity.
10. **Assess BIMI independently**: Verify current provider support, enforced DMARC, logo specifications, trademark and certificate requirements. Logo display and engagement are never guaranteed.
11. **Test end to end**: Inspect headers, alignment, TLS, links, unsubscribe behaviour, replies and bounce handling across representative providers and devices.
12. **Monitor continuously**: Track authentication failures, unknown sources, complaints, delivery errors and DNS changes; alert owners and preserve an audit trail.

Do not paste provider-specific DNS examples without adapting and validating them for the actual domain.`,
            practicalExamples: [
              'A team discovers that its support platform is missing DKIM during DMARC monitoring, fixes alignment and verifies reports before moving from observation to enforcement.',
              'A brand meets BIMI prerequisites but treats logo display as optional provider behaviour, not a promised opening-rate uplift.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Authentication establishes verifiable sending identity and supports abuse protection, but no DNS record guarantees delivery or placement.',
            keyPrinciples: ['Inventory and test every legitimate sender', 'Tighten DMARC from monitored evidence with rollback', 'Treat BIMI as optional branding with separate prerequisites'],
          },
          actionTask: {
            instruction: 'Prepare a controlled email-authentication deployment:',
            checklistItems: ['All sending services, domains, subdomains and owners inventoried', 'Single SPF record and DKIM selectors validated', 'DMARC alignment, reporting mailbox and privacy controls tested', 'Legitimate failures, enforcement stages and rollback documented', 'Monitoring, key rotation, incident response and review dates assigned'],
            toolboxCategory: 'email',
          },
        },
        '43.2': {
          stageTitle: '43. Consent-based list health & reputation monitoring',
          title: 'Build a healthy sending programme without fake warm-up or engagement myths',
          description: 'Send wanted mail at supportable volumes, remove invalid addresses promptly and manage inactive subscribers according to context, consent and retention rules.',
          learnContent: {
            videoTitle: 'Masterclass: Responsible list hygiene and sending ramp-up',
            summaryText: 'There is no universal 30-day schedule, sender score or forbidden-word list that guarantees deliverability. Sustainable reputation comes from valid acquisition, expected messages, stable operations, low complaints, accurate bounce handling and provider-specific monitoring.',
            bulletPoints: [
              'Increase legitimate volume gradually according to real demand, historical signals and provider feedback—not synthetic exchanges',
              'Use confirmed signup where appropriate and preserve source, notice, consent and suppression evidence',
              'Suppress hard bounces and complaints promptly; investigate temporary failures before applying bounded retries',
              'Define inactivity by message purpose and audience, and offer preference controls before proportionate suppression or deletion',
            ],
            coreConcepts: [
              { iconName: 'trash-2', title: 'PURPOSE-BASED RETENTION', description: 'Retention and inactivity rules reflect consent, message type, customer relationship and legal duties—not an automatic 90-day deletion rule.', highlight: true },
              { iconName: 'trending_up', title: 'BALANCED SIGNALS', description: 'Delivery errors, complaints, unsubscribes, valid engagement and customer outcomes are assessed together; opens are privacy-limited and imperfect.' },
            ],
            resources: [
              { title: 'List Health & Sending-Ramp Playbook', subtitle: 'Consent, bounces, complaints, preferences, retention and incidents', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM List-Governance Automation', subtitle: 'Suppression, consent records, preference states and review queues', type: 'tool', iconName: 'mail', actionUrl: 'email' },
            ],
            fullArticleGuide: `### Grow sending volume from genuine permission, not simulated activity

Warm-up services that manufacture opens, replies or inbox moves can create misleading signals, expose content and credentials and conflict with provider rules. Build reputation through real, expected communication.

#### Responsible list-health workflow

1. **Map message purposes**: Separate transactional, service, lifecycle and marketing streams, with appropriate basis, expectations and unsubscribe behaviour.
2. **Validate acquisition**: Record signup source, timestamp, notice and preferences. Never buy, scrape or append addresses without a valid, transparent basis.
3. **Confirm addresses where appropriate**: Confirmation can reduce typo and abuse risk; keep accessibility, failed confirmation and customer support routes in mind.
4. **Set expectations**: State sender, subject area and approximate frequency at signup. Honour preferences and do not silently broaden purpose.
5. **Ramp from real demand**: Begin with recipients most likely to expect the mail and increase volume only when infrastructure, support and feedback remain healthy. Avoid fixed universal targets.
6. **Keep operations consistent**: Use stable authenticated domains, predictable From identity, working reply handling and controlled deployment changes.
7. **Process bounces correctly**: Immediately suppress valid permanent failures. Retry temporary failures only within documented limits and investigate sudden patterns.
8. **Handle complaints and unsubscribes fast**: Apply suppression across relevant systems and never re-add someone without a valid new request.
9. **Interpret engagement cautiously**: Privacy protection and image blocking distort opens. Combine clicks, replies, conversions, preferences, complaints and service context without invasive tracking.
10. **Define inactivity contextually**: A monthly newsletter and annual service notice need different windows. Explain options, offer lower frequency or pause and avoid threatening subject lines.
11. **Run a fair reconfirmation test**: Send a limited, clearly identified message with one simple preference action and no manufactured urgency. Suppress marketing when permission cannot be supported.
12. **Protect data lifecycle**: Distinguish deletion from suppression records needed to honour opt-outs, minimise stored data and apply access, retention and audit controls.
13. **Monitor by provider and stream**: Review delivery codes, authentication, complaints, block events and representative inbox tests. Provider dashboards cover only available data.
14. **Use stop rules**: Pause campaigns after unusual complaint, bounce or abuse signals, investigate root cause and resume gradually after validation.
15. **Document results honestly**: Removing inactive recipients may change rates because the denominator changes; it does not guarantee more revenue or inbox placement.

The objective is wanted, secure and useful email—not the largest possible list or a cosmetic open rate.`,
            practicalExamples: [
              'A newsletter offers monthly, quarterly or pause preferences before suppressing recipients whose marketing permission and interest can no longer be supported.',
              'A bounce spike triggers an automatic campaign pause and investigation of acquisition source and domain configuration instead of repeated delivery attempts.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Healthy email programmes earn attention through permission, relevance and reliable operations; synthetic warm-up and simplistic scores cannot replace them.',
            keyPrinciples: ['Use genuine expected traffic only', 'Suppress invalid and opted-out addresses promptly', 'Interpret metrics in context and maintain stop rules'],
          },
          actionTask: {
            instruction: 'Run one responsible list-health review:',
            checklistItems: ['Message purposes, acquisition sources, notices and consent evidence reviewed', 'Hard-bounce, complaint, unsubscribe and retry controls tested', 'Inactivity windows and preference options defined by stream', 'Provider feedback, privacy limits and representative tests documented', 'Ramp limits, alert thresholds, stop rule and next review assigned'],
            toolboxCategory: 'email',
          },
        },
      },
    },
    44: {
      title: '44. Responsible WhatsApp & SMS messaging',
      subtitle: 'Channel-specific consent, approved messaging, safe automation and respectful service',
      description: 'Use WhatsApp and SMS only for expected, useful communication with clear permission, current platform compliance, secure data handling and easy opt-out—without universal open-rate or sales guarantees.',
      lessons: {
        '44.1': {
          stageTitle: '44. WhatsApp Business Platform & permission',
          title: 'Set up permission-aware WhatsApp communication',
          description: 'Choose an official business solution, collect purpose-specific permission and operate templates, service conversations and preferences transparently.',
          learnContent: {
            videoTitle: 'Masterclass: Responsible WhatsApp setup and consent',
            summaryText: 'WhatsApp is a personal channel governed by platform rules, privacy law and direct-marketing requirements. A checkbox or template approval alone does not prove lawful, informed permission, and no channel guarantees a particular open or conversion rate.',
            bulletPoints: [
              'Select the Business App or official Business Platform according to support, scale, integration and governance needs',
              'Collect separate, specific permission for WhatsApp purpose and frequency; do not bundle it with email, SMS or general terms',
              'Use currently approved template categories and service-window rules, checking official documentation before launch',
              'Store source, timestamp, notice version and preferences, and honour opt-out across every connected system',
            ],
            coreConcepts: [
              { iconName: 'message-circle', title: 'EXPECTED MESSAGING', description: 'The recipient knows the sender, channel, purpose and approximate frequency before the first message arrives.', highlight: true },
              { iconName: 'lock', title: 'VERIFIABLE CHOICE', description: 'Permission and withdrawal are recorded, granular and as easy to use as signup; legal assessment remains context-specific.' },
            ],
            resources: [
              { title: 'WhatsApp Permission & Operations Workbook', subtitle: 'Notices, templates, preferences, retention and incidents', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM WhatsApp Integration', subtitle: 'Connect an official account with governed access and consent records', type: 'tool', iconName: 'message-square', actionUrl: 'settings' },
            ],
            fullArticleGuide: `### Treat messaging as invited access, not a guaranteed attention channel

WhatsApp can support reminders, service and opted-in marketing, but the correct setup depends on market, message purpose, business role and current platform terms. Obtain qualified legal advice where required.

#### Responsible WhatsApp lifecycle

1. **Define one message purpose**: Separate service updates, appointments, authentication and marketing. State what the channel will not be used for.
2. **Choose an official route**: Compare the Business App and supported Business Platform providers. Do not use browser automation, unofficial clients or shared personal accounts.
3. **Assign accountability**: Name owners for templates, privacy, security, support, billing, incidents and platform changes.
4. **Collect informed permission**: Show business identity, channel, purpose, content type, likely frequency, data use and withdrawal method before opt-in. Keep WhatsApp optional.
5. **Verify without dark patterns**: Confirmation can help prevent mistyped numbers, but avoid preselected boxes, forced consent or making service conditional on unrelated marketing.
6. **Record evidence**: Store the source, time, notice version, purpose and status with restricted access and a retention schedule.
7. **Prepare approved templates**: Use truthful category, variables and language; preview the final message and re-review after platform policy changes.
8. **Respect conversation rules**: Check current service-window and pricing conditions. A reply does not create unlimited permission for unrelated promotion.
9. **Protect data in integrations**: Limit fields, encrypt transport, scope tokens, rotate secrets, log access and assess subprocessors and cross-border transfers.
10. **Design accessible messages**: Use plain language, descriptive links and text alternatives for essential audio or images. Do not rely on emoji or colour alone.
11. **Control frequency and timing**: Honour time zones, quiet hours and user preferences. Frequency should match the promised purpose, not a universal weekly quota.
12. **Make stopping simple**: Recognise clear opt-out language, confirm suppression once and apply it across campaigns. Provide human support for mistakes.
13. **Measure balanced outcomes**: Review delivery, replies, task completion, opt-outs, blocks, complaints, support burden and customer outcomes; platform metrics have limitations.
14. **Pause on harm**: Stop a template or segment when complaints, blocks, security events or poor relevance exceed the agreed threshold.

Template approval is a platform control, not legal certification or proof that every recipient expects the message.`,
            practicalExamples: [
              'An appointment form offers an optional WhatsApp reminder with stated timing and a separate email choice; withdrawal in either channel updates the CRM immediately.',
              'A customer replies to a delivery update. Support answers the delivery question but does not treat the reply as consent to marketing.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Responsible WhatsApp communication is specific, expected, secure and reversible; template approval and high attention do not replace permission.',
            keyPrinciples: ['Separate channel and purpose choices', 'Use only official supported integrations', 'Honour preferences, quiet time and withdrawal everywhere'],
          },
          actionTask: {
            instruction: 'Prepare one controlled WhatsApp pilot:',
            checklistItems: ['Purpose, market, official solution and accountable owners confirmed', 'Opt-in notice, channel choice, evidence and retention reviewed', 'Template category, variables, language and service rules verified', 'Security, accessibility, quiet hours and human support tested', 'Opt-out sync, complaint threshold, incident pause and review date configured'],
            toolboxCategory: 'landingpage',
          },
        },
        '44.2': {
          stageTitle: '44. Safe chat automation & permission-based SMS',
          title: 'Automate simple messaging tasks without deceptive bots or urgency',
          description: 'Build bounded flows with clear bot identity and human escalation, while using SMS only for consented, time-appropriate messages with transparent links and terms.',
          learnContent: {
            videoTitle: 'Masterclass: Safe WhatsApp automation and responsible SMS',
            summaryText: 'Automation can route questions and deliver requested information, but it can also create wrong answers, inaccessible loops and unwanted pressure. SMS brevity does not justify hidden terms, artificial scarcity or tracking links that obscure the destination.',
            bulletPoints: [
              'Tell people when they are interacting with automation, what it can do and how to reach a person',
              'Limit AI answers to reviewed knowledge, apply confidence and safety rules and prevent unsupported professional advice',
              'Obtain channel- and purpose-specific SMS permission and identify the sender in every message where required',
              'Use truthful deadlines, recognisable destinations and tested opt-out handling instead of manufactured click urgency',
            ],
            coreConcepts: [
              { iconName: 'cpu', title: 'BOUNDED AUTOMATION', description: 'The bot handles defined low-risk tasks, logs decisions and hands off on uncertainty, distress, complaint, accessibility need or user request.', highlight: true },
              { iconName: 'zap', title: 'RESPECTFUL SMS', description: 'A short message still identifies the sender, purpose, material terms, destination and withdrawal route without fake scarcity.' },
            ],
            resources: [
              { title: 'Messaging Automation Safety Map', subtitle: 'Flows, knowledge, escalation, consent, testing and incidents', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM Governed Multi-Channel Inbox', subtitle: 'WhatsApp, SMS and email with roles, suppression and handover', type: 'tool', iconName: 'inbox', actionUrl: 'crm' },
            ],
            fullArticleGuide: `### Automate repeatable tasks while keeping people in control

A bot should reduce friction in a defined task, not impersonate a person, pressure a sale or block access to support. SMS needs its own permission and operational controls.

#### Safe flow design and operation

1. **Choose a bounded use case**: Start with status, FAQ, requested resource, appointment selection or routing. Exclude emergencies and high-stakes professional decisions unless qualified oversight exists.
2. **Disclose automation early**: State that the user is interacting with a bot, its scope, data use and human-contact route.
3. **Minimise questions and data**: Request only information necessary for the task. Never use chat answers to infer sensitive traits for targeting.
4. **Design a simple path**: Provide clear choices, back, repeat, correction and exit. Do not trap users in a loop or require marketing consent for support.
5. **Ground AI responses**: Use maintained approved sources, citations where useful, versioning and owners. Define prohibited claims and confidence thresholds.
6. **Escalate safely**: Transfer on uncertainty, repeated failure, complaint, distress, payment dispute, accessibility need or explicit request, with context and consent.
7. **Protect credentials and transcripts**: Apply least privilege, encryption, retention, redaction, audit logs and incident procedures. Restrict transcript access.
8. **Test across users and devices**: Include keyboard and screen-reader needs, language variations, typos, unexpected inputs, downtime and delivery duplication.
9. **Separate SMS permission**: Document sender, purpose, frequency, charges where relevant and opt-out. Do not assume WhatsApp or email consent covers SMS.
10. **Write transparent SMS**: Identify the business, state the useful action and material terms, use a trustworthy domain and avoid hidden redirects.
11. **Use real urgency only**: Deadlines, stock and discounts must be accurate, visible at the destination and updated when circumstances change.
12. **Make delivery idempotent**: Prevent duplicate sends, cap retries, handle delayed events and pause automatically during outages or data mismatch.
13. **Coordinate channel pressure**: Avoid sending the same promotion by WhatsApp, SMS and email in quick succession unless the recipient explicitly chose it.
14. **Monitor quality and harm**: Review resolution, handover, wrong answers, abandonment, complaints, opt-outs, duplicates, latency and downstream outcomes.
15. **Retire safely**: Remove outdated answers and templates, revoke access, preserve necessary suppression records and document lessons.

Fast answers are useful only when they are accurate, accessible and easy to leave.`,
            practicalExamples: [
              'A bot supplies a requested guide and offers support; it never recommends a product from inferred vulnerability and deletes unnecessary answers on schedule.',
              'An SMS reminder names the business and appointment, uses the company domain and includes a tested opt-out; a delivery retry cannot create a duplicate.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Safe messaging automation is transparent, limited and escapable; speed and brevity never justify deception, pressure or removal of human support.',
            keyPrinciples: ['Disclose the bot and its limits', 'Escalate uncertainty and sensitive cases', 'Treat SMS permission and suppression separately'],
          },
          actionTask: {
            instruction: 'Build and test one bounded messaging flow:',
            checklistItems: ['Use case, exclusions, bot disclosure and human handover defined', 'Data fields, knowledge sources, permissions and retention minimised', 'Correction, exit, accessibility and failure paths tested', 'SMS identity, consent, terms, domain and opt-out verified', 'Duplicate prevention, monitoring, stop thresholds and retirement owner assigned'],
            toolboxCategory: 'crm',
          },
        },
      },
    },
    45: {
      title: '45. Ethical retention, fair cancellation & sustainable customer value',
      subtitle: 'Outcome-led onboarding, voluntary support, transparent subscriptions and respectful win-back',
      description: 'Improve long-term customer value by delivering useful outcomes and removing avoidable friction while preserving an immediate, understandable cancellation path—without churn, profit or reactivation guarantees.',
      lessons: {
        '45.1': {
          stageTitle: '45. Customer outcomes & fair retention',
          title: 'Detect service friction without profiling or obstructing cancellation',
          description: 'Use proportionate signals to offer relevant help, improve onboarding and provide genuine pause or downgrade choices without manipulating people into staying.',
          learnContent: {
            videoTitle: 'Masterclass: Ethical retention and customer-outcome monitoring',
            summaryText: 'Cancellation has many causes and inactivity alone does not prove dissatisfaction or churn risk. Retention should come from product fit, clear value and reliable support—not intrusive surveillance, surprise calls, hidden cancellation controls or universal claims about acquisition cost and profit.',
            bulletPoints: [
              'Define successful customer outcomes and evidence before selecting engagement or inactivity signals',
              'Use the minimum necessary account data, explain relevant monitoring and avoid inferring health, finances or vulnerability',
              'Offer help, pause or downgrade as optional alternatives while keeping cancellation equally visible and easy',
              'Analyse onboarding, defects, support, accessibility, pricing and expectation gaps instead of blaming low usage',
            ],
            coreConcepts: [
              { iconName: 'shield', title: 'PROPORTIONATE SUPPORT SIGNAL', description: 'A documented signal opens a review or optional support offer; it never automatically labels a person, removes choice or triggers pressure.', highlight: true },
              { iconName: 'pause-circle', title: 'FAIR SUBSCRIPTION CONTROL', description: 'Pause, downgrade and cancellation show price, timing and consequences clearly, with confirmation and no unnecessary obstacles.' },
            ],
            resources: [
              { title: 'Ethical Retention & Cancellation Workbook', subtitle: 'Outcomes, signals, experiments, rights and service recovery', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM Customer-Outcome Monitor', subtitle: 'Privacy-aware cohorts, support signals and review queues', type: 'tool', iconName: 'bar-chart-2', actionUrl: 'crm' },
            ],
            fullArticleGuide: `### Earn retention through outcomes and customer control

Retention is useful only when customers continue because the service remains suitable. A lower churn rate can hide lock-in, billing friction or customers who cannot find the exit.

#### Ethical retention workflow

1. **Define the customer promise**: State the intended outcome, prerequisites, time and effort, exclusions and what evidence would show progress.
2. **Map the lifecycle**: Review purchase, setup, first use, recurring value, support, billing, renewal, pause and cancellation from the customer’s perspective.
3. **Measure a baseline honestly**: Define customer, active subscription, cancellation, involuntary churn, cohort and observation period. Segment without cherry-picking.
4. **Research causes directly**: Combine voluntary feedback, support themes, product defects, accessibility findings and cohort behaviour. Do not assume a fixed list of churn causes.
5. **Minimise behavioural data**: Collect only signals needed for a stated service purpose, restrict access, set retention and avoid sensitive inference or employee-style surveillance.
6. **Validate an alert before action**: Test whether a signal predicts a service need across relevant groups. Monitor false positives and unequal impact.
7. **Offer proportionate support**: Use the preferred channel and explain why the message was sent. Make a check-in optional; no surprise call or urgency.
8. **Fix the product first**: Improve confusing setup, reliability, accessibility, expectations, support and billing before adding persuasion.
9. **Provide genuine choices**: Pause, downgrade, switch plan or seek assistance only where operationally real. Show price, duration, lost features and automatic restart clearly.
10. **Keep cancellation simple**: Use a discoverable route, few necessary steps, no preselected retention offer and immediate confirmation. Honour applicable cooling-off and refund rights.
11. **Handle involuntary churn carefully**: Give accurate payment-failure notices and secure update routes, with bounded retries and no misleading debt threats.
12. **Run controlled experiments**: Predefine hypothesis, eligible cohort, customer-benefit metric, harm metric, duration and stop rule. Do not optimise only for retained billing.
13. **Review balanced outcomes**: Examine task success, support demand, accessibility, complaints, refunds, pauses, cancellations, reactivations and longer-term satisfaction.
14. **Retire harmful tactics**: Remove flows that increase short-term retention through confusion, pressure, unequal treatment or unwanted contact.

A cancellation is not necessarily failure; it can be the correct outcome when needs, timing or product fit change.`,
            practicalExamples: [
              'A learner has not logged in recently. The product offers an optional reminder preference and help centre link, while pause and cancellation remain equally accessible.',
              'A checkout expectation gap causes refunds. The team corrects the product page and onboarding rather than escalating save-offer discounts.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Healthy retention reflects ongoing customer value and informed choice; it is not simply the absence of cancellation.',
            keyPrinciples: ['Validate signals before contacting customers', 'Fix service friction before adding persuasion', 'Keep cancellation visible, immediate and free of dark patterns'],
          },
          actionTask: {
            instruction: 'Design one ethical retention improvement:',
            checklistItems: ['Customer outcome, cohort definitions and baseline documented', 'Signal purpose, data minimisation, false positives and access reviewed', 'Support message, preferences and human route tested', 'Pause, downgrade, billing and cancellation terms checked for fairness', 'Benefit, harm, complaint and stop metrics scheduled'],
            toolboxCategory: 'crm',
          },
        },
        '45.2': {
          stageTitle: '45. Respectful win-back & sustainable lifetime value',
          title: 'Invite former customers back without pressure or misleading offers',
          description: 'Contact eligible former customers only when permission, timing and relevance support it, and evaluate the full customer outcome rather than short-term cash collection.',
          learnContent: {
            videoTitle: 'Masterclass: Responsible win-back and customer value',
            summaryText: 'A former purchase does not create permanent marketing permission or guarantee renewed trust. Win-back timing and response differ by cancellation reason, market and customer. Honest programmes respect suppression, explain what materially changed and show full renewal terms.',
            bulletPoints: [
              'Segment by verified relationship and cancellation context without sensitive profiling or assumptions about personal circumstances',
              'Check current permission, suppression, frequency and retention before any win-back communication',
              'Describe real product changes and representative evidence; do not fabricate success stories or exclusive urgency',
              'Compare discounts and annual plans using total price, renewal, refund, cancellation and usage fit—not cash flow alone',
            ],
            coreConcepts: [
              { iconName: 'repeat', title: 'PERMISSION-AWARE WIN-BACK', description: 'Only eligible people receive a limited, relevant invitation with clear identity, reason, preferences and an easy decline.', highlight: true },
              { iconName: 'calendar', title: 'SUSTAINABLE CUSTOMER VALUE', description: 'Value includes margin, service cost, refunds, complaints, outcomes and retention quality—not prepaid revenue alone.' },
            ],
            resources: [
              { title: 'Responsible Win-back & Subscription Offer Guide', subtitle: 'Eligibility, evidence, terms, experiments and suppression', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM Win-back Governance', subtitle: 'Permission, cancellation reasons, exclusions and outcome review', type: 'tool', iconName: 'mail', actionUrl: 'email' },
            ],
            fullArticleGuide: `### Re-earn trust instead of exploiting a past purchase

Win-back can be useful when the product genuinely changed or a customer asked to hear from the business. It should never override withdrawal, conceal renewal terms or use a discount to pull an unsuitable customer back.

#### Responsible win-back lifecycle

1. **Clarify the purpose**: Decide whether the message provides a service update, requested reminder or marketing offer. Apply the correct rules for the market and channel.
2. **Check eligibility**: Verify current permission, relationship, suppression, complaints, disputes, refunds, vulnerability flags used only for protection and applicable retention limits.
3. **Respect the cancellation context**: Separate price, missing feature, poor support, technical failure, changed need and unknown reasons. Do not infer that everyone merely lacked time.
4. **Require a material reason to contact**: Use a real product improvement, resolved defect, requested availability update or suitable offer. “We miss you” alone is not relevance.
5. **Substantiate what changed**: Keep release evidence, dates, availability, limitations and ownership. Do not exaggerate a minor update or use an unrepresentative testimonial.
6. **Choose timing empirically**: Test a limited interval appropriate to the product and cancellation reason. There is no universal 60-day optimum.
7. **Limit the sequence**: Set a small maximum number of contacts, space them reasonably and suppress promptly after opt-out or non-response according to policy.
8. **Write transparently**: Identify the sender, why the person is receiving the message, what changed, total offer terms and an easy unsubscribe. Avoid guilt and fake exclusivity.
9. **Present pricing fairly**: Show total cost, discount basis and duration, automatic renewal, next price, taxes, cancellation, refund and feature differences before commitment.
10. **Evaluate annual plans for fit**: Do not frame prepayment as guaranteed loyalty. Offer monthly and annual comparisons without preselection or countdown pressure.
11. **Use feedback carefully**: Satisfaction or recommendation surveys are optional, accessible and not a condition of support. Explain whether answers are identifiable and how they are used.
12. **Run a bounded holdout test**: Predefine audience, duration, success and harm metrics. Include incremental reactivation, margin, refunds, complaints, early re-cancellation and customer outcomes.
13. **Provide a safe return**: Restore only necessary data, confirm current preferences and avoid reviving obsolete profiles or permissions automatically.
14. **Review and retire**: Stop segments with poor fit or complaint rates, honour suppression and delete data when the retention purpose expires.

The strongest win-back is a product change that genuinely resolves the reason someone left, communicated once with honesty and choice.`,
            practicalExamples: [
              'A former customer who requested feature updates receives one message when that feature launches, with limitations, full price and a preference link.',
              'An annual-plan experiment increases prepaid revenue but also early refunds and support complaints, so the team stops it despite higher initial cash.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Responsible win-back re-earns trust through permission, material relevance and fair terms; lifetime value is not a licence for repeated pressure.',
            keyPrinciples: ['Past purchase is not permanent consent', 'Contact only for a material and truthful reason', 'Measure refunds, complaints and customer outcomes beside revenue'],
          },
          actionTask: {
            instruction: 'Prepare one permission-aware win-back pilot:',
            checklistItems: ['Purpose, eligibility, permission, suppression and retention verified', 'Cancellation context and material product change documented', 'Message sequence, timing, accessibility and contact cap approved', 'Total price, renewal, cancellation, refund and plan comparison reviewed', 'Holdout, margin, complaints, re-cancellation and stop rule configured'],
            toolboxCategory: 'email',
          },
        },
      },
    },
    46: {
      title: '46. Google Search Ads & responsible high-intent acquisition',
      subtitle: 'Search intent, match types, ad relevance, exclusions and accountable automation',
      description: 'Build measurable Google Ads campaigns around genuine search intent, relevant ads and useful landing pages—without guaranteed rankings, fixed cost reductions or unsupported performance claims.',
      lessons: {
        '46.1': {
          stageTitle: '46. Google Search setup & ad quality',
          title: 'Structure high-intent search campaigns with controlled keyword matching',
          description: 'Identify commercially relevant queries, organise coherent ad groups and use search-term evidence to reduce irrelevant traffic while preserving truthful, accessible advertising.',
          learnContent: {
            videoTitle: 'Masterclass: Responsible Google Search campaign design',
            summaryText: 'Search can reveal strong intent, but a query does not guarantee a purchase and advertisers cannot guarantee position one. Auction results, cost and ad quality depend on competition, bids, assets, landing-page experience, policy and context. A sound campaign uses measured hypotheses, transparent copy and continuous search-term review.',
            bulletPoints: [
              'Map informational, comparative, navigational and transactional intent before selecting keywords and landing pages',
              'Use exact, phrase or broad matching according to evidence, conversion quality, budget and bidding controls—not as universal rules',
              'Review search terms and maintain contextual exclusions without blocking legitimate or accessibility-related queries',
              'Write varied responsive-search-ad assets that remain accurate in every combination and meet current platform policies',
            ],
            coreConcepts: [
              { iconName: 'search', title: 'MEASURED AD RELEVANCE', description: 'Ad quality indicators support diagnosis but do not guarantee rank, click price or business results; validate them against qualified outcomes.', highlight: true },
              { iconName: 'filter', title: 'CONTROLLED EXCLUSIONS', description: 'Negative keywords are reviewed by match type and context so irrelevant spend falls without silently excluding suitable customers.' },
            ],
            resources: [
              { title: 'Search Campaign Governance Workbook', subtitle: 'Intent map, keywords, exclusions, claims, experiments and review log', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM Google Ads Attribution', subtitle: 'Permission-aware GCLID handling and qualified offline outcomes', type: 'tool', iconName: 'bar-chart-2', actionUrl: 'crm' },
            ],
            fullArticleGuide: `### Build useful search advertising around evidence

Google Ads is an auction and relevance system, not a guaranteed route to first position or lower prices. The objective is to connect a suitable query with an accurate offer and then learn from qualified outcomes.

#### Responsible search-campaign workflow

1. **Define the business outcome**: Specify a qualified lead or sale, margin, service capacity, exclusions and the observation window before selecting a bidding metric.
2. **Map search intent**: Separate research, comparison, brand, local and purchase-oriented queries. Do not treat every search as immediate buying intent.
3. **Research language carefully**: Use first-party research, search tools and customer vocabulary without exploiting sensitive circumstances or protected traits.
4. **Choose match types deliberately**: Begin with the control appropriate to budget and evidence. Broader matching requires reliable measurement, exclusions and close review.
5. **Create coherent ad groups**: Group terms only when the same promise, evidence and landing page genuinely answer them. Avoid needless one-keyword complexity.
6. **Write combinable assets**: Every headline and description combination must be truthful, understandable and supported. Pin only where meaning or legal text requires it.
7. **Avoid unsafe insertion**: Dynamic keyword insertion can create misleading, offensive or non-compliant copy. Use it only with reviewed keyword sets and fallbacks.
8. **Design a useful landing page**: Match intent and offer, not necessarily wording character for character. Show identity, total terms, evidence, privacy, accessibility and a clear next step.
9. **Use assets accurately**: Keep sitelinks, call assets, locations, prices and promotions current. Route calls and forms to staffed, secure processes.
10. **Build contextual exclusions**: Review search terms by meaning and match behaviour. Do not blindly copy universal lists such as “free”, “jobs” or “PDF” when those queries may be relevant.
11. **Measure qualified outcomes**: Distinguish clicks, form starts, valid leads, sales, refunds and margin. Deduplicate events and test attribution assumptions.
12. **Protect tracking data**: Disclose relevant measurement, minimise identifiers, restrict access and retention, and use consent or another valid basis where required.
13. **Run bounded experiments**: Predefine hypothesis, budget, primary and harm metrics, duration and stop rules. Change one material variable when feasible.
14. **Review platform diagnostics in context**: Quality indicators and recommendations are inputs, not targets or guarantees. Reject recommendations that conflict with customer value.
15. **Maintain and pause safely**: Check policy notices, broken pages, inventory, search terms, complaints and conversion integrity; pause when evidence or operations fail.

A lower click price is not automatically better. The useful result is an accurately measured, suitable customer outcome at sustainable total cost.`,
            practicalExamples: [
              'A local adviser separates research queries from appointment queries and compares qualified bookings, not just click-through rate.',
              'A negative-keyword review finds that “free consultation” is a genuine offer, so the team excludes irrelevant meanings instead of blocking the word globally.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Strong search advertising aligns real intent, accurate claims, useful landing pages and qualified measurement; no setup guarantees rank or cost.',
            keyPrinciples: ['Treat intent as a hypothesis to validate', 'Review search terms and exclusions in context', 'Optimise for qualified outcomes rather than platform scores alone'],
          },
          actionTask: {
            instruction: 'Prepare one controlled Search campaign:',
            checklistItems: ['Qualified outcome, capacity, budget and stop rule documented', 'Intent map, keyword match types and contextual exclusions reviewed', 'All responsive-ad combinations checked for truth and policy', 'Landing-page terms, accessibility, privacy and tracking tested', 'Search-term, lead-quality, complaint and attribution review scheduled'],
            toolboxCategory: 'landingpage',
          },
        },
        '46.2': {
          stageTitle: '46. Performance Max & accountable automated bidding',
          title: 'Use Performance Max and Smart Bidding with evidence and safeguards',
          description: 'Provide automation with reliable goals, representative creative and governed data while retaining human oversight of placement quality, brand traffic, spend and customer outcomes.',
          learnContent: {
            videoTitle: 'Masterclass: Governed Performance Max and Smart Bidding',
            summaryText: 'Performance Max can distribute ads across eligible Google inventory, but automation does not guarantee incremental sales. Results depend on goals, data quality, budget, creative, market conditions and platform behaviour. First-party data, customer matching and offline conversion imports require permission, security and careful value design.',
            bulletPoints: [
              'Select bidding goals from economics and conversion quality; do not choose target CPA or ROAS from revenue alone',
              'Supply accurate text, images and video with usage rights, accessibility considerations and claims that work across placements',
              'Use audience signals as optional guidance, not deterministic targeting or a licence for sensitive profiling',
              'Separate brand and non-brand evidence where possible and test incrementality rather than crediting every reported conversion',
            ],
            coreConcepts: [
              { iconName: 'cpu', title: 'GOVERNED AUTOMATION', description: 'Automation receives documented goals, clean events, bounded budgets and human review; changes are reversible and incidents trigger a pause.', highlight: true },
              { iconName: 'shield', title: 'INCREMENTALITY CHECK', description: 'Brand controls, holdouts and channel comparisons help distinguish additional outcomes from demand that already existed.' },
            ],
            resources: [
              { title: 'Performance Max Governance Checklist', subtitle: 'Goals, assets, signals, exclusions, rights and stop rules', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM Offline Conversion Governance', subtitle: 'Validated outcomes, consent, deduplication and value corrections', type: 'tool', iconName: 'dollar-sign', actionUrl: 'settings' },
            ],
            fullArticleGuide: `### Give automated campaigns reliable goals and boundaries

Performance Max can use multiple Google surfaces and automated bidding, but reported performance can include existing brand demand, low-quality actions or modelled conversions. Govern the system as an experiment.

#### Accountable automation workflow

1. **Confirm suitability**: Check available budget, conversion delay, sales cycle, service capacity, creative supply and measurement reliability. There is no universal minimum conversion count.
2. **Define valuable events**: Import only meaningful, validated stages. Avoid optimising to page views or unqualified form submissions merely to increase volume.
3. **Assign defensible values**: Base values on expected margin and verified quality, not inflated revenue. Correct refunds, cancellations and duplicate leads where supported.
4. **Choose bidding carefully**: Start from evidence and allow for learning variability. Set CPA or ROAS targets only when volume, economics and lag make them credible.
5. **Create coherent asset groups**: Align each group with one genuine theme and landing experience. Check every asset for rights, accuracy, legibility and placement suitability.
6. **Upload your own video when useful**: Review any automatically created assets and remove or replace material that misrepresents the brand or offer.
7. **Use audience signals proportionately**: Use lawful, relevant and representative inputs. Never upload purchased lists or infer sensitive characteristics.
8. **Govern customer matching**: Verify notice, permission or other valid basis, hashing workflow, access, retention and deletion. Provide a route to exercise privacy rights.
9. **Control brand interpretation**: Apply available brand settings and report branded and non-branded demand separately. Document limitations rather than claiming perfect separation.
10. **Check destination expansion**: Ensure every eligible URL is current, safe and suitable for the advertised promise; exclude support, legal or irrelevant pages where appropriate.
11. **Protect location and language settings**: Validate presence versus interest options and user-language experience so spend does not drift into unsupported markets.
12. **Test incrementality**: Use experiments, holdouts, geo comparisons or other proportionate methods when feasible. Platform attribution alone cannot prove causation.
13. **Monitor placement and lead quality**: Review available reports, spam, unsuitable leads, complaints, refunds and downstream sales—not only ROAS.
14. **Change budgets with evidence**: Avoid fixed “20% every 48 hours” rules. Use documented thresholds, capacity and volatility, and make changes small enough to diagnose.
15. **Prepare incident controls**: Set spend alerts, account roles, change logs and pause conditions for broken tracking, disapproved assets, unsafe destinations or abnormal volume.

Automation can improve allocation, but accountability for claims, data, spend and customer treatment remains with the advertiser.`,
            practicalExamples: [
              'A course provider imports only verified paid enrolments and corrects refunds instead of treating every form submission as equal value.',
              'A campaign reports strong ROAS mostly from brand searches; a holdout and segmented report show less incremental value, so the budget decision changes.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Automated bidding is useful only when goals, data and creative are trustworthy and humans retain oversight of spend, quality and harm.',
            keyPrinciples: ['No universal conversion threshold or scaling rule fits every account', 'Use first-party data only with appropriate rights and controls', 'Test incrementality and qualified value beside platform ROAS'],
          },
          actionTask: {
            instruction: 'Design one governed automated-campaign pilot:',
            checklistItems: ['Suitability, economics, capacity, budget and learning period documented', 'Validated conversion events, values, lag, refunds and deduplication checked', 'Asset rights, claims, landing URLs, languages and accessibility reviewed', 'Audience signals, customer data, brand controls and privacy basis approved', 'Incrementality method, lead-quality review, alerts and pause rules configured'],
            toolboxCategory: 'landingpage',
          },
        },
      },
    },
    47: {
      title: '47. Responsible Meta Ads scaling & creative testing',
      subtitle: 'Creative experiments, Advantage+ controls, diagnostic metrics and fatigue management',
      description: 'Build a repeatable Meta advertising programme that tests creative ideas and changes budgets according to evidence, capacity and risk—without guaranteed winners, fixed testing windows or revenue claims.',
      lessons: {
        '47.1': {
          stageTitle: '47. Controlled creative experimentation',
          title: 'Test creative combinations without treating a 3:2:2 format as a universal formula',
          description: 'Design bounded experiments for hooks, formats, copy and offers, then interpret delivery, attention and qualified business outcomes without false statistical certainty.',
          learnContent: {
            videoTitle: 'Masterclass: Evidence-led creative testing on Meta',
            summaryText: 'Creative strongly influences delivery and response, but it is not the only form of targeting and no fixed number of assets, hours or budget guarantees a valid winner. Meta may distribute combinations unevenly, platform metrics can be modelled and a post with early engagement may still produce poor customer outcomes.',
            bulletPoints: [
              'Turn a customer insight into one documented hypothesis before combining visual, copy and headline variants',
              'Use 3:2:2 or another matrix only when budget, expected volume and platform features make it suitable',
              'Read hook rate, hold rate and outbound CTR as diagnostic signals—not universal pass/fail thresholds',
              'Promote a creative only after checking qualified conversions, margin, complaints, accessibility and sufficient observation',
            ],
            coreConcepts: [
              { iconName: 'layers', title: 'CONTROLLED CREATIVE TEST', description: 'A test states its audience, hypothesis, variants, allocation limits, primary metric, harm metrics, duration and decision rule before launch.', highlight: true },
              { iconName: 'zap', title: 'RESPONSIBLE SOCIAL PROOF', description: 'Post IDs may preserve genuine engagement, but comments are moderated, privacy is respected and misleading or incentivised proof is never manufactured.' },
            ],
            resources: [
              { title: 'Creative Experiment Workbook', subtitle: 'Hypotheses, asset rights, allocation, metrics and decision log', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'GOM-MAR Meta Outcome Analytics', subtitle: 'Qualified events, cost, margin and complaint monitoring', type: 'tool', iconName: 'bar-chart-2', actionUrl: 'crm' },
            ],
            fullArticleGuide: `### Build a creative learning system, not a winner factory

Meta advertising combines creative, delivery optimisation, audience settings, placement, bid strategy, market conditions and measurement. A useful experiment reduces uncertainty; it cannot promise a winner in 48 hours or five-figure daily revenue.

#### Responsible creative-testing workflow

1. **Start with customer research**: Document the problem, context, language and evidence. Do not exploit inferred health, financial distress or other sensitive traits.
2. **Define one hypothesis**: State what change may improve which qualified outcome and why. Avoid changing the hook, offer and landing page simultaneously.
3. **Select eligible users and placements**: Check market, age, language, exclusions, accessibility and policy. Broad delivery is an option, not a universal optimum.
4. **Choose a feasible design**: A 3:2:2 matrix can generate combinations but may not isolate each asset effect. Use split tests when causal comparison matters.
5. **Set allocation and duration**: Base them on expected event rate, variance, sales delay and affordable risk. Do not use a fixed budget or 48-hour rule for every account.
6. **Create truthful variants**: Keep claims, prices, testimonials, disclosure and visual context accurate in every combination. Secure music, image and talent rights.
7. **Design for accessibility**: Add captions, readable contrast, safe pacing and meaning that does not depend only on audio or colour.
8. **Validate tracking before launch**: Test browser and server events, deduplication, consent, attribution windows, currency and downstream CRM status.
9. **Protect the experiment**: Log launches and edits, avoid premature changes, set spend and complaint alerts, and define pause conditions.
10. **Use attention metrics diagnostically**: Define exactly how hook and hold rates are calculated. Compare like-for-like formats and placements.
11. **Evaluate qualified outcomes**: Review valid leads or sales, margin, refunds, support burden, complaints and repeat quality—not only CTR or platform ROAS.
12. **Account for uncertainty**: Check sample size, unequal delivery, novelty and multiple comparisons. Call an inconclusive test inconclusive.
13. **Preserve engagement honestly**: Reuse a post ID only when the ad remains materially the same and comments are authentic and appropriately moderated.
14. **Record the decision**: Scale, iterate, pause or retest with the evidence and limitations noted.
15. **Maintain a learning library**: Save hypotheses, assets, rights, results and expiry dates so lessons remain usable and outdated claims are retired.

The objective is a steady flow of reliable learning and suitable customers, not endless content volume or a predetermined winner quota.`,
            practicalExamples: [
              'A three-second hook raises video retention but not qualified leads; the team revises the offer-message match instead of declaring the creative a winner.',
              'A 3:2:2 unit allocates most spend to one combination, so the advertiser runs a separate split test before making a causal claim.',
            ],
          },
          understandContent: {
            coreTakeaway: 'A creative system creates documented learning; formats and attention metrics support decisions but do not guarantee winners or profitability.',
            keyPrinciples: ['Test a clear hypothesis at affordable risk', 'Compare qualified outcomes beside attention metrics', 'Treat unequal delivery and inconclusive evidence honestly'],
          },
          actionTask: {
            instruction: 'Prepare one controlled creative experiment:',
            checklistItems: ['Customer insight, hypothesis, eligible audience and exclusions documented', 'Variants, rights, claims, accessibility and landing-page consistency reviewed', 'Test design, allocation, duration, budget and stop rules approved', 'Tracking, deduplication, CRM quality and attribution tested', 'Primary outcome, harm metrics, uncertainty and decision log scheduled'],
            toolboxCategory: 'landingpage',
          },
        },
        '47.2': {
          stageTitle: '47. Advantage+ and evidence-led budget changes',
          title: 'Scale automated Meta campaigns without fixed percentage or daily-spend promises',
          description: 'Use Advantage+ features and budget adjustments only where they fit the objective, data and market, with safeguards for tracking, capacity, volatility and customer treatment.',
          learnContent: {
            videoTitle: 'Masterclass: Governed Advantage+ campaigns and budget management',
            summaryText: 'Increasing spend can change delivery, cost and lead quality; there is no universal 20% rule, safe 48-hour interval or guaranteed path from €100 to €1,000 per day. Advantage+ product names and capabilities evolve, so advertisers must verify current settings, document changes and retain a controlled way to pause.',
            bulletPoints: [
              'Choose the current Advantage+ campaign setup only after confirming objective, eligibility, controls and reporting limitations',
              'Increase, decrease or reallocate budgets according to marginal outcome quality, lag, capacity and volatility—not a fixed percentage',
              'Distinguish vertical budget changes from additional campaign tests without duplicating audiences merely to force spend',
              'Use automated rules as alerts or bounded controls with tested data, time zones, attribution and human ownership',
            ],
            coreConcepts: [
              { iconName: 'trending_up', title: 'CAPACITY-AWARE SCALING', description: 'Budget changes follow verified marginal results, fulfilment and support capacity, with small diagnosable steps and explicit rollback criteria.', highlight: true },
              { iconName: 'dollar-sign', title: 'BOUNDED AUTOMATION', description: 'Rules have accurate inputs, caps, cool-down periods, logs and an accountable owner; temporary budget changes never become hidden uncontrolled spend.' },
            ],
            resources: [
              { title: 'Meta Budget Change & Automation Playbook', subtitle: 'Evidence thresholds, caps, alerts, rollback and review log', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM Meta Measurement Controls', subtitle: 'Browser and server events, deduplication and qualified outcomes', type: 'tool', iconName: 'settings', actionUrl: 'settings' },
            ],
            fullArticleGuide: `### Scale only what remains valuable at the margin

A profitable historical average does not prove that the next euro of spend will perform equally. Meta delivery changes with budget, auction pressure, creative freshness, seasonality and available demand.

#### Responsible scaling workflow

1. **Verify the current platform options**: Meta changes campaign names, Advantage+ features and controls. Use current official documentation and account availability.
2. **Define the qualified outcome**: Include valid sales or leads, margin, refunds, fraud, service cost and conversion delay.
3. **Confirm measurement integrity**: Test Pixel and Conversions API events, consent, event matching, deduplication, value, currency and CRM reconciliation.
4. **Protect customer data**: Minimise identifiers, restrict tokens and access, document retention and use a valid basis for browser and server-side measurement.
5. **Establish a stable baseline**: Record budget, delivery, creatives, audience settings, placements, attribution and market conditions over a meaningful period.
6. **Check operational capacity**: Confirm inventory, fulfilment, sales response, support, cash flow and refund handling before increasing demand.
7. **Choose one scaling hypothesis**: Test a budget change, new creative, new market or new campaign structure separately where practical.
8. **Size changes to risk and signal**: There is no universal 20% interval. Use account volatility, conversion volume, lag and affordable downside.
9. **Avoid uncontrolled duplication**: Additional campaigns can compete, fragment learning and obscure incrementality. Create them for a documented test, not as a ritual.
10. **Govern temporary budget shifts**: Define start, end, maximum spend, time zone and rollback before responding to a peak day. Do not infer future demand from a few early sales.
11. **Use automated rules cautiously**: Validate the source metric and delay, add caps and cool-downs, log actions and alert a human. Test in a low-risk setting.
12. **Monitor marginal quality**: Compare the additional spend with additional qualified outcomes, margin, complaints and fulfilment—not only blended ROAS.
13. **Watch creative and audience effects**: Diagnose frequency, reach, placement, fatigue, negative feedback and market saturation without assuming one threshold fits all.
14. **Pause on integrity failures**: Stop increases when tracking breaks, lead quality deteriorates, claims expire, stock fails or complaints breach the approved limit.
15. **Document and review**: Record what changed, evidence, uncertainty and rollback. Reassess after the full conversion and refund window.

Scaling is successful only when additional spend continues to create suitable customer value without overwhelming operations or weakening measurement.`,
            practicalExamples: [
              'An increase preserves platform ROAS but produces more invalid leads and slower follow-up, so the business restores the prior budget.',
              'A weekend rule doubles spend after a few morning sales; a controlled test later shows no incremental margin, so the rule is retired.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Scaling is an evidence-led operational decision, not a fixed percentage ritual; marginal quality and capacity matter more than headline spend.',
            keyPrinciples: ['Verify current Advantage+ features and controls', 'Change budgets according to lag, volatility and marginal value', 'Govern server-side tracking and automated rules with privacy and rollback'],
          },
          actionTask: {
            instruction: 'Design one controlled budget-change pilot:',
            checklistItems: ['Current campaign options, baseline and qualified economics documented', 'Pixel and CAPI consent, security, deduplication, values and CRM reconciliation tested', 'Capacity, cash flow, inventory, support and refund limits confirmed', 'Change size, duration, spend cap, cool-down, alerts and rollback approved', 'Marginal outcomes, lead quality, complaints and full lag review scheduled'],
            toolboxCategory: 'crm',
          },
        },
      },
    },
    48: {
      "title": "48. Responsible SEO & Topical Authority",
      "subtitle": "Topic clusters, helpful content, trust signals and supervised AI workflows",
      "description": "Build a useful, technically sound organic-search programme based on audience needs, reliable evidence and continuous measurement—without guaranteed rankings, traffic promises or content-volume targets.",
      "lessons": {
        "48.1": {
          "stageTitle": "48. Topic architecture and internal linking",
          "title": "Build topic coverage without treating clusters as a ranking guarantee",
          "description": "Map genuine audience questions to distinct pages, connect related resources clearly and evaluate search performance without promises about position or timing.",
          "learnContent": {
            "videoTitle": "Masterclass: evidence-led topic architecture and internal linking",
            "summaryText": "Search systems use many signals and change over time. Topic clusters can improve navigation and coverage, but no page count, word count, anchor text or publishing window guarantees a ranking.",
            "bulletPoints": [
              "Start with verified audience needs, search intent and the purpose of each page",
              "Use a pillar-and-cluster model only when it improves navigation and avoids duplication",
              "Assign overlapping queries by user need rather than forcing one keyword onto exactly one URL",
              "Measure visibility, qualified visits and business outcomes while recording uncertainty and search changes"
            ],
            "coreConcepts": [
              {
                "iconName": "layers",
                "title": "USEFUL TOPIC MAP",
                "description": "A maintained map links each genuine audience need to the most appropriate page and owner.",
                "highlight": true
              },
              {
                "iconName": "link",
                "title": "DESCRIPTIVE INTERNAL LINKS",
                "description": "Relevant links help people and crawlers discover related material without manipulative anchor-text patterns."
              }
            ],
            "resources": [
              {
                "title": "Topic-map and content-inventory worksheet",
                "subtitle": "Needs, intent, page purpose, evidence, owner and review date",
                "type": "pdf",
                "iconName": "file-text",
                "actionUrl": "tools"
              },
              {
                "title": "Mara Blog & CMS Engine",
                "subtitle": "Draft, review and publish accessible articles with controlled internal links",
                "type": "tool",
                "iconName": "layout",
                "actionUrl": "landingpage"
              }
            ],
            "fullArticleGuide": "### Build a useful information architecture\n\nTopical authority is not a switch that a site activates by publishing a fixed number of articles. Search visibility depends on relevance, quality, competition, technical accessibility, reputation and changing search systems.\n\n#### A responsible workflow\n\n1. **Confirm audience needs**: Combine customer conversations, support questions, site search and search-console data. Treat third-party keyword tools as estimates.\n2. **Define page purpose**: Record the primary audience, task, intent and next step for every proposed URL.\n3. **Audit existing content**: Update, consolidate or retire weak and overlapping pages before creating more.\n4. **Design a practical hierarchy**: Use pillar and supporting pages where the relationship is genuinely helpful; do not force every subject into a rigid silo.\n5. **Prevent harmful duplication**: Pages may address related terms, but each should offer a distinct purpose and value. Diagnose overlap using actual query and landing-page data.\n6. **Write descriptive links**: Link where readers benefit, with natural anchor text and no arbitrary link quotas.\n7. **Protect technical access**: Check status codes, canonicals, indexing directives, sitemaps, mobile rendering and meaningful performance metrics.\n8. **Publish evidence-led content**: Cite suitable sources, disclose limitations and separate fact, experience and opinion.\n9. **Measure qualified outcomes**: Review query coverage, clicks, engagement, conversions and customer quality—not rank snapshots alone.\n10. **Maintain the system**: Assign owners and review dates, correct outdated claims and document major changes.\n\nNo ethical SEO plan can promise position one, a fixed time to rank or a specific volume of free traffic.",
            "practicalExamples": [
              "A site merges three near-duplicate beginner guides into one clearer resource and redirects obsolete URLs after checking demand and backlinks.",
              "A cluster attracts visits but few suitable enquiries, so the team revises intent and calls to action instead of publishing twenty more articles."
            ]
          },
          "understandContent": {
            "coreTakeaway": "Topic architecture helps when it makes information easier to find and understand; it does not guarantee rankings.",
            "keyPrinciples": [
              "Map pages to real audience tasks and maintain them",
              "Use internal links for relevance and navigation, not manipulation",
              "Judge SEO by qualified outcomes and documented uncertainty"
            ]
          },
          "actionTask": {
            "instruction": "Create a responsible topic-map pilot:",
            "checklistItems": [
              "Documented audience evidence, intent and purpose for one pillar topic",
              "Inventoried existing pages, overlap, gaps and ownership",
              "Planned useful internal links, technical checks and accessibility",
              "Defined qualified outcomes, baseline, review date and change log"
            ],
            "toolboxCategory": "content"
          }
        },
        "48.2": {
          "stageTitle": "48. Helpful content, trust and supervised AI",
          "title": "Use AI to support quality without content quotas or false E-E-A-T claims",
          "description": "Create original, accurate and accessible material with appropriate human review, transparent authorship and structured data that matches visible content.",
          "learnContent": {
            "videoTitle": "Masterclass: supervised AI content and trustworthy search publishing",
            "summaryText": "AI assistance is not automatically rewarded or penalised. What matters is whether the result helps people and complies with applicable policies. E-E-A-T is a quality concept, not a checklist or schema field that guarantees rankings.",
            "bulletPoints": [
              "Use AI for bounded tasks with named reviewers, source checks and a documented publishing standard",
              "Show real experience only when it exists; never invent authors, credentials, quotations, tests or results",
              "Add structured data only when it is supported, eligible and consistent with visible page content",
              "Set publishing capacity by review quality and maintenance needs, not a target such as fifty articles per month"
            ],
            "coreConcepts": [
              {
                "iconName": "award",
                "title": "TRUSTWORTHY EVIDENCE",
                "description": "Relevant sources, honest authorship, corrections and real experience support trust without manufacturing authority.",
                "highlight": true
              },
              {
                "iconName": "cpu",
                "title": "HUMAN-GOVERNED AI",
                "description": "AI assists defined tasks while accountable people verify facts, rights, claims, privacy and usefulness."
              }
            ],
            "resources": [
              {
                "title": "AI publishing and trust checklist",
                "subtitle": "Sources, authorship, claims, rights, privacy, accessibility and review dates",
                "type": "pdf",
                "iconName": "file-text",
                "actionUrl": "tools"
              },
              {
                "title": "GOM-MAR AI SEO Writer",
                "subtitle": "Create controlled drafts for human verification and editorial approval",
                "type": "tool",
                "iconName": "cpu",
                "actionUrl": "tools"
              }
            ],
            "fullArticleGuide": "### Publish useful content with accountable review\n\nSearch guidelines evolve, and no authorship box, schema type, word count or speed score guarantees visibility. Treat E-E-A-T as a way to assess whether content demonstrates appropriate experience, expertise, authority and trust—not as a mechanical scoring formula.\n\n#### A supervised publishing workflow\n\n1. **Define the user task**: State who the page helps, what decision or action it supports and what evidence is required.\n2. **Assess risk**: Apply stronger expert review to health, financial, legal, safety and other consequential topics.\n3. **Choose bounded AI tasks**: AI may help organise notes, suggest questions or draft sections. Do not let it fabricate facts or publish autonomously.\n4. **Protect confidential data**: Do not enter personal, client or licensed material into tools without appropriate authority and safeguards.\n5. **Verify every material claim**: Use current primary or authoritative sources where suitable, follow citations and record access dates.\n6. **Add genuine contribution**: Include original analysis, tested examples or first-hand experience only when it is real and relevant.\n7. **Disclose authorship honestly**: Name accountable authors and reviewers where useful; never invent qualifications or testimonials.\n8. **Check rights and originality**: Confirm licences for text, images and data, avoid close paraphrase and attribute appropriately.\n9. **Ensure accessibility and usability**: Use clear headings, descriptive links, alt text, readable layouts and realistic performance improvements.\n10. **Use structured data carefully**: Mark up only visible, accurate and eligible content. Rich results remain at the search engine's discretion.\n11. **Run editorial approval**: Check accuracy, tone, harmful bias, claims, privacy, links and calls to action before publishing.\n12. **Monitor and correct**: Review feedback, search changes and business outcomes; publish corrections and retire unsafe or outdated pages.\n\nScale only to the volume your team can verify and maintain. Quality, safety and usefulness take priority over output.",
            "practicalExamples": [
              "An AI draft cites a non-existent study; the reviewer removes the claim, checks primary sources and records the correction.",
              "FAQ markup accurately reflects visible questions, but no rich result appears; the team keeps the useful page and avoids claiming that schema guarantees extra search space."
            ]
          },
          "understandContent": {
            "coreTakeaway": "AI can accelerate parts of production, but accountable people remain responsible for accuracy, rights, safety and usefulness.",
            "keyPrinciples": [
              "E-E-A-T is not a guaranteed ranking checklist",
              "Never invent experience, credentials, sources or results",
              "Structured data must match visible content and cannot promise rich results"
            ]
          },
          "actionTask": {
            "instruction": "Prepare one supervised content item:",
            "checklistItems": [
              "Documented audience task, risk level, sources and accountable reviewer",
              "Checked claims, citations, authorship, originality, rights and privacy",
              "Verified accessibility, links, technical delivery and truthful structured data",
              "Set approval status, success measures, correction route and review date"
            ],
            "toolboxCategory": "content"
          }
        }
      }
    },
    49: {
      "title": "49. Ethical VSL strategy and production",
      "subtitle": "Clear scripts, substantiated claims, accessible video and measured improvement",
      "description": "Create video sales letters that explain a relevant problem, evidence and offer clearly—without psychological manipulation, fabricated urgency, hidden controls or conversion guarantees.",
      "lessons": {
        "49.1": {
          "stageTitle": "49. Transparent VSL scripting",
          "title": "Structure a persuasive VSL without shock tactics or a fixed formula",
          "description": "Build a clear narrative around audience context, a truthful mechanism, suitable evidence, limitations and a voluntary call to action.",
          "learnContent": {
            "videoTitle": "Masterclass: evidence-led VSL script architecture",
            "summaryText": "A useful VSL earns attention through relevance and clarity. No duration, twelve-step sequence or 'new mechanism' guarantees sales, and the offer should never be framed as the only logical choice.",
            "bulletPoints": [
              "Open with the audience's real situation and a specific, supportable promise about what the video covers",
              "Explain the proposed mechanism in plain language and distinguish evidence, hypothesis and opinion",
              "Use genuine case studies with permission, typicality context and relevant limitations",
              "Present price, material terms, refund conditions and availability clearly before a voluntary call to action"
            ],
            "coreConcepts": [
              {
                "iconName": "video",
                "title": "TRUTHFUL MECHANISM",
                "description": "Explain how and for whom the offer may work, the evidence available and where uncertainty remains.",
                "highlight": true
              },
              {
                "iconName": "zap",
                "title": "RELEVANT OPENING",
                "description": "Create attention through a recognisable problem and useful preview, not fear, shock or invented enemies."
              }
            ],
            "resources": [
              {
                "title": "Evidence-led VSL script workbook",
                "subtitle": "Audience, claims, proof, objections, disclosures and call-to-action review",
                "type": "pdf",
                "iconName": "file-text",
                "actionUrl": "tools"
              },
              {
                "title": "GOM-MAR AI VSL Writer",
                "subtitle": "Draft scripts for factual, legal and editorial human review",
                "type": "tool",
                "iconName": "cpu",
                "actionUrl": "tools"
              }
            ],
            "fullArticleGuide": "### Structure a VSL that respects the viewer\n\nA VSL can explain an offer effectively, but it cannot remove every objection or guarantee a conversion rate. Its job is to help an appropriate viewer make an informed decision.\n\n#### A responsible script workflow\n\n1. **Define audience and purpose**: State who the video is for, what it explains and who may not benefit.\n2. **Research real language**: Use interviews, support questions and approved feedback without inferring sensitive traits.\n3. **Write a relevant opening**: Preview the useful outcome honestly; avoid fear, shame, shock and false curiosity gaps.\n4. **Describe the current problem accurately**: Do not exaggerate consequences or invent a common enemy.\n5. **Explain the mechanism**: Separate established evidence, provider data, personal experience and hypothesis.\n6. **Tell a truthful story**: Compress only for clarity and never manufacture hardship, discovery or success.\n7. **Support material claims**: Keep evidence files, dates, scope and approvals. Use stronger review for health and financial claims.\n8. **Use testimonials carefully**: Obtain permission, avoid editing that changes meaning and disclose atypical outcomes where required.\n9. **Address objections fairly**: Include cost, effort, prerequisites, alternatives, limitations and cancellation or refund terms.\n10. **Present the offer clearly**: Show deliverables, total price, recurring charges, deadlines and eligibility in readable form.\n11. **Use genuine urgency only**: State a deadline or capacity limit only when real, documented and consistently enforced.\n12. **Offer a voluntary next step**: Keep purchase and exit controls visible; do not obstruct access to material terms.\n13. **Review accessibility**: Add captions, transcript, clear language, readable contrast and non-audio cues.\n14. **Approve before launch**: Have accountable owners check claims, rights, privacy, platform rules and local law.\n15. **Test responsibly**: Measure comprehension, qualified conversions, refunds and complaints—not persuasion metrics alone.\n\nTreat any framework as a drafting aid, not a mathematical sales formula.",
            "practicalExamples": [
              "A strong opening says what the viewer will learn and names the evidence used instead of claiming that everything they know is wrong.",
              "A customer story includes permission and context about effort and variation rather than presenting an exceptional result as typical."
            ]
          },
          "understandContent": {
            "coreTakeaway": "A trustworthy VSL makes the offer and its evidence easier to understand; it does not manipulate belief or guarantee a sale.",
            "keyPrinciples": [
              "Use relevance and clarity instead of shock or fear",
              "Substantiate material claims and explain limitations",
              "Keep terms and the call to action visible and voluntary"
            ]
          },
          "actionTask": {
            "instruction": "Draft one responsible VSL script:",
            "checklistItems": [
              "Documented audience, purpose, exclusions and evidence",
              "Reviewed mechanism, claims, stories, testimonials and permissions",
              "Included price, terms, limitations, alternatives and genuine deadlines",
              "Checked captions, transcript, readability, rights and approval"
            ],
            "toolboxCategory": "content"
          }
        },
        "49.2": {
          "stageTitle": "49. Accessible VSL production and delivery",
          "title": "Deliver video reliably without deceptive player behaviour",
          "description": "Produce an accessible video, choose hosting based on measured needs and implement playback, analytics and calls to action with consent and transparent controls.",
          "learnContent": {
            "videoTitle": "Masterclass: accessible VSL production, hosting and measurement",
            "summaryText": "Performance matters, but no provider, autoplay treatment or sub-200-ms claim guarantees zero abandonment. Test real devices and networks, respect browser rules and user choice, and collect only necessary analytics.",
            "bulletPoints": [
              "Design mobile-first slides with readable type, sufficient contrast, captions and a transcript",
              "Use voice, pauses and music to support comprehension without overwhelming or covertly steering viewers",
              "Avoid surprise autoplay with sound; provide obvious play, pause, volume, speed and caption controls",
              "Use resume playback only with appropriate notice, consent and retention controls"
            ],
            "coreConcepts": [
              {
                "iconName": "play",
                "title": "USER-CONTROLLED PLAYBACK",
                "description": "Playback starts and continues in ways viewers can understand and control.",
                "highlight": true
              },
              {
                "iconName": "zap",
                "title": "MEASURED DELIVERY",
                "description": "Hosting choices follow real start time, buffering, reliability, accessibility, privacy and cost data."
              }
            ],
            "resources": [
              {
                "title": "Accessible VSL production checklist",
                "subtitle": "Script, captions, contrast, audio, rights, devices and quality assurance",
                "type": "pdf",
                "iconName": "file-text",
                "actionUrl": "tools"
              },
              {
                "title": "Mara Landing Page VSL Player",
                "subtitle": "Configure transparent calls to action and privacy-aware video analytics",
                "type": "tool",
                "iconName": "layout",
                "actionUrl": "landingpage"
              }
            ],
            "fullArticleGuide": "### Optimise delivery without taking control from viewers\n\nA VSL must remain understandable and usable across devices and network conditions. Technology should support the decision, not hide information or manufacture attention.\n\n#### Production and delivery controls\n\n1. **Create an accessible master**: Record clean speech, provide accurate captions and transcript, describe essential visuals and avoid flashing content.\n2. **Design for small screens**: Use large type, strong contrast, safe margins and a pace that allows reading.\n3. **Confirm media rights**: Document licences for music, footage, fonts, voices and testimonials.\n4. **Choose hosting by requirements**: Compare reliability, adaptive streaming, privacy, accessibility, analytics, geography, support and cost. No platform is universally correct.\n5. **Encode adaptively**: Offer appropriate resolutions and test poster image, first frame, captions and fallback content.\n6. **Respect playback choice**: Do not autoplay sound. Provide visible controls and never disguise an advertisement as a system prompt.\n7. **Keep key terms accessible**: Do not force viewers to reach a timestamp before they can see price, conditions, privacy or a legitimate way to buy.\n8. **Use resume carefully**: Explain stored progress, minimise retention and provide deletion or opt-out where required.\n9. **Minimise analytics**: Collect only useful events with the appropriate notice, consent and access controls; never record sensitive fields in event labels.\n10. **Test representative conditions**: Check common phones, browsers, assistive technology and slow networks. Measure start time, buffering and completion distributions.\n11. **Prepare failure states**: Provide transcript, retry and support paths when playback or tracking fails.\n12. **Evaluate quality**: Review qualified sales, comprehension, refunds, support demand and complaints alongside viewing data.\n\nDo not promise a universal start rate, latency or bounce rate. Report the environment, sample and measurement method.",
            "practicalExamples": [
              "A muted preview is tested against a static poster; the team keeps the option that improves qualified outcomes without confusing users.",
              "A delayed call-to-action increases watch time but hides the price, so the team restores visible offer details and tests clearer messaging."
            ]
          },
          "understandContent": {
            "coreTakeaway": "Reliable VSL delivery combines accessibility, user control, measured performance and privacy-aware analytics.",
            "keyPrinciples": [
              "Clear audio and accurate captions matter more than unnecessary resolution",
              "Test mobile readability and representative networks",
              "Never hide material terms or manipulate playback controls"
            ]
          },
          "actionTask": {
            "instruction": "Produce and validate one VSL:",
            "checklistItems": [
              "Approved audio, captions, transcript, visuals and media rights",
              "Tested player controls, mobile readability, representative devices and networks",
              "Published visible offer terms, call to action and playback fallback",
              "Reviewed analytics consent, data minimisation, retention and quality outcomes"
            ],
            "toolboxCategory": "landingpage"
          }
        }
      }
    },
    50: {
      "title": "50. Responsible holding and corporate-structure planning",
      "subtitle": "Suitability, tax modelling, governance, liability and transaction readiness",
      "description": "Learn how to evaluate a multi-company structure with qualified legal and tax advisers—without universal tax rates, billionaire promises or claims of complete asset protection.",
      "lessons": {
        "50.1": {
          "stageTitle": "50. Holding suitability and governance",
          "title": "Evaluate a parent–subsidiary structure using current law and individual facts",
          "description": "Understand possible participation relief, trade-tax interactions, distributions, exits, compliance costs and liability limits before deciding whether a holding is suitable.",
          "learnContent": {
            "videoTitle": "Masterclass: evidence-led holding assessment for digital businesses",
            "summaryText": "A holding can support reinvestment, governance or a future transaction, but it is not mandatory for every successful business. A quoted effective rate such as 1.5% applies only to particular assumptions and can change with participation, income type, trade tax, costs, jurisdiction and later private distributions.",
            "bulletPoints": [
              "Map the owners, entities, activities, jurisdictions, cash flows and business purpose before choosing a structure",
              "Model dividends and share disposals separately under current corporation- and trade-tax rules, including thresholds and exceptions",
              "Compare tax timing with formation, accounting, banking, legal, audit and administration costs",
              "Document governance, capital maintenance, related-party contracts, solvency, guarantees and residual liability"
            ],
            "coreConcepts": [
              {
                "iconName": "shield",
                "title": "LIMITED—NOT ABSOLUTE—SEPARATION",
                "description": "Separate entities may ring-fence some risk, but guarantees, misconduct, undercapitalisation, avoidance rules and insolvency claims can cross the boundary.",
                "highlight": true
              },
              {
                "iconName": "dollar-sign",
                "title": "SCENARIO-BASED TAX MODEL",
                "description": "Show assumptions, tax layers, timing, exceptions and private extraction instead of advertising one universal rate."
              }
            ],
            "resources": [
              {
                "title": "Holding suitability and adviser brief",
                "subtitle": "Facts, objectives, scenarios, costs, risks and open legal questions",
                "type": "pdf",
                "iconName": "file-text",
                "actionUrl": "tools"
              },
              {
                "title": "Mara CRM multi-company billing",
                "subtitle": "Keep approved entities, invoices and access roles operationally separate",
                "type": "tool",
                "iconName": "settings",
                "actionUrl": "settings"
              }
            ],
            "fullArticleGuide": "### Assess the structure before implementing it\n\nThis lesson is educational and is not legal or tax advice. Entity, tax and insolvency rules depend on jurisdiction and current facts. Obtain written advice from qualified professionals before formation, transfer, distribution or sale.\n\n#### A responsible assessment\n\n1. **Define the business purpose**: Record whether the goal is governance, reinvestment, investor readiness, succession or a potential exit—not tax reduction alone.\n2. **Map all relevant jurisdictions**: Residence, management location, permanent establishments, owners and assets can change the analysis.\n3. **Model the status quo**: Calculate current taxes, cash available, risks and compliance cost before comparing alternatives.\n4. **Separate income types**: Operating profit, dividends, capital gains, interest, rent and licence income can receive different treatment.\n5. **Verify participation rules**: Check current thresholds, holding dates, exclusions, trade-tax treatment and anti-abuse provisions. Do not multiply a five-percent add-back by one headline rate and call it universal.\n6. **Include private extraction**: Funds retained by a company are not the same as funds available privately; model later salary, dividend or liquidation taxation.\n7. **Quantify recurring cost**: Include formation, notary, accounts, returns, banking, payroll, contracts, valuations and professional review.\n8. **Design governance**: Document directors, approvals, conflicts, capital maintenance, related-party dealings and record retention.\n9. **Test liability boundaries**: Review guarantees, torts, director duties, tax liability, group financing and insolvency avoidance. No asset pool is untouchable.\n10. **Review financing and distributions**: Confirm solvency, distributable reserves, withholding, documentation and creditor protection before moving cash.\n11. **Plan transactions early—but proportionately**: A pre-existing structure may help some exits, while late transfers can create tax, valuation or consent issues. It is not an automatic deadline for every founder.\n12. **Obtain independent sign-off**: A tax adviser and corporate lawyer should confirm assumptions, documents, registrations and implementation sequence.\n13. **Reassess annually and before major events**: Ownership, law, profits and plans change.\n\nThe correct result may be no holding, a later holding or another structure entirely.",
            "practicalExamples": [
              "A profitable company models the tax timing benefit against two sets of annual accounts and decides to wait until retained earnings and an exit plan justify the cost.",
              "A parent has received dividends, but a bank guarantee and an avoidable transfer create exposure; the structure did not make the assets immune."
            ]
          },
          "understandContent": {
            "coreTakeaway": "A holding is a fact-specific governance and investment choice, not a universal tax or asset-protection product.",
            "keyPrinciples": [
              "Use current law and written assumptions",
              "Model the full lifecycle, including private extraction and costs",
              "Treat liability separation as limited and maintain real governance"
            ]
          },
          "actionTask": {
            "instruction": "Prepare a professional holding-suitability review:",
            "checklistItems": [
              "Mapped owners, jurisdictions, entities, activities, risks and objectives",
              "Modelled income types, participation conditions, trade tax, extraction and costs",
              "Reviewed governance, guarantees, solvency, creditor protection and exit scenarios",
              "Obtained written tax and legal advice before implementation"
            ],
            "toolboxCategory": "settings"
          }
        },
        "50.2": {
          "stageTitle": "50. IP ownership, licensing and asset governance",
          "title": "Structure IP ownership and licences without artificial profit shifting",
          "description": "Identify, value, transfer and license intellectual property only where ownership, business substance, rights, pricing and creditor considerations support the arrangement.",
          "learnContent": {
            "videoTitle": "Masterclass: responsible IP governance and related-party licensing",
            "summaryText": "A separate IP company may support central governance or licensing, but a transfer does not make assets unreachable and a royalty is not automatically deductible. Ownership, development functions, valuation, tax, insolvency, competition, privacy and contractual rights must be reviewed.",
            "bulletPoints": [
              "Create an IP inventory covering registrations, code, content, domains, data, licences, contributors and territorial rights",
              "Confirm chain of title and third-party consents before assigning or licensing anything",
              "Price related-party licences using documented functions, assets, risks and comparable evidence—not a desired tax result",
              "Assess transfer taxes, hidden reserves, withholding, VAT, trade tax, anti-abuse, insolvency and cross-border rules"
            ],
            "coreConcepts": [
              {
                "iconName": "lock",
                "title": "GOVERNED IP PORTFOLIO",
                "description": "Rights, owners, licences, renewal dates, access and evidence are documented; separation is not described as absolute protection.",
                "highlight": true
              },
              {
                "iconName": "award",
                "title": "SUBSTANCE AND SUCCESSION",
                "description": "Foundations or family structures require a genuine purpose, governance, beneficiary, tax and control analysis; transfers are not automatically tax-free."
              }
            ],
            "resources": [
              {
                "title": "IP inventory and related-party licence brief",
                "subtitle": "Ownership, valuation, functions, rights, pricing, tax and approval evidence",
                "type": "pdf",
                "iconName": "file-text",
                "actionUrl": "tools"
              },
              {
                "title": "GOM-MAR Corporate Asset Manager",
                "subtitle": "Archive approved rights, contracts, evidence and renewal responsibilities",
                "type": "tool",
                "iconName": "shield",
                "actionUrl": "settings"
              }
            ],
            "fullArticleGuide": "### Govern intellectual property before moving it\n\nThis lesson is educational and not legal, tax or valuation advice. Trademark registration does not cover every right, and changing the registered proprietor is only one part of a valid transfer.\n\n#### A controlled IP process\n\n1. **Inventory the assets**: List trademarks, applications, copyrights, software, databases, designs, patents, domains, trade secrets and inbound licences.\n2. **Verify chain of title**: Check employee, contractor, agency, open-source, stock-media and platform terms. Do not transfer rights the company does not own.\n3. **Define the business reason**: Central licensing, investment, sale readiness or brand governance must be more than a device to move taxable profit.\n4. **Choose the owner by function and control**: Consider who develops, enhances, maintains, protects and exploits the IP and who controls related risks.\n5. **Obtain a defensible valuation**: Document methods, forecasts, useful life, territory, comparables and uncertainty with specialist input where material.\n6. **Model transfer consequences**: A transfer may realise taxable value and trigger VAT, withholding, registration, financing or consent issues.\n7. **Draft the licence precisely**: Define rights, territory, exclusivity, term, quality control, improvements, data, sublicensing, termination and insolvency treatment.\n8. **Support arm's-length pricing**: Analyse functions, assets and risks; update evidence as the business changes. Domestic and cross-border rules may differ.\n9. **Maintain substance**: The legal owner must actually perform or control relevant functions and decisions; funding alone may not justify all returns.\n10. **Respect creditor and insolvency rules**: Transfers can be challenged, and security interests, guarantees or group conduct can affect separation.\n11. **Record registry changes correctly**: Follow the relevant office's evidence and signature requirements and keep the underlying assignment.\n12. **Protect data and secrets**: Control access, security, retention and lawful use separately from IP ownership.\n13. **Evaluate foundations independently**: Review control, beneficiaries, reserved powers, gift and inheritance tax, reporting and permanence. Never promise a tax-free generational transfer.\n14. **Approve and monitor**: Obtain board, tax, legal and valuation approvals; track renewals, royalties, breaches and annual pricing reviews.\n\nSometimes direct ownership by the operating company is simpler and safer.",
            "practicalExamples": [
              "A company discovers that contractor code was never assigned; it cures title before discussing an IP-company transfer.",
              "A royalty benchmark no longer fits after development moves to the operating company, so the parties update functions, pricing and contracts."
            ]
          },
          "understandContent": {
            "coreTakeaway": "IP separation works only with real ownership, substance, defensible pricing, contracts and ongoing governance; it is not an invulnerable vault.",
            "keyPrinciples": [
              "Verify title and consents before transfer",
              "Support related-party pricing with current evidence",
              "Review tax, insolvency, data and registry consequences together"
            ]
          },
          "actionTask": {
            "instruction": "Prepare one IP-governance review:",
            "checklistItems": [
              "Completed inventory, chain-of-title and third-party-consent review",
              "Documented business purpose, functions, control, valuation and tax scenarios",
              "Drafted rights, pricing, quality, data, termination and insolvency terms",
              "Obtained legal, tax and valuation approval before transfer or registration"
            ],
            "toolboxCategory": "settings"
          }
        }
      }
    },
    51: {
      title: '51. Responsible B2B account-based marketing',
      subtitle: 'Account fit, privacy and compliant outreach',
      description: 'Focus enterprise marketing on verified fit and useful content—without guarantees, covert profiling or process bypasses.',
      lessons: {
        '51.1': {
          stageTitle: '51. ABM strategy and account selection',
          title: 'Prioritise accounts without invasive profiling',
          description: 'Use permitted evidence and confirmed business needs without assuming private fears or purchase intent.',
          learnContent: {
            videoTitle: 'Masterclass: evidence-led ABM',
            summaryText: 'Account count, deal value, sales-cycle length and intent signals are assumptions, not guarantees.',
            bulletPoints: ['Score fit transparently with human review', 'Map verified roles without stereotypes', 'Audit intent-data sources and lawful basis', 'Create content from confirmed business needs'],
            coreConcepts: [{ iconName: 'target', title: 'DECISION MAP', description: 'Record evidence, confidence, permissions and open questions.', highlight: true }, { iconName: 'activity', title: 'VALIDATED SIGNALS', description: 'Estimates are not certain individual intent.' }],
            resources: [{ title: 'ABM account workbook', subtitle: 'Fit, evidence, privacy and reviews', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' }, { title: 'Mara CRM account management', subtitle: 'Contacts with source and objection records', type: 'tool', iconName: 'users', actionUrl: 'crm' }],
            fullArticleGuide: `### Responsible ABM

1. Define the offer, capacity and an evidence-led ICP.
2. Record scoring sources, confidence, exclusions and human review.
3. Separate verified facts, estimates and hypotheses.
4. Map public roles without unnecessary scraping or private-fear inference.
5. Document purpose, lawful basis, minimisation, source, retention, security and required GDPR Article 14 information.
6. Audit intent suppliers and treat signals as probabilistic.
7. Apply local rules to email, telephone, social and post.
8. Explain objection rights and stop direct marketing when required.
9. Respect assistants, procurement, security and works councils.
10. Measure quality, objections and complaints; delete unsupported profiles.

ABM cannot guarantee a contract.`,
            practicalExamples: ['Validate a low-confidence intent signal before lawful contact.', 'Use the organisation’s accepted buying process.'],
          },
          understandContent: { coreTakeaway: 'Responsible ABM respects personal data, objections and buying processes.', keyPrinciples: ['Separate facts from intent estimates', 'Minimise personal data', 'Avoid stereotypes and surveillance'] },
          actionTask: { instruction: 'Prepare a compliant ABM pilot:', checklistItems: ['Defined ICP and transparent scoring', 'Recorded sources and confidence', 'Documented lawful basis, notice, retention and objections', 'Planned permitted channels, metrics and reviews'], toolboxCategory: 'crm' },
        },
        '51.2': {
          stageTitle: '51. Compliant direct mail and executive outreach',
          title: 'Use physical outreach without gifts or bypass tactics',
          description: 'Test proportionate business mail with transparent identity, gift controls and lawful follow-up.',
          learnContent: {
            videoTitle: 'Masterclass: compliant physical outreach',
            summaryText: 'No package is guaranteed to reach an executive; expensive items may breach policy, procurement or anti-bribery law.',
            bulletPoints: ['Check gift, procurement and anti-bribery rules', 'Identify the sender and commercial purpose', 'Limit tracking and retention', 'Follow up lawfully and respect assistants'],
            coreConcepts: [{ iconName: 'mail', title: 'PROPORTIONATE MAIL', description: 'Useful information follows an accepted route.', highlight: true }, { iconName: 'video', title: 'COMPLIANT FORMAT', description: 'Accessible, secure, modest and permitted.' }],
            resources: [{ title: 'Direct-mail compliance workbook', subtitle: 'Purpose, value, privacy and metrics', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' }, { title: 'Mara CRM delivery follow-up', subtitle: 'Human-reviewed reminders without automatic pressure', type: 'tool', iconName: 'send', actionUrl: 'crm' }],
            fullArticleGuide: `### Respectful direct mail

1. Use an informational purpose, not buying influence.
2. Check employer, sector, gift, procurement and anti-bribery rules.
3. Prefer useful information or a requested sample over electronics or luxury items.
4. Use business addresses and minimise personal data.
5. Identify the sender and purpose; never disguise advertising.
6. Avoid unsafe or inaccessible formats.
7. Control vendors and retention; delivery does not prove opening.
8. Confirm applicable B2B telephone-consent rules before follow-up.
9. Respect assistants, objections and procurement.
10. Measure replies, cost, returns and complaints without open- or appointment-rate guarantees.

A costly package does not create a large customer.`,
            practicalExamples: ['When gifts are prohibited, send a clear analysis through the vendor process.', 'Ask assistants for the correct route instead of claiming executive delivery.'],
          },
          understandContent: { coreTakeaway: 'Physical outreach works only when proportionate, transparent, lawful and respectful.', keyPrinciples: ['Never exchange gifts for access', 'Tracking does not prove executive attention', 'Respect objections and procurement'] },
          actionTask: { instruction: 'Design a compliant direct-mail pilot:', checklistItems: ['Checked gift and anti-bribery rules', 'Approved format, value and accessibility', 'Documented data, vendors and retention', 'Planned lawful follow-up, metrics and stop rules'], toolboxCategory: 'crm' },
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
Warning: truncated output (original token count: 131826)
Total output lines: 4775

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
    21: {
      title: '21. CRM, zarządzanie pipeline i odpowiedzialna priorytetyzacja kontaktów',
      subtitle: 'Użyteczny kontekst bez nieprzejrzystego śledzenia',
      description: 'Porządkuj kontakty i szanse z proporcjonalnymi danymi, wyjaśnialną priorytetyzacją, jasną odpowiedzialnością za pipeline i kontrolą człowieka.',
      lessons: {
        '21.1': {
          stageTitle: '21. CRM, zarządzanie pipeline i odpowiedzialna priorytetyzacja kontaktów', title: 'Wyjaśnialny lead scoring i kwalifikacja',
          description: 'Używaj wyniku jako ograniczonego sygnału kolejności, a nie dowodu zamiaru zakupu lub pozwolenia na kontakt.',
          learnContent: {
            videoTitle: 'Lead scoring: testowalna pomoc, nie wykrywacz „gorących leadów”',
            summaryText: 'Wynik 85/100 odzwierciedla wybrane reguły lub model. Nie ujawnia gotowości do zakupu, a arbitralne punkty i założenie 80/20 trzeba sprawdzić na własnych wynikach.',
            bulletPoints: ['Określ cel, uprawnioną grupę, legalne dane, znaczenie cech i właściciela wyniku', 'Nie traktuj otwarć, wizyt i braku aktywności jako pewnej intencji; często zawierają szum techniczny i kontekstowy', 'Waliduj prognozę na rzeczywistych wynikach i wymagaj kontroli człowieka przed istotnym follow-upem'],
            fullArticleGuide: `### Buduj priorytetyzację, którą można wyjaśnić

Lead scoring szereguje rekordy według założeń. Założenia mogą być błędne, zestarzeć się lub gorzej traktować grupy o innym zachowaniu.

#### Odpowiedzialny workflow scoringu

1. **Określ decyzję**: Wskaż, czy wynik porządkuje kolejkę, sugeruje prośbę o informację czy wspiera inne ograniczone działanie.
2. **Wybierz legalne sygnały**: Używaj potrzebnych, opisanych danych zgodnych z informacjami, zgodą i preferencjami kontaktu. Unikaj cech wrażliwych i nieuzasadnionych proxy.
3. **Twórz przejrzyste reguły**: Zapisz znaczenie sygnału, wagę, wygaszanie i wyłączenia. Wizyta na stronie ceny czy otwarcie e-maila nie jest automatycznie intencją zakupu.
4. **Waliduj**: Porównuj przedziały z właściwymi wynikami, kalibracją i błędami w czasie i grupach. Sprawdź, czy wynik poprawia rezultat względem prostego baseline.
5. **Kontroluj działanie**: Przed kontaktem wyszkolona osoba sprawdza kontekst, częstotliwość, zgodę i dopasowanie. Zapewnij korektę, wykluczenie i obsługę sprzeciwu.
6. **Monitoruj i wycofuj**: Sprawdzaj dryf, skargi i szkodliwe fałszywe alarmy; zmień lub zatrzymaj wynik, gdy dowody go nie wspierają.

Nie oznaczaj osoby jako „gorącej” jak faktu. Stosuj neutralne kategorie operacyjne, np. „do następnego przeglądu”, z widocznym powodem i datą walidacji.`,
            practicalExamples: ['Sprawdź jeden wynik CRM, jego sygnały i stan zgody oraz zapisz, czy człowiek potwierdził kolejny kontakt.'],
          },
          understandContent: { coreTakeaway: 'Lead score jest użyteczny wyłącznie jako wyjaśnialna, zwalidowana i kontrolowana pomoc w priorytetyzacji.', keyPrinciples: ['Nie utożsamiaj aktywności z pewną intencją zakupu', 'Waliduj scoring i zachowaj kontrolę człowieka nad kontaktem'] },
          actionTask: { instruction: 'Sprawdź powody wyniku, zgodę i stan walidacji wybranych kontaktów CRM:', placeholder: 'Kontrole priorytetyzacji sprawdzone' },
        },
        '21.2': {
          stageTitle: '21. CRM, zarządzanie pipeline i odpowiedzialna priorytetyzacja kontaktów', title: 'Proporcjonalna historia interakcji i notatki CRM',
          description: 'Zapisuj wyłącznie potrzebny kontekst klienta z jasnym pochodzeniem, kontrolą dostępu, retencją i procedurą korekty.',
          learnContent: {
            videoTitle: 'Użyteczna historia CRM bez zbierania wszystkiego',
            summaryText: 'Pełna oś śledzenia nie jest konieczna ani automatycznie legalna. Rekordy CRM powinny służyć określonej relacji lub procesowi i pozostawać dokładne, pełne szacunku oraz ograniczone.',
            bulletPoints: ['Zapisuj istotne komunikacje, zobowiązania i kolejne kroki zamiast każdej możliwej aktywności', 'Oddzielaj fakty, wypowiedzi klienta, zapisy zgody i oceny wewnętrzne wraz z autorem i datą', 'Ogranicz dostęp, określ retencję i pozwól uprawnionym osobom poprawiać lub usuwać niewłaściwe notatki'],
            fullArticleGuide: `### Twórz kontekst CRM wspierający relację

Wizyty, aktywność e-mail, rozmowy i notatki mogą ujawniać informacje osobiste. Więcej danych nie oznacza automatycznie lepszej obsługi i zwiększa ryzyko prywatności, bezpieczeństwa i dyskryminacji.

#### Standard notatek CRM

1. **Cel i konieczność**: Zapisuj informacje potrzebne do realizacji usługi, obsługi prośby lub legalnego procesu sprzedaży.
2. **Źródło i dokładność**: Oznacz dane podane przez klienta, zaobserwowane przez system i ocenę pracownika. Dodaj autora, czas i niepewność.
3. **Język z szacunkiem**: Używaj neutralnych faktów i uzgodnionych kroków; unikaj obelg, spekulacji, zdrowia, trudności finansowych i niezwiązanych obserwacji.
4. **Dane wrażliwe**: Nie pytaj i nie przechowuj budżetu, zdrowia, rodziny ani tożsamości, jeśli nie są konieczne, legalne, zabezpieczone i przejrzyście obsługiwane.
5. **Dostęp i retencja**: Stosuj role, audytuj ważne zmiany i usuwaj rekordy po upływie uzasadnionego okresu.
6. **Przed kontaktem**: Sprawdź kanał, pozwolenie, wykluczenie, ostatnią interakcję i obiecany krok, a nie tylko najnowsze zdarzenia śledzenia.

Zabezpiecz szybkie akcje przed przypadkową wysyłką i złym odbiorcą przez podgląd, potwierdzenie oraz kontrolę uprawnień.`,
            practicalExamples: ['Dodaj rzeczową notatkę z uzgodnionym działaniem i datą, a potem potwierdź, kto ma dostęp i kiedy należy ją sprawdzić lub usunąć.'],
          },
          understandContent: { coreTakeaway: 'Dobre notatki CRM są potrzebne, rzeczowe, przypisane do autora, chronione i przechowywane tylko tak długo, jak uzasadnione.', keyPrinciples: ['Zapisuj użyteczny kontekst, nie pełne śledzenie', 'Świadomie chroń, przeglądaj i usuwaj dane CRM'] },
          actionTask: { instruction: 'Utwórz i sprawdź proporcjonalną notatkę follow-up w CRM:', placeholder: 'Notatka CRM sprawdzona' },
        },
        '21.3': {
          stageTitle: '21. CRM, zarządzanie pipeline i odpowiedzialna priorytetyzacja kontaktów', title: 'Segmentacja, tagi i odpowiedzialne pipeline',
          description: 'Używaj zdefiniowanych tagów i etapów do koordynacji pracy bez zamieniania założeń w fakty o kliencie lub uruchamiania niewłaściwej automatyzacji.',
          learnContent: {
            videoTitle: 'Segmenty i etapy pipeline z jasną odpowiedzialnością',
            summaryText: 'Pipeline poprawia koordynację, gdy etapy mają obiektywne kryteria wejścia i wyjścia, właściciela oraz kolejny krok. Nie gwarantuje konwersji ani zapamiętania każdej szansy.',
            bulletPoints: ['Utrzymuj mały słownik tagów z celem, właścicielem, źródłem i regułami wygasania', 'Definiuj etapy według obserwowalnych zdarzeń procesu, a nie arbitralnych progów wyniku', 'Umieść kontrolę zgody i akceptacji przed automatycznymi wiadomościami oraz istotnymi działaniami etapu'],
            fullArticleGuide: `### Zbuduj pipeline odzwierciedlający prawdziwą pracę

Etapy powinny opisywać stan procesu, a nie psychologiczne twierdzenia o osobie.

#### Przykładowy projekt etapów

1. **Zapytanie otrzymane**: Do systemu wpłynął dozwolony kontakt lub prośba; zapisano źródło i preferencję komunikacji.
2. **Przegląd dopasowania**: Właściciel sprawdza podane potrzeby, zakres usługi, możliwości i brakujące informacje. Wynik może ustalać kolejność, ale nie decyduje sam.
3. **Rozmowa lub oferta**: Klient świadomie wszedł w proces; zapisano wersję propozycji, warunki i kolejny termin.
4. **Decyzja**: Oznacz wygrane, przegrane, wstrzymane lub wycofane z neutralnym powodem. Nie wysyłaj sprzedaży po sprzeciwie lub wycofaniu.
5. **Onboarding lub zamknięcie**: Uruchom tylko zatwierdzone działania realizacji albo właściwy workflow retencji i usunięcia.

Zapobiegaj niekontrolowanym tagom, sprzecznym etapom i duplikatom automatyzacji. Audytuj zmiany masowe, zapewnij rollback i przeglądaj nieaktywne szanse zamiast ukrywać je bezterminowo.`,
            practicalExamples: ['Utwórz jeden segment zgodny ze zgodą oraz pipeline z czterema lub pięcioma etapami i opisanymi regułami wejścia, wyjścia, właściciela i kolejnego działania.'],
          },
          understandContent: { coreTakeaway: 'Jasne definicje, odpowiedzialność i kontrola komunikacji czynią segmentację oraz pipeline użytecznymi bez zawyżania intencji.', keyPrinciples: ['Stosuj neutralne, opisane tagi i etapy', 'Wymagaj zgody i akceptacji przed automatycznym kontaktem'] },
          actionTask: { instruction: 'Ukończ moduł CRM i potwierdź odpowiedzialne kontrole pipeline:', checklistItems: ['Rozumiem, że lead score jest zwalidowaną pomocą w priorytetyzacji, a nie dowodem intencji', 'Potrafię utrzymywać potrzebne, rzeczowe i chronione rolem rekordy interakcji', 'Potrafię definiować neutralne segmenty i etapy ze zgodą, właścicielem i przeglądem'] },
        },
      },
    },
    22: {
      title: '22. Optymalizacja konwersji i masterclass landing page',
      subtitle: 'Jasne, dostępne strony ulepszane na podstawie wiarygodnych dowodów',
      description: 'Projektuj skoncentrowane landing page, komunikuj twierdzenia uczciwie i ulepszaj doświadczenie dzięki pomiarom chroniącym prywatność oraz zdyscyplinowanym eksperymentom.',
      lessons: {
        '22.1': {
          stageTitle: '22. Optymalizacja konwersji i masterclass landing page', title: 'Jasna i wiarygodna struktura landing page',
          description: 'Zbuduj skoncentrowaną, dostępną stronę, która pomaga odwiedzającym zrozumieć ofertę i podjąć świadomą decyzję.',
          learnContent: {
            videoTitle: 'Struktura landing page: jasność, zaufanie i dostępność',
            summaryText: 'Użyteczna landing page wyjaśnia odbiorcę, wartość, dowody, warunki i następny krok bez rozpraszania, fałszywego dowodu społecznego ani presji.',
            bulletPoints: ['U góry strony prostym językiem określ ofertę i właściwego odbiorcę', 'Używaj prawdziwych dowodów za zgodą i odpowiednio kwalifikuj mierzalne twierdzenia', 'Główne działanie powinno być widoczne, opisowe i dostępne na urządzeniach mobilnych oraz komputerach', 'Przed zobowiązaniem pokaż istotne informacje o cenie, prywatności, rezygnacji i kontakcie'],
            coreConcepts: [
              { iconName: 'title', title: 'JASNY NAGŁÓWEK', description: 'Wyjaśnij, co oferujesz i dla kogo. Reguła trzech sekund jest wskazówką, a nie uniwersalnym prawem.', highlight: true },
              { iconName: 'anchor', title: 'TRAFNE WPROWADZENIE', description: 'Połącz deklarowaną potrzebę odwiedzającego z ofertą bez wyolbrzymiania bólu, strachu lub pilności.' },
              { iconName: 'stars', title: 'WERYFIKOWALNE DOWODY', description: 'Używaj autentycznych opinii za zgodą i z kontekstem. Nigdy nie wymyślaj osób, liczb ani wyników.' },
              { iconName: 'touch_app', title: 'DOSTĘPNE DZIAŁANIE', description: 'Zastosuj opisowy przycisk, odpowiedni kontrast, widoczny fokus klawiatury i jasną informację, co wydarzy się dalej.' },
            ],
            fullArticleGuide: `### Landing page wspierająca świadomy wybór

Landing page ma zwykle jeden główny cel, ale nadal musi przekazać wystarczający kontekst do zrozumienia decyzji.

#### Zalecana struktura

1. **Nagłówek i wprowadzenie**: Prostym językiem nazwij ofertę, odbiorcę i główną wartość. Unikaj niepopartych gwarancji i sztucznego niedoboru.
2. **Korzyści i dopasowanie**: Wyjaśnij istotne korzyści, ograniczenia i komu oferta może nie odpowiadać.
3. **Dowody**: Popieraj twierdzenia aktualnymi źródłami, reprezentatywnymi wynikami i koniecznymi zastrzeżeniami. Opinie wymagają zgody i nie powinny sugerować typowego wyniku, jeśli są wyjątkowe.
4. **Szczegóły oferty**: Przed zobowiązaniem pokaż cenę, opłaty cykliczne, rezygnację, dostawę, warunki udziału i inne istotne zasady.
5. **Główne działanie**: Użyj opisu, np. „Pobierz bezpłatną checklistę”. Nie ukrywaj zgody ani nie zaznaczaj z góry opcjonalnego marketingu.
6. **Zaufanie i dostęp**: Podaj kontakt, prywatność i informacje prawne. Sprawdź nagłówki, etykiety, kolejność fokusu, kontrast, powiększenie i znaczenie dla czytnika ekranu.

Widoczność nie może pogarszać dostępności. Kontrast tekstu i elementów sterujących musi być wystarczający, a kolor nie może być jedynym sygnałem. Przed publikacją sprawdź stronę na prawdziwych urządzeniach mobilnych i wolniejszych połączeniach.`,
            practicalExamples: ['Słabo: „Innowacyjne synergie dla nowoczesnego wzrostu”. Lepiej: „Zaplanuj pierwszą sekwencję e-mail opartą na zgodzie z prowadzoną checklistą”.', 'Zastąp „5–10 kwalifikowanych leadów tygodniowo — całkowicie automatycznie” popartym dowodami opisem procesu i czynników wpływających na wynik.'],
          },
          understandContent: { coreTakeaway: 'Mocna landing page łączy jasność, prawdziwe dowody, dostępną interakcję i przejrzyste warunki.', keyPrinciples: ['Jedno jasne działanie główne z wystarczającym kontekstem decyzji', 'Używaj tylko uzasadnionych twierdzeń i autoryzowanych dowodów', 'Testuj dostępność i użyteczność mobilną'] },
          actionTask: { instruction: 'Sprawdź landing page przed publikacją:', checklistItems: ['Nagłówek jasno wyjaśnia ofertę i odbiorcę', 'Twierdzenia i opinie są prawdziwe, autoryzowane i właściwie objaśnione', 'Główne działanie jest opisowe i dostępne z klawiatury', 'Cena, zgoda, prywatność i istotne warunki pojawiają się we właściwym momencie'], toolboxCategory: 'landingpage' },
        },
        '22.2': {
          stageTitle: '22. Optymalizacja konwersji i masterclass landing page', title: 'Testy A/B, mapy zachowań i wydajność',
          description: 'Znajduj tarcia za pomocą zweryfikowanych zdarzeń, danych behawioralnych chroniących prywatność i eksperymentów zaplanowanych pod konkretną decyzję.',
          learnContent: {
            videoTitle: 'Odpowiedzialne eksperymenty konwersji i diagnostyka strony',
            summaryText: 'Testy A/B szacują niepewne efekty, a heatmapy pokazują próbkowane interakcje. Żadne z nich nie gwarantuje wzrostu ani samo nie wyjaśnia motywacji.',
            bulletPoints: ['Przed obejrzeniem wyników zapisz jedną hipotezę i główny miernik', 'Oszacuj próbę i czas na podstawie poziomu bazowego, wartościowego efektu i tolerancji błędu', 'Przed zbieraniem danych behawioralnych sprawdź zgodę, minimalizację danych, filtrowanie botów i jakość zdarzeń', 'Traktuj szybkość mobilną, dostępność i ukończenie zadania jako ograniczenia ochronne, a nie tylko konwersję'],
            coreConcepts: [
              { iconName: 'compare', title: 'TESTY A/B', description: 'Losowo porównuj kontrolowane warianty ze stałym przypisaniem i wcześniej określonym planem analizy. Zacznij tam, gdzie dowody wskazują największą niepewność — nie zawsze od nagłówka.', highlight: true },
              { iconName: 'thermostat', title: 'MAPY ZACHOWAŃ', description: 'Traktuj zagregowane wzorce kliknięć i przewijania jako wskazówki. Wyklucz pola wrażliwe, maskuj dane osobowe i badaj przyczyny dodatkowymi metodami.' },
            ],
            fullArticleGuide: `### Optymalizacja konwersji oparta na dowodach

Optymalizacja to cykl diagnozy, hipotezy, pomiaru i przeglądu — nie obietnica podwojenia konwersji.

1. Potwierdź poprawność zdarzeń analitycznych, kryteriów udziału i stanów zgody.
2. Wskaż jedno istotne tarcie na podstawie danych ilościowych i jakościowych.
3. Określ odbiorców, zmianę, mechanizm, główny miernik, ograniczenia, minimalny wartościowy efekt, czas i regułę zatrzymania.
4. Stosuj stabilną randomizację i nie zmieniaj ruchu ani doświadczenia podczas testu.
5. Oceń wielkość efektu, niepewność, brakujące dane, nierówny podział próby i wartość praktyczną.
6. Zapisz decyzję i ograniczenia, a po wdrożeniu kontynuuj monitoring.

Heatmapy mogą pomijać obsługę klawiaturą, treści dynamiczne i zachowania między urządzeniami. Nagrania sesji mogą przechwycić dane osobowe, dlatego stosuj ścisłe maskowanie, krótką retencję, kontrolę dostępu i odpowiednią podstawę prawną. Kontrole wydajności powinny obejmować dostępne dane rzeczywistych użytkowników oraz testy laboratoryjne w reprezentatywnych warunkach mobilnych.`,
            practicalExamples: ['Sprawdź, czy jaśniejsza informacja o cenie zwiększa liczbę właściwych zgłoszeń, jednocześnie monitorując błędy, zwroty i prośby do supportu.'],
          },
          understandContent: { coreTakeaway: 'Wiarygodna optymalizacja wymaga rzetelnego pomiaru, zaplanowanego eksperymentu, ochrony prywatności i uczciwego przedstawienia niepewności.', keyPrinciples: ['Nie polegaj na uniwersalnych obietnicach wzrostu ani skrótach istotności', 'Używaj map zachowań jako wskazówek diagnostycznych, nie czytania w myślach', 'Chroń użyteczność, dostępność i wyniki klientów'] },
          actionTask: { instruction: 'Przygotuj jeden odpowiedzialny eksperyment landing page:', checklistItems: ['Udokumentowano hipotezę, główny miernik i ograniczenia ochronne', 'Zaplanowano próbę, czas i regułę zatrzymania', 'Sprawdzono wydajność mobilną i dostępność', 'Zweryfikowano tracking, zgodę i ochronę prywatności'], toolboxCategory: 'landingpage' },
        },
      },
    },
    23: {
      title: '23. Masterclass e-mail marketingu: tematy i automatyzacja',
      subtitle: 'Trafne tematy i komunikacja cyklu życia z szacunkiem',
      description: 'Pisz zgodne z treścią tematy i buduj automatyczne sekwencje oparte na zgodzie, które dostarczają wartość, respektują preferencje i są mierzone wiarygodnymi sygnałami.',
      lessons: {
        '23.1': {
          stageTitle: '23. Masterclass e-mail marketingu', title: 'Tematy wiadomości tworzące uczciwe oczekiwania',
          description: 'Twórz krótkie, trafne tematy i preheadery bez sztucznej pilności, mylącej ciekawości ani niepopartych obietnic wyniku.',
          learnContent: {
            videoTitle: 'Projektowanie tematów: trafność, jasność i wiarygodne testy',
            summaryText: 'Temat wpływa na zauważenie dostarczonej wiadomości, ale sam nie decyduje o sukcesie kampanii. Znaczenie mają też rozpoznawalność nadawcy, zgoda, czas, dostarczalność i treść.',
            bulletPoints: ['Użyteczny: nazwij prawdziwą korzyść lub cel realizowany przez wiadomość', 'Konkretny: używaj liczb i faktów tylko wtedy, gdy są dokładne, udokumentowane i mają kontekst', 'Aktualny: wspominaj termin tylko wtedy, gdy jest prawdziwy i istotny', 'Spójny: dopasuj temat, preheader, nadawcę i treść wiadomości'],
            coreConcepts: [
              { iconName: 'zap', title: 'PRAWDZIWA PILNOŚĆ', description: 'Używaj pilności wyłącznie przy realnym terminie, zmianie dostępności lub potrzebie zależnej od czasu. Nie twórz sztucznego FOMO.', highlight: true },
              { iconName: 'sparkles', title: 'WYRÓŻNIENIE BEZ WPROWADZANIA W BŁĄD', description: 'Użyj trafnego kąta lub pytania bez clickbaitu, fałszywych odpowiedzi, mylących prefiksów i ukrytego celu handlowego.' },
              { iconName: 'target', title: 'UZASADNIONA KONKRETNOŚĆ', description: 'Konkretne twierdzenia wymagają dowodów i kontekstu. Nie wymyślaj przychodu, procentów, case studies ani personalizacji.' },
              { iconName: 'gift', title: 'UŻYTECZNA OBIETNICA', description: 'Obiecuj tylko to, co wiadomość faktycznie dostarcza, i jasno przedstaw kolejny krok.' },
            ],
            actionBanner: { title: 'Brakuje pomysłu na newsletter?', description: 'Użyj generatora wspieranego przez AI do przygotowania dziesięciu propozycji, a przed użyciem sprawdź każde twierdzenie, warunek i pole personalizacji.', buttonText: 'Otwórz generator e-maili', actionUrl: 'email', iconName: 'auto_awesome' },
            resources: [
              { title: 'Generator e-maili (narzędzie AI)', subtitle: 'Przygotuj dziesięć propozycji tematów', type: 'tool', iconName: 'smart_toy', actionUrl: 'email' },
              { title: 'Szablony przeglądu tematów', subtitle: 'Materiał PDF do kontroli', type: 'pdf', iconName: 'picture_as_pdf' },
            ],
            fullArticleGuide: `### Temat rozpoczyna oczekiwanie

Temat, nazwa nadawcy i preheader tworzą pierwszy widoczny kontekst wiadomości. Mają pomóc odbiorcy rozpoznać trafność, a nie wymusić otwarcie.

#### Odpowiedzialny schemat kontroli

* **Użyteczny**: Czy wiadomość dostarcza obiecaną informację lub korzyść?
* **Konkretny**: Czy nazwy, liczby, terminy i twierdzenia są prawdziwe, autoryzowane i znaczące?
* **Aktualny**: Czy pilność jest realna i czy podany termin zostanie faktycznie zachowany?
* **Wyróżniający**: Czy tekst jest rozpoznawalny bez udawania prywatnej odpowiedzi lub alertu bezpieczeństwa?
* **Dostępny**: Czy istotny sens pozostaje po skróceniu, pominięciu emoji, w czytniku ekranu i trybie ciemnym?

Nie istnieje uniwersalna idealna długość. Sprawdź wyświetlanie w głównych skrzynkach i umieść kluczowy sens na początku. Preheader powinien uzupełniać, nie powtarzać temat. Nie polegaj na listach „słów spamowych”: dostarczalność zależy też od zgody, reputacji, uwierzytelnienia, skarg, zaangażowania i treści.

Śledzenie otwarć jest niepełne i może być zawyżane przez ochronę prywatności oraz automatyczne skanery. Oceniaj działania po otwarciu, odpowiedzi, rezygnacje, skargi i wyniki klienta. Testuj jedną istotną hipotezę z wcześniej określonym miernikiem i wystarczającymi dowodami.`,
            practicalExamples: ['Mylące: „[Case study] Jak Thomas podwoił otwarcia o 42%”, gdy nie można potwierdzić historii ani obliczenia.', 'Jasne: „Twoja checklista pięcioetapowej sekwencji powitalnej”, jeśli wiadomość rzeczywiście ją zawiera.', 'Terminowe: „Rejestracja kończy się w piątek o 18:00” tylko wtedy, gdy termin jest realny, a warunki widoczne.'],
          },
          understandContent: { coreTakeaway: 'Temat powinien tworzyć trafne i prawdziwe oczekiwanie; jakość kampanii zależy od całego procesu zgody, dostarczenia i treści.', keyPrinciples: ['Nie wymyślaj pilności, personalizacji ani wyników', 'Optymalizuj sens na różnych urządzeniach zamiast sztywnego limitu znaków', 'Mierz wiarygodne działania końcowe, nie tylko otwarcia'] },
          actionTask: { instruction: 'Przeprowadź kontrolę tematu i wiadomości przed wysyłką:', checklistItems: ['Temat i preheader dokładnie odpowiadają treści', 'Zweryfikowano twierdzenia, terminy i personalizację', 'Sprawdzono skracanie mobilne i dostępność', 'Zgoda, wykluczenia, tożsamość nadawcy i uwierzytelnienie są prawidłowe', 'Udokumentowano hipotezę testu i miernik decyzji'], toolboxCategory: 'email' },
        },
        '23.2': {
          stageTitle: '23. Masterclass e-mail marketingu', title: 'Sekwencje powitalne i nurture oparte na zgodzie',
          description: 'Zbuduj mierzoną automatyczną sekwencję, która spełnia obietnicę zapisu, dostosowuje się do preferencji i zatrzymuje we właściwym momencie.',
          learnContent: {
            videoTitle: 'Projektowanie odpowiedzialnego flow powitalnego i nurture',
            summaryText: 'Automatyzacja może konsekwentnie wspierać odbiorców, ale nie zamieni każdego nowego kontaktu w klienta. Trafność, zgoda, częstotliwość i wartość wymagają stałego nadzoru człowieka.',
            bulletPoints: ['Wiadomość 1: dostarcz zamówiony materiał, przedstaw nadawcę i ustaw oczekiwania', 'Wiadomości 2–3: przekaż użyteczne wskazówki i zaproś do odpowiedzi bez wymyślania osobistej historii', 'Wiadomość 4: pokaż prawdziwy, autoryzowany przykład wraz z ograniczeniami', 'Wiadomość 5: przedstaw odpowiednią ofertę z pełnymi warunkami i bez sztucznego terminu', 'Wstrzymaj lub zakończ ścieżkę po rezygnacji, sprzeciwie, osiągnięciu celu albo potrzebie pomocy człowieka'],
            coreConcepts: [
              { iconName: 'mail', title: 'FLOW POWITALNY', description: 'Szybko dostarcz obiecany materiał i wyjaśnij treść, częstotliwość, nadawcę oraz opcje preferencji.', highlight: true },
              { iconName: 'user_check', title: 'TRAFNY NURTURE', description: 'Ostrożnie używaj zadeklarowanych potrzeb i zachowań zgodnych ze zgodą. Nie wnioskuj o podatności ani nie udawaj, że automatyzacja jest osobistym kontaktem człowieka.' },
            ],
            resources: [{ title: 'Workflow automatyzacji e-mail', subtitle: 'Otwórz szablony w edytorze automatyzacji', type: 'tool', iconName: 'mail', actionUrl: 'email' }],
            fullArticleGuide: `### Buduj sekwencję powitalną wokół oczekiwań odbiorcy

Stały schemat pięciu wiadomości jest szablonem startowym, a nie gwarancją większej liczby otwarć, lojalności czy trzykrotnie większej liczby klientów.

1. **Określ wejście**: Zapisz źródło, zgodę, obiecaną treść, język i właściwe preferencje.
2. **Najpierw dostarcz**: Wyślij zamówiony materiał, tożsamość nadawcy, drogę pomocy i realistyczne oczekiwania.
3. **Dodaj wartość**: Ucz jednego użytecznego kroku w wiadomości i odróżnij dowody, opinię oraz rekomendację afiliacyjną.
4. **Przedstaw ofertę przejrzyście**: Wyjaśnij cenę, istotne warunki, relację lub prowizję oraz właściwego odbiorcę.
5. **Kontroluj częstotliwość**: Dobierz opóźnienia do kontekstu i wyników testów, nie do uniwersalnej reguły jednego dnia.
6. **Obsłuż wyjścia**: Szybko respektuj rezygnacje i sprzeciwy, zapobiegaj duplikatom ścieżek i zatrzymuj niewłaściwe wiadomości sprzedażowe po konwersji.
7. **Monitoruj jakość**: Sprawdzaj dostarczenie, kliknięcia, odpowiedzi, ukończenie zadania, skargi, rezygnacje i wyniki biznesowe. Same otwarcia są niewiarygodne.

Uwierzytelnij domenę nadawczą przez SPF i DKIM oraz świadomie skonfiguruj DMARC. Sprawdź linki, tekst zastępczy, język, dostępność i pola scalania. Każda automatyzacja musi mieć odpowiedzialnego właściciela i bezpieczne ręczne zatrzymanie.`,
            practicalExamples: ['Osoba prosząca o checklistę otrzymuje ją najpierw, potem dwie opcjonalne wiadomości edukacyjne i prawidłowo ujawnioną ofertę; rezygnacja lub zmiana preferencji natychmiast zatrzymuje właściwą ścieżkę.'],
          },
          understandContent: { coreTakeaway: 'Odpowiedzialny nurture konsekwentnie spełnia oczekiwania oparte na zgodzie i poprawia się dzięki mierzonym wynikom klienta, nie presji ani niepopartym mnożnikom.', keyPrinciples: ['Dostarcz obiecaną wartość przed promocją', 'Respektuj zgodę, preferencje częstotliwości i wyjścia', 'Monitoruj dostarczalność i wpływ na klienta z nadzorem człowieka'] },
          actionTask: { instruction: 'Utwórz i przetestuj pierwszą odpowiedzialną sekwencję powitalną:', checklistItems: ['Udokumentowano źródło wejścia, zgodę i obietnicę', 'Wiadomość z materiałem i treści edukacyjne są gotowe', 'W razie potrzeby ujawniono warunki oferty i relację afiliacyjną', 'Skonfigurowano opóźnienia, wyjścia, wykluczenia i ochronę przed duplikatami', 'Przetestowano SPF, DKIM, DMARC, linki, pola scalania i dostępność'], toolboxCategory: 'email' },
        },
      },
    },
    24: {
      title: '24. Mara CRM: wyjaśnialne informacje o leadach i odpowiedzialne wsparcie sprzedaży',
      subtitle: 'Proporcjonalne sygnały, sprawdzalne rekomendacje i follow-up zgodny ze zgodą',
      description: 'Używaj Mary do porządkowania istotnych sygnałów CRM i przygotowywania możliwych kolejnych kroków bez traktowania trackingu jako pewnej intencji ani oddawania decyzji o kliencie AI.',
      lessons: {
        '24.1': {
          stageTitle: '24. Mara CRM: wyjaśnialne informacje o leadach', title: 'Odpowiedzialny scoring, sygnały zachowania i kontrola człowieka',
          description: 'Dowiedz się, jak Mara może podsumować dozwoloną aktywność CRM, wyjaśnić wynik priorytetyzacji i przygotować follow-up do kontroli przez uprawnioną osobę.',
          learnContent: {
            videoTitle: 'Mara Lead Insights: dowody, niepewność i bezpieczne działanie',
            summaryText: 'Kliknięcia, otwarcia i wizyty na stronie są niepełnymi sygnałami zachowania. Mara może pomóc ustalić kolejność pracy, ale nie zna intencji zakupu, nie gwarantuje sprzedaży i nie określa pewnej najlepszej pory kontaktu.',
            bulletPoints: ['Przy każdym wyniku pokazuj sygnały, źródło, wiek danych, regułę lub wersję modelu oraz niepewność', 'Traktuj otwarcia, kliknięcia strony cenowej i świeżą aktywność jako kontekst, a nie dowód intencji zakupu', 'Twórz szkice dopiero po sprawdzeniu zgody, preferowanego kanału, częstotliwości i statusu wykluczenia', 'Wymagaj, by przeszkolona osoba sprawdziła odbiorcę, twierdzenia, ton, czas i kolejny krok', 'Monitoruj błędy, skargi, dryf i wpływ na grupy; wstrzymaj funkcję przy niewystarczających dowodach'],
            coreConcepts: [
              { iconName: 'sparkles', title: 'WYJAŚNIALNE MARA INSIGHTS', description: 'Podsumuj autoryzowane sygnały i pokaż, dlaczego rekord otrzymał priorytet. Nie przedstawiaj określenia „wysoka intencja” jako ustalonego faktu o osobie.', highlight: true },
              { iconName: 'trending_up', title: 'CZAS JAKO TESTOWALNA SUGESTIA', description: 'Sugeruj dozwolone okno kontaktu na podstawie ograniczonych dowodów, a następnie respektuj czas lokalny, preferencje, limity częstotliwości i ocenę człowieka.' },
            ],
            resources: [{ title: 'Otwórz Mara CRM Lead Insights', subtitle: 'Sprawdź testowy lub autoryzowany rekord CRM', type: 'tool', iconName: 'users', actionUrl: 'crm' }],
            fullArticleGuide: `### Używaj Mary jako wsparcia decyzji, nie autonomicznego sprzedawcy

Zdarzenia behawioralne mogą być brakujące, zduplikowane albo wygenerowane przez ochronę prywatności, skanery bezpieczeństwa, współdzielone urządzenia i przypadkowe kliknięcia. Procent wyświetlany przez model jest szacunkiem zależnym od definicji i danych historycznych, a nie prawdą o osobie.

#### Odpowiedzialny workflow insightów

1. **Potwierdź cel i pozwolenie**: Określ proces biznesowy, podstawę prawną, informację, zgodę na komunikację oraz sprzeciw lub wykluczenie.
2. **Minimalizuj dane wejściowe**: Używaj tylko danych potrzebnych do określonego celu. Unikaj danych wrażliwych oraz nieuzasadnionych proxy zdrowia, wieku, finansów lub podatności.
3. **Wyjaśnij wynik**: Pokaż ważne sygnały, czas, źródło, wersję reguły lub modelu, granice pewności i brakujące informacje.
4. **Waliduj jakość**: Porównaj priorytetyzację z prostym baseline i właściwymi wynikami. Sprawdź kalibrację, fałszywe alarmy, dryf i różnice między grupami.
5. **Sprawdź działanie**: Przeszkolona osoba ocenia tożsamość, kontekst, częstotliwość, twierdzenia, dopasowanie oferty oraz możliwość braku kontaktu.
6. **Kontroluj automatyzację**: Stosuj podgląd, akceptację, limity wysyłki, godziny ciszy, zapobieganie duplikatom, logi audytowe i natychmiastowe zatrzymanie lub rollback.
7. **Ucz się bezpiecznie**: Monitoruj skargi, rezygnacje, korekty i wyniki klientów, nie tylko kliknięcia oraz sprzedaż.

Nie narzucaj reguł typu „90% oznacza kontakt w cztery godziny”, jeśli nie uzasadnia ich konkretny, zwalidowany proces. Stały harmonogram dni 1–3–7 może nie pasować do odbiorcy lub kanału. Tekst AI nie może wymyślać wcześniejszych rozmów, pilności, wiedzy osobistej ani obiecanych wyników.`,
            practicalExamples: ['Zamiast „Julia Weber ma 92% szansy zamknięcia” pokaż „Sugerowany przegląd priorytetu: wczoraj poproszono o demo; dane otwarć wyłączone; trzeba potwierdzić zgodę i ostatni kontakt”.', 'W szkoleniu użyj syntetycznego rekordu testowego. Nie pokazuj profilu prawdziwej osoby ani nie uruchamiaj kampanii tylko po to, by ukończyć lekcję.'],
          },
          understandContent: { coreTakeaway: 'Mara Insights to sprawdzalne i niepewne wsparcie decyzji; zgoda, walidacja i odpowiedzialna ocena człowieka decydują, czy follow-up jest właściwy.', keyPrinciples: ['Nie utożsamiaj trackingu zachowań z pewną intencją zakupu', 'Wyjaśniaj i waliduj każdą metodę priorytetyzacji', 'Przed kontaktem wymagaj kontroli pozwolenia i akceptacji człowieka'] },
          actionTask: { instruction: 'Bezpiecznie sprawdź Mara Insights na syntetycznym lub autoryzowanym rekordzie:', checklistItems: ['Cel, zgoda, źródło i status wykluczenia są widoczne', 'Można wyjaśnić sygnały, czas, niepewność i wersję scoringu', 'Sugestię działania sprawdzono względem częstotliwości, czasu lokalnego i kontekstu klienta', 'Szkic AI nie zawiera wymyślonych faktów, presji ani niepopartych twierdzeń', 'Bez wyraźnej akceptacji człowieka nie startuje wiadomość ani kampania'], toolboxCategory: 'email' },
        },
      },
    },
    25: {
      title: '25. Skoordynowane kanały i odpowiedzialne skalowanie',
      subtitle: 'Trwały zasięg, retargeting zgodny ze zgodą i kontrolowane działania sprzedażowe',
      description: 'Koordynuj możliwy do utrzymania zestaw kanałów, właściwie adaptuj treści i skaluj dopiero po potwierdzeniu pomiaru, zabezpieczeń klienta oraz możliwości operacyjnych.',
      lessons: {
        '25.1': {
          stageTitle: '25. Skoordynowane kanały i odpowiedzialne skalowanie', title: 'Plan wielokanałowy, retargeting i ponowne użycie treści',
          description: 'Zbuduj skoncentrowany plan kanałów respektujący zgodę, kontekst platformy, częstotliwość i dobro odbiorców zamiast dążyć do wszechobecności.',
          learnContent: {
            videoTitle: 'Skoordynowane kanały i retargeting chroniący prywatność',
            summaryText: 'Więcej punktów kontaktu nie tworzy automatycznie zaufania ani sprzedaży. Wybierz kanały na podstawie dowodów, dopasuj treść do kontekstu i ogranicz powtarzanie reklam.',
            bulletPoints: ['Wybieraj kanały według danych o odbiorcach, możliwości i mierzalnego celu zamiast próbować być wszędzie', 'Traktuj odkrycie, edukację i wsparcie decyzji jako elastyczne stany ścieżki, a nie etykiety psychologii osoby', 'Adaptuj materiał źródłowy tylko z zachowaniem praw, dokładności, dostępności i kontekstu platformy', 'Przed tworzeniem lub synchronizacją grup stosuj kontrolę zgody, wykluczeń, retencji i częstotliwości', 'Traktuj parametry UTM i dozwolone zdarzenia jako częściowe dowody atrybucji, nie „pełny” tracking konwersji'],
            coreConcepts: [
              { iconName: 'layers', title: 'KOMUNIKACJA WEDŁUG ŚCIEŻKI', description: 'Dopasuj użyteczną informację do zaobserwowanego stanu procesu bez wnioskowania o cechach wrażliwych i bez sztucznej dostępności.', highlight: true },
              { iconName: 'trending_up', title: 'TRWAŁY ZESTAW KANAŁÓW', description: 'Koordynuj tylko kanały, które zespół może utrzymać, mierzyć i obsługiwać. Rozpoznawalność nie oznacza autorytetu ani zaufania.' },
              { iconName: 'sparkles', title: 'ADAPTACJA DO KONTEKSTU', description: 'Przekształć zweryfikowane źródło w mniejszą liczbę użytecznych formatów z redakcją dla platformy, napisami, atrybucją i kontrolą jakości.' },
            ],
            resources: [
              { title: 'Plany retargetingu', subtitle: 'Zabezpieczenia kampanii i arkusz budżetu', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Kampanie e-mail i CRM', subtitle: 'Koordynuj dozwolone ścieżki follow-up', type: 'tool', iconName: 'mail', actionUrl: 'email' },
            ],
            fullArticleGuide: `### Projektuj skoordynowany zasięg bez nadzoru i presji

„Wszechobecność” może prowadzić do nadmiernej częstotliwości, marnowania budżetu i złego doświadczenia klienta. Celem jest użyteczna ciągłość w ograniczonej liczbie kanałów.

#### Odpowiedzialna ścieżka w trzech częściach

1. **Odkrycie**: Oferuj dostępne treści organiczne lub reklamy uprawnionej grupie. Wyjaśnij tracking i zbieraj tylko dane potrzebne do określonego celu.
2. **Edukacja i ocena**: Udostępniaj poradniki, porównania i autoryzowane case studies. Pokazuj ograniczenia i nie ukrywaj relacji handlowych.
3. **Wsparcie decyzji**: Przedstaw jasną ofertę, cenę, warunki i prawdziwą dostępność. Nie używaj fałszywego niedoboru, resetowanych liczników ani targetowania podatności.

Przed aktywacją piksela, przesłaniem grupy lub synchronizacją CRM potwierdź podstawę prawną, wymagania zgody, zasady platformy, retencję, usuwanie, wykluczenia i transfery międzynarodowe. Haszowanie identyfikatora nie czyni danych osobowych anonimowymi.

Ustaw limity częstotliwości według kanału i kampanii, wyklucz osoby po konwersji lub sprzeciwie, gdy właściwe, i umożliw zmianę preferencji. Waliduj parametry UTM oraz definicje zdarzeń, ale licz się z lukami atrybucji między urządzeniami i przez ochronę prywatności. Monitoruj zasięg, wynik przyrostowy, skargi, zmęczenie, dostępność i koszt krańcowy, nie tylko przych…31826 tokens truncated…sądny notice przy zmianie funkcji, ceny, danych lub kompatybilności.
10. **Wspieraj zmianę i zamknięcie**: Zapewnij użyteczny machine-readable export gdzie właściwe, udokumentowane closure, status usunięcia i migrację. Obowiązki cloud/data switching zależą od usługi i jurysdykcji i wymagają aktualnego review.
11. **Mierz zrównoważone wyniki**: Monitoruj task success, reliability, dostępność, support, skargi, zwroty, security, privacy, portowalność i wartość deklarowaną przez klienta. Flywheel lub niski churn nie dowodzą przyczyny.
12. **Ćwicz awarię systemową**: Przećwicz utratę identity, vendor outage, przejętą integrację, złe entitlement, podwójny billing, nieudane deletion i incident community. Zapisz recovery time, komunikację i działania naprawcze.

Najsilniejszy ekosystem jest zrozumiały, modułowy i możliwy do odzyskania. Klienci zostają, bo skoordynowana usługa im pomaga, nie dlatego, że ich dane lub workflow są zakładnikiem.`,
            practicalExamples: ['Gdy provider community ma awarię, użytkownicy nadal widzą płatne lekcje i core tools, a status page wyjaśnia izolowany incident i ścieżkę recovery.', 'Klient obniża bundle, przed potwierdzeniem widzi dokładną zmianę dostępu, eksportuje dane i zachowuje rekordy potrzebne do faktur bez ukrytej reaktywacji.'],
          },
          understandContent: { coreTakeaway: 'Godna zaufania platforma koordynuje użyteczne usługi, zachowując granice, jasny wybór, bezpieczny dostęp, portowalność i recovery z nieuniknionych błędów.', keyPrinciples: ['Integracja wymaga ownerów i granic awarii', 'SSO nie zastępuje authorisation ani recovery', 'Buduj retencję przez wartość i odwracalny wybór'] },
          actionTask: { instruction: 'Zaprojektuj odporny plan integracji platformy:', checklistItems: ['Udokumentowano wspólny wynik, opcjonalne ścieżki i zakres komponentów', 'Zmapowano dependencies, ownerów, kontrakty, data flows, fallbacki i exits', 'Określono identity, authorisation, recovery, dostępność i safeguards community', 'Wyjaśniono bundle, entitlements, zmiany, anulowanie i data portability', 'Zaplanowano ćwiczenia awarii, monitoring, komunikację i switching'], toolboxCategory: 'content' },
        },
      },
    },
    36: {
      title: '36. Etyczny copywriting behawioralny i projektowanie decyzji',
      subtitle: 'Motywy odbiorców, skróty poznawcze, transparentne framing i eksperymenty oparte na dowodach',
      description: 'Twórz jaśniejsze i bardziej trafne oferty przez badanie motywów klientów oraz testowanie wzorców wspierających decyzję — bez pseudonaukowych tez, ukrytej manipulacji, fałszywej pilności ani gwarancji konwersji.',
      lessons: {
        '36.1': {
          stageTitle: '36. Copywriting oparty na motywach',
          title: 'Mapuj motywy odbiorców bez sprowadzania ludzi do stałych typów mózgu',
          description: 'Wykorzystuj dowody jakościowe i testy zachowań, aby dopasować przekaz wokół bezpieczeństwa, odkrywania i osiągnięć, zachowując autonomię klienta.',
          learnContent: {
            videoTitle: 'Masterclass: Mapowanie motywów oparte na dowodach',
            summaryText: 'Emocje i rozumowanie mogą wpływać na decyzje, lecz nie istnieje uniwersalna reguła „95% emocjonalnie” ani słowo omijające świadomy opór. Odpowiedzialny copywriting zaczyna się od zaobserwowanych potrzeb, sprawdzalnych claims i testu, czy jaśniejsze framing pomaga wybrać.',
            bulletPoints: [
              'Traktuj bezpieczeństwo, odkrywanie i osiągnięcia jako hipotezy badawcze, nie biologiczne diagnozy ani stałe typy klientów',
              'Przekładaj wywiady, wyszukiwanie, pytania supportu i obiekcje na konkretne, sprawdzalne tematy przekazu',
              'Stosuj sygnały uwagi poprawiające zrozumienie i trafność zamiast szoku, deception lub utrudniania interfejsu',
              'Łącz udokumentowany problem z proporcjonalną korzyścią, dowodem, ograniczeniami i realistycznym krokiem',
            ],
            coreConcepts: [
              { iconName: 'zap', title: 'HIPOTEZA MOTYWU', description: 'Zapisz odbiorcę, kontekst, zaobserwowaną potrzebę, wariant przekazu i dowód wspierający lub odrzucający hipotezę.', highlight: true },
              { iconName: 'eye', title: 'UWAGA Z AUTONOMIĄ', description: 'Zdobywaj uwagę trafnością, hierarchią i jasnością; nie ukrywaj reklamy, istotnych warunków ani nie twórz sztucznej presji.' },
            ],
            resources: [
              { title: 'Workbook badania motywów i eksperymentu copy', subtitle: 'Wywiady, claims, warianty, safeguards i wyniki', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Asystent przeglądu copy GOM-MAR', subtitle: 'Jasność, dowody, dostępność i ryzyko manipulacji', type: 'tool', iconName: 'cpu', actionUrl: 'tools' },
            ],
            fullArticleGuide: `### Copy oparty na motywach, który szanuje odbiorcę

Decyzje wynikają ze współdziałania emocji, uwagi, pamięci, kontekstu i namysłu. Popularne procenty neuromarketingowe i stałe „typy mózgu” nie dają pewnej wiedzy o konkretnej osobie.

#### Odpowiedzialny workflow

1. **Zdefiniuj decyzję**: Określ, kto i w jakim kontekście decyduje, co musi zrozumieć i jak wygląda dobry wynik klienta.
2. **Zbieraj proporcjonalne dowody**: Za właściwą zgodą użyj wywiadów, zapisów supportu, wyszukiwań, ankiet i zachowań. Oddziel dowód od interpretacji i nie wnioskuj o cechach wrażliwych.
3. **Ostrożnie grupuj motywy**: Bezpieczeństwo, nowość i osiągnięcia są użytecznymi tematami, ale ludzie mają wiele motywów zależnych od kontekstu. Oznacz segmenty jako hipotezy i pozwól na samookreślenie.
4. **Prowadź rejestr claims**: Dla każdej istotnej korzyści zapisz dowód, warunki, typowość, wykluczenia i ownera. Usuń twierdzenia bez uzasadnienia.
5. **Twórz użyteczne warianty**: Połącz jeden motyw z konkretną korzyścią, dowodem, ograniczeniami, pełnym zobowiązaniem i jasnym krokiem. Istotne informacje muszą być widoczne i czytelne.
6. **Chroń autonomię**: Unikaj ukrytej reklamy, wzmacniania strachu, fałszywego niedoboru, wstydu, forced continuity, confirm-shaming i utrudniania odmowy.
7. **Testuj etycznie**: Z góry określ hipotezę, customer-centred metric, guardrails, próbę i stop rule. Mierz zrozumienie, właściwe ukończenie, anulowania, skargi i żal, nie tylko kliknięcia.
8. **Sprawdź dostępność i inkluzję**: Oceń prosty język, nagłówki, linki, focus, kontrast, zoom i screen reader. Testuj właściwe języki i urządzenia.
9. **Ucz się bez nadmiernych wniosków**: Wynik dotyczy badanej populacji, oferty, kanału i okresu. Zapisz niepewność, skutki uboczne oraz grupy, które ucierpiały lub zostały zdezorientowane.
10. **Utrzymuj i wycofuj**: Ponownie sprawdzaj claims po zmianie produktu, dowodów, odbiorców lub prawa. Wycofuj wzorce podnoszące krótką konwersję kosztem wyniku klienta.

Celem wiedzy behawioralnej jest poprawa trafności i zrozumienia, a nie przejęcie kontroli nad osądem człowieka.`,
            practicalExamples: [
              'Wariant bezpieczeństwa wyjaśnia zakres backupu, granice recovery i dowody supportu zamiast obiecywać wynik bez ryzyka.',
              'Wariant nowości pokazuje jeden rzeczywiście nowy workflow i krzywą nauki zamiast niejasnego claim „rewolucyjny”.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Użyteczna trafność emocjonalna wynika z dowodów i jasności, nie wymaga stałych etykiet mózgu ani ukrytej kontroli.',
            keyPrinciples: ['Traktuj segmenty i motywy jako hipotezy', 'Uzasadniaj istotne claims i ujawniaj granice', 'Optymalizuj zrozumienie i właściwe wyniki, nie presję'],
          },
          actionTask: {
            instruction: 'Przygotuj etyczny eksperyment headline oparty na motywie:',
            checklistItems: ['Udokumentowano odbiorcę, kontekst, motyw i dowody', 'Trzy warianty headline używają konkretnych, uzasadnionych korzyści', 'Istotne granice i pełne zobowiązanie są widoczne', 'Określono guardrails zrozumienia, dopasowania, skarg i anulowania', 'Przypisano czas, próbę, stop rule i ownera review'],
            toolboxCategory: 'landingpage',
          },
        },
        '36.2': {
          stageTitle: '36. Heurystyki poznawcze i transparentny framing',
          title: 'Używaj wzorców decyzji do wyjaśniania wyboru, nie do deceptive steering',
          description: 'Stosuj anchoring, porównania, natychmiastowość, udział i social evidence z prawdziwymi punktami odniesienia, uczciwym wyborem i pomiarem wyników klienta.',
          learnContent: {
            videoTitle: 'Masterclass: Etyczne projektowanie decyzji w ofercie i checkout',
            summaryText: 'Skróty poznawcze mogą wpływać na ocenę, ale efekt zależy od odbiorcy i kontekstu. Trzecia cena nie gwarantuje stałego udziału kupujących, a przekreślona cena jest użyteczna tylko wtedy, gdy jest prawdziwa, istotna i wyjaśniona.',
            bulletPoints: [
              'Anchoring: ujawnij rzeczywisty i istotny punkt odniesienia zamiast wymyślać cenę katalogową lub oszczędność',
              'Choice architecture: twórz sensownie różne i samodzielnie użyteczne pakiety; nie buduj celowo złego decoy',
              'Natychmiastowość: wyjaśnij obecną i przyszłą wartość z realistycznym timingiem, bez pompowania bonusów ani ukrywania kosztu cyklicznego',
              'Udział i social evidence: używaj reprezentatywnych, zweryfikowanych dowodów za zgodą, a wysiłek setupu niech tworzy użyteczność, nie sztuczne commitment',
            ],
            coreConcepts: [
              { iconName: 'tag', title: 'WERYFIKOWALNE ODNIESIENIE', description: 'Cena porównawcza potrzebuje prawdziwej podstawy, okresu i kontekstu like-for-like. Zachowaj dowód kampanii.', highlight: true },
              { iconName: 'check-circle-2', title: 'UCZCIWY ZESTAW WYBORU', description: 'Każda opcja pokazuje odbiorcę, funkcje, limity, pełną cenę i renewal. Rekomendacja wynika z dopasowania klienta, nie samej marży.' },
            ],
            resources: [
              { title: 'Macierz review decision design i cen', subtitle: 'Odniesienia, uczciwość pakietów, disclosure i guardrails', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Rejestr eksperymentów cenowych Mara CRM', subtitle: 'Warianty, zgody, metryki, incydenty i decyzje', type: 'tool', iconName: 'dollar-sign', actionUrl: 'settings' },
            ],
            fullArticleGuide: `### Transparentna architektura wyboru

Ceny i pakiety są interpretowane w kontekście. To nadaje porównaniom siłę i tworzy obowiązek, by nie manipulować, nie fałszować wartości ani nie utrudniać wolnego wyboru.

#### Proces review i eksperymentu

1. **Zdefiniuj dopasowanie klienta**: Opisz właściwe zastosowanie i wykluczenia każdego pakietu. Nie optymalizuj niedopasowanego klienta do wyższego tier.
2. **Weryfikuj każde odniesienie**: Zapisz źródło, daty, rynek, warunki i podstawę like-for-like dla wcześniejszych cen, konkurencji, oszczędności i wartości.
3. **Projektuj samodzielnie użyteczne opcje**: Każdy tier ma spójną wartość. Nie dodawaj świadomie gorszego „decoy” tylko po to, by wypaczyć porównanie.
4. **Pokaż pełne zobowiązanie**: Przed potwierdzeniem pokaż podatki gdzie właściwe, jednostkę billingową, usage, renewal, minimalny okres, dodatki, anulowanie, zwrot i dostęp po anulowaniu.
5. **Ostrożnie mów o stracie**: Wyjaśniaj realne skutki symetrycznie; nie strasz, nie zawstydzaj, nie wyolbrzymiaj straty ani nie twórz fałszywych countdowns.
6. **Odpowiedzialnie stosuj social evidence**: Uzyskaj zgodę, zweryfikuj testimonials i istotne wyniki, ujawnij incentive oraz warunki i nie pokazuj wyjątków jako typowych.
7. **Ułatw odmowę**: Akceptacja i odrzucenie powinny mieć porównywalną widoczność i wysiłek. Bez preselected extras, ukrytych subskrypcji i powtarzanej presji.
8. **Rejestruj test przed startem**: Określ hipotezę, warianty, allocation, czas, próg dowodu, primary metric i guardrails. Nie zatrzymuj testu na korzystającej fluktuacji.
9. **Mierz jakość downstream**: Uwzględnij zrozumienie, aktywację, plan fit, zwroty, chargebacks, skargi, anulowania i support, nie tylko konwersję.
10. **Sprawdź grupy chronione i wrażliwe**: Wyłącz lub dodaj safeguards tam, gdzie wiek, distress, financial vulnerability lub sensitive inference czynią targeting niewłaściwym.
11. **Dokumentuj decyzję**: Zachowaj zgody, screenshoty, dowody claims, wyniki i ograniczenia. Wycofaj wariant, gdy szkoda lub confusion przekroczy próg.
12. **Regularnie rewaliduj**: Ceny, pakiety, testimonials i oczekiwania klientów się zmieniają. Wygasłe dowody nie mogą pozostać aktywne.

Etyczny framing pomaga porównywać; nie narzuca odpowiedzi przez deception lub friction.`,
            practicalExamples: [
              'Tabela trzech planów wyjaśnia, komu każdy służy, używa aktualnych cen i raportuje plan-fit oraz refund rate obok konwersji.',
              'Rabat czasowy pokazuje prawdziwą datę końca i późniejsze warunki; checkout ma równie widoczną odmowę i brak zaznaczonego dodatku.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Dobry framing ułatwia ocenę wartości i trade-offs, pozostawiając klientowi swobodę wyboru lub odmowy.',
            keyPrinciples: ['Używaj prawdziwych, udokumentowanych odniesień', 'Każda opcja ma być spójna i uczciwie przedstawiona', 'Oceniaj welfare downstream obok konwersji'],
          },
          actionTask: {
            instruction: 'Przeprowadź odpowiedzialny audit i test jednej tabeli cen:',
            checklistItems: ['Określono odbiorcę i właściwy use case dla każdego tier', 'Zweryfikowano ceny odniesienia, porównania i oszczędności', 'Pełny koszt, renewal, limity, anulowanie i zwroty są widoczne', 'Usunięto false scarcity, preselection, utrudnioną odmowę i sztuczny decoy', 'Przygotowano hipotezę, guardrails jakości, stop rule i archiwum dowodów'],
            toolboxCategory: 'landingpage',
          },
        },
      },
    },
    37: {
      title: '37. Uczciwe application funnels i odpowiedzialna kwalifikacja',
      subtitle: 'Proporcjonalne formularze, jawne kryteria dopasowania, human review i routing z ochroną privacy',
      description: 'Projektuj ścieżki zgłoszenia i discovery, które chronią czas obu stron, rozpoznają wzajemne dopasowanie i oferują użyteczne alternatywy — bez wykluczania według majątku, presji władzy ani opaque profiling.',
      lessons: {
        '37.1': {
          stageTitle: '37. Architektura application funnel',
          title: 'Czterofazowa ścieżka dopasowania dla złożonych usług',
          description: 'Przejdź od jasnych informacji o usłudze przez proporcjonalny kwestionariusz i human review do opcjonalnego spotkania, zachowując dostępne drogi pytań i alternatywy.',
          learnContent: {
            videoTitle: 'Masterclass: Uczciwa ścieżka zgłoszenia i discovery',
            summaryText: 'Formularz powinien wspierać świadomą, dwustronną decyzję. Nie dowodzi gotowości do zapłaty, nie odwraca relacji władzy ani nie uzasadnia nadmiernego zbierania danych. Przed pytaniami provider wyjaśnia ofertę, kryteria, dane i następne kroki.',
            bulletPoints: [
              'Przed zgłoszeniem wyjaśnij usługę, dowody, granice, pełny zakres ceny, eligibility i oczekiwaną pracę',
              'Pytaj tylko o dane konieczne do oceny delivery fit, capacity i safety; tam gdzie właściwe daj „wolę nie odpowiadać”',
              'Traktuj budżet jako jawny temat wykonalności, nie proxy wartości, powagi lub vulnerability człowieka',
              'Zapewnij dostępny human review, korektę i odwołanie oraz użyteczną drogę dla osób obecnie niedopasowanych',
            ],
            coreConcepts: [
              { iconName: 'filter', title: 'REVIEW WZAJEMNEGO DOPASOWANIA', description: 'Jawne kryteria oceniają potrzeby, zakres, czas, zasoby i capability providera. Odmowa ma powód, szacunek i nie jest wyłącznie automatyczna.', highlight: true },
              { iconName: 'video', title: 'ŚWIADOME CASE STUDY', description: 'Krótkie, opisane napisami case study podaje kontekst, metodę, warunki, granice i typowość zamiast obiecywać usunięcie każdej obiekcji.' },
            ],
            resources: [
              { title: 'Pakiet formularza i review dopasowania', subtitle: 'Cel, pytania, dostępność, privacy, kryteria i alternatywy', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Builder zgłoszeń Mara CRM', subtitle: 'Minimalne formularze, kolejki review i kontrola retencji', type: 'tool', iconName: 'edit', actionUrl: 'crm' },
            ],
            fullArticleGuide: `### Uczciwa ścieżka zgłoszenia jest dwustronnym sprawdzeniem dopasowania

Złożone lub ograniczone capacity usługi mogą wymagać kwalifikacji, lecz proces nie może sugerować niższej wartości aplikanta, wymuszać zbędnych danych ani automatycznie wykluczać przez ukryte reguły.

#### Cztery fazy

1. **Informuj przed zbieraniem**: Podaj providera, scope, dowody, istotne ryzyka, wykluczenia, reprezentatywne wyniki, zakres ceny, oczekiwaną pracę, dostępność i drogę pytań bez aplikowania.
2. **Zbieraj proporcjonalne zgłoszenie**: Wyjaśnij cel sekcji i pytaj tylko o dane potrzebne do fit i realizacji. Unikaj sensitive data bez konieczności i właściwej podstawy. Zapisuj postęp, wspieraj keyboard i screen readers oraz inny kanał.
3. **Przejrzyj i zaproponuj spotkanie**: Stosuj kryteria spójnie. Weryfikuj ważne odpowiedzi, umożliwiaj korektę, a niepewne lub consequential cases kieruj do przeszkolonego człowieka. Kalendarz jest opcjonalny i nie zapisuje do marketingu.
4. **Potwierdź, odmów lub przekieruj z szacunkiem**: Użytecznie wyjaśnij wynik, zapewnij kontakt lub review, stosuj retencję i deletion oraz oferuj trafne publiczne zasoby, nie automatyczny płatny downsell.

#### Kontrole operacyjne

- Oddziel przetwarzanie zapytania od zgody na email, SMS, WhatsApp lub inny marketing.
- Zidentyfikuj processors, integracje i odbiorców; zabezpiecz dane i ogranicz dostęp CRM.
- Nie pytaj o hasła, zdrowie, protected traits ani trudności finansowe bez koniecznego, legalnego i chronionego celu.
- Nie wnioskuj o powadze z długości formularza. Testuj completion, zrozumienie, dostępność, abandonment i downstream fit.
- Case studies muszą mieć zgodę i dokładnie podawać kontekst, selekcję, warunki i granice.
- Materiał przygotowawczy pomaga ocenić usługę; nie jest ukrytą unpaid homework ani presją sunk-cost.
- Określ response time i recovery dla błędów formularza, wiadomości i kalendarza.
- Przeglądaj acceptance patterns pod kątem nieuzasadnionych różnic i poprawiaj kryteria wykluczające właściwe osoby.

Celem nie jest „perfekcyjny funnel”, lecz udokumentowana, zrozumiała ścieżka do świadomej decyzji obu stron.`,
            practicalExamples: [
              'Konsultant publikuje scope i zakres ceny, zadaje sześć koniecznych pytań, ręcznie sprawdza borderline cases i wyjaśnia non-fit bez dodawania do kampanii.',
              'Case study z napisami podaje kontekst i granice; ta sama treść jest dostępna jako tekst, a rozmowa może otrzymać accessibility support.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Zgłoszenie oznacza zainteresowanie, nie zdolność płatniczą ani zgodę na perswazję; suitability jest uczciwym, dwustronnym i reviewable osądem.',
            keyPrinciples: ['Wyjaśnij kryteria i dane przed zebraniem', 'Minimalizuj pytania i zapewnij dostępne alternatywy', 'Istotne decyzje podlegają human review'],
          },
          actionTask: {
            instruction: 'Zaprojektuj pilot uczciwego zgłoszenia i review:',
            checklistItems: ['Opublikowano scope, cenę, dowody, wykluczenia i kryteria', 'Każde pole ma konieczny cel, retencję i accessibility check', 'Zgoda marketingowa jest osobna, konkretna i unbundled', 'Udokumentowano human review, korektę i respectful non-fit', 'Monitorowane będą completion, zrozumienie, disparity, skargi i fit'],
            toolboxCategory: 'landingpage',
          },
        },
        '37.2': {
          stageTitle: '37. Odpowiedzialny lead scoring i routing',
          title: 'Buduj wyjaśnialną priorytetyzację z privacy i human oversight',
          description: 'Stosuj reguły CRM do kolejek odpowiedzi i service fit, unikając ukrytego wealth scoring, sensitive inference, intrusive messaging i consequential decisions bez człowieka.',
          learnContent: {
            videoTitle: 'Masterclass: Wyjaśnialny CRM scoring i routing',
            summaryText: 'Score jest omylnym sygnałem operacyjnym, nie miarą wartości osoby ani gwarancją zakupu. Określ legalny cel, używaj potrzebnych danych, testuj validity i bias, zachowaj human oversight i respektuj preferencje kontaktu.',
            bulletPoints: [
              'Punktuj obserwowalne czynniki service fit z uzasadnieniem; bez protected traits, vulnerability i opaque behavioural proxies',
              'Oddziel priorytet odpowiedzi od akceptacji, ceny, creditworthiness i prawa do usługi',
              'Alerty wysyłaj tylko przypisanym pracownikom przez zatwierdzone kanały, bez danych zgłoszenia w niezabezpieczonym notification',
              'Każdemu segmentowi daj właściwą odpowiedź, korektę i wybór komunikacji zamiast automatycznej presji lub paid downsell',
            ],
            coreConcepts: [
              { iconName: 'bar-chart-2', title: 'WYJAŚNIALNY SYGNAŁ', description: 'Każdy factor ma cel, źródło, wagę, validation, ownera i expiry. Pracownik widzi przyczynę zmiany i może override z uzasadnieniem.', highlight: true },
              { iconName: 'send', title: 'ROUTING ŚWIADOMY ZGODY', description: 'Kieruj zapytanie do kolejki bez uznania go za zgodę na telefon, SMS, komunikator lub nurture campaign.' },
            ],
            resources: [
              { title: 'Macierz governance i validation lead scoring', subtitle: 'Cel, factors, fairness, overrides, retencja i monitoring', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Kolejka review Mara CRM', subtitle: 'Wyjaśniaj scores, zapisuj overrides i egzekwuj contact preferences', type: 'tool', iconName: 'settings', actionUrl: 'crm' },
            ],
            fullArticleGuide: `### Odpowiedzialny scoring wspiera pracę, nie szereguje wartości ludzi

CRM scoring pomaga alokować ograniczony czas. Może też reprodukować dyskryminację, ukrywać słabe assumptions i zamienić zapytanie w unwanted surveillance. Traktuj go jako governed decision support.

#### Workflow governance

1. **Określ cel i granicę**: Zapisz problem operacyjny, osoby, decyzje wspierane przez score i decyzje zakazane.
2. **Mapuj dane i odpowiedzialność**: Zapisz źródło, cel, podstawę gdzie wymagana, odbiorców, retencję, rights, processors i transfery. Sprzeciw marketingowy kończy marketing promptly.
3. **Wybierz konieczne factors**: Preferuj bezpośrednie, aktualne wskaźniki scope, czasu, języka, capacity providera i deklarowanej preferencji. Wyklucz sensitive traits i proxies bez kwalifikowanego review.
4. **Nie utożsamiaj budżetu z wartością**: Zakres może wskazać wykonalność, lecz nie determinuje szacunku, dostępu do informacji ani chęci pomocy. Oferuj jawne tiers lub alternatywy.
5. **Twórz zrozumiałe reguły**: Dokumentuj wagi, thresholds, missing values, confidence i przykłady. Bez fikcyjnej precyzji typu „purchase probability w milisekundach”.
6. **Waliduj przed użyciem**: Na reprezentatywnej próbce testuj accuracy, false positives, false negatives, calibration i nieuzasadnione group disparity. Nie ucz bez review na biased past sales.
7. **Zachowaj meaningful human involvement**: Reviewer ma authority, czas i informacje, by zakwestionować output, nie tylko kliknąć approve. Zapisuj overrides i ulepszaj system.
8. **Osobno projektuj komunikację**: Przed telefonem, SMS, WhatsApp, Telegram lub email określ permission, frequency, quiet hours i opt-out. Wewnętrzny urgency flag nie jest zgodą.
9. **Chroń alerty i dostęp**: Notification zawiera minimum danych, używa zatwierdzonego systemu, bez shared credentials i z logiem. Odbieraj dostęp po zmianie roli.
10. **Informuj i daj drogę działania**: Gdzie wymagane wyjaśnij profiling i konsekwencje, umożliw access, correction, human contact i contest dla istotnych wyników.
11. **Monitoruj wyniki klienta**: Śledź jakość odpowiedzi, wait time, fit, no-shows, skargi, opt-outs, disparity akceptacji, refunds i overrides. Szybszy telefon nie zawsze oznacza lepszy wynik.
12. **Rewaliduj i wycofuj**: Sprawdzaj factors po zmianie produktu, rynku, danych lub prawa. Wstrzymaj model przy drift, szkodzie lub słabej explainability ponad próg.

Wymagania profiling i automated decision-making zależą od kontekstu oraz jurysdykcji. W razie potrzeby uzyskaj aktualną poradę privacy, consumer, employment lub financial services.`,
            practicalExamples: [
              'Score priorytetyzuje zapytania według daty startu i capacity specjalisty; akceptacja ma human review, a aplikant poprawia nieaktualną odpowiedź.',
              'SMS alert zawiera tylko record ID, CRM egzekwuje role-based access i sprawdza channel preference przed wiadomością.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Lead scoring jest accountable decision support: ograniczony celem, wyjaśnialny, zwalidowany, privacy-aware i pod human judgment.',
            keyPrinciples: ['Nie szereguj ludzi według majątku ani sensitive proxies', 'Zapytanie nie jest uniwersalną zgodą marketingową', 'Waliduj wyniki i disparities, nie samą sprzedaż'],
          },
          actionTask: {
            instruction: 'Przygotuj governed pilot scoringu i routingu:',
            checklistItems: ['Udokumentowano cel, zakazane użycia, factors, sources, weights i expiry', 'Zakończono review privacy, retencji, rights, processors i security', 'Validation obejmuje błędy, calibration i unjustified disparity', 'Skonfigurowano human review, override, correction i contest', 'Wdrożono channel permission, opt-out, monitoring i model stop rule'],
            toolboxCategory: 'crm',
          },
        },
      },
    },
    38: {
      title: '38. Zrównoważone odkrywanie na YouTube i evergreen journeys',
      subtitle: 'Badanie odbiorców, uczciwe packaging, dostępna retencja i pomiar z ochroną privacy',
      description: 'Buduj użyteczną bibliotekę long-form video odkrywaną z czasem dzięki dowodom o odbiorcach, prawdziwym tytułom i miniaturom, inkluzywnej produkcji i mierzonym krokom zamiast gwarancji viral lub leads.',
      lessons: {
        '38.1': {
          stageTitle: '38. YouTube discovery i audience retention',
          title: 'Twórz odkrywalne filmy, które spełniają obietnicę dla widza',
          description: 'Badaj realne pytanie odbiorcy, pakuj je dokładnie i poprawiaj zrozumienie oraz retencję przez YouTube Analytics zamiast stałych viral formulas.',
          learnContent: {
            videoTitle: 'Masterclass: YouTube discovery i retention oparte na dowodach',
            summaryText: 'Discovery na YouTube zależy od wielu zmiennych sygnałów, kontekstów widza i konkurencyjnych filmów. CTR, watch time i retention są diagnostyką, nie uniwersalnym targetem ani gwarancją rekomendacji, views czy codziennych leads.',
            bulletPoints: [
              'Zacznij od konkretnego problemu i search intent, a popyt potwierdź w kilku źródłach zamiast jednego estimate keyword volume',
              'Tytuł i thumbnail mają być prawdziwe, czytelne i zgodne z początkiem; curiosity nie może stać się misleading metadata',
              'Używaj retention reports i porównań filmów podobnej długości do diagnozy, nie arbitralnych progów 20% drop-off lub 50% retention',
              'Poprawiaj pacing celowymi przykładami, chapters, captions, audio i visuals zamiast wymuszonych cięć lub bodźca co dziesięć sekund',
            ],
            coreConcepts: [
              { iconName: 'video', title: 'WYNIK WIDZA', description: 'Określ, co właściwy widz ma bezpiecznie zrozumieć lub zrobić, następnie wokół tego buduj strukturę, edit i pomiar.', highlight: true },
              { iconName: 'image', title: 'PRAWDZIWE PACKAGING', description: 'Tytuł i thumbnail wskazują temat oraz wartość bez zmyślonych wyników, impersonation, szoku lub obietnicy niespełnionej przez film.' },
            ],
            resources: [
              { title: 'Workbook research, scriptu i dostępności YouTube', subtitle: 'Intent, dowody, struktura, captions, packaging i review', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Asystent review tytułu i miniatury GOM-MAR', subtitle: 'Warianty oraz kontrola jasności, prawdziwości i policy risk', type: 'tool', iconName: 'cpu', actionUrl: 'tools' },
            ],
            fullArticleGuide: `### Buduj użyteczny film, nie mit algorytmu

YouTube Analytics raportuje watch time, average view duration i key moments for audience retention, lecz żadna metryka nie gwarantuje rekomendacji ani viral. Dobry workflow zaczyna się od potrzeby widza i traktuje performance jako niepewny dowód.

#### Cykl produkcji oparty na dowodach

1. **Wybierz odbiorcę i zadanie**: Określ osobę, sytuację, pytanie i bezpieczny, realistyczny wynik. Nie obiecuj trwałego rozwiązania złożonego problemu.
2. **Zbadaj temat**: Sprawdź search suggestions, pytania, support, komentarze, trendy i credible sources. Oceń aktualność, konkurencję i trafność formatu video.
3. **Prowadź rejestr claims i źródeł**: Zapisz support, datę, warunki i granice twierdzeń factual, financial, health lub performance. Preferuj primary sources i qualified review dla high-risk.
4. **Wcześnie draftuj packaging, ale je zmieniaj**: Przed produkcją przygotuj kilka prawdziwych koncepcji, by doprecyzować obietnicę. Finalizuj po sprawdzeniu gotowego filmu.
5. **Zacznij od orientacji**: Szybko potwierdź temat, odbiorcę i zakres. Bez manufactured crisis, fake countdown lub opóźniania odpowiedzi dla watch time.
6. **Buduj dla zrozumienia**: Użyj chapters, prostego języka, przykładów, podsumowań i widocznych źródeł. Ruch i grafika mają wyjaśniać i respektować osoby wrażliwe na flashes lub ruch.
7. **Zapewnij dostępność**: Dodaj poprawione captions, czytelny tekst, kontrast, czyste audio, meaningful verbal description i transcript gdzie praktyczne. Oznacz język.
8. **Sprawdź prawa i safety**: Oczyść music, footage, logos, likeness i AI assets. Ujawnij material sponsorship i synthetic content gdzie wymagane. Chroń prywatne dane na ekranie.
9. **Publikuj z kontekstem**: Dodaj dokładny description, źródła, chapters, correction route i relevant next step. Ustaw audience oraz age prawidłowo i moderuj przewidywalne ryzyka komentarzy.
10. **Czytaj analytics proporcjonalnie**: Porównuj CTR, watch time i retention według traffic source, device, audience i podobnej długości. Małe próbki i mixed audiences mylą.
11. **Prowadź kontrolowane ulepszenia**: Zmieniaj jeden istotny element, zapisuj datę i hipotezę oraz oceniaj reach i satisfaction. Nie kupuj fake engagement ani nie baituj.
12. **Utrzymuj bibliotekę**: Poprawiaj przestarzałe claims, links i disclosures; aktualizuj lub wycofuj filmy, które szkodzą, mylą lub nie pasują do oferty.

Dobry film zdobywa kolejną minutę użytecznością. Nie musi więzić widza do końca.`,
            practicalExamples: [
              'Faceless tutorial ma prawdziwy search-led title, narrację działań, poprawione captions i transcript; retention ujawnia jeden niejasny setup poprawiony w aktualizacji.',
              'Wariant thumbnail poprawia impressions CTR, ale zwiększa early exits przez overpromise; twórca go odrzuca i zachowuje dokładniejszy.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Metryki YouTube diagnozują doświadczenie konkretnej publiczności; nie są progami gwarantującymi viral distribution.',
            keyPrinciples: ['Od razu spełniaj obietnicę title i thumbnail', 'Projektuj pacing i visuals dla zrozumienia i dostępności', 'Interpretuj analytics w kontekście próby i wyniku widza'],
          },
          actionTask: {
            instruction: 'Przygotuj brief jednego evidence-led evergreen video:',
            checklistItems: ['Udokumentowano audience, search intent, wynik i non-goals', 'Sprawdzono claims, sources, rights i safety risks', 'Utworzono trzy prawdziwe warianty title i thumbnail', 'Script zawiera orientację, chapters, examples, captions i next step', 'Przypisano analytics hypothesis, review date, guardrails i update owner'],
            toolboxCategory: 'content',
          },
        },
        '38.2': {
          stageTitle: '38. Integracja YouTube journey',
          title: 'Łącz widzów z użytecznymi krokami bez przymusowego lead capture',
          description: 'Oferuj trafne zasoby i dalsze oglądanie z disclosure, dostępnymi landing pages, meaningful consent i pomiarem respektującym privacy oraz granice attribution.',
          learnContent: {
            videoTitle: 'Masterclass: Odpowiedzialna konwersja i pomiar YouTube',
            summaryText: 'Views bez celu biznesowego mogą nie wspierać kanału, lecz widzowie nie są automatycznie high-intent ani gotowi do zakupu. Odpowiedzialna journey daje wartość przed danymi i mierzy contribution bez przypisywania każdej sprzedaży jednemu filmowi.',
            bulletPoints: [
              'Dopasuj CTA do bieżącego zadania widza i oferuj no-sign-up, gdy gated download nie jest konieczny',
              'Używaj descriptions, pinned comments, cards i end screens według dostępności oraz policy; żadne placement nie ma uniwersalnej przewagi CTR',
              'Buduj szybkie, dostępne mobile pages podające providera, wartość, dane, commercial intent i istotne warunki przed submission',
              'Stosuj UTM i consented analytics jako directional attribution, dokumentując cross-device, cookie, privacy i multi-touch limits',
            ],
            coreConcepts: [
              { iconName: 'link', title: 'KONTEKSTOWY NASTĘPNY KROK', description: 'Umieść jasny, dokładny destination tam, gdzie pomaga. Regularnie sprawdzaj linki i nie kieruj do deceptive, unsafe lub undisclosed pages.', highlight: true },
              { iconName: 'file-text', title: 'UŻYTECZNY COMPANION RESOURCE', description: 'Worksheet lub template rozszerza lekcję i działa samodzielnie; email jest opcjonalny, chyba że konieczny do delivery lub supportu.' },
            ],
            resources: [
              { title: 'Checklist YouTube journey i consent', subtitle: 'CTA, links, landing page, disclosure, dostępność i measurement', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Builder campaign links Mara CRM', subtitle: 'Governed UTM i udokumentowane source definitions', type: 'tool', iconName: 'bar-chart-2', actionUrl: 'crm' },
            ],
            fullArticleGuide: `### Buduj ścieżkę od video do działania pod kontrolą widza

Czas oglądania może wskazywać uwagę, nie gotowość zakupową. CTA pomaga kontynuować zadanie i pozwala zrozumieć exchange przed opuszczeniem YouTube lub podaniem danych.

#### Odpowiedzialny workflow journey

1. **Określ hipotezę next step**: Podaj video, potrzebę, resource, helpful action i evidence wspierające lub odrzucające link.
2. **Dostarcz core value w filmie**: Nie ukrywaj obiecanej odpowiedzi, by wymusić klik lub email. Companion asset ma rozszerzać, organizować lub personalizować naukę.
3. **Wybierz placement z kontekstem**: Spoken CTA, cue, description, pinned comment, card lub end screen stosuj tylko, gdy dostępne i użyteczne. Widoczność różni się według device i account.
4. **Napisz dokładne CTA**: Nazwij resource, providera, cenę, data exchange i destination. Wyraźnie ujawnij affiliate, sponsorship lub material relationship blisko recommendation.
5. **Chroń external links**: Używaj HTTPS, utrzymuj domain ownership, kontroluj redirects i blokuj malware, phishing, zakazane produkty oraz deceptive pages. Prowadź rejestr links.
6. **Twórz dostępny mobile destination**: Optymalizuj loading, keyboard, screen reader, labels, focus, contrast, errors i zoom. Page odpowiada językowi i obietnicy filmu.
7. **Minimalizuj dane**: Pytaj tylko o fields dla celu. Wyjaśnij controller, purpose, basis, processors, retention i rights. Oddziel delivery od optional marketing consent.
8. **Bezpiecznie potwierdzaj**: Użyj właściwej verification, zapobiegaj list abuse i daj natychmiastowy dostęp lub delivery expectation. Każdy marketing ma skuteczny opt-out.
9. **Zarządzaj measurement**: Standaryzuj campaign, source, medium i content; nie umieszczaj personal data w URL. Stosuj consent requirements i ogranicz analytics access oraz retention.
10. **Ostrożnie interpretuj attribution**: UTM wskazuje tagged session, lecz pomija cross-device, privacy controls i późniejsze touches. Uzgadniaj CRM bez claim sole causation.
11. **Mierz jakość**: Obok clicks przeglądaj comprehension, accessibility errors, valid sign-ups, activation, opt-outs, skargi, refunds i usefulness.
12. **Utrzymuj i wycofuj**: Testuj links, forms, disclosure i delivery po każdej zmianie. Popraw pinned comments i descriptions starszych filmów po expiry.

Evergreen video jest utrzymywaną treścią, nie bezpłatnym sprzedawcą pracującym bez zmian pięć lat.`,
            practicalExamples: [
              'Tutorial budżetowy linkuje ungated accessible worksheet i osobny optional newsletter checkbox; UTM jest jednym contribution signal.',
              'Affiliate review ujawnia relationship w filmie i przy linku, porównuje limits oraz alternatives i usuwa destination po zmianie terms.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Silna YouTube journey daje relevant, transparent i reversible next step, mierząc contribution zamiast gwarantowanej konwersji.',
            keyPrinciples: ['Dostarcz obiecaną wartość przed prośbą o dane', 'Oddziel resource delivery od optional marketing consent', 'Attribution jest bounded evidence, nie dowodem przyczyny'],
          },
          actionTask: {
            instruction: 'Zbuduj i przejrzyj viewer-controlled conversion path:',
            checklistItems: ['Companion resource rozszerza video i działa dostępnie', 'CTA, commercial relationship, destination i data exchange są jasne', 'Landing page jest szybki, mobile, accessible i data-minimised', 'Udokumentowano UTM taxonomy, consent, retention i attribution limits', 'Zaplanowano link tests, opt-outs, complaints, activation i update ownership'],
            toolboxCategory: 'landingpage',
          },
        },
      },
    },
    39: {
      title: '39. Zrównoważone visual discovery na Pinterest',
      subtitle: 'Visual search oparty na odbiorcy, użyteczne Piny, zgodne linki i governed publishing',
      description: 'Buduj utrzymywalną obecność na Pinterest przez trafne treści wizualne, prawdziwe metadata, dostępne destinations i mierzone eksperymenty — bez gwarancji passive traffic, repetitive automation lub zmyślonego purchase intent.',
      lessons: {
        '39.1': {
          stageTitle: '39. Pinterest discovery i architektura Pina',
          title: 'Badaj tematy i twórz użyteczne, odkrywalne Piny',
          description: 'Łącz potrzeby planowania odbiorców z dokładnymi tytułami, opisami, obrazami i landing pages, traktując format oraz ranking advice jako hipotezy.',
          learnContent: {
            videoTitle: 'Masterclass: Pinterest visual discovery oparte na dowodach',
            summaryText: 'Pinterest wspiera discovery, planowanie i inspirację, lecz intent użytkownika się różni, a format, keyword placement czy claimed domain nie gwarantuje rankingu, klików lub longevity. Podstawą są użyteczne treści i godne zaufania destinations.',
            bulletPoints: [
              'Badaj język odbiorców przez Pinterest search i Trends gdzie dostępne, następnie waliduj własnymi zapytaniami, contentem i destination evidence',
              'Naturalnie używaj opisowych Pin titles, board context i znaczenia obrazu; unikaj keyword stuffing i unsupported claims',
              'Projektuj czytelne vertical creative jako opcję do testu, nie uniwersalną formułę high-CTR, i sprawdzaj mobile cropping oraz dostępność',
              'Claimuj właściwą stronę i konfiguruj wspierane metadata tylko wtedy, gdy dokładnie odpowiadają stabilnemu, zgodnemu destination',
            ],
            coreConcepts: [
              { iconName: 'search', title: 'TRAFNOŚĆ TEMATU', description: 'Połącz potrzebę, visual, title, description, board i landing page wokół jednego realnego tematu bez repetitive lub misleading variants.', highlight: true },
              { iconName: 'image', title: 'DOSTĘPNY VISUAL', description: 'Używaj czytelnego tekstu, kontrastu, meaningful imagery i destination context; istotna informacja nie może być wyłącznie na obrazie.' },
            ],
            resources: [
              { title: 'Workbook tematów i jakości Pina', subtitle: 'Research, claims, rights, dostępność, destination i review', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Kit review szablonów Pinterest GOM-MAR', subtitle: 'Adaptowalne layouts z kontrolą jasności i dostępności', type: 'tool', iconName: 'layout', actionUrl: 'tools' },
            ],
            fullArticleGuide: `### Projektuj dla użytecznego visual discovery

Pinterest łączy visual browsing, search i recommendations. Niektóre Piny mogą długo otrzymywać impressions, inne nie. Longevity, traffic i purchase intent są wynikami do obserwacji, nie obietnicami.

#### Odpowiedzialny workflow visual search

1. **Zdefiniuj jedno zadanie odbiorcy**: Określ osobę, plan lub problem oraz użyteczny wynik na destination.
2. **Badaj język i kontekst**: Sprawdź suggestions, Trends gdzie dostępne, pytania, własne analytics i credible sources. Zapisz region, język, sezon i datę.
3. **Weryfikuj claims i rights**: Uzasadnij korzyści, ceny i porównania. Oczyść photos, illustrations, fonts, logos, testimonials i AI assets oraz ujawnij material relationships.
4. **Twórz spójny content cluster**: Organizuj boards i Piny wokół zrozumiałych tematów. Nazwy i opisy wyjaśniają scope, nie powtarzają list keywords.
5. **Projektuj dostępne creative**: Testuj vertical formats właściwe dla placement, czytelną typography, contrast, margins i mobile crop. Dodaj meaningful text alternatives, a istotne dane powtórz jako accessible text.
6. **Pisz dokładne metadata**: Zwięzły title i naturalny description odpowiadają obrazowi i destination. Nie obiecuj checklist, recipe, result lub price, których strona nie daje.
7. **Poprawnie używaj website i metadata features**: Claimuj tylko własne domains, chroń account i wdrażaj supported rich metadata z aktualnej source page. Testuj update i removal.
8. **Publikuj mały baseline**: Zacznij od manageable zestawu rzeczywiście różnych Pins. Bez near-duplicates, irrelevant boards i arbitralnej daily volume.
9. **Mierz w kontekście**: Oceniaj impressions, saves, outbound clicks i destination quality według topic, format, device i period. Features się zmieniają, mała próba nie jest ranking law.
10. **Poprawiaj jedną zmienną**: Testuj meaningful difference w image, title lub proposition z prawdziwymi claims. Dokumentuj hypothesis, dates i decision.
11. **Utrzymuj destinations**: Monitoruj speed, mobile, accessibility, redirects, consent, disclosures, availability i link health. Usuwaj stare ceny i expired offers.
12. **Przeglądaj wpływ**: Śledź complaints, hides, policy warnings, misleading-click signals i conversion quality. Wycofuj content dający traffic przez confusion.

Consistency oznacza utrzymywanie użytecznego procesu publikacji i review, nie trzy do pięciu Pins dziennie bez względu na wartość.`,
            practicalExamples: [
              'Pin przepisu Vital50 używa czytelnego vertical image, dokładnie nazywa recipe i linkuje pełną accessible instrukcję zamiast gated unrelated offer.',
              'Pin z wysokimi impressions daje immediate exits przez overstatement; zostaje poprawiony, a nie sklonowany.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Pinterest może wspierać long-term discovery, ale trwały traffic wynika z relevant, accurate i maintained content, nie stałego formatu lub quota.',
            keyPrinciples: ['Dopasuj visual, metadata i destination', 'Testuj formats i keywords zamiast traktować je jako ranking rules', 'Mierz user value i destination quality obok reach'],
          },
          actionTask: {
            instruction: 'Przygotuj odpowiedzialny pilot Pinterest discovery:',
            checklistItems: ['Udokumentowano audience task, topic evidence, region, language i season', 'Sprawdzono business account, domain ownership i security', 'Pięć różnych Pins ma uzasadnione claims, cleared assets i accessible design', 'Boards, titles, descriptions i destinations są zgodne', 'Określono analytics baseline, review, complaints, link health i update owner'],
            toolboxCategory: 'content',
          },
        },
        '39.2': {
          stageTitle: '39. Governed Pinterest publishing i journey',
          title: 'Planuj użyteczne Piny bez tworzenia automated spam',
          description: 'Używaj approved publishing, human review i resilient landing pages, ograniczając manual work z zachowaniem accuracy, consent, security i editorial control.',
          learnContent: {
            videoTitle: 'Masterclass: Odpowiedzialne Pinterest publishing pipelines',
            summaryText: 'Automation może planować approved content, ale nie czyni kanału pasywnym. Guidelines Pinterest zakazują unapproved automation oraz repetitive, misleading lub irrelevant content. Każdy generated variant potrzebuje celu, review i maintained destination.',
            bulletPoints: [
              'Używaj scheduling wspieranego przez Pinterest, approved partner tools lub authorised APIs i respektuj aktualne account, rate oraz feature limits',
              'Generuj variants tylko przy meaningful difference w image, audience angle lub destination value, nie by omijać spam detection',
              'Porównuj direct landing pages i użyteczne editorial pages według audience task, disclosure, dostępności i downstream quality',
              'Promuj organic content dopiero po policy, rights, tracking i customer-outcome review; mały daily budget nie gwarantuje scale',
            ],
            coreConcepts: [
              { iconName: 'repeat', title: 'APPROVED SCHEDULING', description: 'Human-approved queue publikuje przez supported methods z rate controls, logs, pause, retries i safe failure.', highlight: true },
              { iconName: 'zap', title: 'CELOWA WARIACJA', description: 'Każdy variant testuje udokumentowaną hipotezę i dodaje wartość. Repetition dla volume nie jest content strategy.' },
            ],
            resources: [
              { title: 'Blueprint Pinterest publishing governance', subtitle: 'Approvals, API boundaries, rights, logs, incidents i rollback', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Monitor destination Pinterest Mara CRM', subtitle: 'Mobile pages, UTM, consent, errors i link health', type: 'tool', iconName: 'layout', actionUrl: 'landingpage' },
            ],
            fullArticleGuide: `### Automatyzuj kolejkę, nie odpowiedzialność redakcyjną

Publishing pipeline ogranicza ręczne uploady, ale quality, policy, rights, destination reliability i measurement nadal mają human ownera. Monthly traffic i czas pracy zależą od niszy, assets, tools oraz review.

#### Governed monthly cycle

1. **Ustal scope i capacity**: Określ account, markets, topics, destinations, frequency range, budget, ownerów i excluded content. Capacity jest przed volume target.
2. **Wybierz authorised route**: Potwierdź, że scheduler, partner tool lub API jest obecnie approved i zgodny z Pinterest terms. Nie automatyzuj browser actions przez unapproved services.
3. **Buduj ze zweryfikowanego source content**: Wybierz maintained articles, products lub resources z dowodami, rights, availability i audience benefit. AI output jest draftem do fact i rights review.
4. **Twórz purposeful variants**: Zapisz, co i dlaczego się zmienia: audience angle, genuine image, format lub proposition. Unikaj superficial duplicates do tej samej page.
5. **Wykonaj editorial checks**: Sprawdź accuracy, language, spelling, brand, accessibility, commercial disclosure, sensitive topics i zgodność Pin-destination.
6. **Chroń integrację**: Stosuj scoped credentials, secure secret storage, osobne environments gdzie praktyczne, minimal permissions, logs, rate limits i prompt revocation. Bez tokens w templates lub screenshots.
7. **Planuj konserwatywnie**: Rozkładaj content według relevance i observed patterns, nie zmyślonych active times. Wykrywaj duplicate payload i zapewnij manual pause oraz approval.
8. **Bezpiecznie obsługuj failures**: Używaj idempotency, bounded retries i alerts dla rejected Pins, expired tokens, invalid media oraz broken links. Bez endless retries lub partial records.
9. **Przygotuj destination**: Testuj mobile speed, accessibility, ownership, terms, affiliate disclosure, consent, form delivery i useful content. Uniwersalne 1.5 sekundy nie gwarantuje wyniku.
10. **Mierz contribution**: Standaryzuj UTM bez personal data i analizuj valid sessions, engagement, sign-ups, opt-outs, sales quality, refunds i complaints. Respektuj consent i attribution limits.
11. **Osobno zatwierdzaj paid amplification**: Sprawdź ad eligibility, claims, audience settings, budget cap, billing i landing compliance. Prowadź bounded experiment ze stop rule zamiast „scale top 5%”.
12. **Przeglądaj i utrzymuj**: Pauzuj słaby lub harmful content, odświeżaj sources, rotuj meaningful creative i audituj permissions, disclosure oraz logs. Publishing nie jest set-and-forget.

Najbezpieczniejszy pipeline pozwala inspect, pause, correct i retire każdy Pin.`,
            practicalExamples: [
              'Cztery maintained articles dają osiem rzeczywiście różnych Pins po human review claims i rights; approved scheduler publikuje z duplicate detection i pause.',
              'Destination zwraca errors, więc monitoring pauzuje queued Pins i alarmuje ownera zamiast wysyłać users do broken funnel.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Odpowiedzialna automation ogranicza repetitive operations, a human owners odpowiadają za każdy Pin, destination i outcome.',
            keyPrinciples: ['Używaj tylko approved automation i scoped access', 'Każdy variant wymaga distinct value i human review', 'Wbuduj pause, monitoring, correction i retirement'],
          },
          actionTask: {
            instruction: 'Skonfiguruj controlled Pinterest publishing pilot:',
            checklistItems: ['Potwierdzono approved method, scope, permissions i policy owner', 'Sprawdzono source content, rights, claims, disclosures i accessibility', 'Skonfigurowano purposeful variants, schedule, approvals i duplicate controls', 'Przetestowano landing health, consent, UTM i failure alerts', 'Przypisano budget cap, quality metrics, stop rule, audit i maintenance dates'],
            toolboxCategory: 'landingpage',
          },
        },
      },
    },
    40: {
      title: '40. Odpowiedzialny TikTok Shop, creator affiliate i social commerce',
      subtitle: 'Eligibility rynku, prawdziwe listings, fair creator partnerships i controlled paid amplification',
      description: 'Oceniaj i prowadź TikTok commerce odpowiedzialnie tam, gdzie jest dostępny, z compliant products, reliable fulfilment, transparent affiliate relationships, creator rights i testami zamiast gwarancji viral orders.',
      lessons: {
        '40.1': {
          stageTitle: '40. Architektura TikTok Shop i creator partnerships',
          title: 'Skonfiguruj zgodny shop i uczciwy creator affiliate programme',
          description: 'Zweryfikuj aktualną eligibility rynku i produktu, zbuduj pewne operacje commerce i rekrutuj właściwych creators przez jasne warunki, realny wybór oraz accountable oversight.',
          learnContent: {
            videoTitle: 'Masterclass: TikTok Shop readiness i creator partnerships',
            summaryText: 'TikTok Shop features, wspierane products, fees, affiliate tools i checkout flows różnią się według rynku i zmieniają w czasie. In-app commerce może ograniczyć kroki, ale nie usuwa wahania klienta, compliance ani operational risk.',
            bulletPoints: [
              'Przed listing sprawdź seller, market, product category, tax, consumer, safety i logistics requirements',
              'Ustal commission i programme access według verified unit economics, service capacity i aktualnych platform options, nie uniwersalnego procentu',
              'Oferuj samples na pisemnych warunkach zachowujących honest creator judgment i jasne disclosure gift oraz commission',
              'Używaj product tags i creator content tylko z current eligibility, dokładnym inventory i explicit content oraz advertising permissions',
            ],
            coreConcepts: [
              { iconName: 'shopping-bag', title: 'COMMERCE READINESS', description: 'Product legality, dokumentacja, listing accuracy, inventory, fulfilment, returns, support, privacy i incident ownership są sprawdzone przed startem.', highlight: true },
              { iconName: 'users', title: 'FAIR CREATOR PARTNERSHIP', description: 'Creators są niezależnymi partnerami z transparent compensation, disclosures, creative boundaries, usage rights, safety i praktycznym exit, nie „armią”.' },
            ],
            resources: [
              { title: 'Pakiet TikTok Shop readiness i creator agreement', subtitle: 'Eligibility, economics, claims, samples, rights i monitoring', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Rejestr social-commerce operations Mara CRM', subtitle: 'Products, creators, permissions, orders, returns i incidents', type: 'tool', iconName: 'shopping-cart', actionUrl: 'settings' },
            ],
            fullArticleGuide: `### Social commerce zaczyna się od gotowości operacyjnej i klienta

Discovery może pochodzić z search, recommendations, creator content lub advertising. Żaden kanał nie usuwa potrzeby suitable product, truthful offer, informed choice i reliable fulfilment.

#### Odpowiedzialny workflow setup

1. **Sprawdź bieżącą dostępność**: Potwierdź TikTok Shop i affiliate features dla kraju sprzedawcy, rynku klienta, entity i account. Nie omijaj kontroli regionalnych lub identity.
2. **Sprawdź produkt**: Zweryfikuj category eligibility, safety, recalls, age restrictions, certifications, labelling, IP, claims, warranty i consumer rights. Wsparcie physical i digital products może się różnić.
3. **Modeluj pełną ekonomię**: Uwzględnij product, sample, creator, platform, payment, tax, shipping, returns, support, ad, fraud i chargeback costs. Ustal loss limit; low price lub wow effect nie tworzy automatycznie demand.
4. **Buduj dokładne listings**: Używaj owned lub licensed assets i dopasuj title, images, variant, quantity, condition, ingredients/specifications, delivery i total price do przesyłki.
5. **Przygotuj fulfilment i service**: Sprawdź inventory, packaging, carrier, truthful tracking, updates, cancellation, returns, refunds, complaints i recalls. Nie fałszuj logistics ani nie ujawniaj danych unauthorized suppliers.
6. **Zdefiniuj creator profile**: Wybieraj według audience fit, content quality, safety, disclosure history, rights, language i reliability, nie follower count lub presumed conversion band.
7. **Opublikuj fair programme terms**: Podaj commission basis, attribution, payment timing, reversals, samples, disclosures, prohibited claims, deliverables, ownership, licence, edit rights, termination i dispute route.
8. **Uczciwie obsługuj samples**: Free lub discounted product jest material relationship. Nie wymagaj positive review. Posting obligation uzgodnij przed wysyłką i pozwól na truthful experience oraz compliant disclosure.
9. **Chroń outreach i dane**: Używaj authentic brand accounts, relevant welcomed contact i secure forms. Bez bulk unsolicited messages, false flattery, upfront fees, credential requests i unnecessary identity collection.
10. **Szkol i review proporcjonalnie**: Daj current product evidence, disclosure examples i prohibited claims. Review high-risk posts przed publikacją, nie dyktując false personal opinion.
11. **Kontroluj permissions**: Uzyskaj explicit, scoped permission na repost, edit, whitelisting, Spark Ads lub paid use. Zapisz post, territory, channels, term, compensation i revocation.
12. **Pilotuj i monitoruj**: Zacznij od limited products i creators. Śledź approved content, valid orders, delivery, returns, complaints, disclosure, creator payment, customer outcome i margin. Pauzuj przy safety, policy lub fulfilment failure.

Wymagania TikTok i local law trzeba sprawdzać przy launch i okresowo; platform access nie dowodzi legal compliance.`,
            practicalExamples: [
              'Merchant pilotuje jeden documented product z trzema creators, written sample/licence terms, conspicuous disclosures i returns capacity test przed expansion.',
              'Creator nie lubi sample i odmawia endorsement; brand nie żąda pochwały ani nie używa draft jako ad.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Trwały creator-commerce programme opiera się na eligible products, reliable operations, truthful recommendations, clear compensation i controlled rights, nie scale promises.',
            keyPrinciples: ['Sprawdź market i product rules przed listing', 'Free products i commission wymagają clear disclosure', 'Creator content potrzebuje explicit, scoped usage permission'],
          },
          actionTask: {
            instruction: 'Przygotuj controlled TikTok Shop creator pilot:',
            checklistItems: ['Zweryfikowano market, seller, product, tax, safety i consumer eligibility', 'Przetestowano listing, inventory, fulfilment, returns, support i unit economics', 'Udokumentowano creator criteria i fair programme terms', 'Kontrolowane są samples, disclosures, claims, content rights i paid permissions', 'Przypisano pilot limits, monitoring, payment, incident i stop rules'],
            toolboxCategory: 'affiliate',
          },
        },
        '40.2': {
          stageTitle: '40. Prawdziwy short-form commerce content',
          title: 'Briefuj UGC-style videos z disclosure reklamy i realną demonstracją',
          description: 'Rozwijaj short-form creative, które jest jasne, engaging i native dla formatu, a jednocześnie rozpoznawalne jako commercial content, evidence-based i accessible.',
          learnContent: {
            videoTitle: 'Masterclass: Odpowiedzialne creator briefs i short-form tests',
            summaryText: 'Commercial creator content nie może być projektowany tak, by „nigdy nie wyglądał jak reklama”. Authenticity oznacza genuine experience, nie concealed sponsorship. Żaden hook, smartphone aesthetic ani UGC nie gwarantuje revenue.',
            bulletPoints: [
              'Zacznij od truthful, relevant demonstration lub question i od początku jasno pokaż commercial relationship',
              'Pokazuj actual product i typical use bez staged before-after, fabricated discovery story lub unsupported outcomes',
              'Briefuj mandatory facts, safety, claims, disclosure i deliverables, zostawiając miejsce na honest creator voice',
              'Paid amplification stosuj tylko z explicit creator authorisation, verified ad setup, budget cap i customer-outcome guardrails',
            ],
            coreConcepts: [
              { iconName: 'video', title: 'DISCLOSED AUTHENTICITY', description: 'Creator mówi z realnego doświadczenia i jasno identyfikuje payment, commission, free product lub material connection w samym content.', highlight: true },
              { iconName: 'trending-up', title: 'CONTROLLED AMPLIFICATION', description: 'Organic response jest jednym input. Paid use wymaga osobnych rights, policy review, measurement, frequency control i stop rule.' },
            ],
            resources: [
              { title: 'Template creator brief, disclosure i claims', subtitle: 'Facts, prohibited claims, accessibility, rights i approvals', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Asystent short-form drafts GOM-MAR', subtitle: 'Testable concepts z kontrolą evidence i disclosure', type: 'tool', iconName: 'cpu', actionUrl: 'tools' },
            ],
            fullArticleGuide: `### Twórz short-form commerce content, który ludzie rozpoznają i któremu ufają

Pierwsze sekundy wpływają na uwagę, lecz nie decydują o viral. Odpowiedzialny brief pomaga creatorowi komunikować szybko bez false personal story lub ukrywania ad relationship.

#### Workflow briefu i produkcji

1. **Zdefiniuj audience task**: Określ odbiorcę, use situation, material product facts, exclusions i safe next action.
2. **Utwórz substantiated claim sheet**: Wymień permitted claims, evidence, conditions, typical results, mandatory warnings i prohibited wording. High-risk health, finance lub safety wymaga qualified review.
3. **Wybierz truthful concept**: Demonstration, comparison, tutorial, unboxing lub problem-response. Before-after wymaga genuine, representative, documented conditions bez misleading edit.
4. **Uczyń advertising oczywistym**: Ujawnij payment, affiliate commission, gifted sample, employment lub material connection jasno w video i gdzie wymagane w caption/platform tools. Bez vague tags.
5. **Zachowaj creator voice**: Określ facts, compliance boundaries i deliverables, ale nie wymagaj claim, którego creator nie może uczciwie zrobić, ani scriptu udającego spontaneous discovery.
6. **Projektuj dokładny opening**: Pokaż real product, context i truthful benefit. Bez stop-scroll threats, false enemies, fear, fabricated scarcity i bait.
7. **Demonstruj bezpiecznie**: Użyj actual variant, instructions, age restrictions i warnings. Nie ukrywaj setup, side effects, limits, accessories lub recurring costs.
8. **Zapewnij accessible media**: Edited captions, readable text, contrast, safe audio, meaningful visuals i bez flashing. Disclosure ma być perceivable i wystarczająco długo widoczne.
9. **Użyj fair CTA**: Podaj destination, total price i material terms; scarcity i discounts muszą być realne. Daj dostęp do details, returns i support.
10. **Approve bez falsifying**: Review disclosure, claims, rights, safety i listing match. Poprawiaj errors, chroniąc independent opinion i oznaczając dramatisation.
11. **Osobno autoryzuj paid use**: Dla Spark Ads zapisz account/post, channels, territory, duration, editing, compensation, audience i revocation.
12. **Uruchom bounded experiment**: Ustal budget, duration, audience, variants, attribution limits i stop thresholds. Mierz valid orders, cancellations, returns, complaints, margin, frequency i satisfaction.
13. **Monitoruj i zamknij**: Sprawdzaj live disclosures i comments, usuwaj expired claims, stop ads po expiry rights, płać creators i archiwizuj evidence.

Native style może poprawić relevance, lecz advertising pozostaje recognisable i truthful.`,
            practicalExamples: [
              'Creator mówi, że product był gifted i link może dać commission, pokazuje zwykłe użycie oraz benefit i limitation w captions i speech.',
              'Organic post otrzymuje licence na 14-day Spark Ads test z written authorisation, capped budget i stop przy excessive returns lub complaints.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Skuteczny creator content łączy genuine experience, conspicuous disclosure, substantiated claims i controlled rights; nie udaje unpaid recommendation.',
            keyPrinciples: ['Commercial content musi być rozpoznawalne jako advertising', 'Nie skryptuj experience lub results bez weryfikacji', 'Paid amplification wymaga osobnej zgody i downside controls'],
          },
          actionTask: {
            instruction: 'Przygotuj i przetestuj responsible creator brief:',
            checklistItems: ['Udokumentowano audience, product facts, evidence, limits i prohibited claims', 'Compensation, gift i affiliate disclosure są jasne w content', 'Creator zachowuje truthful voice i safe demonstration', 'Sprawdzono captions, readable text, listing match i fair CTA', 'Zatwierdzono usage rights, ad authorisation, budget, metrics i stop rule'],
            toolboxCategory: 'content',
          },
        },
      },
    },
    41: {
      title: '41. Odpowiedzialna gamification i motywacja uczących się',
      subtitle: 'Dobrowolny progress support, meaningful feedback, inclusive challenges i prywatne osiągnięcia',
      description: 'Używaj game-inspired elements tylko dla wsparcia learning, autonomii i wellbeing, z accessible alternatives, privacy i evidence — nigdy addictive loops, loss pressure ani guaranteed completion.',
      lessons: {
        '41.1': {
          stageTitle: '41. Learner-centred gamification architecture',
          title: 'Projektuj progress, feedback i optional streaks bez przymusu',
          description: 'Łącz feedback, milestones i practice z realnymi learning outcomes, pozwalając pause, opt-out i recovery bez wstydu lub kary.',
          learnContent: {
            videoTitle: 'Masterclass: Etyczna gamification w digital learning',
            summaryText: 'Course completion zależy od learnera, celu, trudności, supportu i measurement. XP, badges i streaks mogą pomóc jednym, a innych rozpraszać lub naciskać; „dopamine loops” nie uzasadniają addictive design ani obietnicy wielokrotnego completion.',
            bulletPoints: [
              'Zacznij od measurable learning outcome i dodawaj game elements tylko dla useful feedback, choice lub practice',
              'Oferuj streaks jako optional routines z pause, grace i recovery zamiast groźby utraty progress',
              'Progress i achievement są private by default, a social sharing wymaga clear permission',
              'Zapewnij reduced-motion, sound-off, non-competitive i assistive-technology alternatives dla celebrations i points',
            ],
            coreConcepts: [
              { iconName: 'zap', title: 'MEANINGFUL FEEDBACK', description: 'Feedback wyjaśnia wykonanie, naukę i next useful option; nie wykorzystuje variable rewards ani nie ukrywa goal learnera.', highlight: true },
              { iconName: 'award', title: 'RECOVERABLE ROUTINE', description: 'Optional streak można pause i restore bez utraty ukończonej nauki, dostępu, statusu lub paid value.' },
            ],
            resources: [
              { title: 'Workbook etycznej gamification i dostępności', subtitle: 'Outcomes, choice, privacy, safeguards, tests i retirement', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Prywatny progress tracker GOM-MAR', subtitle: 'Learner-controlled milestones, reminders i accessibility settings', type: 'tool', iconName: 'award', actionUrl: 'progress' },
            ],
            fullArticleGuide: `### Używaj game elements do wspierania nauki, nie zależności

Learning wymaga wysiłku, odpoczynku, kontekstu i meaningful practice. Animations, points lub streaks nie tworzą automatycznie mastery, a uproszczone „dopamine kicks” nie zastępują evidence ani consent.

#### Odpowiedzialny workflow design

1. **Zdefiniuj learning outcome**: Określ, co learner rozumie lub demonstruje, evidence mastery i czego completion nie dowodzi.
2. **Zrozum kontekst learnera**: Badaj cele, czas, disability, language, device, caregiving, work patterns i powody pause. Nie zakładaj, że daily use jest pożądany.
3. **Wybierz minimum useful mechanic**: Dodaj progress, milestone, practice prompt lub feedback tylko dla orientation, recall lub skill. Zapisz hypothesis i non-gamified alternative.
4. **Przedstawiaj progress prawdziwie**: Opieraj go na meaningful completion, nie screen time, clicks lub unnecessary activity. Wyjaśnij calculation i pozwól poprawić errors.
5. **Uczyń streaks optional i forgiving**: Zapewnij opt-in, quiet days, timezone, pause i recovery. Nie usuwaj completed work, paid access ani nie shame za odpoczynek.
6. **Projektuj notifications z szacunkiem**: Proportionate frequency, preview, quiet hours i granular pause/unsubscribe. Bez urgency lub loss language.
7. **Achievements private by default**: Learner wybiera, czy badge, certificate, streak lub score pojawia się przy peers lub social networks. Sharing nie ujawnia sensitive learning, purchase ani performance.
8. **Buduj accessible feedback**: Keyboard, screen readers, contrast, zoom i reduced motion. Confetti, colour, sound i haptics mają equivalent feedback i controls.
9. **Unikaj deceptive rewards**: Bez random rewards, artificial scarcity, purchased status, hidden odds lub reward withdrawal dla time spent. Virtual points mają jasne meaning i bez monetary implication.
10. **Chroń dzieci i vulnerable learners**: Stosuj stronger safeguards, age-appropriate design i qualified review. Nie profiluj distress, financial vulnerability ani compulsive behaviour dla engagement.
11. **Testuj learning i wellbeing**: Porównuj retention wiedzy, task success, accessibility, pressure, interruptions, opt-outs i support requests, nie daily opens. Segmentuj ostrożnie.
12. **Utrzymuj i wycofuj**: Monitoruj complaints, compulsive-use signals, inequity i feature drift. Usuwaj mechanics zwiększające activity kosztem learning, autonomy lub wellbeing.

Najlepszym success indicator jest użyteczna nauka pasująca do życia, nie unbroken streak.`,
            practicalExamples: [
              'Learner pauzuje reminders podczas shift work i wraca z intact lessons; progress pozostaje private, chyba że wybierze sharing certificate.',
              'Celebration używa text confirmation, optional sound i motion; milestone jest w pełni zrozumiały dla screen-reader user.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Etyczna gamification czyni learning jaśniejszym i manageable, zachowując rest, privacy, accessibility i right to opt out.',
            keyPrinciples: ['Łącz mechanics z learning outcomes, nie time spent', 'Streaks i reminders mają być voluntary i recoverable', 'Progress jest private i accessible by default'],
          },
          actionTask: {
            instruction: 'Zaprojektuj learner-centred gamification pilot:',
            checklistItems: ['Określono learning outcome, mastery evidence i non-gamified path', 'Progress logic jest accurate, understandable i correctable', 'Określono streak, reminders, pause, recovery i opt-out', 'Przetestowano privacy, sharing, reduced-motion, sound-off i assistive alternatives', 'Zaplanowano learning, wellbeing, complaints i retirement guardrails'],
            toolboxCategory: 'content',
          },
        },
        '41.2': {
          stageTitle: '41. Inclusive community challenges',
          title: 'Prowadź collaborative quests bez public pressure i unfair rankings',
          description: 'Twórz time-bounded, voluntary community activities wspierające practice i peer support z ochroną consent, privacy, accessibility i osób o różnych zasobach.',
          learnContent: {
            videoTitle: 'Masterclass: Inclusive community challenges i peer support',
            summaryText: 'Community może wspierać naukę, ale public leaderboards i prizes mogą ujawniać dane, nagradzać spam, wzmacniać comparison i szkodzić osobom z mniejszą ilością czasu. Challenges mają być voluntary, cooperative i oceniane przez learning, nie loyalty.',
            bulletPoints: [
              'Określ realistyczny skill lub contribution goal z flexible participation windows i individual route',
              'Używaj private lub team progress i opt-in recognition zamiast public performance lub revenue',
              'Matchuj learning partners tylko z informed agreement, compatible preferences, boundaries i easy rematch/exit',
              'Nagradzaj evidence of learning, helpfulness i reflection przez transparent criteria, nie raw activity, sales lub constant presence',
            ],
            coreConcepts: [
              { iconName: 'users', title: 'CONSENTED PEER SUPPORT', description: 'Participants wybierają join, sharing i matching. Expectations, reporting, safeguarding i exit są jasne.', highlight: true },
              { iconName: 'trophy', title: 'COOPERATIVE MILESTONE', description: 'Grupa pracuje nad accessible shared outcome; recognition jest optional i nie rankuje personal worth lub commercial success.' },
            ],
            resources: [
              { title: 'Guide inclusive challenge i community safety', subtitle: 'Consent, accessibility, moderation, criteria i evaluation', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Controls participation Mara CRM', subtitle: 'Opt-in, preferences, private progress i safeguarding records', type: 'tool', iconName: 'award', actionUrl: 'crm' },
            ],
            fullArticleGuide: `### Buduj community practice bez zamieniania learners w leaderboard

Shared challenge może dać strukturę i encouragement, lecz duration, competition i prizes nie gwarantują participation, completion ani loyalty. Projektuj dla różnych schedules, abilities i motivations.

#### Inclusive challenge lifecycle

1. **Zdefiniuj learning purpose**: Wybierz skill, habit lub contribution do safe practice. Podaj prerequisites, non-goals, evidence i wartość community.
2. **Participation voluntary**: Przed opt-in wyjaśnij workload, dates, data use, communications, visibility, prizes i alternatives. Paid learning nie zależy od join.
3. **Oferuj flexible pacing**: Suggested path plus catch-up, pause i asynchronous options. Bez rigid daily schedule bez educational necessity.
4. **Ustal accessible tasks**: Plain language, multiple formats, sufficient time i reasonable alternatives. Nie wymagaj public video, income disclosure, purchases lub social posting.
5. **Ustanów community safeguards**: Opublikuj conduct, moderation, reporting, escalation, privacy i emergency boundaries. Trenuj moderators; peers nie są therapists ani professional advisers.
6. **Matchuj buddies za zgodą**: Zbieraj necessary preferences, bez sensitive inference, pozwól decline, block, rematch i leave. Nie udostępniaj contact details przed obustronną zgodą.
7. **Preferuj cooperation**: Shared milestones, personal baselines lub private reflection. Jeśli leaderboard jest użyteczny, ma opt-in, explained score, limited visibility i non-ranked mode.
8. **Używaj fair criteria**: Nie nagradzaj message volume, revenue lub uninterrupted attendance. Waliduj helpfulness i learning evidence, zapobiegaj gaming i daj correction/appeal.
9. **Transparent rewards**: Podaj eligibility, selection, value, tax gdzie właściwe, fulfilment i conflicts. Rewards nie naciskają na overspending lub excessive activity.
10. **Chroń data i identity**: Participation, performance, purchases i revenue są private by default. Stosuj retention, access, deletion i image-consent.
11. **Wspieraj live i asynchronous access**: Caption sessions, summaries i essential content poza attendance. Record tylko z informed notice i managed replay.
12. **Oceniaj balanced outcomes**: Mierz learning, belonging, accessibility, workload, drop-out, conflict, pressure, reports i support. Bez claim, że buddy podwaja completion bez evidence.
13. **Zamknij odpowiedzialnie**: Celebruj według choice, dostarcz rewards, revoke temporary access, zachowaj necessary records i opublikuj improvements.

Ludzie mogą cenić content, community, quiet independent study lub mix. Status nie może być ceną belonging.`,
            practicalExamples: [
              '14-day planning challenge oferuje trzy tasks tygodniowo, asynchronous alternatives i private progress; buddy matching i public recognition mają osobne opt-in.',
              'Zamiast rankingu revenue grupa unlockuje shared resource po peer-reviewed practice, a non-competitive learners otrzymują ten sam core learning.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Zdrowy community challenge wzmacnia practice i support przez choice, safety i inclusion, nie public comparison, pressure lub promised loyalty.',
            keyPrinciples: ['Community participation i visibility wymagają informed choice', 'Używaj cooperative lub private progress przed public rankings', 'Nagradzaj learning i helpfulness bez krzywdzenia osób z limited time/resources'],
          },
          actionTask: {
            instruction: 'Przygotuj inclusive community challenge:',
            checklistItems: ['Opublikowano learning purpose, workload, flexible path i independent alternative', 'Opt-in, visibility, communications, data i reward terms są jasne', 'Przypisano accessibility, moderation, reporting i safeguarding', 'Skonfigurowano buddy consent, preferences, rematch i exit', 'Zaplanowano review learning, belonging, pressure, inequity i closure'],
            toolboxCategory: 'content',
          },
        },
      },
    },
    42: {
      title: '42. Odpowiedzialny thought leadership na LinkedIn i relacje B2B',
      subtitle: 'Ekspertyza oparta na dowodach, dostępny content, szanujący outreach i accountable lead management',
      description: 'Buduj wiarygodną obecność na LinkedIn i rozwijaj trafne rozmowy B2B bez gwarancji zasięgu, manipulacyjnych engagement tactics, invasive profiling lub automated spamu.',
      lessons: {
        '42.1': {
          stageTitle: '42. Wiarygodny content i profil LinkedIn',
          title: 'Publikuj użyteczną wiedzę i twórz dokładny, dostępny profil',
          description: 'Przekształcaj zweryfikowane doświadczenie w użyteczne posts i documents, jasno pokazując rolę, evidence, ofertę i next step.',
          learnContent: {
            videoTitle: 'Masterclass: LinkedIn content oparty na dowodach dla B2B',
            summaryText: 'Dystrybucja na LinkedIn zmienia się i żaden format, czas publikacji ani engagement window nie gwarantuje zasięgu. Sustainable strategy zaczyna się od potrzeb audience, reliable evidence, jasnego autorstwa i accessibility, a następnie testuje formaty względem meaningful business outcomes.',
            bulletPoints: [
              'Traktuj porady o algorytmie jako testable hypotheses i korzystaj z current first-party analytics zamiast fixed reach formulas',
              'Wybieraj text, image, video lub document według zadania audience, dostępnych dowodów i accessibility needs',
              'Oddzielaj professional opinion od faktu i opieraj claims, examples oraz case studies na właściwych dowodach',
              'Projektuj profil jako dokładne professional introduction z jasną ofertą, disclosures i low-pressure next step',
            ],
            coreConcepts: [
              { iconName: 'file-text', title: 'CONTENT OPARTY NA DOWODACH', description: 'Każdy post ma określone audience question, wiarygodne źródło, useful explanation i proportionate claim zamiast obietnicy viral.', highlight: true },
              { iconName: 'user-check', title: 'WIARYGODNY PROFIL', description: 'Identity, role, experience, services, affiliations i contact route są aktualne, konkretne i niemylące.' },
            ],
            resources: [
              { title: 'LinkedIn Editorial & Evidence Matrix', subtitle: 'Audience questions, sources, formats, accessibility i review', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Asystent draftów LinkedIn GOM-MAR', subtitle: 'Reviewable drafts bez fabricated expertise lub results', type: 'tool', iconName: 'cpu', actionUrl: 'tools' },
            ],
            fullArticleGuide: `### Buduj autorytet przez użyteczność, dokładność i odpowiedzialność

Thought leadership nie jest deklaracją wyższości. To powtarzalna praktyka wyjaśniania istotnych tematów, pokazywania dowodów, przyznawania ograniczeń i wspierania określonej professional audience w lepszych decyzjach.

#### Odpowiedzialny workflow publikacji

1. **Zdefiniuj zadanie audience**: Określ rolę, kontekst i decyzję, którą content ma wspierać. Nie targetuj przez inferred sensitive traits.
2. **Wybierz defensible topic**: Używaj pytań, na które możesz odpowiedzieć przez direct experience, reliable research lub attributed expert sources.
3. **Zbuduj evidence sheet**: Zapisz sources, dates, assumptions, limitations, permissions i review owner. Usuń wymyślone statystyki, clients i outcomes.
4. **Wybierz właściwy format**: Dopasuj text, image, video lub document do wyjaśnienia. Document post nie jest automatycznie lepszy, a reach zależy od account, audience i czasu.
5. **Napisz dokładne otwarcie**: Pokaż problem i wartość bez fear, outrage bait, fake controversy lub twierdzenia, że jedna opinia niszczy branżowy mit.
6. **Wyjaśniaj zamiast deklarować**: Pokazuj method, context i trade-offs. Wyraźnie oznacz opinion, estimates, simulations i sponsored relationships.
7. **Chroń poufność**: Uzyskaj permission na names, logos, screenshots, quotes i case studies. Aggregate lub anonymise tylko przy kontrolowanym re-identification risk.
8. **Zapewnij accessibility**: Używaj descriptive headings, plain language, alt text, edited captions, contrast, readable documents i meaningful link labels.
9. **Review regulated claims**: Legal, financial, health, employment i safety content może wymagać qualified review i jurisdiction caveats.
10. **Przygotuj fair next step**: Oferuj relevant resource, newsletter lub rozmowę z jasnymi terms. Nie ukrywaj lead capture, scarcity lub paid promotion.
11. **Publikuj i moderuj odpowiedzialnie**: Widocznie poprawiaj material errors, odpowiadaj na good-faith questions i zarządzaj harassment bez manufactured engagement.
12. **Mierz useful outcomes**: Analizuj qualified profile visits, saves, meaningful replies, consented enquiries, accessibility feedback i downstream fit, nie same impressions.
13. **Utrzymuj profil**: Aktualizuj role, offer, proof, affiliations, featured links, privacy notice i contact preferences.

Credibility rośnie, gdy reader rozumie źródło claimu, jego znaczenie i ograniczenia.`,
            practicalExamples: [
              'Consultant publikuje process improvement za zgodą clienta, wyjaśnia baseline i limits oraz linkuje methodology bez obietnicy takich samych savings.',
              'Document post ma readable type, text summary i descriptive link; analytics są oceniane po ustalonym okresie bez twierdzenia, że format zawsze potraja reach.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Trwała wiarygodność B2B wynika z useful evidence, dokładnej identity, accessible communication i visible corrections, nie algorithm myths lub dominance claims.',
            keyPrinciples: ['Testuj formaty zamiast obiecywać reach', 'Rozróżniaj evidence, experience i opinion', 'Chroń confidentiality i projektuj accessibility'],
          },
          actionTask: {
            instruction: 'Przygotuj evidence-led LinkedIn profile i content pilot:',
            checklistItems: ['Określono audience question, useful outcome i non-goals', 'Zweryfikowano identity, role, offer, proof i disclosures profilu', 'Sprawdzono sources, permissions, claims i limitations', 'Przetestowano post i destination pod kątem accessibility i mobile', 'Udokumentowano metrics, review date, correction route i stop rule'],
            toolboxCategory: 'content',
          },
        },
        '42.2': {
          stageTitle: '42. Szanujący social selling i executive outreach',
          title: 'Rozwijaj trafne rozmowy B2B bez spamu i presji',
          description: 'Badaj accounts proporcjonalnie, angażuj się autentycznie i zapraszaj do rozmowy tylko przy jasnej relevance, legalnym data use i wyborze odbiorcy.',
          learnContent: {
            videoTitle: 'Masterclass: Permission-aware B2B outreach i discovery',
            summaryText: 'Profile view, sekwencja komentarzy lub value-first message nie gwarantuje meetingu. Odpowiedzialny outreach używa minimalnych relevant data, human review, uczciwego intent, rozsądnej frequency i łatwego decline, mierząc fit i harm obok replies.',
            bulletPoints: [
              'Definiuj legitimate audience criteria bez scrapingu prohibited data lub inferred sensitive characteristics',
              'Używaj public professional context tylko przy relevance i weryfikuj go przed personalisation',
              'Jasno pokazuj identity i commercial intent; nie symuluj friendship ani nie ukrywaj pitchu w unsolicited audit',
              'Stosuj w CRM retention, suppression, access i deletion controls oraz kończ kontakt po odmowie lub repeated non-response',
            ],
            coreConcepts: [
              { iconName: 'send', title: 'SZANUJĄCA RELEVANCE', description: 'Message wyjaśnia dlaczego ta osoba, dlaczego teraz i jaką optional value oferuje, bez surveillance language, pressure lub fabricated familiarity.', highlight: true },
              { iconName: 'calendar', title: 'CONSENTED DISCOVERY', description: 'Call ma jasny purpose, duration, participants i cancellation route; discovery nie jest disguised commitment.' },
            ],
            resources: [
              { title: 'Responsible B2B Outreach Playbook', subtitle: 'Research boundaries, message patterns, objections i suppression', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM B2B Governance Pipeline', subtitle: 'Source, lawful basis, consent, retention, opt-out i deal fit', type: 'tool', iconName: 'users', actionUrl: 'crm' },
            ],
            fullArticleGuide: `### Buduj relacje B2B bez zmiany LinkedIn w surveillance funnel

Social selling ma poprawiać relevance i trust, nie automatyzować unwanted contact. Platform rules, privacy i direct-marketing requirements różnią się według kraju i kontekstu; w razie potrzeby uzyskaj qualified advice.

#### Account-based outreach workflow

1. **Zdefiniuj narrow business problem**: Określ organisations i roles, które mogą realnie skorzystać, wraz z exclusions i disqualifiers.
2. **Ustal governance przed prospectingiem**: Dokumentuj data sources, access, retention, lawful basis, suppression, security, owners i escalation. Nie importuj scraped lub purchased lists bez weryfikacji.
3. **Badaj proporcjonalnie**: Używaj relevant public professional information i company signals. Unikaj sensitive inferences, personal surveillance i intrusive details.
4. **Zweryfikuj record**: Potwierdź role, organisation, market i source date. Oznacz uncertainty zamiast wymyślać personalisation.
5. **Angażuj się tylko autentycznie**: Komentuj, gdy dodajesz substance. Nie używaj generic bot comments do tworzenia sztucznej familiarity.
6. **Napisz transparent invitation**: Przedstaw się, wyjaśnij relevance i pozostaw request optional. Nie udawaj neutral networking dla sales message.
7. **Oferuj wartość bez coercion**: Checklist lub observation ma być użyteczny bez obowiązku meetingu. Nie twórz fikcyjnych wad w unsolicited audit.
8. **Kontroluj frequency**: Ustal małą, udokumentowaną sequence z human approval, quiet periods i immediate suppression po opt-out. Bez endless follow-ups.
9. **Respektuj rules platformy i kanału**: Używaj supported features i current limits. Nie obchodź restrictions, nie automatyzuj prohibited actions i nie przenoś kontaktu bez valid basis.
10. **Prowadź fair discovery call**: Udostępnij agenda, duration i participants; zapytaj o zgodę na notes lub recording. Zbadaj need, stakeholders, constraints, alternatives i no-fit conditions.
11. **Substantiated commercial claims**: Używaj comparable case evidence z context i permission. Nie gwarantuj ROI, access do executives, meeting volume ani wartości contracts.
12. **Zapisuj odpowiedzialnie**: Przechowuj source, status, objections, commitments i next step w CRM z role-based access i retention schedule. Bez sensitive speculation.
13. **Mierz quality i harm**: Analizuj relevant replies, accepted calls, no-fit decisions, complaints, opt-outs, conversion quality, sales cycle i customer outcomes.
14. **Pauzuj i poprawiaj**: Zatrzymaj segment lub message, gdy complaints, low relevance lub poor downstream fit przekroczą agreed threshold.

Szanujące „nie” jest użytecznym wynikiem: chroni obie strony i poprawia targeting.`,
            practicalExamples: [
              'Po przeczytaniu public company report specjalista łączy jeden disclosed operational priority z relevant checklist i jasno pisze, że odpowiedź nie jest wymagana.',
              'Prospect odmawia. CRM zapisuje suppression i retention date, a automation blokuje kolejne messages w całej campaign.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Dobry social selling zdobywa permission przez relevance, transparency i restraint; nie zależy od hidden intent, mass automation lub guaranteed meetings.',
            keyPrinciples: ['Używaj minimalnych verified professional data', 'Wyjaśnij identity, intent i opt-out', 'Mierz complaints i fit obok meetings i revenue'],
          },
          actionTask: {
            instruction: 'Uruchom controlled, respectful B2B outreach pilot:',
            checklistItems: ['Zatwierdzono audience, exclusions, data sources i governance', 'Ręcznie zweryfikowano dziesięć records pod kątem role, relevance i source', 'Message zawiera identity, relevance, optional value i easy decline', 'Przetestowano frequency, suppression, retention i human approval', 'Zaplanowano review quality, complaints, opt-outs, call fit i stop rule'],
            toolboxCategory: 'crm',
          },
        },
      },
    },
    43: {
      title: '43. Uwierzytelnianie e-mail, reputacja nadawcy i odpowiedzialna dostarczalność',
      subtitle: 'SPF, DKIM, DMARC, opcjonalne BIMI, consent-based lists i evidence-led monitoring',
      description: 'Poprawiaj warunki legalnej dostawy e-mail przez poprawne authentication, secure sending operations i zdrowe relacje z odbiorcami — bez gwarancji inbox placement lub sztucznego warm-up traffic.',
      lessons: {
        '43.1': {
          stageTitle: '43. Uwierzytelnianie domeny i sender trust',
          title: 'Bezpiecznie wdrażaj SPF, DKIM i DMARC; BIMI oceniaj osobno',
          description: 'Zidentyfikuj każdego authorised sendera, skonfiguruj authentication etapowo i weryfikuj alignment, reporting oraz operational ownership.',
          learnContent: {
            videoTitle: 'Masterclass: Uwierzytelnianie e-mail i ochrona domeny',
            summaryText: 'Authentication pomaga receiving systems potwierdzić, kto może wysyłać z domeny, ale nie gwarantuje inbox placement. Provider requirements i features zmieniają się, dlatego sprawdzaj current official documentation, testuj każdego sendera i monitoruj wyniki przed zaostrzeniem policy.',
            bulletPoints: [
              'SPF autoryzuje sending infrastructure, ale musi respektować DNS lookup limits i nie powinien być duplikowany',
              'DKIM podpisuje wiadomości; używaj supported key lengths, chroń private keys i planuj rotation selectorów',
              'DMARC ocenia aligned SPF lub DKIM i udostępnia aggregate reporting; enforcement zwiększaj dopiero po review',
              'BIMI ma osobne trademark, logo, certificate i mailbox-provider requirements i nie jest skrótem do deliverability',
            ],
            coreConcepts: [
              { iconName: 'shield-check', title: 'ALIGNED AUTHENTICATION', description: 'SPF i DKIM są skonfigurowane dla każdego real sendera, a co najmniej jeden alignuje się z visible From domain w DMARC.', highlight: true },
              { iconName: 'check-circle-2', title: 'OBSERVED ENFORCEMENT', description: 'DMARC policy jest zaostrzana na podstawie evidence, z ownerami legitimate failures, abuse reports i rollback.' },
            ],
            resources: [
              { title: 'Workbook wdrożenia email authentication', subtitle: 'Inventory, DNS records, alignment, reports, tests i rollback', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Ustawienia sending domain Mara CRM', subtitle: 'Weryfikacja sender configuration i operational ownership', type: 'tool', iconName: 'settings', actionUrl: 'settings' },
            ],
            fullArticleGuide: `### Uwierzytelniaj e-mail bez obiecywania inboxu

SPF, DKIM i DMARC ograniczają impersonation risk i pomagają receivers ocenić identity. Placement nadal zależy od consent, reputation, content, complaints, infrastructure i systemów każdego providera.

#### Bezpieczny rollout authentication

1. **Inventory każdego sendera**: Wymień marketing, transactional, support, CRM, ticketing, billing i third-party services wraz z return-path i ownership subdomen.
2. **Minimalizuj i zabezpieczaj access**: Usuń unknown senders, stosuj scoped credentials, MFA, change control i named incident owner.
3. **Opublikuj jeden valid SPF record**: Uwzględnij tylko authorised sources, respektuj lookup limit i testuj DNS resolution. SPF sam nie chroni visible From.
4. **Włącz DKIM per service**: Preferuj supported strong keys, trzymaj private keys u sendera, dokumentuj selectors i rotuj bez przerywania maili.
5. **Sprawdź identifier alignment**: Potwierdź, że authenticated SPF lub DKIM domain alignuje się z visible From zgodnie z DMARC.
6. **Zacznij DMARC od observation**: Ustaw valid reporting address, chroń report data i analizuj aggregate results. Monitoring policy to etap, nie dowód pełnej ochrony.
7. **Napraw legitimate failures**: Koryguj forwarded, vendor i subdomain flows; nie osłabiaj policy, by ukryć błędy.
8. **Stopniowo zwiększaj enforcement**: Przechodź do quarantine lub reject tylko po reliable authentication, review reports i przygotowaniu rollback.
9. **Rozdziel streams, gdy warto**: Stosuj managed subdomains dla różnych purposes, zachowując truthful brand identity.
10. **Oceń BIMI niezależnie**: Zweryfikuj provider support, enforced DMARC, logo specs, trademark i certificate requirements. Logo display i engagement nie są gwarantowane.
11. **Testuj end to end**: Sprawdź headers, alignment, TLS, links, unsubscribe, replies i bounce handling u representative providers i devices.
12. **Monitoruj ciągle**: Śledź authentication failures, unknown sources, complaints, delivery errors i DNS changes; alarmuj owners i zachowuj audit trail.

Nie kopiuj provider-specific DNS examples bez adaptacji i walidacji dla realnej domeny.`,
            practicalExamples: [
              'Team odkrywa brak DKIM w support platform podczas DMARC monitoring, naprawia alignment i weryfikuje reports przed enforcement.',
              'Brand spełnia BIMI prerequisites, ale traktuje logo display jako optional provider behaviour, nie obiecaną poprawę open rate.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Authentication ustanawia weryfikowalną sending identity i wspiera abuse protection, ale żaden DNS record nie gwarantuje delivery lub placement.',
            keyPrinciples: ['Zidentyfikuj i testuj każdego legitimate sendera', 'Zaostrzaj DMARC z monitored evidence i rollback', 'Traktuj BIMI jako optional branding z osobnymi prerequisites'],
          },
          actionTask: {
            instruction: 'Przygotuj controlled email-authentication deployment:',
            checklistItems: ['Zidentyfikowano sending services, domains, subdomains i owners', 'Zweryfikowano jeden SPF record i DKIM selectors', 'Przetestowano DMARC alignment, reporting mailbox i privacy controls', 'Udokumentowano legitimate failures, enforcement stages i rollback', 'Przypisano monitoring, key rotation, incident response i review dates'],
            toolboxCategory: 'email',
          },
        },
        '43.2': {
          stageTitle: '43. Consent-based list health i reputation monitoring',
          title: 'Buduj zdrowy sending programme bez fake warm-up i engagement myths',
          description: 'Wysyłaj oczekiwane maile w supportable volume, szybko usuwaj invalid addresses i zarządzaj inactive subscribers według context, consent i retention rules.',
          learnContent: {
            videoTitle: 'Masterclass: Odpowiedzialna list hygiene i sending ramp-up',
            summaryText: 'Nie istnieje uniwersalny 30-day plan, sender score lub forbidden-word list gwarantujące deliverability. Sustainable reputation wynika z valid acquisition, expected messages, stable operations, low complaints, accurate bounce handling i provider-specific monitoring.',
            bulletPoints: [
              'Zwiększaj legitimate volume stopniowo według real demand, historycznych signals i provider feedback, nie synthetic exchanges',
              'Używaj confirmed signup tam, gdzie właściwe, i zachowuj source, notice, consent oraz suppression evidence',
              'Szybko suppress hard bounces i complaints; temporary failures badaj przed bounded retries',
              'Definiuj inactivity według purpose i audience oraz oferuj preference controls przed suppression lub deletion',
            ],
            coreConcepts: [
              { iconName: 'trash-2', title: 'PURPOSE-BASED RETENTION', description: 'Retention i inactivity rules uwzględniają consent, message type, customer relationship i legal duties, nie automatyczne 90-day deletion.', highlight: true },
              { iconName: 'trending_up', title: 'BALANCED SIGNALS', description: 'Delivery errors, complaints, unsubscribes, valid engagement i customer outcomes są oceniane razem; opens są privacy-limited i niedoskonałe.' },
            ],
            resources: [
              { title: 'List Health & Sending-Ramp Playbook', subtitle: 'Consent, bounces, complaints, preferences, retention i incidents', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM List-Governance Automation', subtitle: 'Suppression, consent records, preference states i review queues', type: 'tool', iconName: 'mail', actionUrl: 'email' },
            ],
            fullArticleGuide: `### Zwiększaj sending volume z realnej permission, nie simulated activity

Warm-up services tworzące sztuczne opens, replies lub inbox moves mogą generować misleading signals, ujawniać content i credentials oraz naruszać provider rules. Buduj reputation przez prawdziwą, oczekiwaną komunikację.

#### Odpowiedzialny list-health workflow

1. **Mapuj message purposes**: Rozdziel transactional, service, lifecycle i marketing streams z właściwą podstawą, expectations i unsubscribe behaviour.
2. **Waliduj acquisition**: Zapisuj signup source, timestamp, notice i preferences. Nie kupuj, nie scrape i nie append addresses bez valid transparent basis.
3. **Potwierdzaj addresses, gdy właściwe**: Confirmation ogranicza typo i abuse risk; uwzględnij accessibility, failed confirmation i customer support.
4. **Ustal expectations**: Przy signup podaj sendera, subject area i approximate frequency. Respektuj preferences i nie rozszerzaj purpose po cichu.
5. **Rampuj z real demand**: Zacznij od odbiorców oczekujących maila i zwiększaj volume tylko przy zdrowych infrastructure, support i feedback. Bez fixed universal targets.
6. **Utrzymuj spójne operations**: Stosuj stable authenticated domains, predictable From identity, working reply handling i controlled changes.
7. **Poprawnie obsługuj bounces**: Natychmiast suppress valid permanent failures. Retry temporary failures tylko w documented limits i badaj nagłe patterns.
8. **Szybko obsługuj complaints i unsubscribes**: Zastosuj suppression we wszystkich relevant systems i nie dodawaj ponownie bez valid new request.
9. **Ostrożnie interpretuj engagement**: Privacy protection i image blocking zniekształcają opens. Łącz clicks, replies, conversions, preferences, complaints i context bez invasive tracking.
10. **Definiuj inactivity kontekstowo**: Monthly newsletter i annual service notice potrzebują innych windows. Oferuj lower frequency lub pause bez threatening subject lines.
11. **Prowadź fair reconfirmation test**: Wyślij limited, jasno oznaczony message z prostą preference action i bez urgency. Suppress marketing, gdy permission nie da się potwierdzić.
12. **Chroń data lifecycle**: Rozróżniaj deletion od suppression records potrzebnych do opt-out, minimalizuj data i stosuj access, retention oraz audit controls.
13. **Monitoruj per provider i stream**: Analizuj delivery codes, authentication, complaints, block events i representative inbox tests. Provider dashboards pokazują tylko available data.
14. **Stosuj stop rules**: Pauzuj campaigns po nietypowych complaint, bounce lub abuse signals, znajdź root cause i wróć stopniowo po validation.
15. **Uczciwie dokumentuj results**: Usunięcie inactive recipients może zmienić rates przez denominator; nie gwarantuje revenue ani inbox placement.

Celem jest oczekiwany, bezpieczny i użyteczny e-mail, nie największa lista lub cosmetic open rate.`,
            practicalExamples: [
              'Newsletter oferuje monthly, quarterly lub pause preferences przed suppression osób, których marketing permission i interest nie da się już potwierdzić.',
              'Bounce spike automatycznie pauzuje campaign i uruchamia investigation acquisition source i domain configuration zamiast repeated attempts.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Zdrowe email programmes zdobywają uwagę przez permission, relevance i reliable operations; synthetic warm-up i simplistic scores ich nie zastąpią.',
            keyPrinciples: ['Używaj wyłącznie genuine expected traffic', 'Szybko suppress invalid i opted-out addresses', 'Interpretuj metrics w kontekście i utrzymuj stop rules'],
          },
          actionTask: {
            instruction: 'Przeprowadź responsible list-health review:',
            checklistItems: ['Sprawdzono message purposes, acquisition sources, notices i consent evidence', 'Przetestowano hard-bounce, complaint, unsubscribe i retry controls', 'Zdefiniowano inactivity windows i preference options per stream', 'Udokumentowano provider feedback, privacy limits i representative tests', 'Przypisano ramp limits, alerts, stop rule i next review'],
            toolboxCategory: 'email',
          },
        },
      },
    },
    44: {
      title: '44. Odpowiedzialna komunikacja WhatsApp i SMS',
      subtitle: 'Zgoda per kanał, approved messaging, safe automation i szanująca obsługa',
      description: 'Używaj WhatsApp i SMS tylko do oczekiwanej, użytecznej komunikacji z jasną zgodą, current platform compliance, secure data handling i łatwym opt-out — bez uniwersalnych open-rate lub sales guarantees.',
      lessons: {
        '44.1': {
          stageTitle: '44. WhatsApp Business Platform i permission',
          title: 'Skonfiguruj permission-aware komunikację WhatsApp',
          description: 'Wybierz official business solution, zbieraj purpose-specific permission i transparentnie zarządzaj templates, service conversations oraz preferences.',
          learnContent: {
            videoTitle: 'Masterclass: Odpowiedzialny WhatsApp setup i consent',
            summaryText: 'WhatsApp jest personal channel podlegającym platform rules, privacy law i direct-marketing requirements. Checkbox lub template approval sam nie dowodzi lawful informed permission, a żaden kanał nie gwarantuje open lub conversion rate.',
            bulletPoints: [
              'Wybierz Business App lub official Business Platform według support, scale, integration i governance needs',
              'Zbieraj oddzielną, konkretną zgodę na WhatsApp purpose i frequency; nie łącz jej z email, SMS lub general terms',
              'Używaj current approved template categories i service-window rules, sprawdzając official documentation przed startem',
              'Przechowuj source, timestamp, notice version i preferences oraz respektuj opt-out we wszystkich connected systems',
            ],
            coreConcepts: [
              { iconName: 'message-circle', title: 'EXPECTED MESSAGING', description: 'Odbiorca zna sendera, kanał, purpose i approximate frequency przed pierwszą wiadomością.', highlight: true },
              { iconName: 'lock', title: 'VERIFIABLE CHOICE', description: 'Permission i withdrawal są zapisane, granular i równie łatwe jak signup; legal assessment pozostaje zależny od kontekstu.' },
            ],
            resources: [
              { title: 'WhatsApp Permission & Operations Workbook', subtitle: 'Notices, templates, preferences, retention i incidents', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Integracja WhatsApp Mara CRM', subtitle: 'Official account z governed access i consent records', type: 'tool', iconName: 'message-square', actionUrl: 'settings' },
            ],
            fullArticleGuide: `### Traktuj messaging jako zaproszony dostęp, nie gwarantowaną uwagę

WhatsApp może wspierać reminders, service i opted-in marketing, ale setup zależy od rynku, purpose, roli biznesu i current platform terms. W razie potrzeby uzyskaj qualified legal advice.

#### Odpowiedzialny WhatsApp lifecycle

1. **Zdefiniuj jeden message purpose**: Rozdziel service updates, appointments, authentication i marketing. Określ, do czego kanał nie służy.
2. **Wybierz official route**: Porównaj Business App i supported Business Platform providers. Bez browser automation, unofficial clients lub shared personal accounts.
3. **Przypisz accountability**: Wyznacz owners dla templates, privacy, security, support, billing, incidents i platform changes.
4. **Zbieraj informed permission**: Przed opt-in pokaż business identity, channel, purpose, content type, likely frequency, data use i withdrawal. WhatsApp pozostaje optional.
5. **Weryfikuj bez dark patterns**: Confirmation może ograniczyć wrong numbers, ale unikaj preselected boxes, forced consent i uzależniania service od unrelated marketing.
6. **Zapisuj evidence**: Przechowuj source, time, notice version, purpose i status z restricted access i retention schedule.
7. **Przygotuj approved templates**: Używaj truthful category, variables i language; preview final message i review po platform policy changes.
8. **Respektuj conversation rules**: Sprawdzaj current service-window i pricing conditions. Reply nie daje unlimited permission na unrelated promotion.
9. **Chroń data w integrations**: Ogranicz fields, encrypt transport, scope tokens, rotate secrets, log access i oceń subprocessors oraz transfers.
10. **Projektuj accessible messages**: Plain language, descriptive links i text alternatives dla essential audio/images. Nie opieraj znaczenia tylko na emoji lub colour.
11. **Kontroluj frequency i timing**: Respektuj time zones, quiet hours i preferences. Frequency ma pasować do promised purpose, nie universal quota.
12. **Ułatw stop**: Rozpoznawaj jasny opt-out, potwierdź suppression raz i zastosuj go w campaigns. Zapewnij human support dla mistakes.
13. **Mierz balanced outcomes**: Analizuj delivery, replies, task completion, opt-outs, blocks, complaints, support burden i customer outcomes; platform metrics mają limits.
14. **Pauzuj przy harm**: Zatrzymaj template lub segment po przekroczeniu thresholds complaints, blocks, security events lub poor relevance.

Template approval jest kontrolą platformy, nie legal certification ani dowodem, że każdy odbiorca oczekuje message.`,
            practicalExamples: [
              'Appointment form oferuje optional WhatsApp reminder z timingiem i osobnym email choice; withdrawal aktualizuje CRM natychmiast.',
              'Customer odpowiada na delivery update. Support rozwiązuje temat, ale nie traktuje reply jako marketing consent.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Odpowiedzialny WhatsApp jest specific, expected, secure i reversible; template approval i high attention nie zastępują permission.',
            keyPrinciples: ['Rozdziel choices kanału i purpose', 'Używaj wyłącznie official supported integrations', 'Respektuj preferences, quiet time i withdrawal wszędzie'],
          },
          actionTask: {
            instruction: 'Przygotuj controlled WhatsApp pilot:',
            checklistItems: ['Potwierdzono purpose, market, official solution i owners', 'Sprawdzono opt-in notice, channel choice, evidence i retention', 'Zweryfikowano template category, variables, language i service rules', 'Przetestowano security, accessibility, quiet hours i human support', 'Skonfigurowano opt-out sync, complaint threshold, incident pause i review date'],
            toolboxCategory: 'landingpage',
          },
        },
        '44.2': {
          stageTitle: '44. Safe chat automation i permission-based SMS',
          title: 'Automatyzuj proste tasks bez deceptive botów lub urgency',
          description: 'Buduj bounded flows z jasną bot identity i human escalation, a SMS używaj tylko dla consented, time-appropriate messages z transparent links i terms.',
          learnContent: {
            videoTitle: 'Masterclass: Safe WhatsApp automation i responsible SMS',
            summaryText: 'Automation może route questions i dostarczać requested information, ale może też tworzyć wrong answers, inaccessible loops i unwanted pressure. Krótki SMS nie usprawiedliwia hidden terms, artificial scarcity ani links ukrywających destination.',
            bulletPoints: [
              'Informuj o automation, jej zakresie i sposobie kontaktu z człowiekiem',
              'Ogranicz AI answers do reviewed knowledge, stosuj confidence i safety rules oraz blokuj unsupported professional advice',
              'Uzyskaj channel- i purpose-specific SMS permission oraz identyfikuj sendera w każdej wiadomości, gdzie wymagane',
              'Używaj truthful deadlines, recognisable destinations i tested opt-out zamiast manufactured click urgency',
            ],
            coreConcepts: [
              { iconName: 'cpu', title: 'BOUNDED AUTOMATION', description: 'Bot obsługuje defined low-risk tasks, loguje decisions i przekazuje sprawę przy uncertainty, distress, complaint, accessibility need lub user request.', highlight: true },
              { iconName: 'zap', title: 'RESPECTFUL SMS', description: 'Krótka wiadomość nadal identyfikuje sendera, purpose, material terms, destination i withdrawal route bez fake scarcity.' },
            ],
            resources: [
              { title: 'Messaging Automation Safety Map', subtitle: 'Flows, knowledge, escalation, consent, testing i incidents', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Governed Multi-Channel Inbox Mara CRM', subtitle: 'WhatsApp, SMS i email z roles, suppression i handover', type: 'tool', iconName: 'inbox', actionUrl: 'crm' },
            ],
            fullArticleGuide: `### Automatyzuj powtarzalne tasks, zachowując kontrolę użytkownika

Bot ma ograniczać friction w defined task, nie udawać człowieka, naciskać na sale lub blokować support. SMS wymaga osobnej permission i operational controls.

#### Safe flow design i operation

1. **Wybierz bounded use case**: Zacznij od status, FAQ, requested resource, appointment selection lub routing. Wyklucz emergencies i high-stakes decisions bez oversight.
2. **Disclose automation wcześnie**: Powiedz, że user rozmawia z botem, jaki ma scope, data use i human-contact route.
3. **Minimalizuj questions i data**: Pytaj tylko o dane potrzebne do task. Nie inferuj sensitive traits z chat answers dla targeting.
4. **Projektuj simple path**: Zapewnij clear choices, back, repeat, correction i exit. Nie zamykaj w loop i nie wymagaj marketing consent dla support.
5. **Ground AI responses**: Używaj maintained approved sources, citations, versioning i owners. Określ prohibited claims i confidence thresholds.
6. **Escalate safely**: Przekaż przy uncertainty, repeated failure, complaint, distress, payment dispute, accessibility need lub explicit request, z context i consent.
7. **Chroń credentials i transcripts**: Least privilege, encryption, retention, redaction, audit logs i incidents. Ogranicz transcript access.
8. **Testuj users i devices**: Uwzględnij keyboard, screen reader, languages, typos, unexpected input, downtime i duplicate delivery.
9. **Rozdziel SMS permission**: Dokumentuj sender, purpose, frequency, charges i opt-out. WhatsApp lub email consent nie obejmuje automatycznie SMS.
10. **Pisz transparent SMS**: Identyfikuj business, useful action i material terms, stosuj trustworthy domain i bez hidden redirects.
11. **Używaj tylko real urgency**: Deadlines, stock i discounts muszą być dokładne, widoczne w destination i aktualizowane.
12. **Idempotent delivery**: Zapobiegaj duplicates, limituj retries, obsługuj delayed events i automatycznie pauzuj podczas outages lub mismatch.
13. **Koordynuj channel pressure**: Nie wysyłaj tej samej promotion przez WhatsApp, SMS i email w krótkim czasie bez explicit choice.
14. **Monitoruj quality i harm**: Analizuj resolution, handover, wrong answers, abandonment, complaints, opt-outs, duplicates, latency i outcomes.
15. **Retire safely**: Usuń outdated answers i templates, revoke access, zachowaj necessary suppression records i lessons.

Fast answers są użyteczne tylko, gdy są accurate, accessible i easy to leave.`,
            practicalExamples: [
              'Bot dostarcza requested guide i oferuje support; nie rekomenduje produktu z inferred vulnerability i usuwa unnecessary answers zgodnie z retention.',
              'SMS reminder podaje business i appointment, używa company domain i tested opt-out; retry nie może stworzyć duplicate.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Safe messaging automation jest transparent, limited i escapable; speed i brevity nie uzasadniają deception, pressure ani braku human support.',
            keyPrinciples: ['Ujawnij bota i jego limits', 'Eskaluj uncertainty i sensitive cases', 'Zarządzaj SMS permission i suppression osobno'],
          },
          actionTask: {
            instruction: 'Zbuduj i przetestuj bounded messaging flow:',
            checklistItems: ['Zdefiniowano use case, exclusions, bot disclosure i human handover', 'Zminimalizowano data fields, knowledge sources, permissions i retention', 'Przetestowano correction, exit, accessibility i failure paths', 'Zweryfikowano SMS identity, consent, terms, domain i opt-out', 'Przypisano duplicate prevention, monitoring, stop thresholds i retirement owner'],
            toolboxCategory: 'crm',
          },
        },
      },
    },
    45: {
      title: '45. Etyczna retencja, uczciwe anulowanie i trwała wartość klienta',
      subtitle: 'Outcome-led onboarding, dobrowolne wsparcie, transparent subscriptions i respectful win-back',
      description: 'Poprawiaj long-term customer value przez użyteczne outcomes i usuwanie zbędnego friction, zachowując natychmiastową, zrozumiałą cancellation path — bez churn, profit lub reactivation guarantees.',
      lessons: {
        '45.1': {
          stageTitle: '45. Customer outcomes i fair retention',
          title: 'Wykrywaj service friction bez profilingu i utrudniania cancellation',
          description: 'Używaj proportionate signals, by oferować pomoc, poprawiać onboarding i dawać realne pause lub downgrade choices bez manipulowania pozostaniem.',
          learnContent: {
            videoTitle: 'Masterclass: Etyczna retencja i customer-outcome monitoring',
            summaryText: 'Cancellation ma wiele przyczyn, a inactivity sama nie dowodzi dissatisfaction lub churn risk. Retention ma wynikać z product fit, jasnej value i reliable support, nie invasive surveillance, surprise calls, hidden cancellation controls ani universal claims o kosztach i profit.',
            bulletPoints: [
              'Zdefiniuj successful customer outcomes i evidence przed wyborem engagement lub inactivity signals',
              'Używaj minimum necessary account data, wyjaśnij relevant monitoring i nie inferuj health, finances lub vulnerability',
              'Oferuj help, pause lub downgrade jako optional alternatives, zachowując cancellation równie widoczną i łatwą',
              'Analizuj onboarding, defects, support, accessibility, pricing i expectation gaps zamiast obwiniać low usage',
            ],
            coreConcepts: [
              { iconName: 'shield', title: 'PROPORTIONATE SUPPORT SIGNAL', description: 'Udokumentowany signal otwiera review lub optional support offer; nie labeluje automatycznie osoby, nie odbiera wyboru i nie uruchamia pressure.', highlight: true },
              { iconName: 'pause-circle', title: 'FAIR SUBSCRIPTION CONTROL', description: 'Pause, downgrade i cancellation jasno pokazują price, timing i consequences, z confirmation i bez unnecessary obstacles.' },
            ],
            resources: [
              { title: 'Ethical Retention & Cancellation Workbook', subtitle: 'Outcomes, signals, experiments, rights i service recovery', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Customer-Outcome Monitor Mara CRM', subtitle: 'Privacy-aware cohorts, support signals i review queues', type: 'tool', iconName: 'bar-chart-2', actionUrl: 'crm' },
            ],
            fullArticleGuide: `### Zdobywaj retention przez outcomes i customer control

Retention ma wartość tylko, gdy customers zostają, bo service nadal jest suitable. Lower churn może ukrywać lock-in, billing friction lub osoby, które nie znajdują exit.

#### Ethical retention workflow

1. **Zdefiniuj customer promise**: Określ intended outcome, prerequisites, time, effort, exclusions i evidence progress.
2. **Mapuj lifecycle**: Przejrzyj purchase, setup, first use, recurring value, support, billing, renewal, pause i cancellation z perspektywy customer.
3. **Mierz baseline uczciwie**: Zdefiniuj customer, active subscription, cancellation, involuntary churn, cohort i observation period. Bez cherry-picking.
4. **Badaj causes bezpośrednio**: Łącz voluntary feedback, support themes, product defects, accessibility i cohort behaviour. Nie zakładaj fixed list of churn causes.
5. **Minimalizuj behavioural data**: Zbieraj tylko signals potrzebne do stated service purpose, limituj access i retention, unikaj sensitive inference.
6. **Waliduj alert przed action**: Testuj, czy signal przewiduje service need w relevant groups. Monitoruj false positives i unequal impact.
7. **Oferuj proportionate support**: Użyj preferred channel i wyjaśnij kontakt. Check-in jest optional; bez surprise call lub urgency.
8. **Najpierw napraw product**: Popraw confusing setup, reliability, accessibility, expectations, support i billing przed persuasion.
9. **Daj genuine choices**: Pause, downgrade, switch plan lub assistance tylko, gdy realne. Jasno pokaż price, duration, lost features i automatic restart.
10. **Uprość cancellation**: Discoverable route, minimum steps, bez preselected retention offer i z immediate confirmation. Respektuj cooling-off i refund rights.
11. **Ostrożnie obsługuj involuntary churn**: Accurate payment-failure notices, secure update route, bounded retries i bez misleading debt threats.
12. **Prowadź controlled experiments**: Zdefiniuj hypothesis, cohort, customer-benefit metric, harm metric, duration i stop rule. Nie optymalizuj tylko retained billing.
13. **Review balanced outcomes**: Analizuj task success, support, accessibility, complaints, refunds, pauses, cancellations, reactivations i satisfaction.
14. **Retire harmful tactics**: Usuń flows zwiększające short-term retention przez confusion, pressure, unequal treatment lub unwanted contact.

Cancellation nie musi być porażką; może być właściwa, gdy zmienia się need, timing lub product fit.`,
            practicalExamples: [
              'Learner ostatnio się nie logował. Product oferuje optional reminder preference i help centre, a pause i cancellation pozostają equally accessible.',
              'Expectation gap powoduje refunds. Team poprawia product page i onboarding zamiast zwiększać save-offer discounts.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Zdrowa retencja odzwierciedla ongoing customer value i informed choice; nie jest tylko brakiem cancellation.',
            keyPrinciples: ['Waliduj signals przed kontaktem', 'Napraw service friction przed persuasion', 'Cancellation ma być visible, immediate i bez dark patterns'],
          },
          actionTask: {
            instruction: 'Zaprojektuj ethical retention improvement:',
            checklistItems: ['Udokumentowano customer outcome, cohort definitions i baseline', 'Sprawdzono signal purpose, data minimisation, false positives i access', 'Przetestowano support message, preferences i human route', 'Oceniono fairness pause, downgrade, billing i cancellation terms', 'Zaplanowano benefit, harm, complaint i stop metrics'],
            toolboxCategory: 'crm',
          },
        },
        '45.2': {
          stageTitle: '45. Respectful win-back i sustainable lifetime value',
          title: 'Zaproś former customers bez pressure lub misleading offers',
          description: 'Kontaktuj eligible former customers tylko, gdy permission, timing i relevance to wspierają, oceniając full customer outcome zamiast short-term cash.',
          learnContent: {
            videoTitle: 'Masterclass: Responsible win-back i customer value',
            summaryText: 'Past purchase nie tworzy permanent marketing permission ani nie gwarantuje renewed trust. Win-back timing i response zależą od cancellation reason, market i customer. Honest programmes respektują suppression, wyjaśniają material changes i pokazują full renewal terms.',
            bulletPoints: [
              'Segmentuj według verified relationship i cancellation context bez sensitive profiling lub assumptions',
              'Sprawdź current permission, suppression, frequency i retention przed win-back communication',
              'Opisuj real product changes i representative evidence; bez fabricated success stories lub exclusive urgency',
              'Porównuj discounts i annual plans przez total price, renewal, refund, cancellation i usage fit, nie cash flow',
            ],
            coreConcepts: [
              { iconName: 'repeat', title: 'PERMISSION-AWARE WIN-BACK', description: 'Tylko eligible osoby otrzymują limited, relevant invitation z clear identity, reason, preferences i easy decline.', highlight: true },
              { iconName: 'calendar', title: 'SUSTAINABLE CUSTOMER VALUE', description: 'Value obejmuje margin, service cost, refunds, complaints, outcomes i retention quality, nie tylko prepaid revenue.' },
            ],
            resources: [
              { title: 'Responsible Win-back & Subscription Offer Guide', subtitle: 'Eligibility, evidence, terms, experiments i suppression', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM Win-back Governance', subtitle: 'Permission, cancellation reasons, exclusions i outcome review', type: 'tool', iconName: 'mail', actionUrl: 'email' },
            ],
            fullArticleGuide: `### Odzyskaj trust zamiast wykorzystywać past purchase

Win-back może mieć wartość, gdy product naprawdę się zmienił lub customer poprosił o updates. Nie może omijać withdrawal, ukrywać renewal terms ani discountem przywracać unsuitable customer.

#### Responsible win-back lifecycle

1. **Wyjaśnij purpose**: Ustal, czy message to service update, requested reminder lub marketing offer. Stosuj właściwe rules dla market i channel.
2. **Sprawdź eligibility**: Zweryfikuj permission, relationship, suppression, complaints, disputes, refunds, protective vulnerability flags i retention limits.
3. **Respektuj cancellation context**: Rozdziel price, missing feature, poor support, technical failure, changed need i unknown. Nie zakładaj, że wszystkim brakowało czasu.
4. **Wymagaj material reason**: Real product improvement, resolved defect, requested availability update lub suitable offer. Samo „tęsknimy” nie tworzy relevance.
5. **Substantiate changes**: Zachowaj release evidence, dates, availability, limitations i ownership. Nie wyolbrzymiaj minor update ani testimonial.
6. **Wybieraj timing empirycznie**: Testuj limited interval dopasowany do produktu i reason. Nie ma universal 60-day optimum.
7. **Ogranicz sequence**: Ustal mały contact cap, rozsądne odstępy i szybkie suppression po opt-out lub non-response zgodnie z policy.
8. **Pisz transparentnie**: Identyfikuj sender, reason, material change, full offer terms i easy unsubscribe. Bez guilt i fake exclusivity.
9. **Prezentuj pricing fair**: Pokaż total cost, discount basis/duration, automatic renewal, next price, taxes, cancellation, refund i feature differences.
10. **Oceń annual plan fit**: Nie przedstawiaj prepayment jako guaranteed loyalty. Porównuj monthly i annual bez preselection lub countdown pressure.
11. **Używaj feedback ostrożnie**: Surveys są optional, accessible i niezależne od support. Wyjaśnij identifiability i use.
12. **Prowadź bounded holdout test**: Zdefiniuj audience, duration, success i harm metrics, w tym incremental reactivation, margin, refunds, complaints, early re-cancellation i outcomes.
13. **Zapewnij safe return**: Przywróć tylko necessary data, potwierdź current preferences i nie reaktywuj obsolete profiles lub permissions.
14. **Review i retire**: Stop poor-fit lub high-complaint segments, honor suppression i usuń data po końcu purpose.

Najlepszy win-back to real product change rozwiązujący reason odejścia, zakomunikowany raz z honesty i choice.`,
            practicalExamples: [
              'Former customer, który prosił o feature updates, dostaje jeden message przy launchu z limits, full price i preference link.',
              'Annual-plan experiment zwiększa prepaid revenue, ale też early refunds i complaints, więc team go zatrzymuje.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Responsible win-back odzyskuje trust przez permission, material relevance i fair terms; lifetime value nie usprawiedliwia repeated pressure.',
            keyPrinciples: ['Past purchase nie jest permanent consent', 'Kontaktuj tylko z material truthful reason', 'Mierz refunds, complaints i customer outcomes obok revenue'],
          },
          actionTask: {
            instruction: 'Przygotuj permission-aware win-back pilot:',
            checklistItems: ['Zweryfikowano purpose, eligibility, permission, suppression i retention', 'Udokumentowano cancellation context i material product change', 'Zatwierdzono sequence, timing, accessibility i contact cap', 'Sprawdzono total price, renewal, cancellation, refund i plan comparison', 'Skonfigurowano holdout, margin, complaints, re-cancellation i stop rule'],
            toolboxCategory: 'email',
          },
        },
      },
    },
    46: {
      title: '46. Google Search Ads i odpowiedzialne pozyskiwanie ruchu o wysokiej intencji',
      subtitle: 'Intencja wyszukiwania, typy dopasowania, trafność reklam, wykluczenia i nadzorowana automatyzacja',
      description: 'Buduj mierzalne kampanie Google Ads wokół rzeczywistej intencji, trafnych reklam i użytecznych stron docelowych—bez gwarancji pozycji, stałej obniżki kosztów ani niepopartych obietnic wyników.',
      lessons: {
        '46.1': {
          stageTitle: '46. Konfiguracja Google Search i jakość reklamy',
          title: 'Twórz kampanie o wysokiej intencji z kontrolowanym dopasowaniem słów kluczowych',
          description: 'Rozpoznawaj komercyjnie istotne zapytania, buduj spójne grupy reklam i wykorzystuj dane z wyszukiwanych haseł do ograniczania nietrafnego ruchu.',
          learnContent: {
            videoTitle: 'Masterclass: odpowiedzialne projektowanie kampanii Google Search',
            summaryText: 'Wyszukiwanie może wskazywać silną intencję, lecz zapytanie nie gwarantuje zakupu, a reklamodawca nie może zagwarantować pierwszej pozycji. Wyniki aukcji, koszt i jakość zależą od konkurencji, stawek, zasobów, strony docelowej, zasad oraz kontekstu.',
            bulletPoints: [
              'Rozróżnij intencję informacyjną, porównawczą, nawigacyjną i transakcyjną przed wyborem słów oraz strony',
              'Dobieraj dopasowanie ścisłe, do wyrażenia lub przybliżone według danych, jakości konwersji, budżetu i kontroli stawek',
              'Analizuj wyszukiwane hasła i utrzymuj kontekstowe wykluczenia bez blokowania właściwych zapytań',
              'Twórz różnorodne zasoby elastycznych reklam, które są prawdziwe w każdej kombinacji i zgodne z aktualnymi zasadami',
            ],
            coreConcepts: [
              { iconName: 'search', title: 'MIERZONA TRAFNOŚĆ REKLAMY', description: 'Wskaźniki jakości pomagają diagnozować, ale nie gwarantują pozycji, ceny kliknięcia ani wyniku biznesowego.', highlight: true },
              { iconName: 'filter', title: 'KONTROLOWANE WYKLUCZENIA', description: 'Wykluczające słowa są oceniane według typu dopasowania i kontekstu, aby nie odcinać odpowiednich klientów.' },
            ],
            resources: [
              { title: 'Zeszyt nadzoru kampanii Search', subtitle: 'Mapa intencji, słowa, wykluczenia, twierdzenia, testy i rejestr przeglądów', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Atrybucja Google Ads w Mara CRM', subtitle: 'Odpowiedzialna obsługa GCLID i zweryfikowanych wyników offline', type: 'tool', iconName: 'bar-chart-2', actionUrl: 'crm' },
            ],
            fullArticleGuide: `### Buduj użyteczne reklamy w wyszukiwarce na podstawie danych

Google Ads to system aukcji i trafności, a nie gwarantowana droga do pierwszej pozycji lub niższych cen. Celem jest połączenie właściwego zapytania z uczciwą ofertą i uczenie się na podstawie jakościowych wyników.

#### Odpowiedzialny proces kampanii Search

1. **Zdefiniuj wynik biznesowy**: Określ wartościowy lead lub sprzedaż, marżę, możliwości obsługi, wykluczenia i okres obserwacji.
2. **Zmapuj intencję**: Oddziel zapytania badawcze, porównawcze, markowe, lokalne i zakupowe. Nie traktuj każdego wyszukania jak gotowości do zakupu.
3. **Badaj język ostrożnie**: Korzystaj z badań własnych, narzędzi i języka klientów bez wykorzystywania wrażliwych okoliczności.
4. **Świadomie wybierz dopasowanie**: Zacznij od kontroli odpowiedniej do budżetu i danych. Szersze dopasowanie wymaga wiarygodnego pomiaru i nadzoru.
5. **Twórz spójne grupy reklam**: Łącz hasła tylko wtedy, gdy ta sama obietnica, dowód i strona rzeczywiście na nie odpowiadają.
6. **Pisz zasoby działające w kombinacjach**: Każde zestawienie nagłówków i opisów musi być prawdziwe, jasne i poparte dowodami.
7. **Bezpiecznie używaj wstawiania słów**: Dynamiczne wstawianie może tworzyć mylący lub niedozwolony tekst; stosuj je tylko z zatwierdzonymi listami i tekstem awaryjnym.
8. **Projektuj użyteczną stronę**: Dopasuj intencję i ofertę, niekoniecznie każde słowo. Pokaż tożsamość, pełne warunki, dowody, prywatność i następny krok.
9. **Utrzymuj dokładne komponenty**: Aktualizuj linki, połączenia, lokalizacje, ceny i promocje oraz kieruj kontakty do bezpiecznych procesów.
10. **Buduj wykluczenia w kontekście**: Nie kopiuj bezmyślnie uniwersalnych list takich jak „bezpłatne”, „praca” czy „PDF”, jeśli mogą być istotne.
11. **Mierz wartościowe wyniki**: Rozróżniaj kliknięcia, rozpoczęte formularze, prawidłowe leady, sprzedaż, zwroty i marżę; usuwaj duplikaty.
12. **Chroń dane pomiarowe**: Informuj o pomiarze, minimalizuj identyfikatory, ograniczaj dostęp i retencję oraz stosuj właściwą podstawę prawną.
13. **Prowadź ograniczone eksperymenty**: Z góry określ hipotezę, budżet, mierniki, czas i regułę zatrzymania.
14. **Oceniaj diagnostykę platformy w kontekście**: Wskaźniki i rekomendacje są podpowiedzią, nie celem ani gwarancją.
15. **Bezpiecznie utrzymuj i wstrzymuj**: Kontroluj zasady, strony, ofertę, hasła, skargi oraz spójność konwersji; wstrzymaj kampanię przy awarii.

Niższa cena kliknięcia nie zawsze jest lepsza. Liczy się właściwy, mierzalny wynik klienta przy zrównoważonym koszcie.`,
            practicalExamples: [
              'Lokalny doradca oddziela zapytania badawcze od rezerwacji i porównuje kwalifikowane spotkania, a nie sam CTR.',
              'Przegląd wykluczeń pokazuje, że „bezpłatna konsultacja” jest realną ofertą, więc zespół nie blokuje globalnie słowa „bezpłatna”.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Skuteczna reklama Search łączy realną intencję, prawdziwe twierdzenia, użyteczną stronę i jakościowy pomiar; żadna konfiguracja nie gwarantuje pozycji ani kosztu.',
            keyPrinciples: ['Traktuj intencję jako hipotezę do sprawdzenia', 'Analizuj wyszukiwane hasła i wykluczenia w kontekście', 'Optymalizuj pod wartościowe wyniki, nie wyłącznie wynik jakości'],
          },
          actionTask: {
            instruction: 'Przygotuj jedną kontrolowaną kampanię Search:',
            checklistItems: ['Udokumentowano jakościowy wynik, możliwości obsługi, budżet i regułę zatrzymania', 'Sprawdzono mapę intencji, typy dopasowania i kontekstowe wykluczenia', 'Zweryfikowano prawdziwość i zgodność wszystkich kombinacji reklamy', 'Przetestowano warunki strony, dostępność, prywatność i pomiar', 'Zaplanowano analizę haseł, jakości leadów, skarg i atrybucji'],
            toolboxCategory: 'landingpage',
          },
        },
        '46.2': {
          stageTitle: '46. Performance Max i nadzorowane automatyczne ustalanie stawek',
          title: 'Korzystaj z Performance Max i Smart Bidding z dowodami oraz zabezpieczeniami',
          description: 'Dostarczaj automatyzacji wiarygodne cele, reprezentatywne materiały i kontrolowane dane, zachowując ludzki nadzór nad jakością, ruchem markowym, wydatkami i wynikami.',
          learnContent: {
            videoTitle: 'Masterclass: nadzorowane Performance Max i Smart Bidding',
            summaryText: 'Performance Max może rozdzielać reklamy w dostępnych zasobach Google, ale automatyzacja nie gwarantuje dodatkowej sprzedaży. Wyniki zależą od celów, jakości danych, budżetu, materiałów, rynku i działania platformy. Dane własne oraz import konwersji wymagają uprawnień, bezpieczeństwa i przemyślanej wyceny.',
            bulletPoints: [
              'Dobieraj cele stawek na podstawie ekonomiki i jakości konwersji, a nie samego przychodu',
              'Dostarczaj prawdziwe teksty, obrazy i filmy z prawami do użycia, czytelne i odpowiednie dla różnych miejsc emisji',
              'Traktuj sygnały odbiorców jako wskazówki, nie deterministyczne targetowanie ani zgodę na wrażliwe profilowanie',
              'Oddzielaj dane markowe od niemarkenowych, gdy to możliwe, i badaj przyrost zamiast przypisywać każdą konwersję kampanii',
            ],
            coreConcepts: [
              { iconName: 'cpu', title: 'NADZOROWANA AUTOMATYZACJA', description: 'System otrzymuje udokumentowane cele, czyste zdarzenia, ograniczony budżet i ludzki przegląd; zmiany są odwracalne.', highlight: true },
              { iconName: 'shield', title: 'TEST PRZYROSTU', description: 'Kontrole marki, grupy porównawcze i analiza kanałów pomagają odróżnić nowe wyniki od istniejącego popytu.' },
            ],
            resources: [
              { title: 'Lista nadzoru Performance Max', subtitle: 'Cele, materiały, sygnały, wykluczenia, prawa i reguły zatrzymania', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Nadzór konwersji offline w Mara CRM', subtitle: 'Walidacja wyników, zgoda, deduplikacja i korekta wartości', type: 'tool', iconName: 'dollar-sign', actionUrl: 'settings' },
            ],
            fullArticleGuide: `### Zapewnij automatycznym kampaniom wiarygodne cele i granice

Performance Max może korzystać z wielu powierzchni Google i automatycznych stawek, lecz raport może obejmować istniejący popyt markowy, słabe działania lub modelowane konwersje. Zarządzaj systemem jak eksperymentem.

#### Proces odpowiedzialnej automatyzacji

1. **Potwierdź przydatność**: Sprawdź budżet, opóźnienie konwersji, cykl sprzedaży, możliwości obsługi, materiały i wiarygodność pomiaru. Nie istnieje uniwersalna minimalna liczba konwersji.
2. **Zdefiniuj wartościowe zdarzenia**: Importuj tylko zweryfikowane etapy. Nie optymalizuj pod odsłony lub niekwalifikowane formularze tylko po to, by zwiększyć wolumen.
3. **Nadaj uzasadnione wartości**: Opieraj je na oczekiwanej marży i jakości, nie zawyżonym przychodzie. Uwzględniaj zwroty, rezygnacje i duplikaty.
4. **Ostrożnie wybierz strategię stawek**: Zacznij od danych i uwzględnij zmienność uczenia. Cele CPA lub ROAS ustawiaj tylko przy wiarygodnym wolumenie i ekonomice.
5. **Twórz spójne grupy komponentów**: Dopasuj każdą do jednego tematu i strony. Sprawdź prawa, prawdziwość, czytelność i przydatność materiałów.
6. **Dodaj własny film, gdy pomaga**: Kontroluj automatycznie utworzone materiały i zastępuj te, które zniekształcają markę lub ofertę.
7. **Proporcjonalnie używaj sygnałów**: Korzystaj z legalnych, istotnych i reprezentatywnych danych. Nie przesyłaj kupionych list ani wrażliwych profili.
8. **Nadzoruj Customer Match**: Sprawdź informację, zgodę lub inną podstawę, haszowanie, dostęp, retencję i usuwanie oraz obsługę praw prywatności.
9. **Kontroluj interpretację marki**: Stosuj dostępne ustawienia i raportuj ruch markowy osobno, dokumentując ograniczenia.
10. **Sprawdź rozszerzenie adresów URL**: Każda strona docelowa musi być aktualna i właściwa; wyklucz strony pomocy, prawne lub nieistotne.
11. **Chroń ustawienia lokalizacji i języka**: Sprawdź obecność wobec zainteresowania i jakość obsługi językowej w danym rynku.
12. **Badaj przyrost**: Użyj eksperymentów, grup kontrolnych lub porównań geograficznych, gdy to proporcjonalne. Sama atrybucja nie dowodzi przyczynowości.
13. **Monitoruj jakość emisji i leadów**: Analizuj spam, niewłaściwe leady, skargi, zwroty i sprzedaż, a nie tylko ROAS.
14. **Zmieniaj budżet na podstawie danych**: Unikaj stałej reguły „20% co 48 godzin”. Używaj progów, możliwości obsługi i zmian możliwych do zdiagnozowania.
15. **Przygotuj kontrolę incydentów**: Ustaw alerty wydatków, role, dziennik zmian i warunki pauzy przy awarii pomiaru lub nieprawidłowym ruchu.

Automatyzacja może poprawić alokację, ale odpowiedzialność za twierdzenia, dane, wydatki i traktowanie klientów pozostaje po stronie reklamodawcy.`,
            practicalExamples: [
              'Dostawca kursu importuje tylko opłacone zapisy i koryguje zwroty zamiast nadawać tę samą wartość każdemu formularzowi.',
              'Kampania pokazuje wysoki ROAS głównie z zapytań markowych; test i podzielony raport wykazują mniejszy przyrost, więc zespół zmienia budżet.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Automatyczne stawki są użyteczne tylko przy wiarygodnych celach, danych i materiałach oraz ludzkim nadzorze nad wydatkami, jakością i ryzykiem.',
            keyPrinciples: ['Nie ma uniwersalnego progu konwersji ani reguły skalowania', 'Korzystaj z danych własnych tylko z odpowiednimi prawami i kontrolą', 'Badaj przyrost i jakościową wartość obok ROAS platformy'],
          },
          actionTask: {
            instruction: 'Zaprojektuj jeden nadzorowany pilotaż kampanii automatycznej:',
            checklistItems: ['Udokumentowano przydatność, ekonomikę, możliwości, budżet i okres uczenia', 'Sprawdzono zdarzenia, wartości, opóźnienie, zwroty i deduplikację', 'Zweryfikowano prawa do materiałów, twierdzenia, adresy, języki i dostępność', 'Zatwierdzono sygnały, dane klientów, kontrolę marki i podstawę prywatności', 'Skonfigurowano metodę przyrostu, ocenę jakości leadów, alerty i reguły pauzy'],
            toolboxCategory: 'landingpage',
          },
        },
      },
    },
    47: {
      title: '47. Odpowiedzialne skalowanie Meta Ads i testowanie kreacji',
      subtitle: 'Eksperymenty kreacji, kontrola Advantage+, metryki diagnostyczne i zmęczenie reklamą',
      description: 'Buduj powtarzalny program reklam Meta, który testuje pomysły i zmienia budżety na podstawie danych, możliwości oraz ryzyka—bez gwarancji zwycięzców, stałych okien testu i obietnic przychodu.',
      lessons: {
        '47.1': {
          stageTitle: '47. Kontrolowane eksperymenty kreacji',
          title: 'Testuj kombinacje bez traktowania układu 3:2:2 jako uniwersalnej formuły',
          description: 'Projektuj ograniczone testy hooków, formatów, tekstów i ofert, a następnie oceniaj dystrybucję, uwagę oraz jakościowe wyniki bez fałszywej pewności statystycznej.',
          learnContent: {
            videoTitle: 'Masterclass: testowanie kreacji Meta na podstawie danych',
            summaryText: 'Kreacja silnie wpływa na emisję i reakcję, ale nie jest jedynym targetowaniem, a żadna liczba materiałów, godzin czy budżet nie gwarantują trafnego zwycięzcy. Meta może nierówno rozdzielać kombinacje, a wczesne zaangażowanie może prowadzić do słabych wyników klienta.',
            bulletPoints: [
              'Przekształć insight klienta w jedną udokumentowaną hipotezę przed połączeniem obrazu, tekstu i nagłówka',
              'Stosuj 3:2:2 lub inną macierz tylko wtedy, gdy pasuje do budżetu, spodziewanego wolumenu i funkcji platformy',
              'Traktuj hook rate, hold rate i outbound CTR jako sygnały diagnostyczne, a nie uniwersalne progi',
              'Promuj kreację dopiero po sprawdzeniu jakości konwersji, marży, skarg, dostępności i odpowiedniego okresu',
            ],
            coreConcepts: [
              { iconName: 'layers', title: 'KONTROLOWANY TEST KREACJI', description: 'Test z góry określa odbiorców, hipotezę, warianty, limity alokacji, główny miernik, ryzyko, czas i regułę decyzji.', highlight: true },
              { iconName: 'zap', title: 'UCZCIWY DOWÓD SPOŁECZNY', description: 'Identyfikator posta może zachować autentyczne reakcje, lecz komentarze są moderowane, a fałszywego dowodu nigdy się nie tworzy.' },
            ],
            resources: [
              { title: 'Zeszyt eksperymentów kreacji', subtitle: 'Hipotezy, prawa do materiałów, alokacja, mierniki i rejestr decyzji', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Analityka wyników Meta w GOM-MAR', subtitle: 'Jakościowe zdarzenia, koszt, marża i monitoring skarg', type: 'tool', iconName: 'bar-chart-2', actionUrl: 'crm' },
            ],
            fullArticleGuide: `### Buduj system nauki, a nie fabrykę zwycięzców

Reklama Meta łączy kreację, optymalizację emisji, odbiorców, miejsca, stawki, rynek i pomiar. Dobry eksperyment ogranicza niepewność; nie może obiecać zwycięzcy w 48 godzin ani pięciocyfrowego dziennego przychodu.

#### Odpowiedzialny proces testowania

1. **Zacznij od badania klientów**: Udokumentuj problem, kontekst, język i dowody. Nie wykorzystuj domniemanych problemów zdrowotnych, finansowych ani innych cech wrażliwych.
2. **Zdefiniuj jedną hipotezę**: Określ, jaka zmiana może poprawić który jakościowy wynik i dlaczego.
3. **Wybierz odbiorców i miejsca emisji**: Sprawdź rynek, wiek, język, wykluczenia, dostępność i zasady. Szeroka emisja jest opcją, nie uniwersalnym optimum.
4. **Dobierz wykonalny projekt**: Macierz 3:2:2 tworzy kombinacje, ale może nie izolować wpływu zasobów. Gdy liczy się przyczynowość, użyj testu A/B.
5. **Ustal alokację i czas**: Oprzyj je na częstości zdarzeń, zmienności, opóźnieniu sprzedaży i akceptowalnym ryzyku, nie stałym budżecie lub 48 godzinach.
6. **Twórz prawdziwe warianty**: W każdej kombinacji utrzymaj prawdziwe twierdzenia, ceny, opinie, ujawnienia i kontekst. Zabezpiecz prawa do muzyki i obrazu.
7. **Zapewnij dostępność**: Dodaj napisy, czytelny kontrast, bezpieczne tempo i znaczenie niezależne wyłącznie od dźwięku lub koloru.
8. **Sprawdź pomiar przed startem**: Przetestuj zdarzenia przeglądarki i serwera, deduplikację, zgodę, okna atrybucji, walutę i status CRM.
9. **Chroń eksperyment**: Rejestruj starty i zmiany, unikaj przedwczesnych edycji oraz ustaw alerty wydatków i skarg.
10. **Używaj metryk uwagi diagnostycznie**: Dokładnie określ obliczenia i porównuj podobne formaty oraz miejsca.
11. **Oceniaj jakościowe wyniki**: Sprawdzaj prawidłowe leady lub sprzedaż, marżę, zwroty, obsługę, skargi i powtarzalną jakość.
12. **Uwzględniaj niepewność**: Oceniaj próbę, nierówną emisję, efekt nowości i wielokrotne porównania. Niejednoznaczny test nazwij niejednoznacznym.
13. **Uczciwie zachowuj reakcje**: Używaj tego samego ID tylko przy istotnie tej samej reklamie i autentycznych, odpowiednio moderowanych komentarzach.
14. **Zapisz decyzję**: Skaluj, poprawiaj, zatrzymaj lub powtórz test, notując dowody i ograniczenia.
15. **Utrzymuj bibliotekę nauki**: Zapisuj hipotezy, materiały, prawa, wyniki i terminy wygaśnięcia, usuwając nieaktualne twierdzenia.

Celem jest stały dopływ wiarygodnej wiedzy i odpowiednich klientów, a nie z góry ustalona liczba zwycięzców.`,
            practicalExamples: [
              'Trzysekundowy hook poprawia retencję filmu, lecz nie jakościowe leady; zespół koryguje zgodność komunikatu z ofertą.',
              'Jednostka 3:2:2 kieruje większość budżetu do jednej kombinacji, więc reklamodawca uruchamia osobny test przed stwierdzeniem przyczyny.',
            ],
          },
          understandContent: {
            coreTakeaway: 'System kreacji tworzy udokumentowaną wiedzę; formaty i metryki uwagi wspierają decyzje, ale nie gwarantują zwycięzców ani rentowności.',
            keyPrinciples: ['Testuj jasną hipotezę przy akceptowalnym ryzyku', 'Porównuj jakościowe wyniki z metrykami uwagi', 'Uczciwie traktuj nierówną emisję i niejednoznaczne dane'],
          },
          actionTask: {
            instruction: 'Przygotuj jeden kontrolowany eksperyment kreacji:',
            checklistItems: ['Udokumentowano insight, hipotezę, odbiorców i wykluczenia', 'Sprawdzono warianty, prawa, twierdzenia, dostępność i zgodność strony', 'Zatwierdzono projekt, alokację, czas, budżet i reguły zatrzymania', 'Przetestowano pomiar, deduplikację, jakość CRM i atrybucję', 'Zaplanowano wynik główny, mierniki ryzyka, niepewność i rejestr decyzji'],
            toolboxCategory: 'landingpage',
          },
        },
        '47.2': {
          stageTitle: '47. Advantage+ i zmiany budżetu oparte na danych',
          title: 'Skaluj automatyczne kampanie Meta bez stałych procentów i obietnic wydatków',
          description: 'Używaj funkcji Advantage+ i zmian budżetu tylko wtedy, gdy pasują do celu, danych i rynku, z ochroną pomiaru, możliwości obsługi, zmienności i klientów.',
          learnContent: {
            videoTitle: 'Masterclass: nadzorowane Advantage+ i zarządzanie budżetem',
            summaryText: 'Zwiększenie wydatków może zmienić emisję, koszt i jakość leadów; nie istnieje uniwersalna reguła 20%, bezpieczny odstęp 48 godzin ani gwarantowana droga ze 100 € do 1000 € dziennie. Nazwy i możliwości Advantage+ ewoluują, dlatego trzeba sprawdzać aktualne ustawienia, dokumentować zmiany i zachować kontrolowaną pauzę.',
            bulletPoints: [
              'Wybierz aktualny wariant kampanii Advantage+ dopiero po sprawdzeniu celu, dostępności, kontroli i ograniczeń raportowania',
              'Zmieniaj budżety według krańcowej jakości, opóźnienia, możliwości obsługi i zmienności, a nie stałego procentu',
              'Rozróżniaj pionową zmianę budżetu od dodatkowego testu kampanii i nie duplikuj odbiorców wyłącznie dla zwiększenia wydatku',
              'Stosuj reguły automatyczne jako alerty lub ograniczoną kontrolę z prawidłowymi danymi, strefą czasu i ludzkim właścicielem',
            ],
            coreConcepts: [
              { iconName: 'trending_up', title: 'SKALOWANIE WEDŁUG MOŻLIWOŚCI', description: 'Zmiany budżetu podążają za zweryfikowanym wynikiem krańcowym oraz możliwościami realizacji, z kryteriami wycofania.', highlight: true },
              { iconName: 'dollar-sign', title: 'OGRANICZONA AUTOMATYZACJA', description: 'Reguły mają poprawne dane, limity, okresy wyciszenia, dzienniki i odpowiedzialnego właściciela.' },
            ],
            resources: [
              { title: 'Playbook zmian budżetu i automatyzacji Meta', subtitle: 'Progi danych, limity, alerty, wycofanie i rejestr przeglądów', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Kontrola pomiaru Meta w Mara CRM', subtitle: 'Zdarzenia przeglądarki i serwera, deduplikacja i jakościowe wyniki', type: 'tool', iconName: 'settings', actionUrl: 'settings' },
            ],
            fullArticleGuide: `### Skaluj tylko to, co zachowuje wartość na marginesie

Rentowna średnia historyczna nie dowodzi, że następne euro wydatku zadziała tak samo. Emisja Meta zmienia się wraz z budżetem, presją aukcji, świeżością kreacji, sezonowością i popytem.

#### Odpowiedzialny proces skalowania

1. **Sprawdź aktualne opcje platformy**: Meta zmienia nazwy, funkcje Advantage+ i kontrolę. Korzystaj z bieżącej dokumentacji oraz ustawień dostępnych na koncie.
2. **Zdefiniuj jakościowy wynik**: Uwzględnij prawidłową sprzedaż lub leady, marżę, zwroty, oszustwa, koszt obsługi i opóźnienie.
3. **Potwierdź spójność pomiaru**: Testuj Pixel i Conversions API, zgodę, dopasowanie zdarzeń, deduplikację, wartość, walutę i uzgodnienie z CRM.
4. **Chroń dane klientów**: Minimalizuj identyfikatory, ograniczaj tokeny i dostęp, dokumentuj retencję oraz właściwą podstawę pomiaru.
5. **Ustal stabilną bazę**: Zapisz budżet, emisję, kreacje, odbiorców, miejsca, atrybucję i rynek w znaczącym okresie.
6. **Sprawdź możliwości operacyjne**: Potwierdź zapasy, realizację, reakcję sprzedaży, wsparcie, płynność i obsługę zwrotów.
7. **Wybierz jedną hipotezę skalowania**: Gdy to możliwe, osobno testuj budżet, nową kreację, rynek lub strukturę kampanii.
8. **Dostosuj zmianę do ryzyka i sygnału**: Nie ma uniwersalnego odstępu 20%. Uwzględnij zmienność, wolumen, opóźnienie i możliwą stratę.
9. **Unikaj niekontrolowanej duplikacji**: Dodatkowe kampanie mogą konkurować, rozbijać uczenie i zaciemniać przyrost.
10. **Nadzoruj tymczasowe przesunięcia**: Przed dniem szczytowym określ początek, koniec, maksymalny wydatek, strefę czasu i wycofanie.
11. **Ostrożnie stosuj reguły**: Zweryfikuj źródło i opóźnienie miernika, dodaj limity i okres wyciszenia, zapisuj działania oraz alarmuj człowieka.
12. **Monitoruj jakość krańcową**: Porównuj dodatkowy wydatek z dodatkowymi jakościowymi wynikami, marżą, skargami i realizacją.
13. **Obserwuj kreację i odbiorców**: Diagnozuj częstotliwość, zasięg, miejsca, zmęczenie, negatywne reakcje i nasycenie bez uniwersalnych progów.
14. **Pauzuj przy awarii integralności**: Zatrzymaj wzrost, gdy pomiar się psuje, jakość spada, twierdzenia wygasają, brakuje zapasu lub rosną skargi.
15. **Dokumentuj i oceniaj**: Zapisz zmianę, dowody, niepewność i wycofanie; wróć do oceny po pełnym oknie konwersji i zwrotów.

Skalowanie ma sens tylko wtedy, gdy dodatkowy wydatek nadal tworzy wartość bez przeciążania operacji i osłabiania pomiaru.`,
            practicalExamples: [
              'Po zwiększeniu budżetu ROAS platformy pozostaje stabilny, lecz przybywa nieważnych leadów, więc firma wraca do poprzedniego poziomu.',
              'Reguła weekendowa podwaja wydatek po kilku porannych sprzedażach; późniejszy kontrolowany test nie wykazuje dodatkowej marży, więc reguła zostaje usunięta.',
            ],
          },
          understandContent: {
            coreTakeaway: 'Skalowanie to decyzja operacyjna oparta na danych, nie rytuał stałego procentu; jakość krańcowa i możliwości są ważniejsze niż wysokość wydatku.',
            keyPrinciples: ['Sprawdzaj aktualne funkcje i kontrolę Advantage+', 'Zmieniaj budżet według opóźnienia, zmienności i wartości krańcowej', 'Nadzoruj CAPI i reguły automatyczne z prywatnością oraz wycofaniem'],
          },
          actionTask: {
            instruction: 'Zaprojektuj jeden kontrolowany pilotaż zmiany budżetu:',
            checklistItems: ['Udokumentowano aktualne opcje, bazę i jakościową ekonomikę', 'Przetestowano zgodę Pixel/CAPI, bezpieczeństwo, deduplikację, wartości i CRM', 'Potwierdzono możliwości, płynność, zapasy, wsparcie i limity zwrotów', 'Zatwierdzono zmianę, czas, limit wydatku, wyciszenie, alerty i wycofanie', 'Zaplanowano ocenę krańcowych wyników, jakości leadów, skarg i pełnego opóźnienia'],
            toolboxCategory: 'crm',
          },
        },
      },
    },
    48: {
      "title": "48. Odpowiedzialne SEO i autorytet tematyczny",
      "subtitle": "Klastry tematyczne, pomocne treści, sygnały zaufania i nadzorowane procesy AI",
      "description": "Buduj użyteczny i technicznie solidny program wyszukiwania organicznego oparty na potrzebach odbiorców, wiarygodnych dowodach i ciągłych pomiarach—bez gwarancji pozycji, obietnic ruchu ani norm liczby treści.",
      "lessons": {
        "48.1": {
          "stageTitle": "48. Architektura tematów i linkowanie wewnętrzne",
          "title": "Buduj pokrycie tematu bez traktowania klastrów jako gwarancji pozycji",
          "description": "Przypisuj prawdziwe pytania odbiorców do odrębnych stron, jasno łącz powiązane zasoby i oceniaj wyniki bez obietnic dotyczących pozycji lub czasu.",
          "learnContent": {
            "videoTitle": "Masterclass: architektura tematów i linkowanie oparte na dowodach",
            "summaryText": "Systemy wyszukiwania wykorzystują wiele sygnałów i zmieniają się. Klastry mogą poprawiać nawigację i pokrycie tematu, lecz żadna liczba stron, słów, tekst linku ani okres publikacji nie gwarantują pozycji.",
            "bulletPoints": [
              "Zacznij od zweryfikowanych potrzeb odbiorców, intencji wyszukiwania i celu każdej strony",
              "Stosuj model strony filarowej i klastrów tylko wtedy, gdy poprawia nawigację i ogranicza duplikację",
              "Przypisuj podobne zapytania według potrzeb użytkownika zamiast wymuszać dokładnie jedno słowo kluczowe na jeden adres",
              "Mierz widoczność, wartościowe wizyty i wyniki biznesowe, zapisując niepewność oraz zmiany w wyszukiwarce"
            ],
            "coreConcepts": [
              {
                "iconName": "layers",
                "title": "UŻYTECZNA MAPA TEMATÓW",
                "description": "Utrzymywana mapa łączy każdą realną potrzebę odbiorcy z właściwą stroną i właścicielem.",
                "highlight": true
              },
              {
                "iconName": "link",
                "title": "OPISOWE LINKI WEWNĘTRZNE",
                "description": "Istotne linki pomagają ludziom i robotom odkrywać treści bez manipulacyjnych schematów tekstu kotwicy."
              }
            ],
            "resources": [
              {
                "title": "Arkusz mapy tematów i inwentaryzacji treści",
                "subtitle": "Potrzeby, intencja, cel strony, dowody, właściciel i data przeglądu",
                "type": "pdf",
                "iconName": "file-text",
                "actionUrl": "tools"
              },
              {
                "title": "Mara Blog & CMS Engine",
                "subtitle": "Twórz, sprawdzaj i publikuj dostępne artykuły z kontrolowanymi linkami",
                "type": "tool",
                "iconName": "layout",
                "actionUrl": "landingpage"
              }
            ],
            "fullArticleGuide": "### Zbuduj użyteczną architekturę informacji\n\nAutorytet tematyczny nie jest przełącznikiem aktywowanym przez publikację ustalonej liczby artykułów. Widoczność zależy od trafności, jakości, konkurencji, dostępności technicznej, reputacji i zmieniających się systemów wyszukiwania.\n\n#### Odpowiedzialny proces\n\n1. **Potwierdź potrzeby odbiorców**: Łącz rozmowy z klientami, pytania do wsparcia, wyszukiwanie w witrynie i dane Search Console. Dane narzędzi zewnętrznych traktuj jako szacunki.\n2. **Określ cel strony**: Zapisz odbiorcę, zadanie, intencję i kolejny krok dla każdego adresu.\n3. **Zrób audyt treści**: Aktualizuj, łącz lub wycofuj słabe i nakładające się strony przed tworzeniem nowych.\n4. **Zaprojektuj praktyczną hierarchię**: Używaj stron filarowych i wspierających, gdy relacja naprawdę pomaga; nie wciskaj każdego tematu w sztywne silo.\n5. **Ogranicz szkodliwe duplikaty**: Strony mogą dotyczyć podobnych pojęć, lecz każda powinna mieć odrębny cel i wartość. Diagnozuj nakładanie na podstawie danych zapytań i stron docelowych.\n6. **Pisz opisowe linki**: Linkuj tam, gdzie korzysta czytelnik, z naturalnym tekstem i bez arbitralnych limitów.\n7. **Chroń dostęp techniczny**: Sprawdź kody stanu, kanoniczne adresy, dyrektywy indeksowania, mapy, widok mobilny i istotne wskaźniki wydajności.\n8. **Publikuj treści oparte na dowodach**: Cytuj odpowiednie źródła, ujawniaj ograniczenia i oddzielaj fakty, doświadczenie oraz opinię.\n9. **Mierz wartościowe wyniki**: Analizuj zapytania, kliknięcia, zaangażowanie, konwersje i jakość klientów—nie tylko migawki pozycji.\n10. **Utrzymuj system**: Wyznacz właścicieli i terminy przeglądu, poprawiaj nieaktualne twierdzenia i dokumentuj ważne zmiany.\n\nŻaden etyczny plan SEO nie może obiecać pierwszej pozycji, stałego czasu ani określonego ruchu.",
            "practicalExamples": [
              "Witryna łączy trzy podobne poradniki w jeden czytelniejszy materiał i przekierowuje stare adresy po sprawdzeniu popytu oraz linków.",
              "Klaster przyciąga wizyty, ale mało odpowiednich zapytań; zespół poprawia intencję i wezwania do działania zamiast publikować kolejne dwadzieścia tekstów."
            ]
          },
          "understandContent": {
            "coreTakeaway": "Architektura tematów pomaga, gdy ułatwia znalezienie i zrozumienie informacji; nie gwarantuje pozycji.",
            "keyPrinciples": [
              "Przypisuj strony do realnych zadań odbiorców i je utrzymuj",
              "Używaj linków dla trafności i nawigacji, nie manipulacji",
              "Oceniaj SEO przez jakościowe wyniki i udokumentowaną niepewność"
            ]
          },
          "actionTask": {
            "instruction": "Utwórz odpowiedzialny pilotaż mapy tematu:",
            "checklistItems": [
              "Udokumentowano dowody potrzeb, intencję i cel jednego tematu filarowego",
              "Zinwentaryzowano strony, nakładanie, luki i właścicieli",
              "Zaplanowano użyteczne linki, kontrole techniczne i dostępność",
              "Określono wyniki jakościowe, bazę, termin przeglądu i dziennik zmian"
            ],
            "toolboxCategory": "content"
          }
        },
        "48.2": {
          "stageTitle": "48. Pomocna treść, zaufanie i nadzorowane AI",
          "title": "Wspieraj jakość przez AI bez norm ilości i fałszywych twierdzeń E-E-A-T",
          "description": "Twórz oryginalne, dokładne i dostępne materiały z odpowiednim przeglądem człowieka, uczciwym autorstwem i danymi strukturalnymi zgodnymi z widoczną treścią.",
          "learnContent": {
            "videoTitle": "Masterclass: nadzorowane treści AI i wiarygodne publikowanie",
            "summaryText": "Pomoc AI nie jest automatycznie nagradzana ani karana. Liczy się użyteczność wyniku i zgodność z zasadami. E-E-A-T to koncepcja jakości, a nie lista lub pole schema gwarantujące pozycje.",
            "bulletPoints": [
              "Używaj AI do ograniczonych zadań z nazwanymi recenzentami, kontrolą źródeł i standardem publikacji",
              "Pokazuj realne doświadczenie tylko wtedy, gdy istnieje; nie wymyślaj autorów, kwalifikacji, cytatów, testów ani wyników",
              "Dodawaj dane strukturalne tylko wtedy, gdy są uzasadnione, kwalifikują się i odpowiadają widocznej treści",
              "Dostosuj tempo publikacji do jakości przeglądu i utrzymania, a nie celu typu pięćdziesiąt artykułów miesięcznie"
            ],
            "coreConcepts": [
              {
                "iconName": "award",
                "title": "WIARYGODNE DOWODY",
                "description": "Trafne źródła, uczciwe autorstwo, korekty i prawdziwe doświadczenie budują zaufanie bez fabrykowania autorytetu.",
                "highlight": true
              },
              {
                "iconName": "cpu",
                "title": "AI POD NADZOREM CZŁOWIEKA",
                "description": "AI wspiera określone zadania, a odpowiedzialne osoby sprawdzają fakty, prawa, twierdzenia, prywatność i użyteczność."
              }
            ],
            "resources": [
              {
                "title": "Lista kontroli publikacji AI i zaufania",
                "subtitle": "Źródła, autorstwo, twierdzenia, prawa, prywatność, dostępność i przeglądy",
                "type": "pdf",
                "iconName": "file-text",
                "actionUrl": "tools"
              },
              {
                "title": "GOM-MAR AI SEO Writer",
                "subtitle": "Twórz kontrolowane szkice do weryfikacji i akceptacji redakcyjnej",
                "type": "tool",
                "iconName": "cpu",
                "actionUrl": "tools"
              }
            ],
            "fullArticleGuide": "### Publikuj użyteczne treści z odpowiedzialnym przeglądem\n\nWytyczne wyszukiwarek zmieniają się, a żadna sekcja autora, typ schema, liczba słów ani wynik szybkości nie gwarantują widoczności. Traktuj E-E-A-T jako sposób oceny odpowiedniego doświadczenia, wiedzy, autorytetu i zaufania—nie mechaniczną formułę punktową.\n\n#### Nadzorowany proces publikacji\n\n1. **Zdefiniuj zadanie użytkownika**: Określ, komu pomaga strona, jaką decyzję wspiera i jakich dowodów wymaga.\n2. **Oceń ryzyko**: Zapewnij mocniejszy przegląd eksperta dla zdrowia, finansów, prawa, bezpieczeństwa i innych ważnych tematów.\n3. **Wybierz ograniczone zadania AI**: AI może porządkować notatki, proponować pytania lub szkicować sekcje. Nie pozwalaj mu wymyślać faktów ani publikować samodzielnie.\n4. **Chroń poufne dane**: Nie wprowadzaj danych osobowych, klientów ani licencjonowanych materiałów bez uprawnień i zabezpieczeń.\n5. **Weryfikuj istotne twierdzenia**: Korzystaj z aktualnych źródeł pierwotnych lub autorytatywnych, sprawdzaj cytowania i zapisuj daty dostępu.\n6. **Dodaj prawdziwy wkład**: Umieszczaj oryginalną analizę, sprawdzone przykłady lub doświadczenie tylko wtedy, gdy są realne i istotne.\n7. **Uczciwie ujawniaj autorstwo**: W razie potrzeby podawaj odpowiedzialnych autorów i recenzentów; nie wymyślaj kwalifikacji ani opinii.\n8. **Sprawdź prawa i oryginalność**: Potwierdź licencje tekstu, obrazów i danych, unikaj zbyt bliskich parafraz i właściwie przypisuj źródła.\n9. **Zapewnij dostępność**: Stosuj jasne nagłówki, opisowe linki, tekst alternatywny, czytelny układ i realistyczne ulepszenia wydajności.\n10. **Ostrożnie używaj danych strukturalnych**: Oznaczaj tylko widoczną, prawdziwą i kwalifikującą się treść. Wyniki rozszerzone zależą od wyszukiwarki.\n11. **Przeprowadź akceptację**: Przed publikacją sprawdź dokładność, ton, uprzedzenia, twierdzenia, prywatność, linki i wezwania.\n12. **Monitoruj i poprawiaj**: Analizuj opinie, zmiany wyszukiwania i wyniki; publikuj korekty i wycofuj niebezpieczne lub stare strony.\n\nSkaluj tylko do poziomu, który zespół potrafi zweryfikować i utrzymać. Jakość, bezpieczeństwo i użyteczność są ważniejsze niż ilość.",
            "practicalExamples": [
              "Szkic AI cytuje nieistniejące badanie; recenzent usuwa twierdzenie, sprawdza źródła pierwotne i zapisuje korektę.",
              "FAQ schema odzwierciedla widoczne pytania, ale wynik rozszerzony się nie pojawia; zespół zachowuje użyteczną stronę i nie twierdzi, że schema gwarantuje dodatkowe miejsce."
            ]
          },
          "understandContent": {
            "coreTakeaway": "AI może przyspieszać część produkcji, lecz odpowiedzialni ludzie nadal odpowiadają za dokładność, prawa, bezpieczeństwo i użyteczność.",
            "keyPrinciples": [
              "E-E-A-T nie jest listą gwarantującą pozycję",
              "Nie wymyślaj doświadczenia, kwalifikacji, źródeł ani wyników",
              "Dane strukturalne muszą odpowiadać widocznej treści i nie obiecują wyników rozszerzonych"
            ]
          },
          "actionTask": {
            "instruction": "Przygotuj jeden nadzorowany materiał:",
            "checklistItems": [
              "Udokumentowano zadanie odbiorcy, poziom ryzyka, źródła i odpowiedzialnego recenzenta",
              "Sprawdzono twierdzenia, cytowania, autorstwo, oryginalność, prawa i prywatność",
              "Zweryfikowano dostępność, linki, dostarczenie techniczne i prawdziwe dane strukturalne",
              "Ustalono akceptację, mierniki sukcesu, drogę korekty i termin przeglądu"
            ],
            "toolboxCategory": "content"
          }
        }
      }
    },

    49: {
      "title": "49. Etyczna strategia i produkcja VSL",
      "subtitle": "Jasne skrypty, uzasadnione twierdzenia, dostępne wideo i mierzone ulepszenia",
      "description": "Twórz video sales letters, które jasno wyjaśniają istotny problem, dowody i ofertę—bez manipulacji psychologicznej, sztucznej presji, ukrytych kontrolek i gwarancji konwersji.",
      "lessons": {
        "49.1": {
          "stageTitle": "49. Przejrzysty skrypt VSL",
          "title": "Zbuduj przekonujący VSL bez szoku i sztywnej formuły",
          "description": "Twórz jasną narrację wokół kontekstu odbiorcy, prawdziwego mechanizmu, odpowiednich dowodów, ograniczeń i dobrowolnego wezwania.",
          "learnContent": {
            "videoTitle": "Masterclass: architektura skryptu VSL oparta na dowodach",
            "summaryText": "Użyteczny VSL zdobywa uwagę trafnością i jasnością. Żaden czas, schemat dwunastu kroków ani „nowy mechanizm” nie gwarantuje sprzedaży, a oferta nie powinna być przedstawiana jako jedyny logiczny wybór.",
            "bulletPoints": [
              "Zacznij od realnej sytuacji odbiorcy i konkretnej, możliwej do poparcia zapowiedzi treści filmu",
              "Wyjaśnij mechanizm prostym językiem i rozróżnij dowody, hipotezę oraz opinię",
              "Używaj prawdziwych studiów przypadku za zgodą, z kontekstem typowości i ograniczeniami",
              "Jasno pokaż cenę, ważne warunki, zasady zwrotu i dostępność przed dobrowolnym wezwaniem"
            ],
            "coreConcepts": [
              {
                "iconName": "video",
                "title": "PRAWDZIWY MECHANIZM",
                "description": "Wyjaśnij, jak i dla kogo oferta może działać, jakie są dowody oraz gdzie pozostaje niepewność.",
                "highlight": true
              },
              {
                "iconName": "zap",
                "title": "TRAFNE OTWARCIE",
                "description": "Buduj uwagę rozpoznawalnym problemem i użyteczną zapowiedzią, nie lękiem, szokiem ani wymyślonym wrogiem."
              }
            ],
            "resources": [
              {
                "title": "Zeszyt skryptu VSL opartego na dowodach",
                "subtitle": "Odbiorcy, twierdzenia, dowody, obiekcje, ujawnienia i CTA",
                "type": "pdf",
                "iconName": "file-text",
                "actionUrl": "tools"
              },
              {
                "title": "GOM-MAR AI VSL Writer",
                "subtitle": "Twórz szkice do kontroli faktów, prawa i redakcji przez człowieka",
                "type": "tool",
                "iconName": "cpu",
                "actionUrl": "tools"
              }
            ],
            "fullArticleGuide": "### Zbuduj VSL szanujący odbiorcę\n\nVSL może skutecznie wyjaśniać ofertę, ale nie usuwa każdej obiekcji ani nie gwarantuje współczynnika konwersji. Ma pomóc odpowiedniej osobie podjąć świadomą decyzję.\n\n#### Odpowiedzialny proces skryptu\n\n1. **Określ odbiorcę i cel**: Powiedz, dla kogo jest film, co wyjaśnia i komu może nie pomóc.\n2. **Badaj prawdziwy język**: Korzystaj z rozmów, pytań do wsparcia i zatwierdzonych opinii bez wnioskowania o cechach wrażliwych.\n3. **Napisz trafne otwarcie**: Uczciwie zapowiedz użyteczny wynik; unikaj lęku, wstydu, szoku i fałszywej ciekawości.\n4. **Dokładnie opisz problem**: Nie wyolbrzymiaj skutków ani nie twórz wspólnego wroga.\n5. **Wyjaśnij mechanizm**: Oddziel dowody, dane dostawcy, doświadczenie i hipotezę.\n6. **Opowiedz prawdziwą historię**: Skracaj tylko dla jasności i nie fabrykuj trudności, odkrycia ani sukcesu.\n7. **Popieraj ważne twierdzenia**: Przechowuj dowody, daty, zakres i zgody; silniej kontroluj zdrowie i finanse.\n8. **Ostrożnie używaj opinii**: Uzyskaj zgodę, nie zmieniaj sensu montażem i ujawniaj nietypowe wyniki, gdy trzeba.\n9. **Uczciwie omawiaj obiekcje**: Uwzględnij koszt, wysiłek, wymagania, alternatywy, ograniczenia i warunki zwrotu.\n10. **Jasno pokaż ofertę**: Podaj elementy, pełną cenę, opłaty cykliczne, terminy i kwalifikację.\n11. **Używaj tylko prawdziwej pilności**: Termin lub limit musi być realny, udokumentowany i konsekwentny.\n12. **Daj dobrowolny następny krok**: Zachowaj widoczne opcje zakupu i wyjścia; nie ukrywaj ważnych warunków.\n13. **Sprawdź dostępność**: Dodaj napisy, transkrypcję, jasny język, czytelny kontrast i sygnały inne niż dźwięk.\n14. **Zatwierdź przed startem**: Odpowiedzialne osoby sprawdzają twierdzenia, prawa, prywatność, zasady platformy i prawo lokalne.\n15. **Testuj odpowiedzialnie**: Mierz zrozumienie, jakościowe konwersje, zwroty i skargi, nie tylko perswazję.\n\nTraktuj framework jako pomoc w pisaniu, nie matematyczną formułę sprzedaży.",
            "practicalExamples": [
              "Dobre otwarcie mówi, czego widz się dowie i jakie dowody wykorzystano, zamiast twierdzić, że cała jego wiedza jest błędna.",
              "Historia klienta zawiera zgodę oraz kontekst wysiłku i zmienności, zamiast przedstawiać wyjątkowy wynik jako typowy."
            ]
          },
          "understandContent": {
            "coreTakeaway": "Wiarygodny VSL ułatwia zrozumienie oferty i dowodów; nie manipuluje przekonaniami ani nie gwarantuje sprzedaży.",
            "keyPrinciples": [
              "Stosuj trafność i jasność zamiast szoku lub lęku",
              "Popieraj ważne twierdzenia i wyjaśniaj ograniczenia",
              "Zachowaj widoczne warunki i dobrowolne wezwanie"
            ]
          },
          "actionTask": {
            "instruction": "Napisz jeden odpowiedzialny skrypt VSL:",
            "checklistItems": [
              "Udokumentowano odbiorcę, cel, wykluczenia i dowody",
              "Sprawdzono mechanizm, twierdzenia, historie, opinie i zgody",
              "Dodano cenę, warunki, ograniczenia, alternatywy i prawdziwe terminy",
              "Sprawdzono napisy, transkrypcję, czytelność, prawa i akceptację"
            ],
            "toolboxCategory": "content"
          }
        },
        "49.2": {
          "stageTitle": "49. Dostępna produkcja i emisja VSL",
          "title": "Dostarczaj wideo niezawodnie bez zwodniczego odtwarzacza",
          "description": "Produkuj dostępne wideo, wybieraj hosting według pomiarów i wdrażaj odtwarzanie, analitykę oraz CTA z poszanowaniem zgody i przejrzystych kontrolek.",
          "learnContent": {
            "videoTitle": "Masterclass: dostępna produkcja VSL, hosting i pomiar",
            "summaryText": "Wydajność ma znaczenie, lecz żaden dostawca, autoplay ani obietnica poniżej 200 ms nie gwarantują zerowych rezygnacji. Testuj urządzenia i sieci, respektuj zasady przeglądarek oraz wybór użytkownika i zbieraj tylko potrzebne dane.",
            "bulletPoints": [
              "Projektuj slajdy mobile-first z czytelnym tekstem, odpowiednim kontrastem, napisami i transkrypcją",
              "Używaj głosu, pauz i muzyki dla zrozumienia bez przytłaczania lub ukrytego sterowania",
              "Unikaj niespodziewanego autoplay z dźwiękiem; zapewnij widoczne play, pauzę, głośność, tempo i napisy",
              "Wznawiaj odtwarzanie tylko z odpowiednią informacją, zgodą i kontrolą retencji"
            ],
            "coreConcepts": [
              {
                "iconName": "play",
                "title": "ODTWARZANIE POD KONTROLĄ",
                "description": "Film zaczyna się i trwa w sposób zrozumiały oraz kontrolowany przez widza.",
                "highlight": true
              },
              {
                "iconName": "zap",
                "title": "MIERZONA EMISJA",
                "description": "Hosting wybierasz na podstawie czasu startu, buforowania, niezawodności, dostępności, prywatności i kosztu."
              }
            ],
            "resources": [
              {
                "title": "Lista dostępnej produkcji VSL",
                "subtitle": "Skrypt, napisy, kontrast, audio, prawa, urządzenia i kontrola jakości",
                "type": "pdf",
                "iconName": "file-text",
                "actionUrl": "tools"
              },
              {
                "title": "Mara Landing Page VSL Player",
                "subtitle": "Konfiguruj przejrzyste CTA i analitykę z ochroną prywatności",
                "type": "tool",
                "iconName": "layout",
                "actionUrl": "landingpage"
              }
            ],
            "fullArticleGuide": "### Optymalizuj emisję bez odbierania kontroli\n\nVSL musi pozostać zrozumiały i użyteczny na różnych urządzeniach oraz łączach. Technologia ma wspierać decyzję, nie ukrywać informacji ani fabrykować uwagi.\n\n#### Kontrole produkcji i emisji\n\n1. **Stwórz dostępny materiał**: Nagraj czystą mowę, dodaj dokładne napisy i transkrypcję, opisz ważne obrazy i unikaj migania.\n2. **Projektuj dla małych ekranów**: Użyj dużego tekstu, kontrastu, bezpiecznych marginesów i tempa pozwalającego czytać.\n3. **Potwierdź prawa**: Udokumentuj licencje muzyki, materiałów, fontów, głosów i opinii.\n4. **Wybierz hosting według wymagań**: Porównaj niezawodność, streaming adaptacyjny, prywatność, dostępność, analitykę, region, wsparcie i koszt. Żadna platforma nie jest zawsze najlepsza.\n5. **Koduj adaptacyjnie**: Zapewnij odpowiednie rozdzielczości i sprawdź plakat, pierwszą klatkę, napisy oraz fallback.\n6. **Szanuj wybór odtwarzania**: Nie uruchamiaj dźwięku automatycznie. Zapewnij widoczne kontrolki i nie udawaj komunikatu systemowego.\n7. **Udostępnij ważne warunki**: Nie zmuszaj do oglądania do konkretnej minuty, by zobaczyć cenę, warunki, prywatność lub drogę zakupu.\n8. **Ostrożnie wznawiaj**: Wyjaśnij zapisywanie postępu, ogranicz retencję i zapewnij usunięcie lub rezygnację, gdy trzeba.\n9. **Minimalizuj analitykę**: Zbieraj potrzebne zdarzenia z odpowiednią informacją, zgodą i kontrolą dostępu; nie zapisuj pól wrażliwych w etykietach.\n10. **Testuj realne warunki**: Sprawdź popularne telefony, przeglądarki, technologie asystujące i wolne sieci. Mierz start, buforowanie i rozkład ukończeń.\n11. **Przygotuj awarie**: Zapewnij transkrypcję, ponowienie i wsparcie przy błędzie odtwarzania lub śledzenia.\n12. **Oceniaj jakość**: Analizuj wartościową sprzedaż, zrozumienie, zwroty, wsparcie i skargi obok oglądalności.\n\nNie obiecuj uniwersalnego start rate, opóźnienia ani bounce rate. Podawaj środowisko, próbę i metodę pomiaru.",
            "practicalExamples": [
              "Wyciszony podgląd jest testowany przeciw statycznemu plakatowi; zespół wybiera opcję poprawiającą jakościowe wyniki bez dezorientacji.",
              "Opóźnione CTA zwiększa oglądalność, lecz ukrywa cenę, więc zespół przywraca widoczne warunki i testuje jasny komunikat."
            ]
          },
          "understandContent": {
            "coreTakeaway": "Niezawodny VSL łączy dostępność, kontrolę użytkownika, mierzoną wydajność i analitykę chroniącą prywatność.",
            "keyPrinciples": [
              "Czyste audio i dokładne napisy są ważniejsze od zbędnej rozdzielczości",
              "Testuj czytelność mobilną i reprezentatywne sieci",
              "Nie ukrywaj ważnych warunków ani nie manipuluj kontrolkami"
            ]
          },
          "actionTask": {
            "instruction": "Wyprodukuj i sprawdź jeden VSL:",
            "checklistItems": [
              "Zatwierdzono audio, napisy, transkrypcję, obrazy i prawa",
              "Przetestowano kontrolki, czytelność mobilną, urządzenia i sieci",
              "Opublikowano widoczne warunki, CTA i rozwiązanie awaryjne",
              "Sprawdzono zgodę analityki, minimalizację, retencję i wyniki jakościowe"
            ],
            "toolboxCategory": "landingpage"
          }
        }
      }
    },

    50: {
      "title": "50. Odpowiedzialne planowanie holdingu i struktury spółek",
      "subtitle": "Przydatność, model podatkowy, ład, odpowiedzialność i gotowość transakcyjna",
      "description": "Dowiedz się, jak ocenić strukturę wielu spółek z wykwalifikowanym prawnikiem i doradcą podatkowym—bez uniwersalnych stawek, obietnic miliarderskiego bezpieczeństwa i pełnej ochrony majątku.",
      "lessons": {
        "50.1": {
          "stageTitle": "50. Przydatność holdingu i ład",
          "title": "Oceń strukturę matka–córka według aktualnego prawa i faktów",
          "description": "Poznaj możliwe zwolnienia udziałowe, podatek handlowy, dywidendy, exit, koszty zgodności i granice odpowiedzialności przed decyzją.",
          "learnContent": {
            "videoTitle": "Masterclass: ocena holdingu oparta na dowodach",
            "summaryText": "Holding może wspierać reinwestycję, ład lub transakcję, lecz nie jest obowiązkowy dla każdej firmy. Stawka typu 1,5% wynika z określonych założeń i zmienia się zależnie od udziału, rodzaju dochodu, podatku handlowego, kosztów, jurysdykcji i późniejszej wypłaty prywatnej.",
            "bulletPoints": [
              "Zmapuj właścicieli, spółki, działania, jurysdykcje, przepływy i cel gospodarczy",
              "Osobno modeluj dywidendy i sprzedaż udziałów według aktualnych reguł oraz wyjątków",
              "Porównaj odroczenie podatku z kosztami założenia, księgowości, banków, prawa i administracji",
              "Dokumentuj ład, ochronę kapitału, umowy powiązane, wypłacalność, gwarancje i pozostałą odpowiedzialność"
            ],
            "coreConcepts": [
              {
                "iconName": "shield",
                "title": "OGRANICZONA SEPARACJA",
                "description": "Spółki mogą oddzielić część ryzyka, lecz gwarancje, naruszenia, niedokapitalizowanie, antypodatkowe i upadłościowe roszczenia mogą przekraczać granice.",
                "highlight": true
              },
              {
                "iconName": "dollar-sign",
                "title": "MODEL PODATKOWY SCENARIUSZY",
                "description": "Pokazuj założenia, warstwy, czas, wyjątki i wypłatę prywatną zamiast jednej uniwersalnej stawki."
              }
            ],
            "resources": [
              {
                "title": "Brief oceny przydatności holdingu",
                "subtitle": "Fakty, cele, scenariusze, koszty, ryzyka i pytania prawne",
                "type": "pdf",
                "iconName": "file-text",
                "actionUrl": "tools"
              },
              {
                "title": "Mara CRM multi-company billing",
                "subtitle": "Oddzielaj zatwierdzone podmioty, faktury i role dostępu",
                "type": "tool",
                "iconName": "settings",
                "actionUrl": "settings"
              }
            ],
            "fullArticleGuide": "### Oceń strukturę przed wdrożeniem\n\nLekcja ma charakter edukacyjny i nie stanowi porady prawnej ani podatkowej. Reguły zależą od jurysdykcji i aktualnych faktów. Przed założeniem, transferem, dywidendą lub sprzedażą uzyskaj pisemną poradę.\n\n#### Odpowiedzialna ocena\n\n1. **Określ cel gospodarczy**: Ład, reinwestycja, inwestorzy, sukcesja lub exit—nie sama redukcja podatku.\n2. **Zmapuj jurysdykcje**: Rezydencja, miejsce zarządu, zakłady, właściciele i aktywa zmieniają analizę.\n3. **Modeluj stan obecny**: Oblicz podatki, gotówkę, ryzyka i koszty zgodności.\n4. **Oddziel rodzaje dochodu**: Zysk operacyjny, dywidendy, zysk kapitałowy, odsetki, najem i licencje mogą być traktowane różnie.\n5. **Sprawdź reguły udziałowe**: Zweryfikuj progi, okresy, wyjątki, podatek handlowy i przepisy przeciw nadużyciom. Nie nazywaj jednego działania uniwersalną stawką.\n6. **Uwzględnij wypłatę prywatną**: Środki w spółce nie są prywatną gotówką; modeluj pensję, dywidendę i likwidację.\n7. **Policz koszty stałe**: Założenie, notariusz, księgi, deklaracje, banki, kadry, umowy, wyceny i doradztwo.\n8. **Zaprojektuj ład**: Dyrektorzy, zgody, konflikty, kapitał, transakcje powiązane i dokumenty.\n9. **Sprawdź granice odpowiedzialności**: Gwarancje, czyny niedozwolone, obowiązki zarządu, podatki, finansowanie i zaskarżanie czynności. Żaden majątek nie jest nietykalny.\n10. **Kontroluj finansowanie i wypłaty**: Potwierdź wypłacalność, rezerwy, podatek u źródła, dokumenty i ochronę wierzycieli.\n11. **Planuj transakcje proporcjonalnie**: Wcześniejsza struktura może pomóc, ale późny transfer może powodować podatki, wycenę i zgody. Nie ma automatycznego terminu dla każdego.\n12. **Uzyskaj niezależne zatwierdzenie**: Doradca podatkowy i prawnik potwierdzają założenia, dokumenty i kolejność.\n13. **Oceniaj co roku i przed ważnym zdarzeniem**.\n\nPrawidłowym wynikiem może być brak holdingu, holding później lub inna struktura.",
            "practicalExamples": [
              "Firma porównuje korzyść odroczenia z dwoma kompletami ksiąg i czeka, aż zyski zatrzymane oraz plan sprzedaży uzasadnią koszt.",
              "Holding otrzymał dywidendę, lecz gwarancja bankowa i zaskarżalny transfer tworzą ekspozycję; aktywa nie stały się odporne."
            ]
          },
          "understandContent": {
            "coreTakeaway": "Holding to indywidualna decyzja o ładzie i inwestycjach, nie uniwersalny produkt podatkowy lub ochronny.",
            "keyPrinciples": [
              "Używaj aktualnego prawa i pisemnych założeń",
              "Modeluj cały cykl wraz z wypłatą i kosztami",
              "Traktuj separację odpowiedzialności jako ograniczoną i utrzymuj realny ład"
            ]
          },
          "actionTask": {
            "instruction": "Przygotuj profesjonalną ocenę holdingu:",
            "checklistItems": [
              "Zmapowano właścicieli, jurysdykcje, podmioty, działania, ryzyka i cele",
              "Zamodelowano dochody, warunki udziałowe, podatek handlowy, wypłatę i koszty",
              "Sprawdzono ład, gwarancje, wypłacalność, wierzycieli i scenariusze exit",
              "Uzyskano pisemną poradę podatkową i prawną przed wdrożeniem"
            ],
            "toolboxCategory": "settings"
          }
        },
        "50.2": {
          "stageTitle": "50. Własność IP, licencje i zarządzanie aktywami",
          "title": "Strukturyzuj IP bez sztucznego przesuwania zysku",
          "description": "Identyfikuj, wyceniaj, przenoś i licencjonuj IP tylko wtedy, gdy własność, cel gospodarczy, prawa, ceny i wierzyciele wspierają układ.",
          "learnContent": {
            "videoTitle": "Masterclass: odpowiedzialne zarządzanie IP i licencje powiązane",
            "summaryText": "Osobna spółka IP może wspierać zarządzanie, lecz transfer nie czyni aktywów niedostępnymi, a opłata nie jest automatycznie kosztem. Trzeba sprawdzić własność, funkcje, wycenę, podatki, upadłość, konkurencję, prywatność i umowy.",
            "bulletPoints": [
              "Utwórz rejestr znaków, kodu, treści, domen, danych, licencji, twórców i praw terytorialnych",
              "Potwierdź ciąg własności i zgody przed cesją lub licencją",
              "Wyceniaj licencje powiązane przez funkcje, aktywa, ryzyka i porównania—nie oczekiwany podatek",
              "Oceń opodatkowanie transferu, ukryte rezerwy, podatek u źródła, VAT, podatek handlowy, nadużycia i upadłość"
            ],
            "coreConcepts": [
              {
                "iconName": "lock",
                "title": "ZARZĄDZANY PORTFEL IP",
                "description": "Prawa, właściciele, licencje, odnowienia, dostęp i dowody są udokumentowane; separacja nie jest absolutną ochroną.",
                "highlight": true
              },
              {
                "iconName": "award",
                "title": "SUBSTANCJA I SUKCESJA",
                "description": "Fundacja wymaga realnego celu, ładu, beneficjentów, analizy podatku i kontroli; transfer nie jest automatycznie wolny od podatku."
              }
            ],
            "resources": [
              {
                "title": "Rejestr IP i brief licencji powiązanej",
                "subtitle": "Własność, wycena, funkcje, prawa, ceny, podatki i dowody zgód",
                "type": "pdf",
                "iconName": "file-text",
                "actionUrl": "tools"
              },
              {
                "title": "GOM-MAR Corporate Asset Manager",
                "subtitle": "Archiwizuj zatwierdzone prawa, umowy, dowody i odnowienia",
                "type": "tool",
                "iconName": "shield",
                "actionUrl": "settings"
              }
            ],
            "fullArticleGuide": "### Zarządzaj IP przed przeniesieniem\n\nLekcja jest edukacyjna, nie stanowi porady prawnej, podatkowej ani wyceny. Rejestracja znaku nie obejmuje każdego prawa, a zmiana właściciela w rejestrze to tylko część ważnego transferu.\n\n#### Kontrolowany proces IP\n\n1. **Zrób inwentaryzację**: Znaki, zgłoszenia, prawa autorskie, software, bazy, wzory, patenty, domeny, tajemnice i licencje wejściowe.\n2. **Sprawdź ciąg praw**: Umowy pracowników, wykonawców, agencji, open source, stock i platform. Nie przenoś praw, których spółka nie posiada.\n3. **Określ cel gospodarczy**: Centralne licencjonowanie, inwestycja, sprzedaż lub marka muszą być czymś więcej niż przesuwaniem zysku.\n4. **Wybierz właściciela według funkcji**: Rozważ, kto rozwija, ulepsza, utrzymuje, chroni i wykorzystuje IP oraz kontroluje ryzyko.\n5. **Uzyskaj obronną wycenę**: Udokumentuj metodę, prognozy, okres, terytorium, porównania i niepewność.\n6. **Modeluj transfer**: Może ujawnić wartość podatkową i wywołać VAT, podatek u źródła, rejestrację, finansowanie lub zgody.\n7. **Precyzyjnie napisz licencję**: Prawa, terytorium, wyłączność, czas, jakość, ulepszenia, dane, sublicencje, rozwiązanie i upadłość.\n8. **Uzasadnij cenę rynkową**: Analizuj funkcje, aktywa i ryzyka; aktualizuj dowody. Reguły krajowe i zagraniczne mogą się różnić.\n9. **Utrzymuj substancję**: Właściciel prawny rzeczywiście wykonuje lub kontroluje funkcje i decyzje; samo finansowanie może nie uzasadniać zwrotu.\n10. **Szanuj wierzycieli i upadłość**: Transfer może być zaskarżony, a zabezpieczenia, gwarancje i zachowanie grupy wpływają na separację.\n11. **Prawidłowo zmieniaj rejestry**: Spełnij wymogi dowodów i podpisów właściwego urzędu i zachowaj cesję.\n12. **Chroń dane i tajemnice**: Kontroluj dostęp, bezpieczeństwo, retencję i legalne użycie osobno od własności IP.\n13. **Niezależnie oceń fundację**: Kontrola, beneficjenci, zastrzeżone prawa, podatki od darowizn i spadków, raportowanie i trwałość. Nie obiecuj transferu bez podatku.\n14. **Zatwierdzaj i monitoruj**: Zarząd, podatki, prawo i wycena; śledź odnowienia, opłaty, naruszenia i coroczny przegląd cen.\n\nCzasem bezpośrednia własność w spółce operacyjnej jest prostsza i bezpieczniejsza.",
            "practicalExamples": [
              "Firma odkrywa, że kod wykonawcy nie został przeniesiony; naprawia tytuł przed transferem do spółki IP.",
              "Benchmark opłaty nie pasuje po przeniesieniu rozwoju do spółki operacyjnej, więc aktualizowane są funkcje, ceny i umowy."
            ]
          },
          "understandContent": {
            "coreTakeaway": "Separacja IP działa tylko z prawdziwą własnością, substancją, ceną, umowami i ładem; nie jest niezniszczalnym sejfem.",
            "keyPrinciples": [
              "Sprawdź tytuł i zgody przed transferem",
              "Uzasadnij ceny powiązane aktualnymi dowodami",
              "Łącznie oceń podatki, upadłość, dane i rejestry"
            ]
          },
          "actionTask": {
            "instruction": "Przygotuj przegląd zarządzania IP:",
            "checklistItems": [
              "Ukończono rejestr, ciąg praw i zgody stron trzecich",
              "Udokumentowano cel, funkcje, kontrolę, wycenę i scenariusze podatkowe",
              "Opracowano prawa, ceny, jakość, dane, rozwiązanie i upadłość",
              "Uzyskano zgodę prawną, podatkową i wycenę przed transferem lub rejestracją"
            ],
            "toolboxCategory": "settings"
          }
        }
      }
    },
    51: {
      title: '51. Odpowiedzialny account-based marketing B2B',
      subtitle: 'Dopasowanie kont, prywatność i zgodny outreach',
      description: 'Skup marketing enterprise na potwierdzonym dopasowaniu i użytecznych treściach—bez gwarancji, ukrytego profilowania i omijania procesów.',
      lessons: {
        '51.1': {
          stageTitle: '51. Strategia ABM i wybór kont',
          title: 'Priorytetyzuj konta bez inwazyjnego profilowania',
          description: 'Używaj dozwolonych dowodów i potwierdzonych potrzeb bez zakładania prywatnych lęków lub intencji.',
          learnContent: {
            videoTitle: 'Masterclass: ABM oparte na dowodach',
            summaryText: 'Liczba kont, wartość umowy, długość cyklu i sygnały intent to założenia, nie gwarancje.',
            bulletPoints: ['Oceniaj dopasowanie przejrzyście z kontrolą człowieka', 'Mapuj role bez stereotypów', 'Kontroluj dane intent i podstawę prawną', 'Twórz treści z potwierdzonych potrzeb'],
            coreConcepts: [{ iconName: 'target', title: 'MAPA DECYZJI', description: 'Zapisuj dowody, pewność, uprawnienia i pytania.', highlight: true }, { iconName: 'activity', title: 'ZWERYFIKOWANE SYGNAŁY', description: 'Szacunki nie są pewną intencją osoby.' }],
            resources: [{ title: 'Zeszyt kont ABM', subtitle: 'Dopasowanie, dowody, prywatność i przeglądy', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' }, { title: 'Mara CRM account management', subtitle: 'Kontakty ze źródłem i sprzeciwem', type: 'tool', iconName: 'users', actionUrl: 'crm' }],
            fullArticleGuide: `### Odpowiedzialny ABM

1. Określ ofertę, możliwości i ICP oparte na dowodach.
2. Zapisz źródła punktacji, pewność, wykluczenia i kontrolę człowieka.
3. Oddziel fakty, szacunki i hipotezy.
4. Mapuj publiczne role bez zbędnego scrapingu i prywatnych lęków.
5. Udokumentuj cel, podstawę, minimalizację, źródło, retencję, bezpieczeństwo i informację z art. 14 RODO.
6. Kontroluj dostawców intent i traktuj sygnały probabilistycznie.
7. Stosuj lokalne reguły e-maila, telefonu, social i poczty.
8. Informuj o sprzeciwie i zatrzymaj marketing bezpośredni.
9. Szanuj asystentów, zakupy, bezpieczeństwo i rady pracownicze.
10. Mierz jakość, sprzeciwy i skargi; usuwaj nieuzasadnione profile.

ABM nie gwarantuje kontraktu.`,
            practicalExamples: ['Sprawdź niepewny sygnał przed legalnym kontaktem.', 'Używaj zaakceptowanego procesu zakupowego organizacji.'],
          },
          understandContent: { coreTakeaway: 'Odpowiedzialny ABM szanuje dane osobowe, sprzeciwy i procesy zakupowe.', keyPrinciples: ['Oddziel fakty od szacunków intencji', 'Minimalizuj dane osobowe', 'Unikaj stereotypów i nadzoru'] },
          actionTask: { instruction: 'Przygotuj zgodny pilotaż ABM:', checklistItems: ['Określono ICP i przejrzystą punktację', 'Zapisano źródła i pewność', 'Udokumentowano podstawę, informację, retencję i sprzeciwy', 'Zaplanowano kanały, mierniki i przeglądy'], toolboxCategory: 'crm' },
        },
        '51.2': {
          stageTitle: '51. Zgodna poczta i outreach do kadry',
          title: 'Przesyłki bez prezentów i omijania procesów',
          description: 'Testuj proporcjonalną pocztę z jawnym nadawcą, kontrolą prezentów i legalnym follow-up.',
          learnContent: {
            videoTitle: 'Masterclass: zgodna poczta fizyczna',
            summaryText: 'Paczka nie ma gwarancji dotarcia do dyrektora; drogi przedmiot może naruszyć politykę, zakupy lub prawo antykorupcyjne.',
            bulletPoints: ['Sprawdź reguły prezentów, zakupów i antykorupcji', 'Podaj nadawcę i cel handlowy', 'Ogranicz tracking i retencję', 'Kontynuuj legalnie i szanuj asystentów'],
            coreConcepts: [{ iconName: 'mail', title: 'PROPORCJONALNA POCZTA', description: 'Użyteczna informacja idzie zaakceptowaną drogą.', highlight: true }, { iconName: 'video', title: 'ZGODNY FORMAT', description: 'Dostępny, bezpieczny, skromny i dozwolony.' }],
            resources: [{ title: 'Zeszyt zgodności poczty', subtitle: 'Cel, wartość, prywatność i mierniki', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' }, { title: 'Mara CRM delivery follow-up', subtitle: 'Przypomnienia sprawdzane przez człowieka bez presji', type: 'tool', iconName: 'send', actionUrl: 'crm' }],
            fullArticleGuide: `### Poczta z szacunkiem

1. Używaj celu informacyjnego, nie kupowania wpływu.
2. Sprawdź reguły pracodawcy, sektora, prezentów, zakupów i antykorupcji.
3. Preferuj informację lub zamówioną próbkę zamiast elektroniki i luksusu.
4. Używaj adresu firmy i minimalizuj dane osobowe.
5. Podaj nadawcę i cel; nie ukrywaj reklamy.
6. Unikaj niebezpiecznych lub niedostępnych formatów.
7. Kontroluj dostawców i retencję; dostawa nie dowodzi otwarcia.
8. Potwierdź reguły zgody na telefon B2B przed follow-up.
9. Szanuj asystentów, sprzeciwy i zakupy.
10. Mierz odpowiedzi, koszt, zwroty i skargi bez gwarancji otwarć lub spotkań.

Droga paczka nie tworzy dużego klienta.`,
            practicalExamples: ['Gdy prezenty są zakazane, wyślij jawną analizę przez proces dostawców.', 'Zapytaj asystenta o właściwą drogę zamiast twierdzić, że dyrektor odebrał paczkę.'],
          },
          understandContent: { coreTakeaway: 'Poczta działa tylko, gdy jest proporcjonalna, jawna, legalna i pełna szacunku.', keyPrinciples: ['Nie wymieniaj prezentów na dostęp', 'Tracking nie dowodzi uwagi dyrektora', 'Szanuj sprzeciwy i zakupy'] },
          actionTask: { instruction: 'Zaprojektuj zgodny pilotaż poczty:', checklistItems: ['Sprawdzono prezenty i antykorupcję', 'Zatwierdzono format, wartość i dostępność', 'Udokumentowano dane, dostawców i retencję', 'Zaplanowano legalny follow-up, mierniki i stop rules'], toolboxCategory: 'crm' },
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
