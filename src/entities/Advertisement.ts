import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

import { AdShownToUser } from './AdShownToUser';

@Entity('advertisements')
export class Advertisement {
    @PrimaryGeneratedColumn({ name: 'ad_id' })
        adId!: number;

    @Column({ type: 'varchar', length: 200 })
        title!: string;

    @Column({ type: 'text' })
        content!: string;

    @Column({ type: 'int' })
        duration!: number;

    @Column({ type: 'varchar', length: 100, name: 'target_audience', nullable: true })
        targetAudience?: string;

    @Column({ type: 'date', name: 'start_date' })
        startDate!: Date;

    @Column({ type: 'date', name: 'end_date', nullable: true })
        endDate?: Date;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
        createdAt!: Date;

    // Relationships
    @OneToMany(() => AdShownToUser, adShownToUser => adShownToUser.advertisement)
        adsShownToUsers!: AdShownToUser[];
}

