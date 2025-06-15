const r={AdrianDonnelly:{first_name:"Adrian",last_name:"Donnelly",links:[["https://www.linkedin.com/in/adrdonnelly/","LinkedIn"],["https://adriandonnelly.me/","Blog"],["https://github.com/AdrianDonnelly","Github"]]},DavidByrne:{first_name:"David",last_name:"Byrne",links:[["https://www.linkedin.com/in/david-byrne-tudstudent/","LinkedIn"]]},ThomasLynch:{first_name:"Thomas",last_name:"Lynch",links:[["https://www.linkedin.com/in/lynchthomasd/","LinkedIn"]]},KeithQuille:{first_name:"Keith",last_name:"Quille",links:[["https://www.linkedin.com/in/kquille/","LinkedIn"],["https://keithquille.com/","Blog"],["https://x.com/KQuille","X / Twitter"],["https://scholar.google.com/citations?user=k0hujB0AAAAJ&hl=en&oi=ao","Google Scholar"],["https://www.researchgate.net/profile/Keith-Quille","ResearchGate"],["https://www.tudublin.ie/explore/faculties-and-schools/computing-digital-data/enterprise-computing-and-digital-transformation/people/keithquille.php","TU Dublin"]]},SeanMcHugh:{first_name:"Seán",last_name:"McHugh",links:[["https://www.linkedin.com/in/seanjmchugh/","LinkedIn"],["https://www.tudublin.ie/explore/faculties-and-schools/computing-digital-data/enterprise-computing-and-digital-transformation/people/seanmchugh.php","TU Dublin"]]},BarryFeeney:{first_name:"Barry",last_name:"Feeney",links:[["https://www.linkedin.com/in/barry-feeney-76a16733/","LinkedIn"],["https://www.tudublin.ie/explore/faculties-and-schools/computing-digital-data/enterprise-computing-and-digital-transformation/people/barryfeeney.php","TU Dublin"]]},GrzegorzManiak:{first_name:"Grzegorz",last_name:"Maniak",links:[["https://www.linkedin.com/in/grzegorz-maniak/","LinkedIn"],["https://grzegorz.ie/","Website"],["https://git.grzegorz.ie/","Github"]]},CrystalMatticks:{first_name:"Crystal",last_name:"Matticks",links:[["https://www.linkedin.com/in/crystalclcm/","LinkedIn"]]},AlejandroCarreteroÁlvarez:{first_name:"Alejandro",last_name:"Carretero Álvarez",links:[["https://www.linkedin.com/in/alejandrocarret3ro/","LinkedIn"]]},JakeMcKenna:{first_name:"Jake",last_name:"McKenna",links:[["https://www.linkedin.com/in/alejandrocarret3ro/","LinkedIn"]]}};var C=function(){function a(){}var n=a.prototype;return n.expandToken=function(e){for(var i=[],s="",o=0,l=e.length;o<l;++o)s+=e.charAt(o),i.push(s);return i},a}(),U=function(){function a(){}var n=a.prototype;return n.sanitize=function(e){return e?e.toLocaleLowerCase().trim():""},a}();function I(a,n){n=n||[],a=a||{};for(var t=a,e=0;e<n.length;e++)if(t=t[n[e]],t==null)return null;return t}var j=function(){function a(t){this._uidFieldName=t,this._tokenToIdfCache={},this._tokenMap={}}var n=a.prototype;return n.indexDocument=function(e,i,s){this._tokenToIdfCache={};var o=this._tokenMap,l;typeof o[e]!="object"?o[e]=l={$numDocumentOccurrences:0,$totalNumOccurrences:1,$uidMap:{}}:(l=o[e],l.$totalNumOccurrences++);var h=l.$uidMap;typeof h[i]!="object"?(l.$numDocumentOccurrences++,h[i]={$document:s,$numTokenOccurrences:1}):h[i].$numTokenOccurrences++},n.search=function(e,i){for(var s={},o=0,l=e.length;o<l;o++){var h=e[o],g=this._tokenMap[h];if(!g)return[];if(o===0)for(var m=Object.keys(g.$uidMap),d=0,p=m.length;d<p;d++){var c=m[d];s[c]=g.$uidMap[c].$document}else for(var m=Object.keys(s),d=0,p=m.length;d<p;d++){var c=m[d];typeof g.$uidMap[c]!="object"&&delete s[c]}}var w=[];for(var c in s)w.push(s[c]);var f=this._createCalculateTfIdf();return w.sort(function(u,y){return f(e,y,i)-f(e,u,i)})},n._createCalculateIdf=function(){var e=this._tokenMap,i=this._tokenToIdfCache;return function(o,l){if(!i[o]){var h=typeof e[o]<"u"?e[o].$numDocumentOccurrences:0;i[o]=1+Math.log(l.length/(1+h))}return i[o]}},n._createCalculateTfIdf=function(){var e=this._tokenMap,i=this._uidFieldName,s=this._createCalculateIdf();return function(l,h,g){for(var m=0,d=0,p=l.length;d<p;++d){var c=l[d],w=s(c,g);w===1/0&&(w=0);var f;i instanceof Array?f=h&&I(h,i):f=h&&h[i];var u=typeof e[c]<"u"&&typeof e[c].$uidMap[f]<"u"?e[c].$uidMap[f].$numTokenOccurrences:0;m+=u*w}return m}},a}(),B=/[^a-zа-яё0-9\-']+/i,P=function(){function a(){}var n=a.prototype;return n.tokenize=function(e){return e.split(B).filter(function(i){return i})},a}();function O(a,n){for(var t=0;t<n.length;t++){var e=n[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(a,e.key,e)}}function F(a,n,t){return n&&O(a.prototype,n),a}var E=function(){function a(t){if(!t)throw Error("js-search requires a uid field name constructor parameter");this._uidFieldName=t,this._indexStrategy=new C,this._searchIndex=new j(t),this._sanitizer=new U,this._tokenizer=new P,this._documents=[],this._searchableFields=[]}var n=a.prototype;return n.addDocument=function(e){this.addDocuments([e])},n.addDocuments=function(e){this._documents=this._documents.concat(e),this.indexDocuments_(e,this._searchableFields)},n.addIndex=function(e){this._searchableFields.push(e),this.indexDocuments_(this._documents,[e])},n.search=function(e){var i=this._tokenizer.tokenize(this._sanitizer.sanitize(e));return this._searchIndex.search(i,this._documents)},n.indexDocuments_=function(e,i){this._initialized=!0;for(var s=this._indexStrategy,o=this._sanitizer,l=this._searchIndex,h=this._tokenizer,g=this._uidFieldName,m=0,d=e.length;m<d;m++){var p=e[m],c;g instanceof Array?c=I(p,g):c=p[g];for(var w=0,f=i.length;w<f;w++){var u,y=i[w];if(y instanceof Array?u=I(p,y):u=p[y],u!=null&&typeof u!="string"&&u.toString&&(u=u.toString()),typeof u=="string")for(var T=h.tokenize(o.sanitize(u)),v=0,D=T.length;v<D;v++)for(var A=T[v],M=s.expandToken(A),_=0,L=M.length;_<L;_++){var W=M[_];l.indexDocument(W,c,p)}}}},F(a,[{key:"indexStrategy",set:function(e){if(this._initialized)throw Error("IIndexStrategy cannot be set after initialization");this._indexStrategy=e},get:function(){return this._indexStrategy}},{key:"sanitizer",set:function(e){if(this._initialized)throw Error("ISanitizer cannot be set after initialization");this._sanitizer=e},get:function(){return this._sanitizer}},{key:"searchIndex",set:function(e){if(this._initialized)throw Error("ISearchIndex cannot be set after initialization");this._searchIndex=e},get:function(){return this._searchIndex}},{key:"tokenizer",set:function(e){if(this._initialized)throw Error("ITokenizer cannot be set after initialization");this._tokenizer=e},get:function(){return this._tokenizer}}]),a}();const S={title:"2025 Mastercard Intern Hackathon",body:`The Intern Hackathon has officially Concluded at Mastercard Dublin!
What an incredible week! We just wrapped up the Mastercard Intern Hackathon, an intense but rewarding experience where our team crea`,date:new Date("2025-05-17T00:00:00.000Z"),cover:"/images/14104428044736578416.webp",tags:["Mastercard","Internship","Intern","Hackathon","AI"],people:[r.AdrianDonnelly,r.CrystalMatticks,r.AlejandroCarreteroÁlvarez,r.JakeMcKenna],stringDate:"17 May 2025",markdown:`# The Intern Hackathon has officially Concluded at Mastercard Dublin!
What an incredible week! We just wrapped up the Mastercard Intern Hackathon, an intense but rewarding experience where our team created the app: WellnessHub.

## WellnessHub: Employee Wellness
We built WellnessHub as a comprehensive app and website designed to empower employees to make healthy choices easier. It's all about putting well-being at their fingertips.

### Key features include:
Personalized AI Chatbot: This intelligent assistant provides tailored recommendations for diet, fitness routines, and much more, adapting to individual needs and preferences.

Fitness Tracker: Seamlessly integrated with the Sports and Social Committee, this feature offers employees better access to events, challenges, and opportunities to stay active within Mastercard.

Diet Planner: To simplify healthy eating, our diet planner is directly integrated with the Office Cafe Menu, making it easy for employees to make informed and healthy choices for their meals on-site.

## The Hackathon: Collaboration and Creation
The week was a blur of brainstorming, coding, and learning. Our team poured our energy into bringing WellnessHub to life, supported every step of the way by our dedicated mentors from Mastercard. Their guidance was invaluable in transforming our ideas into a tangible product.
'm incredibly proud of our team's achievement! The Mastercard Intern Hackathon was an invaluable experience, providing us with hands-on development skills, fostering teamwork, and offering a unique insight into innovation within a leading global company. I'm excited for what's next and to apply these learnings in future endeavors.




![Mastercard](/images/2133731464250319832.webp)
![Mastercard](/images/14903544056001370068.webp)
`,id:"_Mastercard_Hackathon"},x={title:"Joining Mastercard",body:`Joining Mastercard as a Software Engineering Intern

I'm thrilled to announce that I'll be joining Mastercard as a Software Engineering Intern starting in February 2025!
I will be based in the Dublin `,date:new Date("2025-02-04T00:00:00.000Z"),cover:"/images/12804667334575758924.webp",tags:["Mastercard","Internship","Intern"],stringDate:"4 February 2025",markdown:`## Joining Mastercard as a Software Engineering Intern

I'm thrilled to announce that I'll be joining Mastercard as a Software Engineering Intern starting in February 2025!
I will be based in the Dublin tech hub, and I will be working there for 6 months as part of my university program.
I'm incredibly excited for the opportunity to learn from some of the best in the industry and gain hands-on experience at a company with such an innovative and impactful legacy.

## Looking Forward
I’m excited about the challenges, growth opportunities, and the chance to apply my skills in a real-world setting. Whether it’s through technical projects, social events, or just daily interactions with colleagues, I know this experience will be an incredible stepping stone in my career as a software engineer.

![Mastercard](/images/1515426641766179762.webp)
![Mastercard](/images/11098603653584951796.webp)
![Mastercard](/images/15915910534042466783.webp)
`,id:"_Joining_Mastercard"},z={title:"Founding of Serros ML",body:`Introducing Serros.ML

Greg and I are excited to share Serros.ML, a programmable, event-driven AI customer support assistant. 
We’re building something more than just another chatbot, it’s a smarter w`,link:"https://serros.ml",date:new Date("2024-11-10T00:00:00.000Z"),dateModified:new Date("2025-01-14T00:00:00.000Z"),cover:"/images/9165565397803993248.webp",tags:["SerrosML","Founding","Startup","MachineLearning","AI","DataScience"],links:[{title:"Serros ML",url:"https://serros.ml"},{title:"Serros ML (LinkedIn)",url:"https://www.linkedin.com/company/serrosml/"}],people:[r.GrzegorzManiak,r.AdrianDonnelly],stringDate:"10 November 2024",markdown:`# Introducing Serros.ML

Greg and I are excited to share **Serros.ML**, a programmable, event-driven AI customer support assistant. 
We’re building something more than just another chatbot, it’s a smarter way to manage customer interactions, 
blending AI and workflows to get things done efficiently and predictably.

Our idea? Streamline customer service without over-relying on LLMs, which are often hit-or-miss when it comes
to structured tasks. Instead, Serros.ML takes a controlled, repeatable approach. Think less "AI magic," more 
"AI that works when you need it."

### Why Serros.ML?

We’re not here to follow the AI trend for the sake of it. We see AI as a practical tool, a way to simplify 
processes and create real value, not add unnecessary complexity.

Here’s where we stand:
- **Not just a chatbot:** Serros.ML isn’t about replicating human agents; it’s about empowering them.
- **No spammy automation:** We focus on task-driven workflows, not blasting customers with unsolicited spam.
- **Control over chaos:** Unlike others, we aim for structured, reliable outputs you can trust.
- **Purpose-built AI:** It’s not AI for AI’s sake. It’s AI built to solve real problems businesses face every day.

### Landing Page: Coming Soon!

![Landing Page](/images/6970284456761404686.webp)

> Serros.ML Landing Page Preview

We’re working hard to roll out our site, and we’re almost there. Our landing page will give you a quick look at what we’re building, where we’re going, and how we aim to improve customer service. Expect an easy-to-navigate experience that lets you explore Serros.ML in a few clicks.

### How Users Will Interact: A Scratch-like System

![Scratch System](/images/394341071847294269.webp)

> Serros.ML Scratch-like System Preview

One of the things we’re excited about is the **interactive interface** we’re designing for users. It’s built around a drag-and-drop system where you can create your own workflows by placing "blocks" into the conversation flow. Want to extract a variable from the conversation? Drag the **Extract Variable Block**. Need a condition? Use the **If** or **If-Else** blocks. When it’s time to end the conversation, simply drag the **End Call** block. It’s that simple.

### What’s Next?

We’ve made solid progress on our MVP, and we’re excited about what’s ahead. From planning customer conversation workflows to designing a dashboard that puts users in control, things are moving fast.

If you’re interested in joining us on this journey, whether you’re curious, want to invest, or just like what we’re building, shoot us a message at [hey@serros.ml](mailto:hey@serros.ml)
or follow us on LinkedIn [here](https://www.linkedin.com/company/serrosml/).

Let’s make customer support smarter, together.




`,id:"_Serros_ML"},H={title:"Best Patient Benefit @ TUH Healthcare Hackathon 2024",body:`My Team's Winning Project at the TU Dublin Hackathon


I'm excited to share that my team won the "Best Patient Benefit" award at the TU Dublin Digital Health
Innovation Challenge.
My team, consisting `,link:"https://www.linkedin.com/posts/grzegorz-maniak_im-happy-to-share-that-my-team-adrian-activity-7250082211905835008-jg7S?utm_source=share&utm_medium=member_desktop",date:new Date("2024-10-04T00:00:00.000Z"),cover:"/images/18321906087727174184.webp",tags:["hackathon","aws","healthcare","innovation","ai","award"],links:[{title:"Irish Medical Times",url:"https://www.imt.ie/news/tu-dublin-students-present-innovative-tech-based-solutions-to-challenges-set-by-tuh-09-10-2024/"},{title:"Tallaght University Hospital",url:"https://www.tudublin.ie/news/2024/tu-dublin-students-present-innovative-tech-based-solutions-to-challenges-set-by-tuh.html"},{title:"TU Dublin",url:"https://www.tudublin.ie/explore/news/transforming-healthcare-innovation-challenge-launched-.html"},{title:"AWS inCommunities",url:"https://aws.amazon.com/about-aws/global-infrastructure/aws-incommunities/"},{title:"Serros ML (LinkedIn)",url:"https://www.linkedin.com/company/serrosml/"}],people:[r.AdrianDonnelly,r.DavidByrne,r.ThomasLynch,r.GrzegorzManiak,r.KeithQuille,r.SeanMcHugh,r.BarryFeeney],stringDate:"4 October 2024",markdown:`### My Team's Winning Project at the TU Dublin Hackathon


I'm excited to share that my team won the "_Best Patient Benefit_" award at the TU Dublin Digital Health
Innovation Challenge.
My team, consisting of Grzegorz Maniak, David Byrne, Thomas Lynch, 
and _myself_, Adrian Donnelly, worked tirelessly overnight to develop a solution that would benefit patients 
struggling with chronic illnesses.
### Our Project

Our project focused on simplifying the management of chronic conditions through an AI phone service. 
We designed this innovative tool to eliminate the need for apps or smartphones, making it more
accessible and user-friendly for patients. Our goal was to make healthcare more efficient 
and patient-centric. We used a combination of Python, Typescript, Cloudflare and Bland AI to create this
solution, you can check out the conversation flow in the image below:

![AI Conversation Flow](/images/8516382344345283282.webp)

> Bland AI Conversation Flow

### The Hackathon Experience

The hackathon was a jam packed **24** hours, with **78 students** from TU Dublin dividing into 20+ teams to 
tackle five challenges set by Tallaght University Hospital. We were honored to have Senior Cloud 
Solutions Architects from AWS provide expertise and guidance throughout the process, although, we did 
not use AWS services in our solution, we did ask for advice on how we could implement it in the future.

We worked closely with clinicians to gain a deeper understanding of the brief and ensure our
solution met the needs of both patients and healthcare professionals. The support we received 
from TUH and AWS was invaluable, and their presentations on ethics, data, cyber security, and GDPR 
were crucial in developing a technological solution that prioritized patient well-being.

### The Outcome

We're thrilled to have won the "_Best Patient Benefit_" award for our project. It's an incredible
feeling knowing that our work has the potential to make a real difference in people's lives.

### What's Next?

We are currently exploring opportunities to further develop our project and potentially bring it to market,
we have reached out to the startup incubator at TU Dublin.`,id:"_2024_TUH_Healthcare_Hackathon"},G={title:"Best Use of Technology @ TUH Healthcare Hackathon 2023",body:"I'm excited to share that our team—Grzegorz Maniak, Joven Sagrado, and I—participated in the #HealthHackathonTUH with AWS. Our project, 'Simplifying the Reporting of Broken and Missing Equipment, Patients, and Staff,' focused on tracking while ensuring privacy through passive Bluetooth Low Energy trackers. We were thrilled to win the 'Best Use of Technology' award and look forward to competing again next year!",link:"https://www.linkedin.com/posts/grzegorz-maniak_healthhackathontuh-activity-7113879608889860096-0nyj?utm_source=share&utm_medium=member_desktop",date:new Date("2023-09-23T00:00:00.000Z"),cover:"/images/4190986088849339156.webp",tags:["hackathon","aws","healthcare","innovation","ai","award"],links:[{title:"Tallaght University Hospital",url:"https://www.tuh.ie/News/TU-Dublin-Students-Create-Innovative-Tech-Based-Solutions-to-Tackle-Healthcare-Issues-%C2%A0.html"},{title:"Tallaght University Hospital Announcement",url:"https://www.tuh.ie/News/Third-Health-Hackathon-Announced-.html"},{title:"TU Dublin",url:"https://www.tudublin.ie/explore/news/archive-2023/tu-dublin-students-create-innovative-tech-based-solutions-to-tackle-healthcare-issues--.html"},{title:"TU Dublin Announcement",url:"https://www.tudublin.ie/explore/news/archive-2023/third-health-hackathon-announced-.html"},{title:"AWS inCommunities",url:"https://aws.amazon.com/about-aws/global-infrastructure/aws-incommunities/"},{title:"Echo.ie",url:"https://www.echo.ie/hospital-launches-third-hackathon-for-students/"}],people:[r.AdrianDonnelly,r.GrzegorzManiak,r.KeithQuille,r.SeanMcHugh,r.BarryFeeney],stringDate:"23 September 2023",markdown:"",id:"_2023_TUH_Healthcare_Hackathon"},$={title:"Best Use of Technology @ TUH Healthcare Hackathon 2022",body:"Thrilled to take 2nd place at #HealthHackathonTUH with GrzegorzManiak! We built a patient weight-tracking app for better care. Thanks to Keith Quille, AWS, & TUH!",date:new Date("2022-10-04T00:00:00.000Z"),cover:"/images/9023364194408091261.webp",tags:["hackathon","aws","healthcare","innovation","ai","award"],links:[{title:"Tallaght University Hospital Announcement",url:"https://www.tuh.ie/News/TUH-TU-Dublin-to-Host-Second-Innovative-Health-Hackathon-.html"},{title:"TU Dublin",url:"https://www.tudublin.ie/explore/news/archive-2022/healthcare-hackathon-2022.html"},{title:"AWS inCommunities",url:"https://aws.amazon.com/about-aws/global-infrastructure/aws-incommunities/"}],people:[r.AdrianDonnelly,r.GrzegorzManiak,r.KeithQuille,r.SeanMcHugh,r.BarryFeeney],stringDate:"4 October 2022",markdown:"",id:"_2022_TUH_Healthcare_Hackathon"},N=[S,x,z,H],b=[S,x,z,H,G,$],k=new E("id");k.addIndex("title");k.addIndex("body");k.addIndex("tags");k.addIndex(["people","first_name"]);k.addIndex(["people","last_name"]);k.addIndex(["date","getFullYear"]);k.addIndex("stringDate");k.addDocuments(b);function K(a,n=20){const t=[];let e=0;for(;t.length<a;){const i=Math.floor(Math.random()*b.length),s=b[i];t.includes(s)&&e++<n||t.push(s)}return t}const J=b.slice(0,5);export{b as A,N as F,K as G,J as R,$ as _,G as a,H as b,x as c,S as d,z as e,k as s};
