import { Entity, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Album } from './Album';
import { Genre } from './Genre';

@Entity('album_genres')
export class AlbumGenre {
    @PrimaryColumn({ type: 'int', name: 'album_id' })
        albumId!: number;

    @PrimaryColumn({ type: 'int', name: 'genre_id' })
        genreId!: number;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
        createdAt!: Date;

    // Relationships
    @ManyToOne(() => Album, album => album.albumGenres)
    @JoinColumn({ name: 'album_id' })
        album!: Album;

    @ManyToOne(() => Genre, genre => genre.albumGenres)
    @JoinColumn({ name: 'genre_id' })
        genre!: Genre;
}

