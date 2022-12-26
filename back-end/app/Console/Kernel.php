<?php

namespace App\Console;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Week;
use App\Models\Payment;
use App\Models\Subscription;
use Illuminate\Support\Facades\DB;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();
        $schedule->call(function () {
            DB::table('subscriptions')->whereRaw('ending_date < now()')->update(['status' => 0]);
            User::where('is_sub', 1)->whereDoesntHave('subscriptions', function ($query) {
                $query->where('status', '!=', 0);
            })->update(['is_sub' => 0]);
        })->everyMinute();

        $schedule->call(function () {
            $users = User::where('is_auto_renewed', 1)->where('is_sub', 0)->get();

            foreach ($users as $user) {
                $lastSubscription = Subscription::where('user_id', $user->id)->with('weeks')->latest()->first();
                $lastPayment = Payment::where('user_id', $user->id)->latest()->first();
                if ($lastSubscription && $lastSubscription->weeks->count() > 0) {
                    $dod = $lastSubscription->weeks->first()->day_of_delivery;
                }

                $newSubscription = new Subscription;
                $newSubscription->user_id = $user->id;
                $newSubscription->people_num = $lastSubscription->people_num;
                $newSubscription->meals_per_week = $lastSubscription->meals_per_week;
                $newSubscription->price = $lastSubscription->price;
                $newSubscription->ending_date = Carbon::now()->addWeeks(4);
                $newSubscription->save();

                $newPayment = new Payment;
                $newPayment->user_id = $user->id;
                $newPayment->subscription_id = $newSubscription->id;
                $newPayment->amount = $lastPayment->amount;
                $newPayment->card_num = $lastPayment->card_num;
                $newPayment->save();

                $user->is_sub = 1;
                $user->save();

                $today = Carbon::today();
                $last_week = Carbon::today()->subWeek();
                for ($i = 1; $i <= 4; $i++) {
                    $weeks = Week::create([
                        'subscription_id' => $newSubscription->id,
                        'week_num' => $i,
                        'day_of_delivery' => $dod,
                        'starting_date' =>   $last_week->addWeek(),
                        'ending_date' => $today->addWeek(),
                    ]);
                }
            }
        })->everyMinute();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
