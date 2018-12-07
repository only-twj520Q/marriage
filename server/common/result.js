exports.succ = function(code, msg, data) {
  return {
      code: code || 0,
      msg: msg || '成功',
      data: data || {}
  };
}

exports.fail = function(code, msg) {
  return {
      code: code || -1,
      msg: msg || '服务器错误',
  };
}

exports.errorParam = function(code, msg) {
  return {
      code: code || -10,
      msg: msg || '参数错误，请填写正确参数',
  };
}
