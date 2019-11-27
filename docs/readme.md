## operators

1. audit
2. auditTime
3. buffer
4. bufferCount
5. bufferTime
6. bufferToggle
7. bufferWhen
8. catchError
9. combineAll 当源 observable 完成时，对收集的 observables 使用 combineLatest
10. combineLatest 当任意 observable 发出值时，发出每个 observable 的最新值
11. concatAll 收集 observables，当前一个完成时订阅下一个
12. concatMap
13. concatMapTo
14. count
15. debounce
16. debounceTime 舍弃掉在两次输出之间小于指定时间的发出值
17. defaultIfEmpty 如果在完成前没有发出任何通知，那么发出给定的值
18. delay 延迟
19. delayWhen
20. dematerialize
21. distinct 去重
22. distinctUntilChanged 直到改变
23. distinctUntilKeyChanged 直到改变
24. elementAt 第几个
25. endWith 
26. every 如果完成时所有的值都能通过断言，那么发出 true，否则发出 false 。
27. exhaust
28. exhaustMap
29. expand
30. filter 过滤
31. finalize
32. find
33. findIndex
34. first
35. flatMap
36. groupBy
37. ignoreElements
38. isEmpty
39. last
40. map
41. mapTo
42. materialize
43. max
44. mergeAll 收集并订阅所有的 observables
45. mergeMap
46. mergeMapTo
47. mergeScan
48. min
49. multicast
50. observeOn
51. onErrorResumeNext
52. pairwise 将前一个值和当前值作为数组发出
53. pluck
54. publish
55. publishBehavior
56. publishLast
57. publishReplay
58. reduce
59. refCount
60. repeat
61. repeatWhen
62. retry
63. retryWhen
64. sample 取样
65. sampleTime
66. scan
67. sequenceEqual
68. share
69. shareReplay
70. single
71. skip
72. skipLast
73. skipUntil
74. skipWhile
75. startWith 发出给定的第一个值
76. subscribeOn
77. switchAll 有就舍弃
78. switchMap
79. switchMapTo
80. take 取
81. takeLast 取最后一个
82. takeUntil 直到**取
83. takeWhile 当**时候取
84. tap log或执行
85. throttle 以某个时间间隔为阈值，在 durationSelector 完成前将抑制新值的发出
86. throttleTime 当指定的持续时间经过后发出最新值
87. throwIfEmpty
88. interval 基于给定时间间隔发出数字序列
89. timeInterval
90. timeout
91. timeoutWith
92. timestamp
93. toArray
94. window
95. windowCount
96. windowTime
97. windowToggle
98. windowWhen
99. withLatestForm
100. zipAll
101. concat 按照顺序，前一个 observable 完成了再订阅下一个 observable 并发出值
102. from 将数组、promise 或迭代器转换成 observable
103. forkJoin 当所有 observables 完成时，发出每个 observable 的最新值
104. fromEvent 将事件转换成 observable 序列
105. fromEventPattern 
106. merge 将多个 observables 转换成单个 observable
107. of
108. race 使用首先发出值的 observable 
109. withLatestFrom 还提供另一个 observable 的最新值。
110. create 使用给定的订阅函数来创建 observable 
111. empty 立即完成的 observable
112. range 依次发出给定区间内的数字
