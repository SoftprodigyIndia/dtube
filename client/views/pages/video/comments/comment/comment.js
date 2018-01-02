Template.comment.events({
  'click .downvoteComment': function (event) {
    var author = $(event.target).data('author')
    if (!author) author = $(event.target).parent().data('author')
    var permlink = $(event.target).data('permlink')
    if (!permlink) permlink = $(event.target).parent().data('permlink')
    var weight = Session.get('voteWeight') * -100
    broadcast.vote(author, permlink, weight, function (err, result) {
      if (err) toastr.error(err.cause.payload.error.data.stack[0].format, translate('GLOBAL_ERROR_COULD_NOT_VOTE'))
      else toastr.success(translate('GLOBAL_ERROR_DOWNVOTE_FOR', weight / 100 + '%', author + '/' + permlink))
      Template.video.loadState()
    });
  },
  'click .upvoteComment': function (event) {
    var author = $(event.target).data('author')
    if (!author) author = $(event.target).parent().data('author')
    var permlink = $(event.target).data('permlink')
    if (!permlink) permlink = $(event.target).parent().data('permlink')
    var weight = Session.get('voteWeight') * 100
    broadcast.vote(author, permlink, weight, function (err, result) {
      if (err) toastr.error(err.cause.payload.error.data.stack[0].format, translate('GLOBAL_ERROR_COULD_NOT_VOTE'))
      else toastr.success(translate('GLOBAL_ERROR_VOTE_FOR', weight / 100 + '%', author + '/' + permlink))
      Template.video.loadState()
    });
  }
})

Template.comment.helpers({
  currentAuthor: function () {
    return FlowRouter.getParam("author")
  }
})
Template.comment.rendered = function () {

  $(this.firstNode).find('.title').find({
 onVisible: function() {
   $('.ui.avatar.image img').visibility('refresh');
 }
})
;
  $(this.firstNode).find('.ui.avatar.image img').visibility({
    once: true,
    // update size when new content loads
    observeChanges: true,
    refreshOnResize:false,
    type       : 'image',
    transition : 'fade in',
    duration   : 1000
  })
  Template.settingsdropdown.nightMode();
}

 
  

