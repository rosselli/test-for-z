<?php
namespace App;
use Illuminate\Database\Eloquent\Model;

class Task extends Model {
    protected $fillable = ['user_id', 'title', 'done', 'estimated_at', 'conpleted_at'];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
