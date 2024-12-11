import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn() // 자동으로 ID를 생성한다 (uuid를 기반으로 생성)
  // @PrimaryColumn() // 모든 테이블에서 기본적으로 존재해야 한다. 테이블 안에서 각각의 레코드를 구분할 수 있는 column
  id: number;

  @Column({
    type: 'varchar', // db에서 인지하는 칼럼 타입으로, 자동으로 유추됨
    name: '_tile', // db 칼럼 이름
    length: 300, // 값이 길이 (type에 따라 지정이 가능함)
    nullable: true, // null이 가능한지
    update: true, // true면 처음 저장할때만 값 지정이 가능하고 이후에는 값 변경이 불가능
    select: false, // find()를 실행할 때 기본으로 값을 불러올지 여부 (default: true)
    default: 'default value', // 기본 값 (아무것도 입력하지 않았을때 기본으로 입력되는 값)
    unique: true, // 컬럼에서 유일한 값이 되어야 하는지
  })
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
