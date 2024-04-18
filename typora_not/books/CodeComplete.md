# Code Complete

## Preface

MY PRIMARY CONCERN IN WRITING this book has been to narrow the gap between the 
knowledge of industry gurus(the experts) and professors on the one hand and common 
commercial practice on the other. Many powerful programming techniques hide in journals
and academic papers for years before trickling down to the programming public.

Although leading-edge software-development practice has advanced rapidly in recent years,
common practice hasn't. Many programs are still buggy(有错误的), late, and over budget(超支的),
and many fail to satisfy the needs of their users. Researchers in both 
the software industry and academic settings have discovered effective practices
that eliminate(消除)  most of the programming problems that were prevalent(普遍的) in the
nineties. Because these practices aren't often reported outside the pages of highly
specialized technical journals, however, most programming organizations aren't
yet using them in the nineties. Studies have found that it typically takes 5 to 15
years or more for a reseach development to make its way into commercial 
practice(Raghave and Chand 1989, Rogers 1995, Parnas 1999). This handbook
shortcuts the process, making key discoveries available to the average
programmer now.

### Who Should Read This Book?

The research and programming experience collected in this handbook will help
you to create higher-quality software and to do your work more quickly and with
fewer problems. This book will give you insight into why you've had problems
in the past and will show you how to avoid problems int future. The 
programming practices described here will help you keep big projects under 
control and help you maintain and modify software successfully as the demands 
of your projects change.

### Experienced Programmers

This handbook serves experienced programmers who want a comprehensive,
easy-to-use guide to software development. Because this book focus on
construction, the most familiar part of the software lifecycle, it makes powerful 
software development techniques understandable to self-taught(自学的) programmers as 
well as to programmers with formal training.

### Self-Taught Programmers

If you haven't had much formal training, you're in good company. About 50,000 
new programmers enter the profession each year(BLS 2002), but only about
35,000 software-related degrees are awarded each year(NCES 2000). From 
these figures it's a short hop(跳跃) to the conclusion that most programmers dont'
receive a formal education in software development. Many self-taught
programmers are found in the emerging group of professionals-engineer, 
accountants(会计),, teachers, scientists, and small-business owners-who program as 
part of their jobs but who do not necessarily view themselves as programmers. 
Regardless of the extent(程度) of your programming education, this handbook can give
you insight into effective programming practices.

### Students

The counterpoint to the programmer with experience but little formal training is 
the fresh college graduate. The recent graduate is often rich in theoretical 
knowledge but poor in the practical know-how that goes into building production 
programs. The practical lore of good coding is often passed down slowly in the 
ritualistic tribal dances of software architects, project leads, analysts, and more-
experienced programmers. Even more often, it's the product of the individual 
programmer's trials and errors. This book is an alternative to the slow workings 
of the traditional intellectual potlatch(盛大的宴会). It pulls together the helpful tips and 
effective development strategies(战略) previously available mainly by hunting and 
gathering from other people's experience. It's a hand up for the student making 
the transition from an academic environment to a professional one.

### Where Else Can You Find This Information

This book synthesizes(综合) construction techniques from a variety of sources. In 
addition to being widely scattered, much of the accumulated wisdom(智慧) about 
construction has reside outside written sources for years (Hildebrand 1989, 
McConnell 1997a). There is nothing mysterious about the effective, high-
powered programming techniques used by expert programmers. In the day-to-day 
rush of grinding out the latest project, however, few experts take the time to 
share what they have learned. Consequently(因此), programmers may have difficulty 
finding a good source of programming information.

The techniques described in this book fill the void after introductory and 
advanced programming texts. After you have read Introduction to Java,
Advanced Java, and Advanced Advanced Java, what book do you read to learn
more about programming? You could read books about the details of Intel or 
Motorola hardware, Windows or Linux operating-system functions, or about the 
details of another programming language_you can't use a language or program 
in an environment without a good reference to such details. But this is one of the 
few books that discusses programming per se. Some of the most beneficial 
programming aids are practices that you can use regardless of the environment or 
language you're working in. Other books generally neglect(忽视) such practices, which 
is why this book concentrates on them.

