import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, Index } from 'typeorm';

import { Album } from './Album';
import { SongGenre } from './SongGenre';
import { ArtistSong } from './ArtistSong';
import { SongStakeholder } from './SongStakeholder';
import { Like } from './Like';
import { ListeningHistory } from './ListeningHistory';
import { PlaylistSong } from './PlaylistSong';

@Entity('songs')
@Index(['albumId'])
export class Song {
    @PrimaryGeneratedColumn({ name: 'song_id' })
        songId!: number;

    @Column({ type: 'varchar', length: 200 })
        title!: string;

    @Column({ type: 'int', name: 'album_id', nullable: true })
        albumId?: number;

    @Column({ type: 'int' })
        duration!: number;

    @Column({ type: 'date', name: 'release_date', nullable: true })
        releaseDate?: Date;

    @Column({ type: 'varchar', length: 50, nullable: true })
        language?: string;

    @Column({ type: 'text', nullable: true })
        lyrics?: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
        createdAt!: Date;

    // Relationships
    @ManyToOne(() => Album, album => album.songs, { nullable: true })
    @JoinColumn({ name: 'album_id' })
        album?: Album;

    @OneToMany(() => SongGenre, songGenre => songGenre.song)
        songGenres!: SongGenre[];

    @OneToMany(() => ArtistSong, artistSong => artistSong.song)
        artistSongs!: ArtistSong[];

    @OneToMany(() => SongStakeholder, songStakeholder => songStakeholder.song)
        songStakeholders!: SongStakeholder[];

    @OneToMany(() => Like, like => like.song)
        likes!: Like[];

    @OneToMany(() => ListeningHistory, history => history.song)
        listeningHistories!: ListeningHistory[];

    @OneToMany(() => PlaylistSong, playlistSong => playlistSong.song)
        playlistSongs!: PlaylistSong[];
}

