$(document).ready(() => {
  $('.delete-recipe').on('click', function () {
    let id = $(this).data('id')
    let url = `/delete/${id}`
    if (confirm('Delete Recipe?')) {
      $.ajax({
        url: url,
        type: 'DELETE'
      })
        .done((window.location.href = "/"))
        .fail(err => console.log(err))
    }
  })
})