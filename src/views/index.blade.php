<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
        integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <link rel="stylesheet" href="{{ asset('vendor/laravel-cronjobs/css/app.css') }}" />

    <title>{{ env('APP_NAME') }} - Cronjobs System</title>
</head>

<body>
    <div id="root"></div>
    <script>
        window.APP_PREFIX = '{{ config('laravel-cronjobs-config.prefix') }}'
        window.APP_URL = '{{ env('APP_URL') }}/' + APP_PREFIX
    </script>

    <script src="{{ asset('vendor/laravel-cronjobs/js/app.js') }}"></script>
</body>

<?php

// phpinfo();
?>

</html>
