function decorateHtmlResponse(pageTitle) {
  return function (req, res, next) {
    res.locals.html = true;
    res.locals.title = `${pageTitle} - iChat`;
    res.locals.loggedInUser = req.user;
    next();
  };
}

module.exports = decorateHtmlResponse;