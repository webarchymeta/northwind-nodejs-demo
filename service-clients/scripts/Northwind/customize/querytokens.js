define([], function () {
    return function(tk, isquery) {
        switch (tk.TkName) {
            case '&&':
                tk.DisplayAs = 'and';
                break;
            case '||':
                tk.DisplayAs = 'or';
                break;
            case 'asc':
                tk.DisplayAs = 'asc';
                break;
            case 'desc':
                tk.DisplayAs = 'desc';
                break;
            default:
                break;
        }
    }
})