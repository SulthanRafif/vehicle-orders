<table>
    <thead>
        <tr>
            <th>Nomor Pemesanan Kendaraan</th>
            <th>Nama Petugas</th>
            <th>Nama Kendaraan</th>
            <th>Nama Pemesan</th>
            <th>Nama Pengemudi</th>
            <th>Nama Penyetuju Satu</th>
            <th>Status Penyetuju Satu</th>
            <th>Nama Penyetuju Dua</th>
            <th>Status Penyetuju Dua</th>
            <th>Status Pengembalian</th>
            <th>Tanggal Pemesanan Kendaraan</th>
            <th>Tanggal Pengembalian</th>
        </tr>
    </thead>
    <tbody>
        @foreach($data as $datum)
        <tr>
            <td>{{ $datum['id'] }}</td>
            <td>{{ $datum['created_by']['name'] }}</td>
            <td>{{ $datum['vehicle']['name'] }}</td>
            <td>{{ $datum['customer_name'] }}</td>
            <td>{{ $datum['driver']['name'] }}</td>
            <td>{{ $datum['approval_one']['name'] }}</td>
            <td>
                @if($datum['approval_one_status'] === 0)
                BELUM DISETUJUI
                @else
                SUDAH DISETUJUI
                @endif
            </td>
            <td>{{ $datum['approval_two']['name'] }}</td>
            <td>
                @if($datum['approval_two_status'] === 0)
                BELUM DISETUJUI
                @else
                SUDAH DISETUJUI
                @endif
            </td>
            <td>
                @if($datum['return_date'] === null)
                BELUM KEMBALI
                @else
                SUDAH KEMBALI
                @endif
            </td>
            <td>
                @if($datum['order_date'] === null)
                -
                @else
                {{$datum['order_date']}}
                @endif
            </td>
            <td>
                @if($datum['return_date'] === null)
                -
                @else
                {{$datum['return_date']}}
                @endif
            </td>
        </tr>
        @endforeach
    </tbody>
</table>
