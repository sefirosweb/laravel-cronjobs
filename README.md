# Laravel - Cronjobs

## Requeriments

Must have a schedule:work running

For test execute:

```
sail artisan schedule:work
```

If you have queue in redis must have running queue listener

For test execute:

```
sail artisan queue:listen
```

## Installation - Composer

You can install the package via composer:

```
composer require sefirosweb/laravel-cronjobs
```

Or manually add this to your composer.json:

**composer.json**

```json
"sefirosweb/laravel-cronjobs": "*"
```

If you are using Laravel 5.5 and up, the service provider will automatically get registered.

For older versions of Laravel (<5.5), you have to add the service provider:

**config/app.php**

```php
'providers' => [
        ...
    	Sefirosweb\LaravelCronjobs\LaravelCronjobsServiceProvider::class,
]
```

Install database migrations

```
php artisan migrate
```

Publish React front and config:

```
php artisan vendor:publish --provider="Sefirosweb\LaravelCronjobs\LaravelCronjobsServiceProvider" --force
```

## <strong>CAUTION: YOU MUST BE SECURIZE THIS URL PATH, THIS PACKAGE HAVE FULL ACCESS TO ALL CONTROLLERS ADDING CORRECT NAMESPACES</strong>

Easy way: `config/aravel-cronjobs.php`

```php
return [
    'prefix' => 'cronjobs', // Prefix path
    'middleware' => ['web', 'auth'] // Use your self auth system,
];

```

Extra: for the advanced access list I recommend my other package:[laravel-access-list](https://github.com/sefirosweb/laravel-access-list)
Usage:

```php
return [
    'prefix' => 'cronjobs',
    'middleware' => ['web', 'auth', 'checkAcl:cronjob_edit'] // Create access list "cronjob_edit" and assign to role and user
];


```

## Usage

Go to http://your_app/cronjobs

- Name => Free Text
- Description => Free Text
- Controller => Must add the namespace + controller Ex: ` App\Http\Controllers\FooController`
- Function => Must be a public or static function without mandatory parameters
- Edit cron, is a [Linux cron job system](https://en.wikipedia.org/wiki/Cron) Ex: 10 \* \* \* \* (Execute every hour at 10 AM) you can see preview of time runs

![image](https://raw.githubusercontent.com/sefirosweb/laravel-cronjobs/master/docs/how_to.gif)

## Artisan

You can list and execute manually cronjobs via artisan:

Show cronjobs:

```
php artisan cronjob:list
```

Execute manually cronjob:

```
sail artisan cronjobs:execute Foo
```
