import { BaseEntity, BaseEntityProps } from './BaseEntity';

export type GroupProps = BaseEntityProps & {
  name: string;
};

export class Group extends BaseEntity {
  private name: string;

  constructor(props: GroupProps) {
    super(props);
    this.name = props.name;
  }
}
