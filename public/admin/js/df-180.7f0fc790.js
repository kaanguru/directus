(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["df-180"],{e745:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=p;var o=["vasárnap","hétfőn","kedden","szerdán","csütörtökön","pénteken","szombaton"];function r(e){return function(t,n,r){var a=t.getUTCDay();return(e?"":"'múlt' ")+"'"+o[a]+"' p'-kor'"}}var a={lastWeek:r(!1),yesterday:"'tegnap' p'-kor'",today:"'ma' p'-kor'",tomorrow:"'holnap' p'-kor'",nextWeek:r(!0),other:"P"};function p(e,t,n,o){var r=a[e];return"function"===typeof r?r(t,n,o):r}e.exports=t.default}}]);
//# sourceMappingURL=df-180.7f0fc790.js.map