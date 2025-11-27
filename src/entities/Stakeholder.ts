import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

import { SongStakeholder } from './SongStakeholder';

export enum StakeholderRole {
    SINGER = 'singer',
    COMPOSER = 'composer',
    PRODUCER = 'producer',
    SONGWRITER = 'songwriter',
    ENGINEER = 'engineer',
}

@Entity('stakeholders')
export class Stakeholder {
    @PrimaryGeneratedColumn({ name: 'stakeholder_id' })
        stakeholderId!: number;

    @Column({ type: 'varchar', length: 150 })
        name!: string;

    @Column({
        type: 'enum',
        enum: StakeholderRole,
    })
        role!: StakeholderRole;

    @Column({ type: 'varchar', length: 100, nullable: true })
        country?: string;

    @Column({ type: 'text', nullable: true })
        bio?: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
        createdAt!: Date;

    // Relationships
    @OneToMany(() => SongStakeholder, songStakeholder => songStakeholder.stakeholder)
        songStakeholders!: SongStakeholder[];
}

