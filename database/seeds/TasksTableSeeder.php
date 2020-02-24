<?php
use Illuminate\Database\Seeder;

class TasksTableSeeder extends Seeder {

    public function run() {
        $tasks = [
            [1, 'Buy Bread', '2020-03-02'],
            [1, 'Fix TV', '2020-03-09'],
            [2, 'Pay the rent','2020-03-09'],
        ];

        for ($i = 0; $i < count($tasks); $i++) {
            DB::table('tasks')->insert([
                'user_id' => $tasks[$i][0],
                'title' => $tasks[$i][1],
                'estimated_at' => $tasks[$i][2],
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
