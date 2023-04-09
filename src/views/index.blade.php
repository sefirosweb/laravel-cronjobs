<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>{{ config('app.name') }} - Cronjobs System</title>
</head>

<body>
    <div id="root"></div>
    <script>
        window.APP_PREFIX = '{{ config('laravel-cronjobs.prefix') }}'
        window.APP_URL = '{{ config('app.url') }}/' + APP_PREFIX
    </script>

    {{ Vite::useHotFile(storage_path('app/vite_laravel_cronjobs.hot'))
    ->useBuildDirectory('vendor/laravel-cronjobs')
    ->withEntryPoints(['resources/js/app.tsx']) }}

</body>

</html>