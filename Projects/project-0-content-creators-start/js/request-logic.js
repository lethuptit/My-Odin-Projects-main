// We at Content Creators know this code is useful for getting the
// extension off of the supplied filename, but we can't figure out the rest of
// the function to use it! We hope this is useful to you!


function getContentType(filename) {
  const extension = filename.match(/.*\.([^\.]*)$/)[1];
  // (?:         # begin non-capturing group
  //   \.        #   a dot
  //   (         #   begin capturing group (captures the actual extension)
  //     [^.]+   #     anything except a dot, multiple times
  //   )         #   end capturing group
  // )?          # end non-capturing group, make it optional
  // $           # anchor to the end of the string
  if (extension === 'html') {
    return 'text/html';
  } else if (extension === 'css') {
    return 'text/css';
  } else if (extension === 'jpg' || extension === 'jpeg') {
    return 'image/jpeg';
  }

  return 'text/plain';

}