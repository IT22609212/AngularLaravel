<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       // Example Laravel migration to recreate the table
Schema::create('personal_tokens', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->text('token');
    $table->json('abilities')->nullable();
    $table->timestamp('expires_at')->nullable();
    $table->unsignedBigInteger('tokenable_id');
    $table->string('tokenable_type');
    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personal_access_tokens');
    }
};
