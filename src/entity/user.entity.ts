import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn() // 자동으로 ID를 생성한다 (uuid를 기반으로 생성)
  // @PrimaryColumn() // 모든 테이블에서 기본적으로 존재해야 한다. 테이블 안에서 각각의 레코드를 구분할 수 있는 column
  id: number;

  @Column()
  title: string;

  @CreateDateColumn() // 자동으로 데이터 생성일자 등록
  createdAt: Date;

  @UpdateDateColumn() // 자동으로 데이터 업데이트일자 등록
  updatedAt: Date;

  @VersionColumn() // 데이터가 업데이트될때마다 1씩 증가 (save 함수가 몇번 호출되는지 기억)
  version: number;

  @Column()
  @Generated('uuid') // primary column은 아니지만 생성될때마다 1씩 증가되서 입력
  additionalId: number;
}
