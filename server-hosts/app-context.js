require('date-utils');

var utcoff = (new Date()).getTimezoneOffset() * 60000;

module.exports = {
    consts: {
        ChatShortMsgTypeId: 1,
        DataTransferMsgTypeId: 2,
        ChatAssocTypeId: 12,
        NewMessageNoticeTypeId: 2,
        PrivateChatNoticeTypeId: 3,
        ChatGroupTypeID: 7
    },
    
    getcntx: function () {
        return {
            TrackID: (new Date()).getTime(),
            CallerID: global.MembershipPlusClientContext.CallerID,
            SessionID: global.MembershipPlusClientContext.SessionID,
            SecurityTicket: global.MembershipPlusClientContext.SecurityTicket,
            _filterExprTable_: global.MembershipPlusClientContext._filterExprTable_,
            OverrideExisting: global.MembershipPlusClientContext.OverrideExisting,
            DirectDataAccess: global.MembershipPlusClientContext.DirectDataAccess,
            AcceptLanguages: global.MembershipPlusClientContext.AcceptLanguages
        };
    },
    
    toJsonDate: function (dt) {
        var str = "/Date(";
        //str += (dt.getTime() + utcoff).toString();
        str += (dt.getTime()).toString();
        var off = utcoff > 0 ? dt.getTimezoneOffset() : -dt.getTimezoneOffset();
        var h = off / 60;
        var hstr = h > 9 ? h.toString() : '0' + h.toString();
        var m = off % 60;
        var mstr = m > 9 ? m.toString() : '0' + m.toString();
        if (utcoff > 0) {
            str += '-' + hstr + mstr;
        } else {
            str += '+' + hstr + mstr;
        }
        return str + ")/";
    },
    
    fromJsonDate: function (val) {
        var tv = val.substr(6);
        tv = tv.substr(0, tv.length - 2);
        var ms = parseInt(tv);
        return new Date(ms);
    },
    
    formatDate: function (dt, utc) {
        var fmt = function (i) {
            return i < 10 ? '0' + i : '' + i;
        }
        if (typeof utc == 'undefined' || utc) {
            return dt.getUTCFullYear() + '-' + fmt(dt.getUTCMonth() + 1) + '-' + fmt(dt.getUTCDate()) + ' ' + fmt(dt.getUTCHours()) + ':' + fmt(dt.getUTCMinutes()) + ':' + fmt(dt.getUTCSeconds()) + '.' + fmt(dt.getUTCMilliseconds()) + ' Utc';
        } else {
            return dt.getFullYear() + '-' + fmt(dt.getMonth() + 1) + '-' + fmt(dt.getDate()) + ' ' + fmt(dt.getHours()) + ':' + fmt(dt.getMinutes()) + ':' + fmt(dt.getSeconds()) + '.' + fmt(dt.getMilliseconds()) + ' Ltc';
        }
    },
    
    isCallMessage: function (evt) {
        return typeof evt.type != 'undefined' && evt.type == 'UserCallMessage';
    }
}