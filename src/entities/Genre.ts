import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

import { AlbumGenre } from './AlbumGenre';
import { SongGenre } from './SongGenre';

@Entity('genres')
export class Genre {
    @PrimaryGeneratedColumn({ name: 'genre_id' })
        genreId!: number;

    @Column({ type: 'varchar', length: 100 })
        name!: string;

    @Column({ type: 'text', nullable: true })
        description?: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
        createdAt!: Date;

    // Relationships
    @OneToMany(() => AlbumGenre, albumGenre => albumGenre.genre)
        albumGenres!: AlbumGenre[];

    @OneToMany(() => SongGenre, songGenre => songGenre.genre)
        songGenres!: SongGenre[];
}

