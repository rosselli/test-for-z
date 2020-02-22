<?php
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder {
    public function run() {
        $users = [
            ['Flavio Rosselli', 'rosselli00@gmail.com', bcrypt('test123')],
            ['Test For Z', 'test@gmail.com', bcrypt('test123')]
        ];

        for ($i = 0; $i < count($users); $i++) {
            DB::table('users')->insert([
                'name' => $users[$i][0],
                'email' => $users[$i][1],
                'password' => $users[$i][2],
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
