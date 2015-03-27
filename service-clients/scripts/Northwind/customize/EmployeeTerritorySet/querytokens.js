define(['commonQueryTerms'], function (c) {
    return function(tk, isquery) {
        c(tk, isquery);
        // todo: add custom map here ...
        // switch (tk.TkName) {
        //     case '...' {
        //             tk.DisplayAs = 'new name' ...
        //             return false if the token is not to be shown
        //         }
        //         break;
        // }
        // 
        // finally, if not matched 
        return true;
    }
})