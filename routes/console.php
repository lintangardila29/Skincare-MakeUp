<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schedule;

// Delete read notifications
Schedule::call(function () {
    DB::table('notifications')->where('read_at', '!=', null)->where('created_at', '<', now()->subDays(1))->delete();
})->daily();
