<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class RoleType extends Enum
{
    const ADMIN = 'admin';
    const PENYETUJU_SATU = 'penyetuju_satu';
    const PENYETUJU_DUA = 'penyetuju_dua';
}
