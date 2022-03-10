import { BaseEntity, BaseEntityProps } from './BaseEntity';

export type PlanProps = BaseEntityProps & {
  name: string;
};

export class Plan extends BaseEntity {
  private name: string;

  constructor(props: PlanProps) {
    super(props);
    this.name = props.name;
  }
}
