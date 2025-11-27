import { Entity, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Song } from './Song';
import { Genre } from './Genre';

@Entity('song_genres')
export class SongGenre {
    @PrimaryColumn({ type: 'int', name: 'song_id' })
        songId!: number;

    @PrimaryColumn({ type: 'int', name: 'genre_id' })
        genreId!: number;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
        createdAt!: Date;

    // Relationships
    @ManyToOne(() => Song, song => song.songGenres)
    @JoinColumn({ name: 'song_id' })
        song!: Song;

    @ManyToOne(() => Genre, genre => genre.songGenres)
    @JoinColumn({ name: 'genre_id' })
        genre!: Genre;
}