### Key Benefits of This Handbook

Whatever your background, this handbook can help you write better programs in 
less time and with fewer headaches.

**Complete software-construction reference**

This handbook discusses general aspects of construction such as software quality 
and ways to think about programming. It gets into nitty-gritty construction 
details such as steps in building classes, ins and outs of using data and control 
structures, debugging, refactoring, and code-tuning techniques and strategies. 
You don't need to read it cover to cover to learn about these topics. The book is 
designed to make it easy to find the specific information that interests you.

**Ready-to-use checklists**

This book includes checklists you can use to assess your software architecture, 
design approach, class and routine quality, variable names, control structure, 
layout, test eases, and much more.

**State-of-the-art information**

This handbook describes some of the most up-to-date techniques available, many 
of which have not yet made it into common use. Because this book draw from 
both practice and research, the techniques it describes will remain useful for 
years.

**Larger perspective on software development**

This book will give you a chance to rise above the fray of day-to-day fire 
fighting and figure out what works and what doesn't. Few practicing
programmers have the time to read through the dozens of software-engineering 
books and the hundreds of journal articles that have benn distilled into this 
handbook. The research and real-world experience gathered into this handbook 
will inform and stimulate your thinking about your projects, enabling you to take 
strategic action so that you don't have fight the same battles again an again.

**Absence of hype(炒作)**
Some software books contain 1 gram(克) of insight swathed(用...包裹) in 10 grams of hype.
This book presents balanced discussions of each technique's strengths and
weaknesses. You know the demands of your particular project better than anyone
else. This book provides the objective information you need to make good 
decisions about your specific circumstance.

**Concepts(概念) applicable(可应用的) to most common languages**

This book describes techniques(技术，方法) you can use to get the most of whatever 
language you're using, whether(无论) it's C++, Java, Visual Basic, or other similar 
languages.

**Numerous(existing in large numbers) code examples**

The book contains almost 500 examples of good and bad code. I've included so
many examples because, personally, I lean best from examples. I think other 
programmers learn best that way too.

The examples are in multiple languages because mastering more than one
language is often a watershed(分水岭) in the career of a professional programmer. Once a 
programmer realizes that programming principles transcend(超越) the syntax of any 
specific language, the doors swing open to knowledge that truly makes a
difference in quality and productivity.

In order to make the multiple-language burden as light as possible, I've avoided 
esoteric(晦涩的) language features except where they're specifically discussed. You don't
need to understand every nuance(细微差别)  of the code fragments to understand the points 
they're making. If you focus on the point being illustrated, you'll find that you 
can read the code regardless of the language. I've tried to make your job evn 
easier by annotating the significant parts of the examples. 

Access to other sources of information

This book collects much of the available information on software construction,
but it's hardly the last word. Throughout the chapters, "Additional Resources"
sections describe other book and articles you can read as you pursue(追求) the topics
you find most interesting.

Why This Handbook Was Written

The need for development handbooks that capture knowledge about effective
development practices is well recognized in the software-engineering 
community. A report of the Computer Science and Technology Board stated that
the biggest gains in software-development quality and productivity will come 
from codifying, unifying, and distributing existing knowledge about effective 
software-development practices(CSTB 1990, McConnell 1997a). The board 
concluded that the strategy for spreading that knowledge should be built on the 
concept of software-engineering handbooks.

The history of computer programming provides more insight into the particular 
need for a handbook on software construction.

The Topic of Construction Has Been Neglected

At one time, software development and coding were thought to be one and the same.
But as distinct(明显的) activities in the software-development life cycle have benn 
identified, some of the best minds in the field have spent their time analyzing 
and debating methods of project management, requirements, design, and testing. 
The rush to study these newly identified areas has left code construction as the 
ignorant cousin of software development.

Discussions about construction have also been hobbled by the suggestion that 
treating construction as a distinct software development activity implies that 
construction must also be treated as a distinct phase. In reality, software activities
and phases don't have to be set up in any particular relationship to each 
other, and it's useful to discuss the activity of construction regardless of whether 
other software activities are performed in phases, in iterations, or in some other way.

