var t=[{type:"err",match:/\b(TODO|FIXME|DEBUG|OPTIMIZE|WARNING|XXX|BUG)\b/g},{type:"class",match:/\bIDEA\b/g},{type:"insert",match:/\b(CHANGED|FIX|CHANGE)\b/g},{type:"oper",match:/\bQUESTION\b/g}],a=[{type:"kwd",match:/@\w+/g},{type:"class",match:/{[\w\s|<>,.@\[\]]+}/g},{type:"var",match:/\[[\w\s="']+\]/g},...t],e="cmnt";export{a as default,e as type};