<table>
    <thead>
        <tr>
            <th>Nomor Pemesanan Kendaraan</th>
            <th>Tanggal Pemesanan Kendaraan</th>
            <th>Nama Petugas</th>
            <th>Nama Kendaraan</th>
            <th>Nama Pemesan</th>
            <th>Nama Pengemudi</th>
            <th>Nama Penyetuju Satu</th>
            <th>Status Penyetuju Satu</th>
            <th>Nama Penyetuju Dua</th>
            <th>Status Penyetuju Dua</th>
            <th>Status Pengembalian</th>
        </tr>
    </thead>
    <tbody>
        @foreach($data as $datum)
        <tr>
            <td>{{ $datum['id'] }}</td>
            <td>{{ date('d-m-Y', strtotime($datum['created_at'])) }}</td>
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
                @if($datum['borrow_status'] === 1)
                BELUM KEMBALI
                @else
                SUDAH KEMBALI
                @endif
            </td>
        </tr>
        @endforeach
    </tbody>
</table>
