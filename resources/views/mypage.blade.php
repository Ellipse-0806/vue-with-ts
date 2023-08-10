<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>mpa page</title>
    </head>
    <div>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/jNQXAC9IVRw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
    <div>
        This component is mypage!
    </div>
    <div>
        spa : <a href="http://localhost/spa/home">go to home !</a>
    </div>
    <div>
        mpa : <a href="http://localhost/mpa/home">go to home !</a>
    </div>
</html>
