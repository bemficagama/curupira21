<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UrlSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['id' => 1, 'url' => 'www.gynpages.com'],
            ['id' => 2, 'url' => 'www.abortionfacts.com'],
            ['id' => 3, 'url' => 'www.humorbomb.org'],
            ['id' => 4, 'url' => 'www.steakandcheese.com'],
            ['id' => 5, 'url' => 'www.punchbaby.com'],
            ['id' => 6, 'url' => 'www.adblade.com'],
            ['id' => 7, 'url' => 'www.netvert.biz'],
            ['id' => 8, 'url' => 'www.budweiser.com'],
            ['id' => 9, 'url' => 'www.coors.com'],
            ['id' => 10, 'url' => 'www.imdb.com'],
            ['id' => 11, 'url' => 'www.eonline.com'],
            ['id' => 12, 'url' => 'www.moviephone.com'],
            ['id' => 13, 'url' => 'www.ge.com'],
            ['id' => 14, 'url' => 'www.sunbeam.com'],
            ['id' => 15, 'url' => 'www.web.icq.com/icqchat'],
            ['id' => 16, 'url' => 'www.aim.com'],
            ['id' => 17, 'url' => 'www.messenger.msn.com'],
            ['id' => 18, 'url' => 'www.phlums.com'],
            ['id' => 19, 'url' => 'www.terrificator.com'],
            ['id' => 20, 'url' => 'www.childmuseum.org'],
            ['id' => 21, 'url' => 'www.scouting.org'],
            ['id' => 22, 'url' => 'www.4h.org'],
            ['id' => 23, 'url' => 'www.marijuana.org'],
            ['id' => 24, 'url' => 'www.hightimes.com'],
            ['id' => 25, 'url' => 'www.education-world.com'],
            ['id' => 26, 'url' => 'www.ed.govwww.nyu.edu'],
            ['id' => 27, 'url' => 'www.email.com'],
            ['id' => 28, 'url' => 'www.hotmail.com'],
            ['id' => 29, 'url' => 'www.yahooligans.com'],
            ['id' => 30, 'url' => 'www.kidsites.com'],
            ['id' => 31, 'url' => 'www.panwapa.com'],
            ['id' => 32, 'url' => 'www.download.com'],
            ['id' => 33, 'url' => 'www.tucows.com'],
            ['id' => 34, 'url' => 'www.gambling.com'],
            ['id' => 35, 'url' => 'www.casino.com'],
            ['id' => 36, 'url' => 'www.sportsbook.com'],
            ['id' => 37, 'url' => 'www.nintendo.com'],
            ['id' => 38, 'url' => 'www.gamespot.com'],
            ['id' => 39, 'url' => 'www.gamesdomain.com'],
            ['id' => 40, 'url' => 'www.whitehouse.gov'],
            ['id' => 41, 'url' => 'www.federalreserve.gov'],
            ['id' => 42, 'url' => 'www.anonymizer.com'],
            ['id' => 43, 'url' => 'astalavista.box.sk'],
            ['id' => 44, 'url' => 'www.happyhacker.org'],
            ['id' => 45, 'url' => 'www.phreak.com'],
            ['id' => 46, 'url' => 'www.cvs.com'],
            ['id' => 47, 'url' => 'www.webmd.com'],
            ['id' => 48, 'url' => 'www.ahajokes.com'],
            ['id' => 49, 'url' => 'www.comedycentral.com'],
            ['id' => 50, 'url' => 'www.the-jokes.com'],
            ['id' => 51, 'url' => 'www.antiessays.com'],
            ['id' => 52, 'url' => 'www.monkeysnatcher.com'],
            ['id' => 53, 'url' => 'www.dell.com'],
            ['id' => 54, 'url' => 'www.microsoft.com'],
            ['id' => 55, 'url' => 'www.javaworld.com'],
            ['id' => 56, 'url' => 'www.bidfind.com'],
            ['id' => 57, 'url' => 'www.ebay.com'],
            ['id' => 58, 'url' => 'wovusej.com'],
            ['id' => 59, 'url' => 'xujoket.com'],
            ['id' => 60, 'url' => 'www.victoriassecret.com'],
            ['id' => 61, 'url' => 'www.fredericks.com']
        ];

        DB::table('urls')->insert($data);
    }
}
